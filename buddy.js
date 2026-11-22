/* ==================================================================
   MY BUDDY: the little fighter who lives on every page.
   Why one file: every page loads buddy.js with one line,
   <script src="buddy.js"></script>, so the buddy works the same
   everywhere and you only fix him in one place.
   Why it's wrapped in (function(){ ... })(): the game page has its
   own code with short names like $ and COLORS. The wrapper keeps the
   buddy's names private so the two never clash.
   What he does: busts out of the screen the first time you move the
   mouse, follows your cursor with his eyes, drag him anywhere, drop
   him on a side (leans) or the top (hangs), click him for emotes,
   press-and-hold to charge an energy beam, drop him on the
   running man's line at the bottom and they race, and after 5 idle minutes
   his gaming chair appears. "Find my buddy" (bottom-left) brings
   him back. He remembers where you left him as you change pages.
   ================================================================== */
(function () {
if (window.__buddy) return; window.__buddy = true;

// sessionStorage = remembered only for this visit. Wrapped in try/catch
// because some browsers (private mode) block it; the buddy still works.
function store(k, v) { try { if (v === undefined) return sessionStorage.getItem('buddy-' + k); sessionStorage.setItem('buddy-' + k, v); } catch (e) { return null; } }

// His styles are added from here so pages only need the one script line.
const style = document.createElement('style');
style.textContent = `.bd-pagewrap{position:fixed;inset:0;overflow:hidden;z-index:90;transform-origin:0 50%;box-shadow:0 0 50px rgba(0,0,0,.7);will-change:transform}
.bd-pageshade{position:absolute;inset:0;pointer-events:none;background:linear-gradient(90deg,rgba(0,0,0,0) 35%,rgba(0,0,0,.6));opacity:0}
.bd-pageunder{position:fixed;inset:0;z-index:89;display:grid;place-items:center;font-family:"Press Start 2P",monospace;font-size:clamp(16px,4vw,34px);color:#e8b64a;text-align:center;padding:16px;pointer-events:none}
.bd-arrive{position:fixed;inset:0;z-index:89;pointer-events:none;background:linear-gradient(90deg,rgba(0,0,0,.6),rgba(0,0,0,0) 65%);transition:opacity .6s}
.bd-buddy{position:fixed;width:120px;height:132px;z-index:100;cursor:grab;touch-action:none;transition:transform .18s}
.bd-buddy.dragging{cursor:grabbing;transition:none}
.bd-buddy canvas{width:120px;height:132px;image-rendering:pixelated;display:block;filter:drop-shadow(0 6px 6px rgba(0,0,0,.5))}
.bd-buddy .bd-bub{position:absolute;bottom:100%;left:50%;transform:translateX(-50%) translateY(4px);background:#fff;color:#07051a;font-family:"Press Start 2P",monospace;font-size:9px;padding:6px 8px;border-radius:9px;border:3px solid #07051a;white-space:nowrap;opacity:0;transition:all .18s;pointer-events:none}
.bd-buddy .bd-bub.show{opacity:1;transform:translateX(-50%)}
.bd-menu{position:absolute;inset:0;pointer-events:none}
.bd-menu button{position:absolute;width:44px;height:44px;border-radius:50%;border:3px solid #07051a;background:#1c1846;color:#fff;font-size:20px;cursor:pointer;box-shadow:0 0 12px -2px #00e5ff,0 3px 0 #07051a;opacity:0;transform:scale(.3);transition:all .18s;pointer-events:none}
.bd-menu.open button{opacity:1;transform:scale(1);pointer-events:auto}
.bd-menu button:hover{background:#00b8d4}
.bd-menu button.sub{background:#4a1170;box-shadow:0 0 12px -2px #ff2bd6,0 3px 0 #07051a}
.bd-menu button span{position:absolute;top:100%;left:50%;transform:translateX(-50%);font:700 11px Nunito,sans-serif;color:#fff;text-shadow:0 1px 2px #000;white-space:nowrap;margin-top:2px}
.bd-crater{position:fixed;width:270px;height:270px;image-rendering:pixelated;pointer-events:none;z-index:97}
.bd-crack{position:fixed;pointer-events:none;z-index:99}
.bd-buddy canvas.chair{position:absolute;left:-30px;top:27px;width:173px;height:125px;image-rendering:pixelated;z-index:-1;filter:drop-shadow(0 6px 6px rgba(0,0,0,.5))}
.bd-buddy{isolation:isolate}
.bd-find{position:fixed;left:12px;bottom:12px;z-index:101;font:700 14px Nunito,system-ui,sans-serif;color:#07051a;background:linear-gradient(180deg,#5dffa6,#1fbf68);border:2px solid #07051a;border-radius:12px;padding:8px 12px;cursor:pointer;box-shadow:0 4px 0 #07051a}
.bd-find:active{transform:translateY(3px);box-shadow:0 1px 0 #07051a}
.bd-puff{position:fixed;width:144px;height:144px;image-rendering:pixelated;pointer-events:none;z-index:102}

.bd-beamfx{position:fixed;inset:0;pointer-events:none;z-index:98}
.bd-meter{position:absolute;left:14px;right:14px;bottom:-12px;height:8px;border:2px solid #07051a;border-radius:6px;background:#1c1846;opacity:0;transition:opacity .15s}
.bd-meter.on{opacity:1}.bd-meter i{display:block;height:100%;width:0;background:linear-gradient(90deg,#00e5ff,#ffd23f);border-radius:3px}`;
document.head.appendChild(style);
if (!document.querySelector('link[href*="Press+Start+2P"]')) {
  const f = document.createElement('link'); f.rel = 'stylesheet';
  f.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap'; document.head.appendChild(f);
}
// The page "shakes" when he breaks out or fires. We shake the main content, not
// the whole body, because shaking the body would also move the buddy himself.
const shakeEl = document.querySelector('main') || document.createElement('div');

let frame = 0;
/* ============ palette (same original fighter) ============ */
const P={skin:'#7a4520',skinL:'#9a5a2c',skinD:'#5a3216',hair:'#151033',hairL:'#3b2f8f',band:'#ff4d8d',bandD:'#c2185b',gi:'#00b8d4',giL:'#5ff2ff',giD:'#00728a',belt:'#ffd23f',beltD:'#c99a00',pants:'#2b1f7a',pantsD:'#1c1452',boot:'#0b0820',bootL:'#2e2a5c',wrist:'#ffffff',eye:'#ffffff',pupil:'#07051a',ki:'#9df9ff',kiW:'#ffffff',aura:'#00e5ff',aura2:'#ffd23f',heart:'#ff4d8d',mouth:'#3a0d1a'};
const R=(c,x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(Math.round(x),Math.round(y),w,h)};
const reduced=(()=>{try{return matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){return false}})();
/* sprite buffer 40x44 (character ~32x40 with padding) */
function buf(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.imageSmoothingEnabled=false;return [c,x]}
const [SB,sx]=buf(40,44),[SS,ssx]=buf(40,44);
function outline(dst,x,y,scale){scale=scale||1;ssx.clearRect(0,0,40,44);ssx.drawImage(SB,0,0);ssx.globalCompositeOperation='source-in';ssx.fillStyle='#07051a';ssx.fillRect(0,0,40,44);ssx.globalCompositeOperation='source-over';
  dst.imageSmoothingEnabled=false;[[-1,0],[1,0],[0,-1],[0,1]].forEach(([dx,dy])=>dst.drawImage(SS,Math.round(x+dx*scale),Math.round(y+dy*scale),40*scale,44*scale));dst.drawImage(SB,Math.round(x),Math.round(y),40*scale,44*scale)}

/* ============ FRONT-FACING SPRITE ============
   s = {arms, legs, eyes, mouth, y (bounce), tilt (head x shift), band (tail wave)} */
function front(s,f){
  if(s.side==='lean')return sideLean(s,f);
  const c=sx;c.clearRect(0,0,40,44);
  const ox=4,oy=2+(s.y||0);            // origin inside buffer
  const L=s.legs||'stand';
  // ---- legs ----
  if(L==='sit'){R(c,ox+5,oy+30,22,5,P.pants);R(c,ox+5,oy+33,22,2,P.pantsD);R(c,ox+3,oy+33,5,3,P.boot);R(c,ox+24,oy+33,5,3,P.boot)}
  else if(L==='dangle'){const k=reduced?0:Math.round(Math.sin(f/4)*2);R(c,ox+11,oy+28,4,9+k,P.pantsD);R(c,ox+17,oy+28,4,9-k,P.pants);R(c,ox+10,oy+36+k,5,3,P.boot);R(c,ox+17,oy+36-k,5,3,P.boot)}
  else if(L==='cross'){R(c,ox+11,oy+28,4,9,P.pantsD);R(c,ox+15,oy+29,5,8,P.pants);R(c,ox+9,oy+36,6,3,P.boot);R(c,ox+15,oy+36,7,3,P.boot);R(c,ox+15,oy+36,7,1,P.bootL)}
  else if(L==='jump'){R(c,ox+10,oy+28,5,6,P.pantsD);R(c,ox+17,oy+28,5,6,P.pants);R(c,ox+9,oy+33,6,3,P.boot);R(c,ox+17,oy+33,6,3,P.boot)}
  else if(L==='seat'){R(c,ox+10,oy+31,5,4,P.pantsD);R(c,ox+17,oy+31,5,4,P.pants);R(c,ox+10,oy+31,5,1,'#3d2f9a');R(c,ox+17,oy+31,5,1,'#3d2f9a');R(c,ox+10,oy+35,4,3,P.pantsD);R(c,ox+18,oy+35,4,3,P.pants);R(c,ox+9,oy+38,5,3,P.boot);R(c,ox+18,oy+38,5,3,P.boot);R(c,ox+9,oy+38,5,1,P.bootL);R(c,ox+18,oy+38,5,1,P.bootL)}
  else if(L==='squash'){R(c,ox+10,oy+31,5,5,P.pantsD);R(c,ox+17,oy+31,5,5,P.pants);R(c,ox+8,oy+36,7,3,P.boot);R(c,ox+17,oy+36,7,3,P.boot)}
  else{R(c,ox+11,oy+28,4,9,P.pantsD);R(c,ox+17,oy+28,4,9,P.pants);R(c,ox+20,oy+28,1,9,P.pantsD);R(c,ox+10,oy+36,5,3,P.boot);R(c,ox+17,oy+36,5,3,P.boot);R(c,ox+17,oy+36,5,1,P.bootL);R(c,ox+10,oy+36,5,1,P.bootL)}
  const sq=L==='squash'?3:0, sitY=L==='sit'?2:L==='seat'?3:0;
  const ty=oy+18+sq+sitY;
  // ---- torso (gi) ----
  R(c,ox+9,ty,14,11,P.gi);R(c,ox+9,ty,2,11,P.giD);R(c,ox+21,ty,2,11,P.giL);
  R(c,ox+14,ty,4,1,P.skinD);R(c,ox+15,ty+1,2,3,P.skinD);R(c,ox+13,ty,1,4,P.giD);R(c,ox+18,ty,1,4,P.giD); // V collar
  R(c,ox+9,ty+8,14,2,P.belt);R(c,ox+9,ty+9,14,1,P.beltD);R(c,ox+15,ty+8,2,2,P.beltD);R(c,ox+14,ty+10,1,3,P.belt);R(c,ox+17,ty+10,1,3,P.belt); // belt + knot tails
  // ---- head ----
  const hx=ox+11+(s.tilt||0),hy=oy+7+sq+sitY;
  R(c,hx,hy,10,10,P.skin);R(c,hx,hy+7,10,3,P.skinL);R(c,hx-1,hy+4,1,3,P.skin);R(c,hx+10,hy+4,1,3,P.skin); // ears
  // eyes
  const E=s.eyes||'open',blink=(!reduced&&E==='open'&&f%150<5);
  const eye=(x,look)=>{R(c,x,hy+4,2,3,P.eye);R(c,x+look,hy+5,1,2,P.pupil)};
  if(blink||E==='closed'){R(c,hx+2,hy+5,3,1,P.pupil);R(c,hx+6,hy+5,3,1,P.pupil)}
  else if(E==='happy'){R(c,hx+2,hy+5,1,1,P.pupil);R(c,hx+3,hy+4,1,1,P.pupil);R(c,hx+4,hy+5,1,1,P.pupil);R(c,hx+6,hy+5,1,1,P.pupil);R(c,hx+7,hy+4,1,1,P.pupil);R(c,hx+8,hy+5,1,1,P.pupil)}
  else if(E==='sleepy'){R(c,hx+2,hy+5,3,2,P.eye);R(c,hx+6,hy+5,3,2,P.eye);R(c,hx+2,hy+4,3,2,P.skin);R(c,hx+6,hy+4,3,2,P.skin);R(c,hx+3,hy+6,1,1,P.pupil);R(c,hx+7,hy+6,1,1,P.pupil)}
  else if(E==='focus'){R(c,hx+2,hy+4,3,2,P.eye);R(c,hx+6,hy+4,3,2,P.eye);R(c,hx+3,hy+4,1,2,P.pupil);R(c,hx+7,hy+4,1,2,P.pupil)}
  else if(E==='wide'){R(c,hx+2,hy+3,3,4,P.eye);R(c,hx+6,hy+3,3,4,P.eye);R(c,hx+3,hy+4,1,2,P.pupil);R(c,hx+7,hy+4,1,2,P.pupil)}
  else if(s.gaze&&E==='open'){const g=s.gaze;[hx+2,hx+6].forEach(x=>{R(c,x,hy+4,3,3,P.eye);R(c,x+g.x,hy+4+g.y,1,2,P.pupil)})}
  else{const lk=E==='left'?0:E==='right'?1:(s.look!=null?s.look:1);eye(hx+2,lk);eye(hx+6,lk)}
  // brows
  if(E==='focus'){R(c,hx+2,hy+2,1,1,P.hair);R(c,hx+3,hy+3,2,1,P.hair);R(c,hx+8,hy+2,1,1,P.hair);R(c,hx+6,hy+3,2,1,P.hair)}
  else if(E==='wide'){R(c,hx+2,hy+1,3,1,P.hair);R(c,hx+6,hy+1,3,1,P.hair)}else{R(c,hx+2,hy+3,3,1,P.hair);R(c,hx+6,hy+3,3,1,P.hair)}
  // mouth
  const M=s.mouth||'smile';
  if(M==='smile'){R(c,hx+4,hy+8,3,1,P.mouth);R(c,hx+3,hy+7,1,1,P.mouth);R(c,hx+7,hy+7,1,1,P.mouth)}
  else if(M==='grin'){R(c,hx+3,hy+7,5,2,P.mouth);R(c,hx+3,hy+7,5,1,'#fff')}
  else if(M==='laugh'){R(c,hx+3,hy+7,5,3,P.mouth);R(c,hx+4,hy+9,3,1,P.band);R(c,hx+3,hy+7,5,1,'#fff')}
  else if(M==='o'){R(c,hx+4,hy+7,2,2,P.mouth)}
  else if(M==='flat'){R(c,hx+4,hy+8,3,1,P.mouth)}
  else if(M==='yawn'){R(c,hx+4,hy+7,3,3,P.mouth)}
  else if(M==='tongue'){R(c,hx+4,hy+8,3,1,P.mouth);R(c,hx+6,hy+8,2,2,P.band)}
  else if(M==='grit'){R(c,hx+3,hy+7,5,2,P.mouth);R(c,hx+3,hy+7,5,1,'#fff');R(c,hx+5,hy+7,1,2,P.mouth)}
  else if(M==='shout'){R(c,hx+3,hy+7,5,3,P.mouth);R(c,hx+4,hy+9,3,1,P.band)}
  // hair (spiky, swept, original) + headband with tails
  R(c,hx-1,hy-3,12,5,P.hair);R(c,hx-2,hy-1,2,6,P.hair);R(c,hx+10,hy-1,2,5,P.hair);
  R(c,hx,hy-5,3,2,P.hair);R(c,hx+4,hy-6,3,3,P.hair);R(c,hx+8,hy-5,3,2,P.hair);R(c,hx-2,hy-4,2,2,P.hair);R(c,hx+11,hy-3,2,2,P.hair);
  R(c,hx+4,hy-5,2,1,P.hairL);R(c,hx+1,hy-2,3,1,P.hairL);R(c,hx+7,hy-2,2,1,P.hairL);
  R(c,hx-1,hy+1,12,2,P.band);R(c,hx-1,hy+2,12,1,P.bandD);
  const wv=reduced?0:Math.round(Math.sin(f/6)*1.5)+(s.band||0);
  R(c,hx+11,hy+2+wv,3,2,P.band);R(c,hx+13,hy+3-wv,3,2,P.band);R(c,hx+15,hy+4+wv,2,1,P.bandD);
  // ---- arms ----
  const A=s.arms||'down',ay=ty;
  const fist=(x,y)=>{R(c,x,y,3,3,P.skin);R(c,x,y+2,3,1,P.skinD)};
  const hand=(x,y)=>{R(c,x,y,4,4,P.skin);R(c,x+1,y-1,1,1,P.skin);R(c,x+3,y-1,1,1,P.skin);R(c,x,y+3,4,1,P.skinD)};
  const sleeve=(x,y,w,h,dark)=>R(c,x,y,w,h,dark?P.giD:P.gi);
  if(A==='down'){sleeve(ox+6,ay+1,3,8,1);R(c,ox+6,ay+8,3,1,P.wrist);fist(ox+6,ay+9);sleeve(ox+23,ay+1,3,8);R(c,ox+23,ay+8,3,1,P.wrist);fist(ox+23,ay+9)}
  else if(A==='wave'){sleeve(ox+6,ay+1,3,8,1);fist(ox+6,ay+9);const w=reduced?0:(Math.floor(f/7)%2);sleeve(ox+23,ay-7,3,9);R(c,ox+23,ay-8,3,1,P.wrist);hand(ox+23+w,ay-12)}
  else if(A==='cheer'){sleeve(ox+5,ay-8,3,10,1);R(c,ox+5,ay-9,3,1,P.wrist);fist(ox+5,ay-12);sleeve(ox+24,ay-8,3,10);R(c,ox+24,ay-9,3,1,P.wrist);fist(ox+24,ay-12)}
  else if(A==='heart'){sleeve(ox+7,ay+1,3,5,1);sleeve(ox+22,ay+1,3,5);R(c,ox+10,ay+4,5,3,P.giD);R(c,ox+17,ay+4,5,3,P.gi);R(c,ox+13,ay+2,3,3,P.skin);R(c,ox+16,ay+2,3,3,P.skin);
    R(c,ox+13,ay-2,2,2,P.heart);R(c,ox+17,ay-2,2,2,P.heart);R(c,ox+13,ay,6,2,P.heart);R(c,ox+14,ay+2,4,1,P.heart);R(c,ox+15,ay+3,2,1,P.heart)}
  else if(A==='laugh'){sleeve(ox+7,ay+1,3,6,1);R(c,ox+9,ay+6,5,3,P.giD);fist(ox+13,ay+6);sleeve(ox+22,ay+1,3,6);R(c,ox+18,ay+6,5,3,P.gi);fist(ox+16,ay+6)}
  else if(A==='stretch'){sleeve(ox+6,ay-4,3,6,1);sleeve(ox+4,ay-11,3,8,1);R(c,ox+4,ay-12,3,1,P.wrist);hand(ox+3,ay-16);sleeve(ox+23,ay-4,3,6);sleeve(ox+25,ay-11,3,8);R(c,ox+25,ay-12,3,1,P.wrist);hand(ox+25,ay-16)}
  else if(A==='cross'){sleeve(ox+7,ay+1,3,5,1);sleeve(ox+22,ay+1,3,5);R(c,ox+8,ay+4,16,4,P.gi);R(c,ox+8,ay+7,16,1,P.giD);R(c,ox+8,ay+4,3,3,P.skin);R(c,ox+21,ay+5,3,3,P.skin)}
  else if(A==='chin'){sleeve(ox+6,ay+1,3,6,1);R(c,ox+8,ay+6,9,3,P.giD);fist(ox+16,ay+6);sleeve(ox+22,ay+1,3,5);R(c,ox+19,ay-1,3,6,P.gi);fist(ox+18,ay-3)}
  else if(A==='flail'){const w=reduced?0:Math.round(Math.sin(f/3)*2);sleeve(ox+4,ay-7+w,3,9,1);hand(ox+3,ay-11+w);sleeve(ox+25,ay-7-w,3,9);hand(ox+25,ay-11-w)}
  else if(A==='hang'){sleeve(ox+7,ay-17,3,18,1);R(c,ox+7,ay-17,3,1,P.wrist);fist(ox+7,ay-20);sleeve(ox+23,ay-17,3,18);R(c,ox+23,ay-17,3,1,P.wrist);fist(ox+23,ay-20)}
  else if(A==='press'){R(c,ox+3,ay-6,8,9,P.skin);R(c,ox+3,ay-7,2,1,P.skin);R(c,ox+6,ay-8,2,2,P.skin);R(c,ox+9,ay-7,2,1,P.skin);R(c,ox+3,ay+2,8,1,P.skinD);
    R(c,ox+21,ay-6,8,9,P.skin);R(c,ox+21,ay-7,2,1,P.skin);R(c,ox+24,ay-8,2,2,P.skin);R(c,ox+27,ay-7,2,1,P.skin);R(c,ox+21,ay+2,8,1,P.skinD)}
  else if(A==='thumbs'){sleeve(ox+6,ay+1,3,8,1);fist(ox+6,ay+9);sleeve(ox+22,ay+2,5,3);R(c,ox+26,ay,4,4,P.skin);R(c,ox+27,ay-3,2,3,P.skin)}
  else if(A==='pad'){const m=reduced?0:(s.mash?((f>>1)%2):0);sleeve(ox+7,ay+1,3,6,1);sleeve(ox+22,ay+1,3,6);R(c,ox+9,ay+5,4,3,P.giD);R(c,ox+19,ay+5,4,3,P.gi);
    R(c,ox+11,ay+4,10,5,'#24243a');R(c,ox+11,ay+4,10,1,'#3a3a5c');R(c,ox+10,ay+5,2,4,'#24243a');R(c,ox+20,ay+5,2,4,'#24243a');R(c,ox+12,ay+6,3,1,'#9a9ab8');R(c,ox+13,ay+5,1,3,'#9a9ab8');R(c,ox+18,ay+5,1,1,'#ff4d6d');R(c,ox+19,ay+6,1,1,'#4dd2ff');R(c,ox+17,ay+6,1,1,'#ffd23f');R(c,ox+18,ay+7,1,1,'#39ff8e');
    R(c,ox+12,ay+3+m,2,2,P.skin);R(c,ox+18,ay+3+(1-m),2,2,P.skin)}
  else if(A==='charge'){sleeve(ox+7,ay+1,3,6,1);sleeve(ox+22,ay+1,3,6);R(c,ox+9,ay+5,5,3,P.giD);R(c,ox+18,ay+5,5,3,P.gi);R(c,ox+13,ay+4,6,4,P.skin);R(c,ox+13,ay+7,6,1,P.skinD)}
  else if(A==='blastR'){sleeve(ox+6,ay+1,3,7,1);fist(ox+6,ay+8);R(c,ox+20,ay+1,10,3,P.gi);R(c,ox+20,ay+4,10,3,P.giD);R(c,ox+28,ay+1,2,6,P.wrist);R(c,ox+30,ay-1,4,9,P.skin);R(c,ox+33,ay,1,7,P.skinL)}
  else if(A==='meditate'){R(c,ox+7,ay+5,5,3,P.giD);R(c,ox+20,ay+5,5,3,P.gi);R(c,ox+12,ay+7,3,2,P.skin);R(c,ox+17,ay+7,3,2,P.skin)}
  if(s.glow){c.globalCompositeOperation='source-atop';c.globalAlpha=.22;c.fillStyle=s.glow;c.fillRect(0,0,40,30);c.globalAlpha=1;c.globalCompositeOperation='source-over'}
}

/* ============ SIDE LEAN (profile, back flat on the wall at the LEFT edge, facing right) ============ */
function sideLean(s,f){
  const c=sx;c.clearRect(0,0,40,44);const wx=6; // wall line x (his back touches here)
  const E=s.eyes||'open',blink=(!reduced&&E==='open'&&f%170<6);
  // back leg: knee bent, sole planted on the wall behind him
  R(c,wx+4,29,5,5,P.pantsD);R(c,wx+2,32,5,3,P.pantsD);R(c,wx,30,3,6,P.boot);R(c,wx,30,1,6,P.bootL);
  // standing leg
  R(c,wx+4,29,5,10,P.pants);R(c,wx+8,29,1,10,P.pantsD);R(c,wx+4,38,8,3,P.boot);R(c,wx+4,38,8,1,P.bootL);
  // torso: back flat against the wall
  R(c,wx,18,10,11,P.gi);R(c,wx,18,2,11,P.giD);R(c,wx+9,18,1,11,P.giL);R(c,wx+7,18,2,3,P.skinD);
  R(c,wx,26,10,2,P.belt);R(c,wx,27,10,1,P.beltD);R(c,wx+9,26,2,4,P.belt); // belt knot hangs in front
  // crossed arms (profile): forearm block across the chest
  R(c,wx+3,20,9,5,P.gi);R(c,wx+3,24,9,1,P.giD);R(c,wx+4,19,3,2,P.giD);R(c,wx+10,20,3,3,P.skin);R(c,wx+9,21,1,3,P.wrist);
  // neck + head (tilted back a touch, resting on the wall)
  R(c,wx+3,15,4,3,P.skinD);
  const hx=wx+1,hy=6;
  R(c,hx,hy,9,10,P.skin);R(c,hx+9,hy+4,1,3,P.skin);R(c,hx+2,hy+8,7,2,P.skinL); // face + nose + jaw light
  R(c,hx+2,hy+5,2,2,P.skinD); // ear
  if(blink||E==='closed'){R(c,hx+6,hy+5,2,1,P.pupil)}else{R(c,hx+6,hy+4,2,2,P.eye);R(c,hx+7,hy+4,1,2,P.pupil);R(c,hx+6,hy+4,2,1,P.skin)} // relaxed half-lid
  R(c,hx+6,hy+3,3,1,P.hair); // brow
  R(c,hx+6,hy+8,2,1,P.mouth);R(c,hx+8,hy+7,1,1,P.mouth); // smirk
  // hair: pressed flat on the wall side, spikes up and forward
  R(c,hx-1,hy-3,10,5,P.hair);R(c,hx-1,hy,3,7,P.hair);R(c,hx+1,hy-5,3,2,P.hair);R(c,hx+5,hy-5,3,3,P.hair);R(c,hx+8,hy-3,3,2,P.hair);
  R(c,hx+4,hy-4,2,1,P.hairL);R(c,hx+1,hy-2,3,1,P.hairL);
  // headband + tails drooping down the wall
  R(c,hx-1,hy+1,10,2,P.band);R(c,hx-1,hy+2,10,1,P.bandD);R(c,wx-1,hy+3,2,4,P.band);R(c,wx-1,hy+7,2,3,P.bandD);
  // wall shadow
  R(c,wx-2,4,1,38,'rgba(0,0,0,.25)');
}
/* ============ EMOTES: each returns sprite state + extras for frame f (looping length len) ============ */
const EMOTES={
  wave:{len:110,name:'Wave',say:'Hey there!',fn:(f)=>({arms:'wave',mouth:'grin',eyes:f%40<20?'open':'happy'})},
  cheer:{len:90,name:'Cheer',say:'You got this!',fn:(f)=>{const p=(f%45)/45;const up=Math.sin(p*Math.PI);return {arms:'cheer',legs:up>.15?'jump':'squash',y:-Math.round(up*7),mouth:'grin',eyes:'happy',spark:up>.6}}},
  laugh:{len:100,name:'Laugh',say:'HA HA HA!',fn:(f)=>({arms:'laugh',mouth:'laugh',eyes:'happy',y:(Math.floor(f/5)%2),ha:true})},
  heart:{len:120,name:'Heart',say:'Proud of you!',fn:(f)=>({arms:'heart',mouth:'smile',eyes:'happy',hearts:true})},
  idle:{len:160,name:'Idle',fn:(f)=>({arms:'down',mouth:'smile',y:(Math.floor(f/16)%2)})},
  look:{len:160,name:'Look around',fn:(f)=>{const k=Math.floor(f/40)%4;return {arms:'down',mouth:k===2?'o':'flat',eyes:k===0?'left':k===1?'right':k===2?'wide':'open',tilt:k===0?-1:k===1?1:0}}},
  stretch:{len:140,name:'Stretch & yawn',fn:(f)=>{const on=f%140<90;return {arms:on?'stretch':'down',mouth:on?'yawn':'smile',eyes:on?'closed':'open',y:on?-1:0}}},
  meditate:{len:160,name:'Meditate',fn:(f)=>({arms:'meditate',legs:'sit',eyes:'closed',mouth:'flat',y:-Math.round(2+Math.sin(f/12)*2),aura:true})},
  sleepy:{len:160,name:'Sleepy',fn:(f)=>{const nod=Math.floor(f/30)%2;return {arms:'down',eyes:nod?'closed':'sleepy',mouth:'flat',tilt:nod?1:0,y:nod?1:0,zzz:true}}},
  charge:{len:72,name:'Charging',fn:(f)=>({arms:'charge',eyes:'focus',mouth:'grit',orb:Math.min(1,f/72),aura:true,y:(f%6<3?0:-1)})},
  blast:{len:150,name:'Energy beam',fn:(f)=>({arms:'blastR',eyes:'focus',mouth:'shout'})},
  gaming:{len:720,name:'Gaming',fn:(f)=>{const ph=Math.floor(f/120)%6;const cols=['#4dd2ff','#ff4dd8','#39ff8e','#ffd23f','#ffffff','#a66cff'];const glow=reduced?'#4dd2ff':cols[Math.floor(f/14)%cols.length];
    if(ph===2)return {arms:'pad',legs:'seat',eyes:'wide',mouth:'o',glow,mash:true,sweat:true};
    if(ph===4)return {arms:'pad',legs:'seat',eyes:'happy',mouth:'grin',glow:'#ffffff',gg:true,y:(f%20<10?-1:0)};
    if(ph===5)return {arms:'pad',legs:'seat',eyes:'focus',mouth:'tongue',glow,mash:true};
    return {arms:'pad',legs:'seat',eyes:'focus',mouth:'grit',glow,mash:true}}},
  bored:{len:240,name:'Bored',fn:(f)=>{const k=Math.floor(f/80)%3;return k===0?{arms:'chin',eyes:'right',mouth:'flat',q:false,dots:true}:k===1?{arms:'down',eyes:'sleepy',mouth:'flat',tap:true,y:(f%16<8?0:1)}:{arms:'cross',eyes:'left',mouth:'flat',dots:true}}},
  think:{len:140,name:'Thinking',fn:(f)=>({arms:'chin',eyes:'right',mouth:'flat',q:true})},
  leanL:{len:240,name:'Lean on wall',fn:(f)=>({side:'lean',eyes:f%240<180?'open':'closed',note:f%240>150})},
  hang:{len:120,name:'Hang from top',fn:(f)=>({arms:'hang',legs:'dangle',mouth:'grin',eyes:'happy',y:Math.round(Math.sin(f/10))})},
  held:{len:60,name:'Picked up',fn:(f)=>({arms:'flail',legs:'dangle',eyes:'wide',mouth:'o',excl:true})},
  run:{len:40,name:'Racing',fn:(f)=>{const up=Math.floor(f/5)%2;return {arms:'down',legs:up?'jump':'stand',y:-up*2,eyes:'focus',mouth:'grit',runDust:true}}},
  land:{len:30,name:'Landing',fn:(f)=>({arms:'down',legs:f<12?'squash':'stand',eyes:f<12?'closed':'open',mouth:f<12?'flat':'smile',dust:f<16})}
};
function extras(c,st,f,x0,y0,sc){ // effects drawn on the destination canvas (x0,y0 = sprite top-left; sc = scale)
  const X=(v)=>x0+v*sc,Y=(v)=>y0+v*sc,Rr=(x,y,w,h,col)=>R(c,X(x),Y(y),w*sc,h*sc,col);
  if(st.hearts&&!reduced){for(let k=0;k<3;k++){const p=((f+k*40)%120)/120;const hx=12+k*8+Math.sin(p*8+k)*2,hy=14-p*16;c.globalAlpha=1-p;Rr(hx,hy,2,2,P.heart);Rr(hx+3,hy,2,2,P.heart);Rr(hx,hy+1,5,2,P.heart);Rr(hx+1,hy+3,3,1,P.heart);Rr(hx+2,hy+4,1,1,P.heart);c.globalAlpha=1}}
  if(st.zzz){c.font=(6*sc)+'px "Press Start 2P",monospace';c.fillStyle='#c9c3ff';for(let k=0;k<3;k++){const p=((f+k*50)%150)/150;c.globalAlpha=1-p;c.fillText('z',X(30+p*6+k*2),Y(10-p*14-k*3));c.globalAlpha=1}}
  if(st.ha){c.font=(5*sc)+'px "Press Start 2P",monospace';c.fillStyle='#ffd23f';if(f%20<14){c.fillText('HA',X(28),Y(8));c.fillText('HA',X(-2),Y(12))}}
  if(st.q){c.font=(8*sc)+'px "Press Start 2P",monospace';c.fillStyle='#ffd23f';c.fillText('?',X(30),Y(8+Math.round(Math.sin(f/8))))}
  if(st.excl){c.font=(8*sc)+'px "Press Start 2P",monospace';c.fillStyle='#ff4d8d';c.fillText('!',X(31),Y(9))}
  if(st.spark){Rr(4,6,2,2,'#ffd23f');Rr(34,8,2,2,'#00e5ff');Rr(6,14,1,1,'#fff');Rr(33,3,1,1,'#fff')}
  if(st.aura&&!reduced){for(let k=0;k<12;k++){const a=f*.06+k/12*6.28;Rr(19+Math.cos(a)*15,28+Math.sin(a)*6-((f+k*9)%20)*.4,1,2,k%2?P.aura:P.aura2)}}
  if(st.orb!=null){const r=1+Math.round(st.orb*4);const pul=reduced?0:(f%8<4?1:0);Rr(20-r-pul,23-r-pul,(r+pul)*2,(r+pul)*2,'rgba(0,229,255,.55)');Rr(20-r+1,23-r+1,(r-1)*2,(r-1)*2,P.ki);Rr(20-1,23-1,2,2,P.kiW);
    if(!reduced)for(let k=0;k<6;k++){const a=f*.3+k;const d=10-((f*0.4+k*3)%10);Rr(20+Math.cos(a)*d,23+Math.sin(a)*d,1,1,'#fff')}}
  if(st.note){c.font=(6*sc)+'px "Press Start 2P",monospace';c.fillStyle='#ffd23f';const p=((f-150)%90)/90;c.globalAlpha=1-p;c.fillText('\u266a',X(24+p*6),Y(10-p*10));c.globalAlpha=1}
  if(st.gg){c.font=(6*sc)+'px "Press Start 2P",monospace';c.fillStyle='#39ff8e';c.fillText('GG!',X(26),Y(8))}
  if(st.sweat&&f%30<20){Rr(30,10,2,3,'#9df9ff');Rr(31,13,1,1,'#9df9ff')}
  if(st.dots){c.font=(5*sc)+'px "Press Start 2P",monospace';c.fillStyle='#c9c3ff';c.fillText('.'.repeat(1+Math.floor(f/20)%3),X(28),Y(9))}
  if(st.runDust&&!reduced){for(let k=0;k<3;k++){const p=((f+k*7)%20)/20;c.globalAlpha=Math.max(0,1-p);Rr(10-p*10,40-p*2,3,2,'#c9bfe8');c.globalAlpha=1}}
  if(st.dust){const p=f/16;c.globalAlpha=1-p;Rr(6-p*6,41,4,2,'#c9bfe8');Rr(30+p*6,41,4,2,'#c9bfe8');c.globalAlpha=1}
}

/* gaming-chair card */
function drawChair(c,f,pop){ // 72x52 logical: cozy armchair + side table + steaming coffee
  c.clearRect(0,0,72,52);const s=pop==null?1:pop;if(s<=0)return;c.save();c.translate(30,40);c.scale(s,s);c.translate(-30,-40);
  const R2=(x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(x,y,w,h)};
  // back cushion
  R2(10,4,40,30,'#07051a');R2(11,5,38,28,'#6b2fa3');R2(13,7,34,4,'#8a4fd1');R2(13,12,2,18,'#8a4fd1');R2(45,12,2,18,'#4e1f7a');R2(29,8,2,24,'#4e1f7a');
  // seat cushion
  R2(8,30,44,10,'#07051a');R2(9,31,42,8,'#7d38bd');R2(10,31,40,2,'#a25ee0');
  // armrests
  R2(3,22,10,20,'#07051a');R2(4,23,8,18,'#5a2590');R2(4,23,8,3,'#8a4fd1');R2(47,22,10,20,'#07051a');R2(48,23,8,18,'#5a2590');R2(48,23,8,3,'#8a4fd1');
  // base + legs
  R2(6,40,48,4,'#07051a');R2(7,40,46,3,'#3a1460');R2(9,44,3,4,'#2a1a10');R2(48,44,3,4,'#2a1a10');
  // side table + coffee + snack
  R2(58,34,13,2,'#07051a');R2(59,34,11,1,'#a0703e');R2(63,36,3,12,'#6a4a28');R2(60,47,9,2,'#4a321a');
  R2(60,28,6,6,'#07051a');R2(61,29,4,4,'#f4f1ff');R2(61,29,4,1,'#5a3216');R2(65,30,2,2,'#07051a');R2(65,30,1,1,'#f4f1ff'); // mug
  if(!reduced){for(let k=0;k<3;k++){const p=((f+k*20)%60)/60;c.globalAlpha=1-p;R2(61+k+Math.round(Math.sin(p*6+k)*1),26-Math.round(p*10),1,2,'#d8d2f2');c.globalAlpha=1}}
  R2(67,31,4,3,'#07051a');R2(67,31,4,1,'#ffd23f');R2(68,30,1,1,'#ff8a3d'); // snack bowl
  c.restore();
}

/* ============ LIVE BUDDY (drag, lean, hang, click emotes, idle emotes) ============ */
const B=document.createElement('div');B.className='bd-buddy';B.innerHTML='<canvas class="chair" width="72" height="52"></canvas><div class="bd-bub"></div><canvas class="me" width="40" height="44"></canvas><div class="bd-menu"></div>';document.body.appendChild(B);
const bctx=B.querySelector('canvas.me').getContext('2d'),cctx=B.querySelector('canvas.chair').getContext('2d'),bub=B.querySelector('.bd-bub'),menu=B.querySelector('.bd-menu');
const MENU=[['wave','👋','Wave'],['cheer','🙌','Cheer'],['laugh','😂','Laugh'],['heart','💖','Heart'],['@actions','⭐','Actions']];
const ACTIONS=[['@back','↩','Back'],['gaming','🎮','Game'],['meditate','🧘','Meditate'],['stretch','🙆','Stretch'],['sleepy','😴','Nap']];
const ACT_SAY={meditate:'Finding my center…',stretch:'Stretch break!',sleepy:'Power nap… wake me up',gaming:'Game time!'};
function buildMenu(list){menu.innerHTML='';list.forEach(([k,ic,lab],i)=>{const b=document.createElement('button');b.type='button';b.innerHTML=ic+'<span>'+lab+'</span>';
  if(k[0]==='@')b.classList.add('sub');
  const a=(-170+i*(160/(list.length-1)))*Math.PI/180;b.style.left=(38+Math.cos(a)*82)+'px';b.style.top=(44+Math.sin(a)*82)+'px';
  b.onpointerdown=e=>e.stopPropagation();
  b.onclick=e=>{e.stopPropagation();poke();
    if(k==='@actions'){buildMenu(ACTIONS);return}
    if(k==='@back'){buildMenu(MENU);return}
    menu.classList.remove('open');setTimeout(()=>buildMenu(MENU),200);
    if(list===ACTIONS)doAction(k);else play(k)};
  menu.appendChild(b)})}
buildMenu(MENU);
function doAction(k){if(k==='gaming'){sitDown();return}mode='action';emote=k;ef=0;say(ACT_SAY[k])}
let idleSec=0,speed=1,chairPop=0;
const STAGES=[['Chill','idle'],['Look around & stretch','look'],['Meditate','meditate'],['Sleepy','sleepy'],['Bored','bored']];
function poke(){idleSec=0}
let mode='idle',emote='idle',ef=0,idleTimer=0,bx=innerWidth-180,by=innerHeight-200;
// PERIMETER: he can hang off an edge, but never more than a third of him,
// so part of him is always on screen and he can't get lost.
function clampToScreen(){bx=Math.max(-40,Math.min(innerWidth-80,bx));by=Math.max(-40,Math.min(innerHeight-133,by))}
function place(){clampToScreen();B.style.left=bx+'px';B.style.top=by+'px';store('pos',JSON.stringify([bx,by]))}
let bt;function say(t){if(!t)return;bub.textContent=t;bub.classList.add('show');clearTimeout(bt);bt=setTimeout(()=>bub.classList.remove('show'),1600)}
function play(k){emote=k;ef=0;mode='emote';say(EMOTES[k].say)}
function settle(){ // where did we drop him?
  poke();
  const W=innerWidth,H=innerHeight;B.style.transform='';
  const cvs=B.querySelector('canvas.me');cvs.style.transform='';
  if(onLine()){startRace();return}
  if(bx<40){bx=-12;mode='lean';emote='leanL';ef=0;say('Just chillin\'')}
  else if(bx>W-160){bx=W-108;mode='lean';emote='leanL';ef=0;cvs.style.transform='scaleX(-1)';say('Nice wall.')}
  else if(by<30){by=-30;mode='hang';emote='hang';say('Hangin\' in there!')}
  else{mode='emote';emote='land';ef=0}
  place()}
// drag
let drag=null,holdT=null,chargeF=0;
const meter=document.createElement('div');meter.className='bd-meter';meter.innerHTML='<i></i>';B.appendChild(meter);
const fx=document.createElement('canvas');fx.className='bd-beamfx';document.body.appendChild(fx);const fctx=fx.getContext('2d');
function startCharge(){if(!drag||drag.moved)return;drag.charging=true;menu.classList.remove('open');B.style.transform='';mode='charge';emote='charge';ef=0;chargeF=0;meter.classList.add('on');say('Charging…')}
function cancelCharge(){meter.classList.remove('on');meter.firstChild.style.width='0';mode='idle';emote='idle';ef=0;say('Aww, so close!')}

/* ---- RACE: drop him on the running man's line and they race ----
   Why it talks to the page through window.journeyRaceX: the running man
   belongs to legend.html, the buddy belongs to buddy.js. One shared value
   lets the buddy "steer" the man during the race without either file
   needing to know how the other one draws. */
let race=null;
function lineEl(){const j=document.querySelector('.journey');return j&&getComputedStyle(j).display!=='none'?j:null}
function onLine(){const j=lineEl();return !!j&&by+123>=innerHeight-j.offsetHeight-6} // 123 = where his feet are
function startRace(){
  const pad=window.journeyPad||24,dist=innerWidth-pad*2-(window.journeyHeroW||36);
  race={t:0,pad,dist,me:0,him:0,
    vMe:dist/(210+Math.random()*50),vHim:dist/(210+Math.random()*50), // random speeds: anyone can win
    done:false,win:false,end:0};
  by=innerHeight-133;bx=pad+18-60;place();               // feet on the line, at the start
  mode='race';ef=0;menu.classList.remove('open');say('Race you!');
  window.journeyRaceX=pad;                                // man jogs back to the start line
}
function raceStep(){
  const r=race,C=150;r.t++;
  if(r.t<C){if(r.t===40)say('3');if(r.t===75)say('2');if(r.t===110)say('1');
    return {arms:'charge',eyes:'focus',mouth:'grit',y:(r.t%20<10?0:-1)}}
  if(r.t===C)say('GO!');
  if(!r.done){
    const j=()=>0.85+Math.random()*0.3;                     // little stumbles and pushes
    r.me=Math.min(r.dist,r.me+r.vMe*j()*(Math.random()<.015?2.2:1)); // rare burst of speed
    r.him=Math.min(r.dist,r.him+r.vHim*j());
    bx=r.pad+r.me+18-60;place();window.journeyRaceX=r.pad+r.him;
    if(r.me>=r.dist||r.him>=r.dist){r.done=true;r.win=r.me>=r.him;r.end=r.t}
    return EMOTES.run.fn(r.t)}
  if(r.t-r.end<40)return {arms:r.win?'cheer':'down',eyes:r.win?'happy':'wide',mouth:r.win?'grin':'o'};
  // finished: hand the man back to your scrolling, then celebrate or ask for a rematch
  window.journeyRaceX=null;race=null;poke();mode='emote';ef=0;
  if(r.win){emote='cheer';say('I WIN!')}else{emote='think';say('Rematch?')}
  return EMOTES[emote].fn(0)}
/* ---- impact crater: blasts into the screen edge, then heals over ~10s ---- */
function crater(x,y,dir){
  const S=3,N=90;                       // logical pixels (N x N) drawn at S x scale
  const cv=document.createElement('canvas');cv.width=N;cv.height=N;cv.className='bd-crater';
  cv.style.left=(x-N*S/2)+'px';cv.style.top=(y-N*S/2)+'px';document.body.appendChild(cv);
  const c=cv.getContext('2d');c.imageSmoothingEnabled=false;const C=N/2;
  const rnd=(a,b)=>a+Math.random()*(b-a);
  // jagged cracks (pixel polylines) pointing back into the page
  const cracks=Array.from({length:9},(_,i)=>{const base=(dir>0?Math.PI:0)+(i/8-.5)*Math.PI*1.25;let px=C,py=C,a=base;const pts=[];const len=rnd(16,40);
    for(let k=0;k<len;k++){a+=rnd(-.35,.35);px+=Math.cos(a);py+=Math.sin(a);pts.push([Math.round(px),Math.round(py)]);
      if(k===Math.floor(len*.5)&&Math.random()<.6){/* branch */}}return pts});
  const debris=reduced?[]:Array.from({length:26},()=>({x:C,y:C,vx:rnd(-2.4,2.4)+(dir>0?-1.2:1.2),vy:rnd(-3,1),l:rnd(25,55),c:['#ffffff','#ffd23f','#ff8a3d','#9df9ff'][Math.floor(rnd(0,4))]}));
  const smoke=[];const embers=Array.from({length:18},()=>{const a=rnd(0,6.28),r=rnd(6,15);return [Math.round(C+Math.cos(a)*r),Math.round(C+Math.sin(a)*r*.9),rnd(0,6.28)]});
  const LIFE=reduced?300:600,HOT=60,HEAL=420;let t=0;
  const lerp=(a,b,p)=>Math.round(a+(b-a)*p);
  const mix=(c1,c2,p)=>{const h=s=>[parseInt(s.slice(1,3),16),parseInt(s.slice(3,5),16),parseInt(s.slice(5,7),16)];const a=h(c1),b=h(c2);return 'rgb('+lerp(a[0],b[0],p)+','+lerp(a[1],b[1],p)+','+lerp(a[2],b[2],p)+')'};
  const disk=(r,col,sy)=>{sy=sy||.9;for(let yy=-Math.ceil(r*sy);yy<=Math.ceil(r*sy);yy++){const w=Math.floor(Math.sqrt(Math.max(0,r*r-(yy/sy)*(yy/sy))));c.fillStyle=col;c.fillRect(C-w,C+yy,w*2+1,1)}};
  (function tick(){t++;c.clearRect(0,0,N,N);
    const heal=t>HEAL?(t-HEAL)/(LIFE-HEAL):0,size=1-heal*heal*.95;      // shrinks while it heals
    const cool=Math.min(1,t/HEAL);
    // glow halo (white -> gold -> orange -> deep red -> gone)
    const glow=t<HOT?mix('#ffffff','#ffd23f',t/HOT):cool<.45?mix('#ffd23f','#ff6a00',(cool-.1)/.35):mix('#ff6a00','#3a0a00',Math.min(1,(cool-.45)/.55));
    c.globalAlpha=(1-heal)*(t<HOT?1:.55*(1-cool*.8));disk(22*size+(t<HOT?(HOT-t)*.12:0),glow);c.globalAlpha=1;
    // scorched crater: rim -> bowl -> deep center
    c.globalAlpha=1-heal*.85;disk(19*size,'#8a78c4');disk(17*size,'#4a3478');disk(14*size,'#1c0f36');disk(10*size,'#08040f');disk(5*size,t<HOT?'#ffffff':mix('#ff8a3d','#1a0b2e',cool));
    // rim highlights
    if(size>.3){c.fillStyle='#c9bdf5';for(let k=0;k<18;k++){const a=k/18*6.28;c.fillRect(Math.round(C+Math.cos(a)*18*size),Math.round(C+Math.sin(a)*16*size),2,1)}}
    // cracks retract while healing
    const cl=1-heal;c.fillStyle=t<HOT?'#ffffff':mix('#ffe7b0','#4a3a6e',cool);
    cracks.forEach(pts=>{const n=Math.floor(pts.length*cl);for(let k=0;k<n;k++){c.fillRect(pts[k][0],pts[k][1],1,1);if(k<n*.3)c.fillRect(pts[k][0]+1,pts[k][1],1,1)}});
    c.globalAlpha=1;
    // embers flicker while hot-ish
    if(!reduced&&cool<.9){embers.forEach(e=>{if(Math.sin(t*.25+e[2])>.2){c.fillStyle=Math.sin(t*.4+e[2])>.6?'#ffd23f':'#ff6a00';c.fillRect(Math.round(C+(e[0]-C)*size),Math.round(C+(e[1]-C)*size),1,1)}})}
    // smoke wisps rise and fade
    if(!reduced&&t%5===0&&t<HEAL+60)smoke.push({x:C+rnd(-8,8)*size,y:C+rnd(-4,4),l:70,s:rnd(2,4)});
    smoke.forEach(s=>{s.y-=.35;s.x+=Math.sin((s.l+t)*.08)*.25;s.l--;c.globalAlpha=Math.max(0,s.l/70)*.5;c.fillStyle='#9a92b8';c.fillRect(Math.round(s.x),Math.round(s.y),Math.round(s.s),Math.round(s.s));c.globalAlpha=1});
    for(let i=smoke.length-1;i>=0;i--)if(smoke[i].l<=0)smoke.splice(i,1);
    // flying debris on impact
    debris.forEach(d=>{if(d.l<=0)return;d.x+=d.vx;d.y+=d.vy;d.vy+=.12;d.l--;c.fillStyle=d.c;c.fillRect(Math.round(d.x),Math.round(d.y),2,2)});
    // repair sparkles while healing
    if(heal>0&&!reduced){for(let k=0;k<6;k++){const a=t*.15+k,r=(1-heal)*16+2;if((t+k*7)%12<6){c.fillStyle=k%2?'#39ff8e':'#9df9ff';c.fillRect(Math.round(C+Math.cos(a)*r),Math.round(C+Math.sin(a)*r*.9),1+(k%2),1+(k%2))}}}
    if(t<LIFE)requestAnimationFrame(tick);else cv.remove()})();
}
function fire(){meter.classList.remove('on');meter.firstChild.style.width='0';if(drag)drag.fired=true;mode='blast';emote='blast';ef=0;
  const dir=(bx+60>innerWidth/2)?-1:1;B.querySelector('canvas.me').style.transform=dir<0?'scaleX(-1)':'';say('MEGA BLAST!');
  fx.width=innerWidth;fx.height=innerHeight;let t=0;const HOLD=reduced?40:120,FADE=30,GROW=12;
  const ox=dir>0?bx+114:bx+6,oy=by+69,end=dir>0?innerWidth:0;let cratered=false;
  (function beam(){t++;fctx.clearRect(0,0,fx.width,fx.height);const g=Math.min(1,t/GROW);if(g>=1&&!cratered){cratered=true;crater(end-dir*34,oy,dir)}const _g=g,a=t<HOLD?1:Math.max(0,1-(t-HOLD)/FADE);const x1=ox+(end-ox)*g;
    const L=Math.min(ox,x1),W=Math.abs(x1-ox),pu=reduced?0:Math.round(Math.sin(t/3)*3);fctx.globalAlpha=a;
    fctx.fillStyle='rgba(0,229,255,.28)';fctx.fillRect(L,oy-24-pu,W,48+pu*2);fctx.fillStyle='#9df9ff';fctx.fillRect(L,oy-12,W,24);fctx.fillStyle='#ffffff';fctx.fillRect(L,oy-6,W,12);
    fctx.fillStyle='#9df9ff';fctx.fillRect(ox-15,oy-21,30,42);fctx.fillStyle='#fff';fctx.fillRect(ox-9,oy-15,18,30);
    if(!reduced)for(let k=0;k<14;k++){const px=ox+dir*((t*14+k*97)%Math.max(1,W));fctx.fillStyle='#fff';fctx.fillRect(px,oy-18+((k*7)%36),9,3)}
    if(g>=1){const r=24+Math.round(Math.sin(t/2)*6);fctx.fillStyle='rgba(255,255,255,.8)';fctx.fillRect(end-(dir>0?r:0),oy-r,r,r*2)}
    if(t>HOLD){const p=(t-HOLD)/FADE;fctx.globalAlpha=(1-p)*.7;fctx.strokeStyle='#9df9ff';fctx.lineWidth=6;fctx.beginPath();fctx.arc(end,oy,30+p*140,0,6.28);fctx.stroke()}
    fctx.globalAlpha=1;if(!reduced&&t<HOLD){const sh=(t%4<2?2:-2);shakeEl.style.transform='translate('+sh+'px,'+(-sh/2)+'px)'}else shakeEl.style.transform='';
    if(t<HOLD+FADE)requestAnimationFrame(beam);else{fctx.clearRect(0,0,fx.width,fx.height);B.querySelector('canvas.me').style.transform='';mode='emote';emote='cheer';ef=0;say('Boom! Keep going!')}})()}
B.addEventListener('pointerdown',e=>{if(e.target.closest('.bd-menu button'))return;if(mode==='blast'||mode==='race'||mode==='flip')return;poke();if(mode==='chair'){standUp();return}if(mode==='action'){mode='emote';emote='wave';ef=0;say('Back to exploring!');return}drag={sx:e.clientX,sy:e.clientY,ox:bx,oy:by,moved:false,charging:false,fired:false};B.setPointerCapture(e.pointerId);clearTimeout(holdT);holdT=setTimeout(startCharge,300)});
B.addEventListener('pointermove',e=>{if(!drag||drag.fired)return;const dx=e.clientX-drag.sx,dy=e.clientY-drag.sy;if(!drag.moved&&Math.hypot(dx,dy)>5){if(drag.charging){meter.classList.remove('on');drag.charging=false}clearTimeout(holdT);drag.moved=true;B.classList.add('dragging');B.querySelector('canvas.me').style.transform='';menu.classList.remove('open');mode='held';emote='held';B.style.transform='';if(lineEl()&&!store('racehint')){store('racehint','1');say('Drop me on the line to race!')}}
  if(drag.moved){bx=Math.max(-60,Math.min(innerWidth-60,drag.ox+dx));by=Math.max(-60,Math.min(innerHeight-60,drag.oy+dy));place()}});
B.addEventListener('pointerup',e=>{if(!drag)return;clearTimeout(holdT);const d=drag;drag=null;B.classList.remove('dragging');
  if(d.fired)return;if(d.charging){cancelCharge();return}if(d.moved)settle();else{menu.classList.toggle('open')}});
document.addEventListener('pointerdown',e=>{if(!B.contains(e.target))menu.classList.remove('open')});
// entrance: waits for the cursor to move on the page, then he busts out of the screen.
// Long branching cracks spread across the glass, it shatters, then the glass SLOWLY heals (~25s).
const crack=document.createElement('canvas');crack.className='bd-crack';document.body.appendChild(crack);
function jag(x,y,a,len,step){const pts=[[x,y]];let px=x,py=y;for(let d=0;d<len;d+=step){a+=(Math.random()-.5)*.7;px+=Math.cos(a)*step;py+=Math.sin(a)*step;pts.push([px,py])}return pts}
function entrance(){
  mode='entrance';ef=0;B.style.opacity=0;
  const W=innerWidth,H=innerHeight,cx=bx+60,cy=by+66;crack.width=W;crack.height=H;crack.style.left='0px';crack.style.top='0px';
  const cc=crack.getContext('2d');
  const mains=Array.from({length:13},(_,i)=>{const a=i/13*6.28+(Math.random()-.5)*.4;return jag(cx,cy,a,180+Math.random()*360,10)});
  const branches=[];mains.forEach(m=>{for(let k=0;k<3;k++){const at=m[Math.floor(m.length*(.25+Math.random()*.6))];const a=Math.atan2(at[1]-cy,at[0]-cx)+(Math.random()<.5?-1:1)*(.5+Math.random()*.6);branches.push({from:m.indexOf(at)/m.length,pts:jag(at[0],at[1],a,40+Math.random()*120,8)})}});
  const hole=Array.from({length:14},(_,i)=>{const a=i/14*6.28;const r=46+Math.random()*30;return [cx+Math.cos(a)*r,cy+Math.sin(a)*r*.85]});
  const shards=Array.from({length:30},()=>({a:Math.random()*6.28,v:3+Math.random()*7,s:6+Math.random()*12,r:Math.random()*6,vr:(Math.random()-.5)*.3}));
  const wrap=shakeEl;
  const path=(pts,frac)=>{const n=Math.max(1,Math.floor(pts.length*frac));cc.beginPath();cc.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<n;i++)cc.lineTo(pts[i][0],pts[i][1]);cc.stroke()};
  const HIT=[0,32,64],SHATTER=100,HEAL=reduced?240:1500;let k=0;
  (function tick(){k++;cc.clearRect(0,0,W,H);
    let grow=k<SHATTER?Math.min(1,(1+HIT.filter(h=>k>=h).length-1)/3+Math.min(1,((k-HIT.filter(h=>k>=h).slice(-1)[0])/10))/3):1;
    let heal=k>SHATTER?Math.min(1,(k-SHATTER)/HEAL):0;
    const frac=grow*(1-heal), alpha=1-heal*.6;
    if(!reduced&&HIT.some(h=>k>=h&&k<h+6))wrap.style.transform='translate('+((k%2)?3:-3)+'px,0)';else wrap.style.transform='';
    // cracks (dark under-line + bright glass line)
    cc.lineJoin='round';
    [['rgba(7,5,26,.55)',4],['rgba(235,245,255,'+(.95*alpha)+')',2]].forEach(([col,w])=>{cc.strokeStyle=col;cc.lineWidth=w;
      mains.forEach(m=>path(m,frac));branches.forEach(b=>{if(frac>b.from)path(b.pts,Math.min(1,(frac-b.from)/(1-b.from)))})});
    // impact glint while pounding
    if(k<SHATTER){cc.fillStyle='rgba(255,255,255,'+(HIT.some(h=>k>=h&&k<h+8)?.9:.25)+')';cc.beginPath();cc.arc(cx,cy,10+grow*14,0,6.28);cc.fill()}
    // shattered hole that slowly shrinks and seals
    if(k>=SHATTER){const hs=1-heal;cc.globalAlpha=.85*hs;cc.fillStyle='#07051a';cc.beginPath();hole.forEach(([x,y],i)=>{const X=cx+(x-cx)*hs,Y=cy+(y-cy)*hs;i?cc.lineTo(X,Y):cc.moveTo(X,Y)});cc.closePath();cc.fill();
      cc.strokeStyle='rgba(191,249,255,'+hs+')';cc.lineWidth=2;cc.stroke();cc.globalAlpha=1;
      // flying shards right after the break
      if(k<SHATTER+60&&!reduced){const p=(k-SHATTER)/60;shards.forEach(sh=>{sh.r+=sh.vr;const r=sh.v*p*60;cc.save();cc.translate(cx+Math.cos(sh.a)*r,cy+Math.sin(sh.a)*r+p*p*120);cc.rotate(sh.r);cc.globalAlpha=1-p;cc.fillStyle='#bff9ff';cc.fillRect(-sh.s/2,-sh.s/4,sh.s,sh.s/2);cc.restore()});cc.globalAlpha=1}
      // repair sparkles crawl back along the cracks while it heals
      if(!reduced&&heal>0&&heal<1){mains.forEach((m,i)=>{const n=Math.floor(m.length*frac);if(n>1&&(k+i*5)%10<6){const [x,y]=m[n-1];cc.fillStyle=i%2?'#39ff8e':'#9df9ff';cc.fillRect(x-2,y-2,4,4)}})}}
    if(k===SHATTER){B.style.opacity=1;mode='emote';emote='cheer';ef=0;say('I\'m out!')}
    if(k<SHATTER+HEAL)requestAnimationFrame(tick);else{cc.clearRect(0,0,W,H);crack.remove()}})()}
const saved=store('pos');if(saved){try{const p=JSON.parse(saved);bx=Math.min(Math.max(-60,p[0]),innerWidth-120);by=Math.min(Math.max(-60,p[1]),innerHeight-132)}catch(e){}}
place();
if(store('seen')||!lineEl()){store('seen','1');B.style.opacity=1;mode='idle';crack.remove()}else{B.style.opacity=0;mode='waiting';store('seen','1');
// trigger: the first time the cursor moves on the page (or a tap on touch screens)
(function arm(){const go=()=>{removeEventListener('pointermove',go);removeEventListener('pointerdown',go);if(reduced){B.style.opacity=1;mode='idle';return}entrance()};
  addEventListener('pointermove',go);addEventListener('pointerdown',go)})()}
const IDLES=['idle','look','stretch','meditate','sleepy'];
function sitDown(){mode='chair';emote='gaming';ef=0;chairPop=0;menu.classList.remove('open');say('Game time!')}
function standUp(){mode='emote';emote='wave';ef=0;chairPop=-1;say('Oh hey! Pausing my game.')}
// ---- Find my buddy: teleports him back on screen ----
const findBtn=document.createElement('button');findBtn.type='button';findBtn.className='bd-find';findBtn.innerHTML='🔎 Find my buddy';document.body.appendChild(findBtn);
function puff(x,y){const p=document.createElement('canvas');p.width=48;p.height=48;p.className='bd-puff';p.style.left=(x-72)+'px';p.style.top=(y-72)+'px';document.body.appendChild(p);const c=p.getContext('2d');let k=0;
  (function t(){k++;c.clearRect(0,0,48,48);for(let j=0;j<12;j++){const a=j/12*6.28,r=4+k*.6;c.globalAlpha=Math.max(0,1-k/30);c.fillStyle=j%2?'#e8e2ff':'#a99fe0';c.fillRect(24+Math.cos(a)*r-2,24+Math.sin(a)*r-2,4,4)}c.globalAlpha=1;if(k<30)requestAnimationFrame(t);else p.remove()})()}
findBtn.onclick=()=>{puff(bx+60,by+66);bx=Math.round(innerWidth/2-60);by=Math.round(innerHeight-200);B.querySelector('canvas.me').style.transform='';B.style.transform='';place();puff(bx+60,by+66);poke();
  if(mode==='chair')chairPop=-1;B.style.opacity=1;mode='emote';emote='wave';ef=0;say('Here I am!')};


/* ---- PAGE TURN: the same buddy follows you to the next page ----
   When you click a link to another page, he runs to the bottom-right
   corner, grabs it, and folds the page over like a book (the page
   rotates on its left edge, the "spine"). Then the next page opens and
   he lands there. sessionStorage carries him across pages.
   Why we move the page into a wrapper first: rotating the <body> would
   rotate the buddy too. A wrapper rotates the page and leaves him free. */
let flip=null;
const ease=p=>p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;
function isBuddyNode(n){return n===B||n===findBtn||n===fx||n===crack||(n.nodeType===1&&n.classList&&[...n.classList].some(c=>c.indexOf('bd-')===0))}
function wrapPage(label){
  const w=document.createElement('div');w.className='bd-pagewrap';
  const cs=getComputedStyle(document.body);w.style.background=cs.background||cs.backgroundColor;
  const inner=document.createElement('div');inner.style.cssText='position:relative;top:'+(-scrollY)+'px';
  [...document.body.childNodes].filter(n=>!isBuddyNode(n)).forEach(n=>inner.appendChild(n));
  const sh=document.createElement('div');sh.className='bd-pageshade';
  w.appendChild(inner);w.appendChild(sh);document.body.insertBefore(w,document.body.firstChild);
  const u=document.createElement('div');u.className='bd-pageunder';u.textContent=label;document.body.insertBefore(u,w); // the "next page" underneath
  return {w,sh,u,inner,y:scrollY};
}
function unwrapPage(){ // used if you come back with the browser's Back button
  const w=document.querySelector('.bd-pagewrap');if(!w)return;const inner=w.firstChild;
  [...inner.childNodes].forEach(n=>document.body.insertBefore(n,w));w.remove();
  const u=document.querySelector('.bd-pageunder');if(u)u.remove();
}
document.addEventListener('click',e=>{
  if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
  const a=e.target.closest('a[href]');if(!a||a.target==='_blank'||a.hasAttribute('download'))return;
  const u=new URL(a.href,location.href);
  if(u.protocol!==location.protocol||u.host!==location.host)return;      // other websites: normal link
  if(!/(\.html|\/)$/.test(u.pathname)||u.pathname===location.pathname)return; // same page (#links): normal
  if(reduced||mode==='flip'||B.style.opacity==='0')return;
  e.preventDefault();turnPage(u.href,(a.textContent||'').replace(/[→←]/g,'').trim());
},true);
function turnPage(href,label){
  if(race){race=null;window.journeyRaceX=null}
  menu.classList.remove('open');B.querySelector('canvas.me').style.transform='';B.style.transform='';
  flip={t:0,sx:bx,sy:by,tx:innerWidth-110,ty:innerHeight-133,href,label,page:null,gone:false};
  mode='flip';ef=0;say('Turning the page!');
}
function flipStep(){
  const F=flip,W=innerWidth,WALK=30,GRAB=14,TURN=56;F.t++;
  if(F.t<=WALK){const p=ease(F.t/WALK);bx=F.sx+(F.tx-F.sx)*p;by=F.sy+(F.ty-F.sy)*p-Math.sin(p*Math.PI)*30;place();return EMOTES.run.fn(F.t)}
  if(F.t<=WALK+GRAB){if(!F.page)F.page=wrapPage(F.label);return {arms:'hang',eyes:'focus',mouth:'grit',y:(F.t%6<3?0:1)}}
  const p=Math.min(1,(F.t-WALK-GRAB)/TURN),e=ease(p),ang=e*100;
  F.page.w.style.transform='perspective('+(W*1.6)+'px) rotateY('+(-ang)+'deg)';
  F.page.sh.style.opacity=Math.min(1,e*1.4);
  bx=W*Math.cos(ang*Math.PI/180)-90;by=F.ty-Math.sin(e*Math.PI)*90;place(); // he rides the corner
  if(p>=1&&!F.gone){F.gone=true;store('arrive','1');location.href=F.href}
  return {arms:'hang',legs:'dangle',eyes:'happy',mouth:'grin'}
}
addEventListener('pageshow',e=>{if(e.persisted&&flip){unwrapPage();flip=null;mode='idle';emote='idle';ef=0;B.style.opacity=1;place()}});
// He just turned the page: land at the spine side and say where we are.
if(store('arrive')){store('arrive','');
  bx=20;by=innerHeight-133-(lineEl()?lineEl().offsetHeight:0);place();
  B.style.opacity=1;crack.remove();mode='emote';emote='land';ef=0;
  const pg=(document.title.split('|')[0]||'').trim();setTimeout(()=>say(pg),250);
  const sw=document.createElement('div');sw.className='bd-arrive';document.body.appendChild(sw);
  requestAnimationFrame(()=>requestAnimationFrame(()=>{sw.style.opacity=0}));setTimeout(()=>sw.remove(),800);
}
let mx=-1,my=-1;addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY},{passive:true});
function gazeFor(){if(mx<0)return null;const r=B.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height*.32;const dx=mx-cx,dy=my-cy;
  return {x:dx<-40?0:dx>40?2:1,y:dy<-30?0:1,tilt:dx<-90?-1:dx>90?1:0}}
