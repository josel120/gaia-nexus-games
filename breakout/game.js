const c=document.getElementById('c'),x=c.getContext('2d'),$=id=>document.getElementById(id);
let px=160,ball,bricks,score,lives,run=false;
function reset(full=true){if(full){score=0;lives=3}ball={x:210,y:420,vx:3,vy:-3};bricks=[];for(let r=0;r<5;r++)for(let col=0;col<7;col++)bricks.push({x:12+col*58,y:40+r*26,w:50,h:18,hit:false});$('score').textContent=score;$('lives').textContent=lives;$('status').textContent='Break them all!';}
function draw(){x.fillStyle='#08110d';x.fillRect(0,0,420,480);bricks.forEach(b=>{if(!b.hit){x.fillStyle=['#3ddc97','#ffd166','#ff8fa3','#6f8fe8','#2bb3a3'][(b.y/26|0)%5];x.fillRect(b.x,b.y,b.w,b.h)}});x.fillStyle='#e8f0ec';x.fillRect(px,455,100,12);x.beginPath();x.arc(ball.x,ball.y,8,0,7);x.fillStyle='#ffd166';x.fill();}
function step(){if(!run)return;ball.x+=ball.vx;ball.y+=ball.vy;if(ball.x<8||ball.x>412)ball.vx*=-1;if(ball.y<8)ball.vy*=-1;if(ball.y>447&&ball.x>px&&ball.x<px+100&&ball.vy>0){ball.vy*=-1;ball.vx=((ball.x-(px+50))/50)*4}if(ball.y>488){lives--;$('lives').textContent=lives;if(lives<=0){run=false;$('status').textContent='Game over — score '+score;draw();return}ball={x:210,y:420,vx:3,vy:-3};}
for(const b of bricks){if(!b.hit&&ball.x>b.x&&ball.x<b.x+b.w&&ball.y>b.y&&ball.y<b.y+b.h){b.hit=true;ball.vy*=-1;score+=10;$('score').textContent=score;break}}
if(bricks.every(b=>b.hit)){run=false;$('status').textContent='You cleared the wall! Score '+score;}
draw();requestAnimationFrame(step);}
c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect();px=Math.max(0,Math.min(320,(e.clientX-r.left)*(420/r.width)-50))});
c.addEventListener('touchmove',e=>{const r=c.getBoundingClientRect();px=Math.max(0,Math.min(320,(e.touches[0].clientX-r.left)*(420/r.width)-50));e.preventDefault()},{passive:false});
addEventListener('keydown',e=>{if(e.code==='ArrowLeft')px=Math.max(0,px-24);if(e.code==='ArrowRight')px=Math.min(320,px+24)});
$('start').onclick=()=>{reset();run=true;requestAnimationFrame(step)};reset();draw();
