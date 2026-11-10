/* Holat (state), yordamchi funksiyalar va hisoblash algoritmi */
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const KEY='split-v3';
let S={lang:'uz',tab:'g',cur:'UZS',rate:12500,manual:false,people:[],exp:[]};
try{const d=JSON.parse(localStorage.getItem(KEY));if(d&&d.people)S=Object.assign(S,d)}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};
const t=k=>T[S.lang][k];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=(n,c=S.cur)=>c==='USD'?'$'+n.toLocaleString('en-US',{minimumFractionDigits:n%1?2:0,maximumFractionDigits:2}):Math.round(n).toLocaleString('ru-RU').replace(/\u00a0/g,' ')+' '+t('so');
const cv=(a,from)=>from===S.cur?a:(from==='USD'?a*S.rate:a/S.rate);
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const COL=['#8b5cf6','#ff4d8d','#3b82f6','#14b8a6','#f59e0b','#ec4899','#6366f1','#22c55e'];
const col=id=>{let h=0;for(const c of id)h=(h*31+c.charCodeAt(0))>>>0;return COL[h%8]};
const P=id=>S.people.find(p=>p.id===id),pn=id=>P(id)?P(id).name:'?';
const av=p=>`<div class="av" style="background:${col(p.id)}">${esc(p.name[0].toUpperCase())}</div>`;
const stage=k=>`<div class="stage"><img src="${IMG[k]}" alt=""></div>`;
let payer=null,aCur=S.cur;

function calc(){
  const u=S.cur==='USD'?.01:1,total=S.exp.reduce((a,e)=>a+cv(e.amount,e.cur||'UZS'),0),n=S.people.length,share=n?total/n:0;
  const bal={},paid={};S.people.forEach(p=>{bal[p.id]=-share;paid[p.id]=0});
  S.exp.forEach(e=>{if(e.payer in bal){const v=cv(e.amount,e.cur||'UZS');bal[e.payer]+=v;paid[e.payer]+=v}});
  const cr=[],db=[];
  S.people.forEach(p=>{const b=bal[p.id];if(b>u/2)cr.push({id:p.id,v:b});else if(b<-u/2)db.push({id:p.id,v:-b})});
  const tx=[];
  while(cr.length&&db.length){
    cr.sort((a,b)=>b.v-a.v);db.sort((a,b)=>b.v-a.v);
    const c=cr[0],d=db[0],m=Math.min(c.v,d.v);
    if(m>=u)tx.push({from:d.id,to:c.id,amt:m});
    c.v-=m;d.v-=m;if(c.v<u/2)cr.shift();if(d.v<u/2)db.shift();
  }
  return{total,n,share,bal,paid,tx,u};
}
const heroH=c=>`<div class="hero"><small>${t('total')}</small><div class="n">${fmt(c.total)}</div><div class="two"><div><small>${t('each')}</small>${fmt(c.share)}</div><div><small>${t('g')}</small>${c.n} ${t('pers')}</div></div></div>`;

