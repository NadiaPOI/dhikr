const C="dhikr-v7",A=["./","index.html","manifest.json","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A.map(u=>new Request(u,{cache:"reload"})))));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C&&x.indexOf("dhikr-audio")!==0).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{const q=e.request;if(q.method!=="GET"||q.destination==="audio"||q.headers.has("range"))return;const u=new URL(q.url);
if(u.origin===location.origin){e.respondWith(fetch(q.mode==="navigate"?u.href:q,{cache:"no-cache"}).then(res=>{if(res.ok){const cl=res.clone();caches.open(C).then(c=>c.put(q,cl))}return res}).catch(()=>caches.match(q).then(r=>r||caches.match("index.html"))));return}
e.respondWith(caches.match(q).then(r=>r||fetch(q).then(res=>{if(res.ok){const cl=res.clone();caches.open(C).then(c=>c.put(q,cl))}return res})))});
self.addEventListener("notificationclick",e=>{e.notification.close();e.waitUntil(clients.matchAll({type:"window"}).then(l=>l.length?l[0].focus():clients.openWindow("./")))});
