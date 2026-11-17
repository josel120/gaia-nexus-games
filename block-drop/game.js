const W=10,H=16,S=30,c=document.getElementById('c'),x=c.getContext('2d'),$=id=>document.getElementById(id);
const SHAPES=[[[1,1,1,1]],[[1,1],[1,1]],[[0,1,0],[1,1,1]],[[1,0],[1,0],[1,1]],[[1,1,0],[0,1,1]],[[0,1,1],[1,1,0]]];
const COLS=['#3ddc97','#ffd166','#ff8fa3','#6f8fe8','#2bb3a3','#e07a3f'];
let grid,cur,lines,timer=null;
function spawn(){const i=Math.random()*SHAPES.length|0;cur={s:SHAPES[i].map(r=>[...r]),col:COLS[i],x:3,y:0};if(hit(cur.s,cur.x,cur.y)){clearInterval(timer);timer=null;$('status').textContent='Game over — lines '+lines+'. Press Start.';}}
function hit(s,px,py){return s.some((row,y)=>row.some((v,x)=>v&&(px+x<0||px+x>=W||py+y>=H||(py+y>=0&&grid[py+y][px+x]))));}
function merge(){cur.s.forEach((row,y)=>row.forEach((v,x)=>{if(v)grid[cur.y+y][cur.x+x]=cur.col}));grid=grid.filter(r=>r.some(v=>!v));const cleared=H-grid.length;if(cleared){lines+=cleared;$('score').textContent=lines;while(grid.length<H)grid.unshift(Array(W).fill(0));}spawn();}
function step(){if(!hit(cur.s,cur.x,cur.y+1))cur.y++;else merge();draw();}
function draw(){x.fillStyle='#08110d';x.fillRect(0,0,300,480);grid.forEach((row,y)=>row.forEach((v,xx)=>{if(v){x.fillStyle=v;x.fillRect(xx*S+1,y*S+1,S-2,S-2)}}));if(cur)cur.s.forEach((row,y)=>row.forEach((v,xx)=>{if(v){x.fillStyle=cur.col;x.fillRect((cur.x+xx)*S+1,(cur.y+y)*S+1,S-2,S-2)}}));}
function rotate(){const r=cur.s[0].map((_,i)=>cur.s.map(row=>row[i]).reverse());if(!hit(r,cur.x,cur.y))cur.s=r;draw();}
addEventListener('keydown',e=>{if(!cur)return;if(e.code==='ArrowLeft'&&!hit(cur.s,cur.x-1,cur.y))cur.x--;if(e.code==='ArrowRight'&&!hit(cur.s,cur.x+1,cur.y))cur.x++;if(e.code==='ArrowUp')rotate();if(e.code==='ArrowDown')step();draw();if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.code))e.preventDefault();});
$('left').onclick=()=>{if(cur&&!hit(cur.s,cur.x-1,cur.y))cur.x--;draw()};$('right').onclick=()=>{if(cur&&!hit(cur.s,cur.x+1,cur.y))cur.x++;draw()};$('rot').onclick=rotate;
$('start').onclick=()=>{grid=Array.from({length:H},()=>Array(W).fill(0));lines=0;$('score').textContent=0;$('status').textContent='Clear full lines!';spawn();clearInterval(timer);timer=setInterval(step,450);draw();};
grid=Array.from({length:H},()=>Array(W).fill(0));lines=0;spawn();draw();
