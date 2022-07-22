self.addEventListener('install', (installEvent) => {
    installEvent.waitUntil(
      console.log("INSTALLED")
    )
  })
  
  self.addEventListener('fetch', (fetchEvent) => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then((res) => {
        return res || fetch(fetchEvent.request)
      })
    )
  })
  