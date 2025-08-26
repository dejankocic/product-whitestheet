
const MicroCharts = (()=>{
  function clear(ctx,w,h){ ctx.clearRect(0,0,w,h); }
  function extent(a){ let mn=Infinity,mx=-Infinity; for(const x of a){ if(x<mn) mn=x; if(x>mx) mx=x; } return [mn,mx]; }
  function lerp(a,b,t){ return a + (b-a)*t; }
  function col(i){ return ['#93c5fd','#a7f3d0','#fcd34d','#fca5a5','#c4b5fd'][i%5]; }
  function axis(ctx,x0,y0,x1,y1,c='rgba(148,163,184,.6)'){ ctx.strokeStyle=c; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(x0,y0); ctx.LineTo?ctx.LineTo(x1,y1):(ctx.lineTo(x1,y1)); ctx.stroke(); }
  function text(ctx,s,x,y,c='rgba(148,163,184,.9)',a='center'){ ctx.fillStyle=c; ctx.textAlign=a; ctx.textBaseline='middle'; ctx.font='12px ui-sans-serif,system-ui,Segoe UI,Roboto,Arial'; ctx.fillText(String(s),x,y); }
  function ensureSize(canvas){
    const w = canvas.clientWidth || (canvas.parentNode && canvas.parentNode.clientWidth) || 800;
    const h = canvas.clientHeight || 260;
    canvas.width = w; canvas.height = h;
    return {w,h};
  }
  function drawLine(ctx,pts,stroke,fill){
    ctx.beginPath(); for(let i=0;i<pts.length;i++){ const [x,y]=pts[i]; if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y); }
    ctx.strokeStyle=stroke; ctx.lineWidth=2; ctx.stroke();
    if(fill){ const last=pts[pts.length-1], first=pts[0]; ctx.lineTo(last[0], ctx.canvas.height-28); ctx.lineTo(first[0], ctx.canvas.height-28); ctx.closePath(); ctx.fillStyle=fill; ctx.globalAlpha=.18; ctx.fill(); ctx.globalAlpha=1; }
  }
  function line(canvas,data){
    const ctx=canvas.getContext('2d'); const {w,h}=ensureSize(canvas); clear(ctx,w,h);
    const L=40,R=16,T=12,B=28; const all=[]; data.series.forEach(s=>s.data.forEach(v=>all.push(v)));
    let [yMin,yMax]=extent(all); if(yMin===yMax){yMin=0; yMax=yMax||1;}
    const xs=(w-L-R)/Math.max(1,data.labels.length-1);
    axis(ctx,L,h-B,w-R,h-B); axis(ctx,L,T,L,h-B);
    for(let i=0;i<=4;i++){ const t=i/4,y=T+(1-t)*(h-T-B); axis(ctx,L,y,w-R,y,'rgba(148,163,184,.15)'); text(ctx,Math.round(lerp(yMin,yMax,t)),L-6,y,'rgba(148,163,184,.9)','right'); }
    const maxX=8, step=Math.ceil(data.labels.length/maxX); for(let i=0;i<data.labels.length;i+=step){ const x=L+i*xs; text(ctx,data.labels[i],x,h-B+12); }
    data.series.forEach((s,i)=>{ const pts=s.data.map((v,j)=>{ const t=(v-yMin)/(yMax-yMin); const x=L+j*xs; const y=T+(1-t)*(h-T-B); return [x,y]; });
      drawLine(ctx,pts,col(i),s.fill?col(i):null); });
  }
  function bar(canvas,data){
    const ctx=canvas.getContext('2d'); const {w,h}=ensureSize(canvas); clear(ctx,w,h);
    const L=40,R=16,T=12,B=28; const vals=data.series[0].data.slice(); let [yMin,yMax]=extent(vals); if(yMin>0) yMin=0;
    const n=vals.length,gap=8,plotW=(w-L-R),barW=Math.max(6,(plotW-(n-1)*gap)/n);
    axis(ctx,L,h-B,w-R,h-B); axis(ctx,L,T,L,h-B);
    for(let i=0;i<=4;i++){ const t=i/4,y=T+(1-t)*(h-T-B); axis(ctx,L,y,w-R,y,'rgba(148,163,184,.15)'); text(ctx,Math.round(lerp(yMin,yMax,t)),L-6,y,'rgba(148,163,184,.9)','right'); }
    vals.forEach((v,i)=>{ const x=L+i*(barW+gap); const t=(v-yMin)/(yMax-yMin); const y=T+(1-t)*(h-T-B); const y0=T+(1-(0-yMin)/(yMax-yMin))*(h-T-B);
      ctx.fillStyle='#93c5fd'; ctx.fillRect(x,Math.min(y,y0),barW,Math.abs(y0-y)); if(data.labels) text(ctx,data.labels[i],x+barW/2,h-B+12,'rgba(148,163,184,.9)','center'); });
  }
  return { line, bar };
})();
