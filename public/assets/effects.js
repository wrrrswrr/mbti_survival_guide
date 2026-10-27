'use strict';
const motionAllowed=()=>!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function animateQuestion(){
 if(!motionAllowed())return;
 ['category','q-icon','question','q-sub','options'].forEach((id,i)=>{
  const el=document.getElementById(id);el.getAnimations().forEach(a=>a.cancel());
  el.animate([{opacity:0,translate:'0 12px'},{opacity:1,translate:'0 0'}],{duration:340,delay:i*35,easing:'cubic-bezier(.2,.8,.2,1)',fill:'backwards'});
 });
}
function celebrateResult(){
 if(!motionAllowed())return;
 document.querySelector('.confetti-layer')?.remove();
 const layer=document.createElement('div');layer.className='confetti-layer';layer.setAttribute('aria-hidden','true');document.body.appendChild(layer);
 const colors=['#c7b3ec','#fae887','#b6d9ee','#c1dcc4'];
 for(let i=0;i<36;i++){
  const piece=document.createElement('i');piece.className='confetti-piece';piece.style.background=colors[i%4];if(i%3===0)piece.style.borderRadius='50%';layer.appendChild(piece);
  const x=(i%2?1:-1)*(30+(i*37)%240),y=-80-(i*23)%180,rotation=(i*127)%720;
  piece.animate([{transform:'translate(-50%,0) rotate(0)',opacity:0},{transform:`translate(${x*.5}px,${y}px) rotate(${rotation/2}deg)`,opacity:1,offset:.3},{transform:`translate(${x}px,${Math.min(innerHeight,900)}px) rotate(${rotation}deg)`,opacity:0}],{duration:1900+(i%5)*140,delay:(i%4)*35,easing:'cubic-bezier(.2,.6,.5,1)',fill:'both'});
 }
 setTimeout(()=>layer.remove(),2900);
}
document.addEventListener('click',event=>{
 const button=event.target.closest('button');if(!button||button.disabled||!motionAllowed())return;
 if(button.classList.contains('option')){
  const wave=document.createElement('span');wave.className='tap-wave';wave.setAttribute('aria-hidden','true');const box=button.getBoundingClientRect();wave.style.left=(event.detail?event.clientX-box.left:box.width/2)+'px';wave.style.top=(event.detail?event.clientY-box.top:box.height/2)+'px';button.appendChild(wave);setTimeout(()=>wave.remove(),700);
 }
});
const ticker=document.querySelector('.marquee');
if(ticker){const phrase=ticker.textContent.trim();ticker.setAttribute('aria-label',phrase);ticker.textContent='';const track=document.createElement('div');track.className='marquee-track';track.setAttribute('aria-hidden','true');for(let i=0;i<2;i++){const span=document.createElement('span');span.textContent=phrase;track.appendChild(span)}ticker.appendChild(track)}
const hero=document.querySelector('.hero-art');if(hero){for(let i=1;i<=3;i++){const shape=document.createElement('i');shape.className='hero-decoration d'+i;hero.appendChild(shape)}}
