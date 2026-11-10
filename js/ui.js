/* Ekranlarni chizish va tugmalar hodisalari */
function render(){
  document.documentElement.lang=S.lang;
  const c=calc();
  $('#v-g').innerHTML=stage('g')+`<h1>${t('gT')}</h1><p class="sub">${t('gP')}</p>
  <form class="add" id="pf"><input id="pn" maxlength="24" autocomplete="off" placeholder="${t('namePh')}"><button class="btn">${t('add')}</button></form>
  <div class="card" style="margin-top:18px">${S.people.length?S.people.map(p=>`<div class="row">${av(p)}<div class="grow"><b>${esc(p.name)}</b><small>${t('paid')}: ${fmt(c.paid[p.id])}</small></div><button class="x" data-delp="${p.id}" aria-label="x">×</button></div>`).join(''):`<div class="empty"><b>${t('noP')}</b>${t('noPP')}</div>`}</div>
  ${S.people.length>1?`<button class="btn full" data-tab="x">${t('next')}</button>`:''}`;
  $('#v-x').innerHTML=stage('x')+`<h1>${t('xT')}</h1><p class="sub">${t('xP')}</p>`+
  (!S.people.length?`<div class="card"><div class="empty"><b>${t('needP')}</b></div></div><button class="btn full" data-tab="g">${t('goG')}</button>`:
  heroH(c)+`<div class="card">${S.exp.length?S.exp.slice().reverse().map(e=>{const k=e.cur||'UZS';return`<div class="row">${P(e.payer)?av(P(e.payer)):''}<div class="grow"><b>${esc(e.title)}</b><small>${esc(pn(e.payer))} · ${t('by')}</small>${e.note?`<div class="nt">${esc(e.note)}</div>`:''}</div><span class="num">${fmt(e.amount,k)}${k!==S.cur?`<small>≈ ${fmt(cv(e.amount,k))}</small>`:''}</span><button class="x" data-dele="${e.id}" aria-label="x">×</button></div>`}).join(''):`<div class="empty"><b>${t('noX')}</b>${t('noXP')}</div>`}</div>`);
  $('#v-h').innerHTML=stage('h')+`<h1>${t('h')}</h1>`+(!S.exp.length?`<p class="sub">${t('hSub')}</p>`:
  heroH(c)+`<div class="card"><div class="set"><span class="lb">${t('dcur')}</span><div class="seg"><button data-dcur="UZS" class="${S.cur==='UZS'?'on':''}">UZS</button><button data-dcur="USD" class="${S.cur==='USD'?'on':''}">USD</button></div></div><div class="set"><span class="lb">${t('rateL')}</span><div class="rate">1 USD = <input id="rt" type="number" inputmode="decimal" value="${Math.round(S.rate*100)/100}"> ${t('so')}</div></div></div>
  <div class="sec">${t('who')}</div>`+
  (c.tx.length?c.tx.map(x=>`<div class="pay">${av(P(x.from))}<div class="grow"><b>${esc(pn(x.from))}</b> <span class="ar">→</span> <b>${esc(pn(x.to))}</b></div><span class="num r">${fmt(x.amt)}</span></div>`).join(''):`<div class="done">✓ ${t('settled')}</div>`)+
  `<div class="sec">${t('bal')}</div><div class="card">${S.people.map(p=>{const b=c.bal[p.id];return`<div class="row">${av(p)}<div class="grow"><b>${esc(p.name)}</b><small>${t('paid')}: ${fmt(c.paid[p.id])}</small></div><span class="num ${b>c.u/2?'g':b<-c.u/2?'r':''}">${b>c.u/2?'+':''}${fmt(b)}</span></div>`}).join('')}</div>
  <button class="btn full" id="showR">${t('showR')}</button>`);
  $$('[data-i]').forEach(e=>e.textContent=t(e.dataset.i));
  $$('[data-ph]').forEach(e=>e.placeholder=t(e.dataset.ph));
  $$('[data-lang]').forEach(b=>b.classList.toggle('on',b.dataset.lang===S.lang));
  $$('nav [data-tab]').forEach(b=>b.classList.toggle('on',b.dataset.tab===S.tab));
  $$('.view').forEach(v=>v.classList.toggle('on',v.id==='v-'+S.tab));
  $('#fab').classList.toggle('on',S.tab==='x'&&S.people.length>0);
  $('#dl').dataset.tip=t('tip');$('#dl').setAttribute('aria-label',t('install'));
  if($('#m-r').classList.contains('open'))drawReceipt();
}
function go(tab){S.tab=tab;save();render();window.scrollTo({top:0})}
function toast(m){const e=$('#toast');e.textContent=m;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('on'),2000)}
function addPerson(v){v=v.trim();if(!v)return;S.people.push({id:uid(),name:v});save();render();const i=$('#pn');if(i)i.focus()}
function segR(){$$('#aseg button').forEach(b=>b.classList.toggle('on',b.dataset.acur===aCur))}
function whoR(){$('#who').innerHTML=S.people.map(p=>`<button data-pay="${p.id}" class="${p.id===payer?'on':''}">${esc(p.name)}</button>`).join('')}
const closeAll=()=>$$('.modal').forEach(m=>m.classList.remove('open'));

document.addEventListener('submit',e=>{if(e.target.id==='pf'){e.preventDefault();addPerson($('#pn').value)}});
document.addEventListener('change',e=>{if(e.target.id==='rt'){const v=parseFloat(e.target.value);if(v>0){S.rate=v;S.manual=true;save()}render()}});
document.addEventListener('click',e=>{
  const g=s=>e.target.closest(s);let el;
  if(el=g('[data-tab]'))go(el.dataset.tab);
  else if(el=g('[data-delp]')){const id=el.dataset.delp;if(S.exp.some(x=>x.payer===id)&&!confirm(t('delP').replace('{n}',pn(id))))return;S.people=S.people.filter(p=>p.id!==id);S.exp=S.exp.filter(x=>x.payer!==id);save();render()}
  else if(el=g('[data-dele]')){S.exp=S.exp.filter(x=>x.id!==el.dataset.dele);save();render()}
  else if(el=g('[data-lang]')){S.lang=el.dataset.lang;save();render()}
  else if(el=g('[data-dcur]')){S.cur=el.dataset.dcur;save();render()}
  else if(el=g('[data-acur]')){aCur=el.dataset.acur;segR()}
  else if(el=g('[data-pay]')){payer=el.dataset.pay;whoR()}
  else if(g('[data-close]')||e.target.classList.contains('modal'))closeAll();
  else if(g('#showR')){drawReceipt();$('#m-r').classList.add('open')}
  else if(g('#fab')){payer=S.people[0].id;aCur=S.cur;segR();whoR();$('#m-add').classList.add('open');setTimeout(()=>$('#et').focus(),100)}
});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAll()});
$('#save').onclick=()=>{
  const title=$('#et').value.trim(),amount=parseFloat($('#ea').value),note=$('#en').value.trim();
  if(!title||!(amount>0))return toast(t('bad'));
  S.exp.push({id:uid(),title,amount,cur:aCur,note,payer});
  ['#et','#ea','#en'].forEach(i=>$(i).value='');closeAll();save();render();
};

