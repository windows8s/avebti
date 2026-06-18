const fs = require('fs/promises');
const path = require('path');
const { URL } = require('url');
const crypto = require('crypto');

const root = process.cwd();
const site = 'https://sbti.unun.dev/';
const userAgent = 'Mozilla/5.0 (compatible; local-site-archive/1.0; +https://sbti.unun.dev/)';

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

function localPathForUrl(url) {
  const u = new URL(url, site);
  if (u.hostname === 'sbti.unun.dev') {
    let p = decodeURIComponent(u.pathname);
    if (p === '/') p = '/index.html';
    return path.join(root, p.replace(/^\//, '').replace(/\//g, path.sep));
  }
  if (u.hostname === 'static.cloudflareinsights.com') {
    return path.join(root, 'external', 'static.cloudflareinsights.com', decodeURIComponent(u.pathname).replace(/^\//, '').replace(/\//g, path.sep));
  }
  return path.join(root, 'external', u.hostname, decodeURIComponent(u.pathname).replace(/^\//, '').replace(/\//g, path.sep));
}

async function fetchToFile(url, outPath) {
  const res = await fetch(url, {
    redirect: 'follow',
    headers: { 'user-agent': userAgent, 'accept': '*/*' }
  });
  const buf = Buffer.from(await res.arrayBuffer());
  await ensureDir(path.dirname(outPath));
  await fs.writeFile(outPath, buf);
  return {
    url,
    status: res.status,
    ok: res.ok,
    contentType: res.headers.get('content-type') || '',
    bytes: buf.length,
    sha256: crypto.createHash('sha256').update(buf).digest('hex'),
    path: path.relative(root, outPath).replace(/\\/g, '/')
  };
}

function extractImageUrls(html) {
  const urls = new Set();
  const re = /["'](\.\/image\/[^"']+?\.(?:png|jpe?g|webp|gif|svg))["']/gi;
  let m;
  while ((m = re.exec(html))) urls.add(new URL(m[1], site).href);
  return [...urls];
}

function extractExternalScripts(html) {
  const urls = new Set();
  const re = /<script\b[^>]*\bsrc=['"]([^'"]+)['"][^>]*>/gi;
  let m;
  while ((m = re.exec(html))) urls.add(new URL(m[1], site).href);
  return [...urls];
}

function extractAnchors(html) {
  const urls = new Set();
  const re = /<a\b[^>]*\bhref=['"]([^'"]+)['"][^>]*>/gi;
  let m;
  while ((m = re.exec(html))) urls.add(new URL(m[1], site).href);
  return [...urls];
}

function toLocalHtml(html) {
  return html.replace(
    /\n?<!-- Cloudflare Pages Analytics --><script defer src='https:\/\/static\.cloudflareinsights\.com\/beacon\.min\.js' data-cf-beacon='[^']*'><\/script><!-- Cloudflare Pages Analytics -->/,
    ''
  );
}

async function main() {
  const report = { generatedAt: new Date().toISOString(), site, downloads: [], anchors: [], notes: [] };
  const homepage = await fetchToFile(site, path.join(root, 'index.original.html'));
  report.downloads.push(homepage);
  const html = await fs.readFile(path.join(root, 'index.original.html'), 'utf8');
  await fs.writeFile(path.join(root, 'index.html'), toLocalHtml(html), 'utf8');

  const assetUrls = [...extractImageUrls(html), ...extractExternalScripts(html)];
  for (const url of assetUrls) {
    try {
      const item = await fetchToFile(url, localPathForUrl(url));
      report.downloads.push(item);
    } catch (err) {
      report.downloads.push({ url, ok: false, error: String(err) });
    }
  }

  const robots = await fetchToFile(new URL('/robots.txt', site).href, path.join(root, 'robots.txt'));
  report.downloads.push(robots);

  const sitemap = await fetchToFile(new URL('/sitemap.xml', site).href, path.join(root, 'sitemap.xml'));
  report.downloads.push(sitemap);

  report.anchors = extractAnchors(html);
  report.notes.push('Only publicly referenced assets were downloaded. No authentication, bypass, brute-force route enumeration, or private API collection was performed.');
  await fs.writeFile(path.join(root, 'archive-report.json'), JSON.stringify(report, null, 2), 'utf8');

  const summary = report.downloads.map(d => `${d.ok ? 'OK' : 'FAIL'} ${d.status || ''} ${d.bytes || 0} ${d.path || d.url}`).join('\n');
  console.log(summary);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
