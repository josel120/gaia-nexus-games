const N=9,MINES=10;let mines,shown,over;const board=document.getElementById('board'),$=id=>document.getElementById(id);
const around=i=>{const a=[],x=i%N,y=i/N|0;for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const nx=x+dx,ny=y+dy;if(nx>=0&&ny>=0&&nx<N&&ny<N&&(dx||dy))a.push(ny*N+nx)}return a;};
function reset(){mines=new Set();while(mines.size<MINES)mines.add(Math.random()*N*N|0);shown=new Set();over=false;$('score').textContent=0;$('status').textContent='Tap a cell. Numbers show nearby mines.';board.innerHTML='';for(let i=0;i<N*N;i++){const d=document.createElement('button');d.className='cell';d.onclick=()=>reveal(i,d);board.appendChild(d)}}
function reveal(i,d){if(over||shown.has(i))return;if(mines.has(i)){d.textContent='💣';d.style.background='#5a1f1f';over=true;$('status').textContent='Boom! Press New game to retry.';board.querySelectorAll('.cell').forEach((el,j)=>{if(mines.has(j))el.textContent='💣'});return}
const flood=[i];while(flood.length){const cur=flood.pop();if(shown.has(cur))continue;shown.add(cur);const n=around(cur).filter(j=>mines.has(j)).length;const el=board.children[cur];el.textContent=n||'';el.style.background='#0f2c21';if(!n)around(cur).forEach(j=>{if(!shown.has(j))flood.push(j)});}
$('score').textContent=shown.size;if(shown.size===N*N-MINES){over=true;$('status').textContent='Field cleared — you win!';}}
$('start').onclick=reset;reset();
