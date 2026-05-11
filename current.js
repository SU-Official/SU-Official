import * as BareMux from 'https://cdn.jsdelivr.net/gh/Sea-Math/OFFICIAL-SU-REPO@main/tide/index.mjs'
import 'https://cdn.jsdelivr.net/gh/Sea-Math/OFFICIAL-SU-REPO@main/su.bundle.mjs'
import 'https://cdn.jsdelivr.net/gh/Sea-Math/OFFICIAL-SU-REPO@main/su.config.mjs'
import 'https://cdn.jsdelivr.net/gh/Sea-Math/OFFICIAL-SU-REPO@main/su.kernel.mjs'

self.BareMux = BareMux
const uv = new self.UVServiceWorker()
const connection = new BareMux.BareMuxConnection('https://cdn.jsdelivr.net/gh/Sea-Math/OFFICIAL-SU-REPO@main/tide/worker.js?raw=true')

let transportReady = false

async function setupTransport() {
  const wispUrl = self.__uv$config.wisp

  try {
    const transportUrl = 'https://cdn.jsdelivr.net/gh/Sea-Math/OFFICIAL-SU-REPO@main/boat/index.mjs'
    await connection.setTransport(transportUrl, [{ wisp: wispUrl }])
    console.log('[SW] Boat transport configured (Remote):', wispUrl)
    transportReady = true
  } catch (err) {
    console.error('[SW] Failed to set Wisp transport:', err)
  }
}

const transportPromise = setupTransport()

self.addEventListener('fetch', (event) => {
  if (event.request.url.startsWith(location.origin + self.__uv$config.prefix)) {
    event.respondWith(
      (async () => {
        await transportPromise
        return await uv.fetch(event)
      })()
    )
  }
})
