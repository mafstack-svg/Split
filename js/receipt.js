/* Receipt */
const rd=()=>({c:calc(),d:new Date().toLocaleDateString(S.lang==='uz'?'uz-UZ':'ru-RU',{day:'2-digit',month:'long',year:'numeric'})});
const eAmt=e=>{const k=e.cur||'UZS';return fmt(e.amount,k)+(k!==S.cur?` (≈ ${fmt(cv(e.amount,k))})`:'')};
function drawReceipt(){
  const{c,d}=rd(),L=(a,b,k='')=>`<div class="l ${k}"><span>${a}</span><span>${b}</span></div>`;
  $('#paper').innerHTML=`<h4>Split</h4><div class="d">${d}</div><hr>${L(t('total'),fmt(c.total),'tot')}${L(`${t('each')} (${c.n} ${t('pers')})`,fmt(c.share))}<hr><div class="th">${t('rT')}</div>${S.exp.map(e=>L(esc(e.title)+' · '+esc(pn(e.payer)),fmt(e.amount,e.cur||'UZS'))+(e.note?`<div class="nt">↳ ${esc(e.note)}</div>`:'')).join('')}<hr><div class="th">${t('rP')}</div>${c.tx.map(x=>L(esc(pn(x.from))+' → '+esc(pn(x.to)),fmt(x.amt))).join('')||`<div>✓ ${t('settled')}</div>`}<hr><div class="ty">✦ ${t('thanks')} ✦</div>`;
}
$('#copy').onclick=async()=>{
  const{c,d}=rd(),b='━━━━━━━━━━━━━━';
  const s=`🧾 SPLIT · ${d}\n${b}\n💰 ${t('total')}: ${fmt(c.total)}\n👥 ${c.n} ${t('pers')} · ${t('each').toLowerCase()}: ${fmt(c.share)}\n${b}\n${S.exp.map(e=>`• ${e.title} — ${eAmt(e)} (${pn(e.payer)})${e.note?'\n   ↳ '+e.note:''}`).join('\n')}\n${b}\n${c.tx.length?c.tx.map(x=>`✅ ${pn(x.from)} → ${pn(x.to)}: ${fmt(x.amt)}`).join('\n'):'✅ '+t('settled')}\n${b}\n✦ ${t('thanks')}`;
  try{await navigator.clipboard.writeText(s)}catch(e){const a=document.createElement('textarea');a.value=s;document.body.appendChild(a);a.select();document.execCommand('copy');a.remove()}
  toast(t('copied'));
};
$('#png').onclick=()=>{
  const{c,d}=rd(),W=720,Pd=52,sc=2;
  const R=[['h'],['d',d],['hr'],['r',t('total'),fmt(c.total),1],['r',`${t('each')} (${c.n} ${t('pers')})`,fmt(c.share)],['hr'],['s',t('rT')]];
  S.exp.forEach(e=>{R.push(['r',e.title+' · '+pn(e.payer),fmt(e.amount,e.cur||'UZS')]);if(e.note)R.push(['n','↳ '+e.note])});
  R.push(['hr'],['s',t('rP')]);
  if(c.tx.length)c.tx.forEach(x=>R.push(['r',pn(x.from)+' → '+pn(x.to),fmt(x.amt),2]));else R.push(['r','✓ '+t('settled'),'']);
  R.push(['hr'],['d','✦ '+t('thanks')+' ✦']);
  const hh=r=>r[0]==='h'?84:r[0]==='hr'?30:r[0]==='n'?30:44;
  const H=R.reduce((a,r)=>a+hh(r),Pd*2);
  const cvs=document.createElement('canvas');cvs.width=W*sc;cvs.height=H*sc;
  const x=cvs.getContext('2d');x.scale(sc,sc);
  const g=x.createLinearGradient(0,0,W,H);g.addColorStop(0,'#2c1b4d');g.addColorStop(1,'#1a0f2e');x.fillStyle=g;x.fillRect(0,0,W,H);
  const o=(cx,cy,r,k)=>{const q=x.createRadialGradient(cx,cy,0,cx,cy,r);q.addColorStop(0,k);q.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=q;x.fillRect(0,0,W,H)};
  o(60,40,340,'rgba(139,92,246,.4)');o(W,H,360,'rgba(255,77,141,.32)');
  const mono='500 21px "DM Mono",ui-monospace,Menlo,monospace';
  const fit=(s,m)=>{while(x.measureText(s).width>m&&s.length>3)s=s.slice(0,-2);return s};
  let y=Pd;
  R.forEach(r=>{
    if(r[0]==='h'){const q=x.createLinearGradient(W/2-80,0,W/2+80,0);q.addColorStop(0,'#d9c7ff');q.addColorStop(1,'#ff4d8d');x.fillStyle=q;x.font='800 48px Sora,system-ui,sans-serif';x.textAlign='center';x.fillText('Split',W/2,y+40)}
    else if(r[0]==='d'){x.fillStyle='#a597c2';x.font='500 19px "DM Mono",monospace';x.textAlign='center';x.fillText(r[1],W/2,y+22)}
    else if(r[0]==='hr'){x.setLineDash([8,7]);x.strokeStyle='rgba(255,255,255,.3)';x.lineWidth=1.5;x.beginPath();x.moveTo(Pd,y+14);x.lineTo(W-Pd,y+14);x.stroke();x.setLineDash([])}
    else if(r[0]==='s'){x.fillStyle='#ff4d8d';x.font='600 19px Sora,sans-serif';x.textAlign='left';x.fillText(r[1],Pd,y+24)}
    else if(r[0]==='n'){x.fillStyle='#a597c2';x.font='400 16px Sora,sans-serif';x.textAlign='left';x.fillText(fit(r[1],W-Pd*2),Pd+12,y+14)}
    else{x.font=r[3]===1?'500 25px "DM Mono",monospace':mono;x.fillStyle=r[3]===2?'#ff9fc2':'#f6f0ff';
      x.textAlign='right';x.fillText(r[2],W-Pd,y+26);const w=x.measureText(r[2]).width;
      x.textAlign='left';x.fillText(fit(r[1],W-Pd*2-w-20),Pd,y+26)}
    y+=hh(r);
  });
  cvs.toBlob(b=>{const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='split-chek.png';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),3000);toast(t('saved'))},'image/png');
};

