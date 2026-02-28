// ═══ LOADING SCREEN WITH LIVE CLOCK ═══
(function(){
  const screen=document.getElementById('loaderScreen');
  const welcome=document.getElementById('loaderWelcome');
  const clockWrap=document.getElementById('loaderClockWrap');
  const dateText=document.getElementById('loaderDateText');
  const enterText=document.getElementById('loaderEnter');
  const hrEl=document.getElementById('clockHr');
  const minEl=document.getElementById('clockMin');
  const secEl=document.getElementById('clockSec');
  const ampmEl=document.getElementById('clockAmpm');
  let clockInterval;

  function pad(n){return n<10?'0'+n:''+n}
  function updateClock(){
    const now=new Date();
    let h=now.getHours(),ampm=h>=12?'PM':'AM';
    h=h%12;if(h===0)h=12;
    hrEl.textContent=pad(h);
    minEl.textContent=pad(now.getMinutes());
    secEl.textContent=pad(now.getSeconds());
    ampmEl.textContent=ampm;
  }

  // Phase 1: "Welcome" fade in
  setTimeout(()=>welcome.classList.add('show'),300);

  // Phase 2: fade out welcome, show date + clock
  setTimeout(()=>{
    welcome.classList.remove('show');
    setTimeout(()=>{
      const now=new Date();
      const opts={weekday:'long',year:'numeric',month:'long',day:'numeric'};
      dateText.textContent='Today is '+now.toLocaleDateString('en-US',opts);
      updateClock();
      clockInterval=setInterval(updateClock,1000);
      clockWrap.classList.add('show');
      // Show "click to enter" after a beat
      setTimeout(()=>enterText.classList.add('show'),1200);
    },500);
  },2200);

  // Click anywhere to dismiss
  screen.addEventListener('click',dismiss);
  document.addEventListener('keydown',dismiss);
  // Auto dismiss after 8s
  setTimeout(dismiss,8000);

let dismissed=false;
  function dismiss(){
    if(dismissed)return;dismissed=true;
    clearInterval(clockInterval);
    screen.classList.add('hidden');
    
    // Add this line right here:
    document.body.classList.add('page-ready');
    
    // start typing after loader goes
    setTimeout(startTyping,600);
  }
})();

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

// ═══ TYPING EFFECT ═══
function startTyping(){
  const t="I'M BIANCA MANGANAAN",el=document.getElementById('typingBadge');
  let i=0;
  function go(){if(i<=t.length){el.textContent=t.slice(0,i);i++;setTimeout(go,80)}}
  go();
}

// ═══ ACTIVE NAV ═══
const secs=document.querySelectorAll('section[id]'),navs=document.querySelectorAll('.sidebar-nav a');
window.addEventListener('scroll',()=>{let c='';secs.forEach(s=>{if(scrollY>=s.offsetTop-200)c=s.id});navs.forEach(l=>{l.classList.remove('active');if(l.dataset.section===c)l.classList.add('active')})});

// ═══ SIDEBAR LIVE CLOCK & GREETING ═══
(function() {
  function updateSidebarClock() {
    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let ampm = h >= 12 ? 'PM' : 'AM';
    
    // Determine greeting and icon based on the hour
    let greeting = "Good Evening!";
    let icon = "bi-moon-stars"; // Default to night
    
    if (h >= 5 && h < 12) {
      greeting = "Good Morning!";
      icon = "bi-brightness-alt-high";
    } else if (h >= 12 && h < 18) {
      greeting = "Good Afternoon!";
      icon = "bi-sun";
    } else if (h >= 18 && h < 22) {
      greeting = "Good Evening!";
      icon = "bi-moon-stars";
    }

    // Convert to 12-hour format
    h = h % 12;
    if (h === 0) h = 12;
    
    // Add leading zero if needed
    function pad(n) { return n < 10 ? '0' + n : n; }
    
    // Update DOM elements
    document.getElementById('sbHr').textContent = pad(h);
    document.getElementById('sbMin').textContent = pad(m);
    document.getElementById('sbAmpm').textContent = ampm;
    document.getElementById('sidebarGreeting').innerHTML = `<i class="bi ${icon}"></i> ${greeting}`;
    
    // Update Date
    const opts = { weekday: 'long', month: 'long', day: 'numeric' };
    document.getElementById('sbDate').textContent = now.toLocaleDateString('en-US', opts);
  }

  // Run immediately, then update every second
  updateSidebarClock();
  setInterval(updateSidebarClock, 1000);
})();


// ═══ SCROLL REVEAL ═══
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

// ═══ SKILL BARS ═══
const so=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.querySelectorAll('.bar-fill').forEach(b=>{b.style.width=b.dataset.width+'%'})})},{threshold:.3});
document.querySelectorAll('.skills-section').forEach(s=>so.observe(s));

// ═══ TESTIMONIAL SLIDER ═══
(function(){const track=document.getElementById('sliderTrack'),dots=document.querySelectorAll('.slider-dot');let cur=0,tot=dots.length,auto;
function go(n){cur=n;track.style.transform='translateX(-'+cur*100+'%)';dots.forEach((d,i)=>d.classList.toggle('active',i===cur))}
dots.forEach(d=>d.addEventListener('click',()=>{go(+d.dataset.slide);clearInterval(auto);auto=setInterval(()=>go((cur+1)%tot),5000)}));
auto=setInterval(()=>go((cur+1)%tot),5000)})();

// ═══ BACK TO TOP ═══
window.addEventListener('scroll',()=>{document.getElementById('backToTop').classList.toggle('show',scrollY>400)});

// ═══ FORM ═══
const form = document.getElementById("contactForm");
const emailField = document.querySelector("input[name='email']");
const messageField = document.querySelector("textarea[name='message']");

// 1. Time-based Filtering setup
const formLoadTime = Date.now();
function isTooFast() {
  const submitTime = Date.now();
  const secondsTaken = (submitTime - formLoadTime) / 1000;
  return secondsTaken < 2;
}

// 2. Rate Limiting setup
let submitTimes = [];
function isRateLimited() {
  const now = Date.now();
  submitTimes = submitTimes.filter(time => now - time < 60000);
  if (submitTimes.length >= 3) {
    return true;
  }
  submitTimes.push(now);
  return false;
}

// 3. Spam Keyword Detection setup
const spamWords = ["free money", "buy now", "click here", "subscribe", "promo"];
function containsSpam(message) {
  const lowerMessage = message.toLowerCase();
  return spamWords.some(word => lowerMessage.includes(word));
}

if (form) {
  form.addEventListener("submit", function (e) {
    // Check 1: Basic Email Validation
    if (!emailField.value.includes("@")) {
      alert("Enter a valid email address.");
      e.preventDefault();
      return;
    }

    // Check 2: Time-based Filtering (Bot trap)
    if (isTooFast()) {
      e.preventDefault();
      alert("Submission was too fast. Please try again.");
      return;
    }

    // Check 3: Rate Limiting
    if (isRateLimited()) {
      e.preventDefault();
      alert("Too many submissions. Please wait a minute.");
      return;
    }

    // Check 4: Spam Keyword Detection
    if (containsSpam(messageField.value)) {
      e.preventDefault();
      alert("Your message contains blocked spam keywords.");
      return;
    }

    // If all checks pass, the form will naturally submit to FormSubmit.co
  });
}