const pads=[...document.querySelectorAll('.pad')],$=id=>document.getElementById(id);
let seq=[],pos=0,accept=false;const tones=[523,659,784,1047];let audio;
function beep(i){try{audio=audio||new AudioContext();const o=audio.createOscillator(),g=audio.createGain();o.frequency.value=tones[i];o.connect(g);g.connect(audio.destination);g.gain.setValueAtTime(.18,audio.currentTime);g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+.35);o.start();o.stop(audio.currentTime+.36);}catch{}}
function flash(i){pads[i].classList.add('on');beep(i);setTimeout(()=>pads[i].classList.remove('on'),320);}
async function show(){accept=false;$('status').textContent='Watch…';for(const i of seq){await new Promise(r=>setTimeout(r,420));flash(i);}await new Promise(r=>setTimeout(r,350));pos=0;accept=true;$('status').textContent='Your turn — repeat it.';}
function next(){seq.push(Math.random()*4|0);$('score').textContent=seq.length;if(seq.length-1>(+localStorage.gnEcho||0))localStorage.gnEcho=seq.length-1;$('best').textContent=localStorage.gnEcho||0;show();}
pads.forEach((p,i)=>p.onclick=()=>{if(!accept)return;flash(i);if(i!==seq[pos]){accept=false;$('status').textContent='Wrong pad — you reached level '+seq.length+'. Press Start to retry.';return}pos++;if(pos===seq.length){accept=false;$('status').textContent='Correct! Next level…';setTimeout(next,700);}});
$('start').onclick=()=>{seq=[];$('score').textContent=0;next();};$('best').textContent=localStorage.gnEcho||0;
