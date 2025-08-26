
document.addEventListener('DOMContentLoaded', ()=>{
  const low=301761, med=19465, high=99;
  const pct=(high/(low+med+high)*100).toFixed(2);
  document.getElementById('ai_attack_summary').textContent =
    `Traffic is predominantly low-risk; critical events are ${pct}% of volume. Medium-priority is driven by Botnet/Scripted activity.`;
});