function drawBuddy(){
  if(frame%30===0){placeFindBtn();const r=B.getBoundingClientRect();if(mode!=='held'&&(r.right<40||r.left>innerWidth-40||r.bottom<40||r.top>innerHeight-40))place()}
  // the 5-minute idle clock runs only while he is free-standing and nobody is touching him
  if(mode==='idle'||mode==='chair')idleSec+=speed/60;
  // chair layer pops in / out behind him
  if(mode==='chair'&&chairPop<1)chairPop=Math.min(1,chairPop+1/30);
  if(chairPop<0){chairPop-=1/20;if(chairPop<-1)chairPop=0}
  const pv=chairPop>0?(chairPop<1?Math.sin(chairPop*Math.PI/2)*1.08:1):chairPop<0?1+chairPop:0;
  drawChair(cctx,frame,pv);
  if(mode==='chair'&&chairPop<.9){bctx.clearRect(0,0,40,44);const st0={arms:'down',legs:'jump',eyes:'happy',mouth:'grin',y:-Math.round(Math.sin(chairPop*Math.PI)*6)};front(st0,frame);outline(bctx,0,0,1);return}
  bctx.clearRect(0,0,40,44);let st;
  if(mode==='entrance'||mode==='waiting'){st={arms:'press',mouth:'grin',eyes:'open'}}
  else if(mode==='charge'){B.style.opacity=1;chargeF++;st=EMOTES.charge.fn(Math.min(chargeF,71));meter.firstChild.style.width=Math.min(100,chargeF/72*100)+'%';if(chargeF>=72)fire()}
  else if(mode==='blast'){st=EMOTES.blast.fn(ef)}
  else if(mode==='race'){st=raceStep()}
  else if(mode==='flip'){st=flipStep()}
  else if(mode==='chair'){st=EMOTES.gaming.fn(ef%720)}
  else{B.style.opacity=1;const e=EMOTES[emote];st=e.fn(ef%e.len);
    if(mode==='emote'&&ef>=e.len*(emote==='land'?1:1.2)){mode='idle';emote='idle';ef=0}
    if(mode==='idle'){const stg=Math.min(4,Math.floor(idleSec/60));if(emote!==STAGES[stg][1]){emote=STAGES[stg][1];ef=0}if(idleSec>=300)sitDown()}}
  if(mode!=='held'&&mode!=='blast'&&(st.eyes==null||st.eyes==='open')&&!st.side){const g=gazeFor();if(g){const mirrored=B.querySelector('canvas.me').style.transform.indexOf('scaleX(-1)')>=0;st.gaze={x:mirrored?2-g.x:g.x,y:g.y};if(mode==='idle'&&st.tilt==null)st.tilt=mirrored?-g.tilt:g.tilt}}
  front(st,frame);outline(bctx,0,0,1);extras(bctx,st,ef,0,0,1);ef++}
// If the window gets smaller (or a phone rotates), pull him back inside.
addEventListener('resize',()=>{if(mode==='race'){race=null;window.journeyRaceX=null;mode='idle';emote='idle';ef=0}place()});
// Keep "Find my buddy" above the running man's bar so it never covers the start line.
function placeFindBtn(){const j=lineEl();findBtn.style.bottom=(j?j.offsetHeight+12:12)+'px'}

(function loop(){frame++;drawBuddy();requestAnimationFrame(loop)})();
})();
