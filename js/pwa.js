/* PWA: service worker va "Ilovani o'rnatish" tugmasi */
if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol))navigator.serviceWorker.register('sw.js').catch(()=>{});
let dp;
const installed=()=>{try{return localStorage.getItem('split-inst')==='1'}catch(e){return false}};
const standalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone;
const showDl=()=>{$('#dl').hidden=installed()||standalone()};
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();dp=e;showDl()});
window.addEventListener('appinstalled',()=>{try{localStorage.setItem('split-inst','1')}catch(e){}$('#dl').hidden=true});
$('#dl').onclick=async()=>{
  if(dp){dp.prompt();const r=await dp.userChoice;dp=null;if(r.outcome==='accepted'){try{localStorage.setItem('split-inst','1')}catch(e){}$('#dl').hidden=true}return}
  $('#instH').textContent=/iphone|ipad|ipod/i.test(navigator.userAgent)?t('iosH'):t('otherH');$('#m-i').classList.add('open');
};
