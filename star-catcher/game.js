const c=document.getElementById('c'),x=c.getContext('2d'),$=id=>document.getElementById(id);
let bx=170,items,score,left,run=false,last,tick;
function reset(){items=[];score=0;left=30;$('score').textContent=0;$('time').textContent=left;$('status').textContent='Catch stars, dodge bombs!';}
function spawn(){items.push({x:20+Math.random()*360,y:-20,v:2+Math.random()*2.2,bomb:Math.random()<.22});}
function step(ts){if(!run)return;if(!last||ts-last>550){spawn();last=ts;}if(!tick||ts-tick>1000){left--;$('time').textContent=Math.max(0,left);tick=ts;if(left<=0){run=false;$('status').textContent='Time! You caught '+score+' stars. Best: '+best();draw();return}}
items.forEach(it=>it.y+=it.v);items=items.filter(it=>{if(it.y>435&&it.x>bx-10&&it.x<bx+80){score+=it.bomb?-3:1;$('score').textContent=score;return false}return it.y<500;});
draw();requestAnimationFrame(step);}
function best(){if(score>(+localStorage.gnStars||0))localStorage.gnStars=score;return localStorage.gnStars;}
function draw(){x.fillStyle='#08110d';x.fillRect(0,0,400,480);x.font='24px system-ui';items.forEach(it=>x.fillText(it.bomb?'💣':'⭐',it.x,it.y));x.fillStyle='#3ddc97';x.fillRect(bx,445,70,16);x.fillStyle='#e8f0ec';x.font='14px system-ui';x.fillText('🧺',bx+24,442);}
function move(clientX){const r=c.getBoundingClientRect();bx=Math.max(0,Math.min(330,(clientX-r.left)*(400/r.width)-35));}
c.addEventListener('mousemove',e=>move(e.clientX));c.addEventListener('touchmove',e=>{move(e.touches[0].clientX);e.preventDefault()},{passive:false});
addEventListener('keydown',e=>{if(e.code==='ArrowLeft')bx=Math.max(0,bx-22);if(e.code==='ArrowRight')bx=Math.min(330,bx+22);draw();});
$('start').onclick=()=>{reset();run=true;last=0;tick=0;requestAnimationFrame(step)};reset();draw();
