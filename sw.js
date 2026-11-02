/* Sin conexión: guarda la app y los archivos de trucos. Al añadir un idioma, agrega su archivo a A. */
var V="trucos-v1",A=["./","index.html","cheats-emerald-es.js"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(A)}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
/* Responde desde la caché y la actualiza en segundo plano: los cambios aparecen en la siguiente apertura. */
self.addEventListener("fetch",function(e){if(e.request.method!=="GET")return;
e.respondWith(caches.open(V).then(function(c){return c.match(e.request,{ignoreSearch:true}).then(function(r){
var n=fetch(e.request).then(function(x){if(x.ok)c.put(e.request,x.clone());return x}).catch(function(){return r});return r||n})}))});
