/* Service Worker: oflayn ishlash. Fayllarni o'zgartirsangiz VERSION raqamini oshiring. */
const VERSION='split-v1';
const FILES=['./','index.html','manifest.json','css/style.css','js/i18n.js','js/core.js','js/ui.js','js/receipt.js','js/pwa.js','js/main.js','assets/team.svg','assets/coins.svg','assets/revenue.svg','icons/icon.svg','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==VERSION).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  e.respondWith(caches.match(r).then(hit=>{
    const net=fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(VERSION).then(c=>c.put(r,cp))}return res}).catch(()=>hit);
    return hit||net;
  }));
});
