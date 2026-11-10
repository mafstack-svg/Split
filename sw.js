/* Service Worker: oflayn ishlash. Fayllarni o'zgartirsangiz VERSION raqamini oshiring. */
const VERSION='split-v2';
const FILES=['./','manifest.json','css/style.css','js/i18n.js','js/core.js','js/ui.js','js/receipt.js','js/pwa.js','js/main.js','assets/team.svg','assets/coins.svg','assets/revenue.svg','icons/icon.svg','icons/icon-192.png','icons/icon-512.png'];
/* Redirect bo'lgan javobni brauzer sahifa sifatida qabul qilmaydi (ERR_FAILED), shuning uchun uni tozalaymiz */
const clean=async r=>r.redirected?new Response(await r.blob(),{status:r.status,statusText:r.statusText,headers:r.headers}):r;
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(VERSION).then(c=>Promise.all(FILES.map(f=>fetch(f,{cache:'reload'}).then(clean).then(r=>r.ok?c.put(f,r):0).catch(()=>{})))));
  self.skipWaiting();
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==VERSION).map(x=>caches.delete(x)))).then(()=>clients.claim()));
});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  if(r.mode==='navigate'){
    e.respondWith(fetch(r).then(clean).catch(()=>caches.match('./')));
    return;
  }
  e.respondWith(caches.match(r).then(hit=>{
    const net=fetch(r).then(async res=>{const ok=await clean(res);if(ok.ok){const cp=ok.clone();caches.open(VERSION).then(c=>c.put(r,cp))}return ok}).catch(()=>hit);
    return hit||net;
  }));
});
