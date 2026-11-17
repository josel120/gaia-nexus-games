let b,score;const board=document.getElementById('board'),$ =id=>document.getElementById(id);
const colors={2:'#1d3a2f',4:'#245040',8:'#e07a3f',16:'#e05d3f',32:'#d64560',64:'#c2337f',128:'#8f6fe8',256:'#6f8fe8',512:'#3fa7d6',1024:'#2bb3a3',2048:'#ffd166'};
function add(){const e=[];b.forEach((v,i)=>{if(!v)e.push(i)});if(e.length)b[e[Math.random()*e.length|0]]=Math.random()<.9?2:4;}
function draw(){board.innerHTML=b.map(v=>`<div class="cell" style="background:${colors[v]||'#16211d'};color:${v>=8?'#fff':'#e8f0ec'}">${v||''}</div>`).join('');$('score').textContent=score;$('best').textContent=localStorage.gn2048||0;}
function slide(row){row=row.filter(Boolean);for(let i=0;i<row.length-1;i++)if(row[i]===row[i+1]){row[i]*=2;score+=row[i];row.splice(i+1,1)}return row.concat(Array(4-row.length).fill(0));}
function move(dx,dy){const old=b.join();const nb=Array(16).fill(0);for(let i=0;i<4;i++){let line=[];for(let j=0;j<4;j++)line.push(b[dy===1? (3-j)*4+i : dy===-1? j*4+i : dx===1? i*4+(3-j) : i*4+j]);line=slide(line);for(let j=0;j<4;j++)nb[dy===1?(3-j)*4+i:dy===-1?j*4+i:dx===1?i*4+(3-j):i*4+j]=line[j];}b=nb;if(b.join()!==old){add();if(score>(+localStorage.gn2048||0))localStorage.gn2048=score;draw();if(b.includes(2048))$('status').textContent='You reached 2048! Keep going for a bigger score.';else if(!b.includes(0)&&![[1,0],[-1,0],[0,1],[0,-1]].some(([mx,my])=>canMove(mx,my)))$('status').textContent='No moves left — game over. Score '+score;}}
function canMove(dx,dy){const t=[...b];for(let y=0;y<4;y++)for(let x=0;x<4;x++){const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>3||ny>3)continue;if(t[y*4+x]&&t[y*4+x]===t[ny*4+nx])return true}return false;}
function reset(){b=Array(16).fill(0);score=0;add();add();draw();$('status').textContent='Slide with arrow keys, WASD or swipe.';}
$('start').onclick=reset;
const keys={ArrowUp:[0,-1],KeyW:[0,-1],ArrowDown:[0,1],KeyS:[0,1],ArrowLeft:[-1,0],KeyA:[-1,0],ArrowRight:[1,0],KeyD:[1,0]};
addEventListener('keydown',e=>{const k=keys[e.code];if(k){move(k[0],k[1]);e.preventDefault()}});
let tx,ty;board.addEventListener('touchstart',e=>{tx=e.touches[0].clientX;ty=e.touches[0].clientY},{passive:true});
board.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-tx,dy=e.changedTouches[0].clientY-ty;Math.abs(dx)>Math.abs(dy)?move(Math.sign(dx),0):move(0,Math.sign(dy))},{passive:true});
reset();
