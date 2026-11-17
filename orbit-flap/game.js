const c=document.getElementById('c'),x=c.getContext('2d'),$=id=>document.getElementById(id);
let y,v,pipes,score,run=false,frame;
function reset(){y=240;v=0;pipes=[];score=0;frame=0;$('score').textContent=0;$('best').textContent=localStorage.gnFlap||0;$('status').textContent='Flap!';}
function flap(){if(run)v=-7;}
function step(){if(!run)return;v+=.45;y+=v;frame++;if(frame%90===0)pipes.push({x:400,gap:110+Math.random()*220,passed:false});
pipes.forEach(p=>p.x-=2.4);pipes=pipes.filter(p=>p.x>-60);
for(const p of pipes){if(!p.passed&&p.x<90){p.passed=true;score++;$('score').textContent=score}if(98>p.x&&70<p.x+52&&(y-12<p.gap-75||y+12>p.gap+75))return over();}
if(y>468||y<12)return over();draw();requestAnimationFrame(step);}
function over(){run=false;if(score>(+localStorage.gnFlap||0))localStorage.gnFlap=score;$('best').textContent=localStorage.gnFlap;$('status').textContent='Crashed — score '+score+'. Press Start to retry.';draw();}
function draw(){x.fillStyle='#08110d';x.fillRect(0,0,400,480);x.fillStyle='#245040';pipes.forEach(p=>{x.fillRect(p.x,0,52,p.gap-75);x.fillRect(p.x,p.gap+75,52,480)});x.font='28px system-ui';x.fillText('🛰️',72,y+10);}
c.addEventListener('pointerdown',flap);addEventListener('keydown',e=>{if(e.code==='Space'){flap();e.preventDefault()}});
$('start').onclick=()=>{reset();run=true;requestAnimationFrame(step)};reset();run=false;draw();
