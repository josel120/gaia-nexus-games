const WORDS=['APPLE','BRAVE','CLOUD','DELTA','EAGLE','FLAME','GAIA','HARBOR'.slice(0,5),'IVORY','JOLLY','KOALA','LEMON','MANGO','NEXUS','OCEAN','PIANO','QUEEN','RIVER','SOLAR','TIGER','ULTRA','VIVID','WALTZ','XENON','YOUTH','ZEBRA','PLANT','STONE','LIGHT','WATER','EARTH','MUSIC','HAPPY','WORLD','GREEN','BLOOM','ORBIT','COMET','LUNAR','CORAL'];
const day=Math.floor(Date.now()/864e5);const answer=WORDS[day%WORDS.length];
const board=document.getElementById('board'),$=id=>document.getElementById(id);let tries=0,over=false;
$('date').textContent=new Date().toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'});
for(let i=0;i<30;i++){const d=document.createElement('div');d.className='cell';board.appendChild(d);}
$('form').onsubmit=e=>{e.preventDefault();if(over)return;const g=$('guess').value.toUpperCase();if(g.length!==5)return;
const cells=[...board.children].slice(tries*5,tries*5+5);const rest=answer.split('');
cells.forEach((cell,i)=>{cell.textContent=g[i];if(g[i]===answer[i]){cell.style.background='#1f7a4d';rest[i]='';}});
cells.forEach((cell,i)=>{if(g[i]===answer[i])return;const j=rest.indexOf(g[i]);if(j>=0){cell.style.background='#8a6d1f';rest[j]='';}else cell.style.background='#333d38';});
tries++;$('guess').value='';if(g===answer){over=true;$('status').textContent=`You got it in ${tries}/6! Come back tomorrow for a new word.`;}else if(tries===6){over=true;$('status').textContent='Out of tries — the word was '+answer+'. New word tomorrow.';}else $('status').textContent=`Try ${tries}/6 used. Keep going.`;};
