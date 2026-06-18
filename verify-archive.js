const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = process.cwd();

function sha256(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

function uniqueImageRefs(htmlFile) {
  const html = fs.readFileSync(htmlFile, 'utf8');
  return [...new Set(
    [...html.matchAll(/["']\.\/image\/([^"']+)["']/g)].map(match => match[1])
  )].sort();
}

function listFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(entry => entry.isFile())
    .map(entry => entry.name)
    .sort();
}

function compareLists(left, right) {
  return {
    missing: left.filter(item => !right.includes(item)),
    extra: right.filter(item => !left.includes(item))
  };
}

function normalizeDeployedHtml(html) {
  return html
    .replace(/\r\n/g, '\n')
    .replace(/\n?<!-- Cloudflare Pages Analytics --><script defer src='https:\/\/static\.cloudflareinsights\.com\/beacon\.min\.js' data-cf-beacon='[^']*'><\/script><!-- Cloudflare Pages Analytics -->/, '')
    .replace(/\n+(<\/body>)/, '\n$1')
    .replace(/\s+$/g, '');
}

function main() {
  const localRefs = uniqueImageRefs(path.join(root, 'index.html'));
  const originalRefs = uniqueImageRefs(path.join(root, 'index.original.html'));
  const mirrorFiles = listFiles(path.join(root, 'image'));
  const sourceFiles = listFiles(path.join(root, 'source', 'SBTI-test', 'image'));

  const nonEmptyMirrorImages = mirrorFiles.filter(file => {
    return fs.statSync(path.join(root, 'image', file)).size > 0;
  });

  const imageHashMismatches = mirrorFiles
    .filter(file => sourceFiles.includes(file))
    .filter(file => sha256(path.join(root, 'image', file)) !== sha256(path.join(root, 'source', 'SBTI-test', 'image', file)));

  const originalHtml = fs.readFileSync(path.join(root, 'index.original.html'), 'utf8');
  const sourceHtml = fs.readFileSync(path.join(root, 'source', 'SBTI-test', 'index.html'), 'utf8');
  const deployedMinusAnalyticsEqualsSource = normalizeDeployedHtml(originalHtml) === normalizeDeployedHtml(sourceHtml);

  const report = {
    checkedAt: new Date().toISOString(),
    localHtml: {
      path: 'index.html',
      bytes: fs.statSync(path.join(root, 'index.html')).size,
      sha256: sha256(path.join(root, 'index.html')),
      imageRefs: localRefs.length,
      externalScriptRefs: [...fs.readFileSync(path.join(root, 'index.html'), 'utf8').matchAll(/<script\b[^>]*\bsrc=/g)].length
    },
    originalDeploymentHtml: {
      path: 'index.original.html',
      bytes: fs.statSync(path.join(root, 'index.original.html')).size,
      sha256: sha256(path.join(root, 'index.original.html'))
    },
    images: {
      refsInLocalHtml: localRefs.length,
      refsInOriginalHtml: originalRefs.length,
      mirroredFiles: mirrorFiles.length,
      sourceFiles: sourceFiles.length,
      nonEmptyMirroredFiles: nonEmptyMirrorImages.length,
      localRefsVsMirror: compareLists(localRefs, mirrorFiles),
      mirrorVsSource: compareLists(mirrorFiles, sourceFiles),
      hashMismatchesWithSource: imageHashMismatches
    },
    sourceSnapshot: {
      path: 'source/SBTI-test',
      gitHead: fs.existsSync(path.join(root, 'source', 'SBTI-test', '.git'))
        ? require('child_process').execFileSync('git.exe', ['-C', path.join(root, 'source', 'SBTI-test'), 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim()
        : null,
      deployedMinusAnalyticsEqualsSource
    },
    pass: localRefs.length === 27
      && originalRefs.length === 27
      && mirrorFiles.length === 27
      && sourceFiles.length === 27
      && nonEmptyMirrorImages.length === 27
      && compareLists(localRefs, mirrorFiles).missing.length === 0
      && compareLists(localRefs, mirrorFiles).extra.length === 0
      && compareLists(mirrorFiles, sourceFiles).missing.length === 0
      && compareLists(mirrorFiles, sourceFiles).extra.length === 0
      && imageHashMismatches.length === 0
      && deployedMinusAnalyticsEqualsSource
  };

  fs.writeFileSync(path.join(root, 'verification-report.json'), JSON.stringify(report, null, 2), 'utf8');
  console.log(JSON.stringify(report, null, 2));
  process.exit(report.pass ? 0 : 1);
}

main();
