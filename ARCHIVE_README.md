# sbti.unun.dev 本地镜像

## 内容

- `index.html`: 可离线/本地 HTTP 打开的页面，已移除 Cloudflare Analytics 外链。
- `index.original.html`: 从 `https://sbti.unun.dev/` 下载的原始部署 HTML。
- `image/`: 页面引用的 27 张结果图。
- `source/SBTI-test/`: 页面公开链接的 GitHub 源码快照。
- `archive-report.json`: 下载记录。
- `verification-report.json`: 完整性校验结果。
- `download-site.js`: 可复跑下载脚本。
- `verify-archive.js`: 可复跑校验脚本。

## 验证结果

- 页面图片引用数: 27。
- 本地图片文件数: 27。
- GitHub 源码图片文件数: 27。
- 本地图片与源码图片哈希: 全部一致。
- 部署 HTML 去掉 Cloudflare Analytics 后与源码 HTML: 一致。
- 本地 `index.html`: 无外部脚本引用。

## 本地查看

直接打开 `index.html`，或在本目录执行:

```powershell
python.exe -m http.server 4173 --bind 127.0.0.1
```

然后访问:

```text
http://127.0.0.1:4173/index.html
```

## 说明

- `robots.txt` 和 `sitemap.xml` 已按公开 URL 保存。远端 `sitemap.xml` 返回的是 SPA 首页回退内容，不是有效站点地图。
- 未绕过登录、权限、反爬或私有接口。
- Cloudflare Analytics 脚本在当前网络环境下 TLS 握手失败，且不影响页面核心功能；本地可用页已移除该外链，原始部署版本保留在 `index.original.html`。
