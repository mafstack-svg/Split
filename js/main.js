/* Ishga tushirish */
/* USD kursi: O'zbekiston Markaziy banki (xato bo'lsa jimgina o'tkazib yuboriladi) */
fetch('https://cbu.uz/uz/arkhiv-kursov-valyut/json/USD/').then(r=>r.json()).then(j=>{const v=parseFloat(j[0].Rate);if(v>0&&!S.manual){S.rate=v;save();render()}}).catch(()=>{});
showDl();render();
