/* SPARROW Konfiguration: Füge hier deinen eigenen Einladungslink ein. */
const SPARROW_CONFIG = {
  discordInviteUrl: '', // Beispiel: 'https://discord.gg/DEIN-CODE'
  botInviteUrl: ''      // Optional: 'https://discord.com/oauth2/authorize?...'
};

const link = document.getElementById('discord-link');
const hint = document.getElementById('link-hint');
const invite = SPARROW_CONFIG.discordInviteUrl || SPARROW_CONFIG.botInviteUrl;
if (invite && /^https:\/\/(discord\.gg|discord\.com|discordapp\.com)\//i.test(invite)) {
  link.href = invite;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.firstChild.textContent = 'JETZT BEITRETEN ';
  hint.textContent = 'Du wirst zu Discord weitergeleitet.';
} else {
  link.addEventListener('click', (event) => { event.preventDefault(); hint.textContent = 'Trage deinen Discord-Link oben in der Datei script.js unter SPARROW_CONFIG ein.'; });
}
document.getElementById('year').textContent = new Date().getFullYear();
const canvas = document.querySelector('#stars');
const ctx = canvas.getContext('2d');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let dots = [];
function resize() {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.setTransform(dpr,0,0,dpr,0,0);
  dots = Array.from({length:Math.min(80,Math.floor(w/16))},()=>({x:Math.random()*w,y:Math.random()*h,r:.4+Math.random()*1.2,alpha:.2+Math.random()*.7,speed:.07+Math.random()*.18}));
}
function paint() {
  ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
  for(const dot of dots){ctx.fillStyle=`rgba(185,141,255,${dot.alpha})`;ctx.beginPath();ctx.arc(dot.x,dot.y,dot.r,0,Math.PI*2);ctx.fill();if(!reducedMotion){dot.y-=dot.speed;if(dot.y<0)dot.y=canvas.clientHeight;}}
  if(!reducedMotion)requestAnimationFrame(paint);
}
window.addEventListener('resize',()=>{resize();if(reducedMotion)paint();});
resize();paint();
