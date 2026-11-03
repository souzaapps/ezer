// Service worker minimo: so existe para o navegador reconhecer o site como
// instalavel. NAO guarda nada em cache (sempre vai a rede), entao nunca
// serve uma versao velha do app.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => { e.respondWith(fetch(e.request)); });
