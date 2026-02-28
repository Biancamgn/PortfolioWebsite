// ═══ SPIDER WEB CANVAS ═══
(function(){
    const c=document.getElementById('spiderCanvas'),ctx=c.getContext('2d');
    let w,h,pts=[],mouse={x:null,y:null};
    const N=90,CD=150,MD=180;
    function resize(){w=c.width=window.innerWidth;h=c.height=document.documentElement.scrollHeight}
    window.addEventListener('resize',resize);
    setInterval(()=>{if(c.height!==document.documentElement.scrollHeight)resize()},2000);
    function init(){pts=[];for(let i=0;i<N;i++)pts.push({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,r:Math.random()*2+1})}
    window.addEventListener('mousemove',e=>{mouse.x=e.clientX;mouse.y=e.clientY+window.scrollY});
    window.addEventListener('mouseout',()=>{mouse.x=null;mouse.y=null});
    function draw(){
      ctx.clearRect(0,0,w,h);const sy=window.scrollY;
      for(let i=0;i<pts.length;i++){
        let p=pts[i];p.x+=p.vx;p.y+=p.vy;
        if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;
        ctx.beginPath();ctx.arc(p.x,p.y-sy,p.r,0,Math.PI*2);ctx.fillStyle='rgba(212,135,77,0.35)';ctx.fill();
        for(let j=i+1;j<pts.length;j++){let q=pts[j],dx=p.x-q.x,dy=p.y-q.y,d=Math.sqrt(dx*dx+dy*dy);if(d<CD){ctx.beginPath();ctx.moveTo(p.x,p.y-sy);ctx.lineTo(q.x,q.y-sy);ctx.strokeStyle='rgba(212,135,77,'+(0.12*(1-d/CD))+')';ctx.lineWidth=.6;ctx.stroke()}}
        if(mouse.x!==null){let dx=p.x-mouse.x,dy=p.y-mouse.y,d=Math.sqrt(dx*dx+dy*dy);if(d<MD){ctx.beginPath();ctx.moveTo(p.x,p.y-sy);ctx.lineTo(mouse.x,mouse.y-sy);ctx.strokeStyle='rgba(212,135,77,'+(0.25*(1-d/MD))+')';ctx.lineWidth=.8;ctx.stroke()}}
      }
      requestAnimationFrame(draw);
    }
    resize();init();draw();
})();
  
// ═══ SCROLL REVEAL ANIMATIONS ═══
(function(){
    const obs=new IntersectionObserver(entries=>{
        entries.forEach(e=>{
        if(e.isIntersecting){
            e.target.classList.add('visible');
            e.target.querySelectorAll('.fade-up-child').forEach((ch,i)=>{
            setTimeout(()=>ch.classList.add('visible'),i*100);
            });
        }
        });
    },{threshold:0.05});
    document.querySelectorAll('.fade-up').forEach(el=>obs.observe(el));
})();

// ═══ SKILL BARS ANIMATION ═══
(function(){
    const skillObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if(e.isIntersecting) {
                e.target.querySelectorAll('.bar-fill').forEach(b => {
                    b.style.width = b.dataset.width + '%';
                });
            }
        });
    }, {threshold: 0.1});
    
    document.querySelectorAll('.skills-section').forEach(s => skillObserver.observe(s));
})();