/* Su Configuration */
var path = location.pathname
var basePath = path.substring(0, path.lastIndexOf('/') + 1)

// Ensure basePath is correct even in proxied pages
if (path.includes('/calc/')) {
  basePath = path.substring(0, path.indexOf('/calc/') + 1)
}

self.__uv$config = {
  prefix: basePath + 'calc/',
  bare: basePath + 'telemetry/',
  wisp: '/ws/',
  searchEngine: 'https://duckduckgo.com/?q=%s',
  encodeUrl: Vector.codec.xor.encode,
  decodeUrl: Vector.codec.xor.decode,
  handler: 'https://cdn.jsdelivr.net/gh/Sea-Math/OFFICIAL-SU-REPO@main/su.handler.mjs?raw=true',
  bundle: 'https://cdn.jsdelivr.net/gh/Sea-Math/OFFICIAL-SU-REPO@main/su.bundle.mjs?raw=true',
  config: 'https://cdn.jsdelivr.net/gh/Sea-Math/OFFICIAL-SU-REPO@main/su.config.mjs?raw=true',
  sw: 'https://cdn.jsdelivr.net/gh/Sea-Math/OFFICIAL-SU-REPO@main/su.kernel.mjs?raw=true',
  client: 'https://cdn.jsdelivr.net/gh/Sea-Math/OFFICIAL-SU-REPO@main/su.canvas.mjs?raw=true',
}
