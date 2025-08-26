
document.addEventListener('DOMContentLoaded', ()=>{
  function gen(n){const L=[],lo=[],me=[],hi=[],rk=[];let b=300;for(let i=0;i<n;i++){L.push(String(i+1));
    const lv=Math.round(b+Math.sin(i/2)*20+(Math.random()*10));
    const mv=Math.round(60+Math.cos(i/3)*8+(Math.random()*6));
    const hv=Math.round(3+(i%12===0?3:0)+(Math.random()*2));
    lo.push(lv); me.push(mv); hi.push(hv);
    rk.push(Math.min(95,Math.max(25,40+mv*0.4+hv*4+(Math.random()*6-3)))); b+=(Math.random()*8-4);} return {L,lo,me,hi,rk}}
  const d=gen(24);
  MicroCharts.line(document.getElementById('chartVolume'), {labels:d.L, series:[{name:'Low',data:d.lo,fill:true},{name:'Medium',data:d.me,fill:true},{name:'High',data:d.hi,fill:true}]});
  const types=[['SQLi',.32],['CredStuff',.22],['Botnet',.28],['Exploit',.12],['Other',.06]];
  MicroCharts.bar(document.getElementById('chartTypes'), {labels:types.map(t=>t[0]), series:[{name:'Share', data:types.map(t=>Math.round(t[1]*100))}]});
  MicroCharts.line(document.getElementById('chartRisk'), {labels:d.L, series:[{name:'Risk', data:d.rk, fill:true}]});
  const origins=[['China',1519,12],['United States',1491,5],['Serbia',1233,-7],['Germany',840,3],['Czech Republic',654,1]];
  MicroCharts.bar(document.getElementById('chartOrigins'), {labels:origins.map(o=>o[0]), series:[{name:'Count', data:origins.map(o=>o[1])}]});
  ['CN','US','RS','DE','CZ'].forEach((c,i)=>{const el=document.getElementById('chg'+c); if(el){ const dlt=origins[i][2]; el.textContent=(dlt>=0?'+':'')+dlt+'%'; el.style.color=dlt>=0?'#86efac':'#fca5a5'; }});
  const avg=Math.round(d.rk.reduce((a,b)=>a+b,0)/d.rk.length), riskBar=document.getElementById('riskBar');
  document.getElementById('kpiRisk').textContent=avg; riskBar.style.width=avg+'%'; riskBar.style.background=avg>=71?'#ef4444':(avg>=51?'#f59e0b':'#22c55e');
  document.getElementById('kpiRiskDelta').textContent=(avg-61>=0?'+':'')+(avg-61)+' vs prev. period';
  const vol=d.lo.reduce((a,b)=>a+b,0)+d.me.reduce((a,b)=>a+b,0)+d.hi.reduce((a,b)=>a+b,0);
  const severe=((d.hi.reduce((a,b)=>a+b,0)/Math.max(1,vol))*100).toFixed(2);
  const dir=d.rk.at(-1)>=d.rk[0]?'up':'down';
  document.getElementById('ai_summary_trends').textContent=`In the last 24h, total volume is ${vol.toLocaleString()} with high-severity at ${severe}%. Risk is ${dir} from ${Math.round(d.rk[0])} to ${Math.round(d.rk.at(-1))}.`;
});
