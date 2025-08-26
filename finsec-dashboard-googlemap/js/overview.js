
document.addEventListener('DOMContentLoaded', ()=>{
  const labels = Array.from({length:12},(_,i)=>String(i*2)+':00');
  const trendSeries=[
    {name:'Payment API', data:[12,14,15,15,16,17,18,18,19,20,21,22], fill:true},
    {name:'Web app',     data:[8,8,9,9,10,10,11,11,12,12,13,13],     fill:true},
    {name:'VPN',         data:[5,5,6,6,6,7,7,7,8,8,8,9],             fill:true},
    {name:'Gateway',     data:[3,3,3,4,4,4,4,5,5,5,5,5],             fill:true},
    {name:'Mobile API',  data:[2,2,2,2,3,3,3,3,3,4,4,4],             fill:true}
  ];
  MicroCharts.line(document.getElementById('ov_trend'), {labels, series:trendSeries});
  const sources={AI:360, SIEM:260, EDR:250, User:180};
  MicroCharts.bar(document.getElementById('ov_sources'), {labels:Object.keys(sources), series:[{name:'Events', data:Object.values(sources)}]});
  const lead=trendSeries[0].data, delta=Math.round((lead.at(-1)-lead[0])/Math.max(1,lead[0])*100);
  const top=Object.entries(sources).sort((a,b)=>b[1]-a[1])[0];
  const risk=65;
  document.getElementById('ai_summary_overview').innerHTML =
    `Threat activity is trending up (+${delta}%), led by Payment API. ${top[0]} is the dominant source (${top[1]} events). `+
    (risk>70?`Risk elevated (${risk}).`:risk>50?`Risk moderate (${risk}).`:`Risk low (${risk}).`);
});
