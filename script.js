/* =======================================================================
   SPARROW V3 – KONFIGURATION
   discordInviteUrl = Dein Server-Einladungslink (https://discord.gg/...)
   Produkte: Beispielprodukte ersetzen oder löschen. Kein Verkauf vor Einrichtung.
   checkoutUrl = vollständiger, selbst eingerichteter Stripe-Payment-Link,
                 PayPal-Zahlungslink oder ein anderer vertrauenswürdiger Checkout.
   WICHTIG: Niemals API-Keys oder Passwörter in diese Datei schreiben.
   ======================================================================= */
const SPARROW_CONFIG = {
  discordInviteUrl: 'https://discord.gg/QxR2uwTGT',
  products: [
    { name: 'Community-Pakete', category: 'Pakete', description: 'Beispiel-Kategorie. Details zu künftigen Paketen werden hier veröffentlicht.', price: 'In Planung', checkoutUrl: '' },
    { name: 'Bot-Konfiguration', category: 'Services', description: 'Beispiel-Kategorie für mögliche Dienstleistungen. Leistungen noch nicht festgelegt.', price: 'Auf Anfrage', checkoutUrl: '' },
    { name: 'Digitale Extras', category: 'Extras', description: 'Platzhalter für zukünftige digitale Produkte. Noch kein Verkaufsangebot.', price: 'In Planung', checkoutUrl: '' }
  ]
};

const isDiscordUrl = url => { try { const u = new URL(url); return u.protocol === 'https:' && ['discord.gg','discord.com','www.discord.com','discordapp.com'].includes(u.hostname); } catch { return false; } };
const isCheckoutUrl = url => { try {const u = new URL(url);return u.protocol === 'https:' && ['buy.stripe.com','checkout.stripe.com','paypal.me','www.paypal.com','paypal.com'].includes(u.hostname);} catch {return false;} };
const hint = document.getElementById('link-hint');
const invite = SPARROW_CONFIG.discordInviteUrl;
document.querySelectorAll('.discord-action, #discord-link').forEach(link => {
  if (isDiscordUrl(invite)) { link.href = invite;link.target = '_blank';link.rel = 'noopener noreferrer'; }
  else { link.href = '#join'; link.addEventListener('click', () => {if(hint)hint.textContent='Discord-Link fehlt noch. Öffne script.js und setze discordInviteUrl.'; }); }
});
if (isDiscordUrl(invite) && hint) hint.textContent = 'Du wirst über den offiziellen Discord-Einladungslink weitergeleitet. Der Beitritt wird in Discord bestätigt.';

const grid = document.getElementById('product-grid');
const categories = document.getElementById('category-bar');
const notice = document.getElementById('store-notice');
const products = SPARROW_CONFIG.products;
const availableCategories = ['Alle', ...new Set(products.map(item=>item.category))];
let selectedCategory = 'Alle';
function drawProducts(){
  categories.replaceChildren(); grid.replaceChildren();
  for(const category of availableCategories){
    const btn=document.createElement('button'); btn.type='button'; btn.className='category-button';btn.textContent=category;
    btn.setAttribute('aria-pressed', String(category===selectedCategory));
    btn.addEventListener('click',()=>{selectedCategory=category;drawProducts();});categories.append(btn);
  }
  const visible=products.filter(item=>selectedCategory==='Alle'||item.category===selectedCategory);
  notice.textContent=products.length===0?'Noch keine Produkte verfügbar.':'Vorschau-Kategorien: Noch keine Produkte oder Zahlungslinks freigeschaltet. Kaufbuttons bleiben bis zur Einrichtung deaktiviert.';
  for(const item of visible){
    const article=document.createElement('article');article.className='product-card';
    const tag=document.createElement('span');tag.className='product-tag';tag.textContent=item.category;
    const title=document.createElement('h3');title.textContent=item.name;
    const desc=document.createElement('p');desc.textContent=item.description;
    const bottom=document.createElement('div');bottom.className='product-bottom';
    const price=document.createElement('span');price.className='product-price';price.textContent=item.price;
    const action=document.createElement('a');action.className='buy-button';action.textContent=isCheckoutUrl(item.checkoutUrl)?'Bezahlen ↗':'Bald verfügbar';
    if(isCheckoutUrl(item.checkoutUrl)){action.href=item.checkoutUrl;action.target='_blank';action.rel='noopener noreferrer';}
    else {action.removeAttribute('href');action.setAttribute('aria-disabled','true');action.style.opacity='.55';action.style.cursor='not-allowed';}
    bottom.append(price,action);article.append(tag,title,desc,bottom);grid.append(article);
  }
}
drawProducts();
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
