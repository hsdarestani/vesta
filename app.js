const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const fa=n=>String(n).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[d]);
const KEY='vesta-v10';
const defaults={
  done:{},custom:[],energy:'متوسط',sleep:'کم',skin:'خشک',mood:'آروم',period:false,
  symptoms:[],streak:9,challenge:false,checkins:4
};
let state={...defaults,...(JSON.parse(localStorage.getItem(KEY)||'null')||{})};
const save=()=>localStorage.setItem(KEY,JSON.stringify(state));

const tasksBase=[
  {id:'water',title:'یک لیوان آب قبل از قهوه',detail:'شروع نرم برای بدنت',time:'الان',tag:'بدن'},
  {id:'skin-am',title:'روتین پوست صبح',detail:'شوینده · ویتامین C · آبرسان · SPF',time:'۸ دقیقه',tag:'پوست'},
  {id:'move',title:'۱۰ دقیقه حرکت سبک',detail:'کشش یا یک پیاده‌روی کوتاه',time:'عصر',tag:'حرکت'},
  {id:'pause',title:'۵ دقیقه بدون صفحه',detail:'فقط توقف؛ لازم نیست مدیتیشن باشه',time:'بعدازظهر',tag:'حال'},
  {id:'skin-pm',title:'روتین شب کوتاه',detail:'شوینده · آبرسان · مرطوب‌کننده',time:'شب',tag:'پوست'}
];
function currentTasks(){
  const tasks=tasksBase.map(x=>({...x}));
  if(state.sleep==='عالی'){
    const t=tasks.find(x=>x.id==='move'); t.title='۲۰ دقیقه حرکت'; t.detail='پیاده‌روی تند، یوگا یا تمرین موردعلاقه‌ت';
  }
  if(state.energy==='کم'){
    const t=tasks.find(x=>x.id==='move'); t.title='۵ دقیقه کشش'; t.detail='امروز قرار نیست به خودت فشار بیاری'; t.time='هر وقت شد';
  }
  if(state.skin==='حساس'){
    const t=tasks.find(x=>x.id==='skin-pm'); t.title='Barrier Night'; t.detail='شوینده ملایم · آبرسان · کرم ترمیم‌کننده';
  }
  if(state.skin==='چرب'){
    const t=tasks.find(x=>x.id==='skin-pm'); t.detail='پاکسازی · آبرسان سبک · مرطوب‌کننده ژلی';
  }
  return [...tasks,...state.custom];
}

function renderTasks(){
  const wrap=$('#todayTaskList'); if(!wrap)return;
  const tasks=currentTasks();
  wrap.innerHTML=tasks.map(t=>`<article class="today-task ${state.done[t.id]?'done':''}" data-id="${t.id}">
    <button class="task-check" aria-label="انجام شد"></button>
    <div class="task-copy"><strong>${t.title}</strong><small>${t.detail}</small></div>
    <span class="task-meta"><b>${t.tag||'شخصی'}</b>${t.time}</span>
  </article>`).join('');
  $$('.task-check',wrap).forEach(btn=>btn.addEventListener('click',()=>{
    const id=btn.closest('.today-task').dataset.id;
    state.done[id]=!state.done[id]; save(); renderTasks();
    if(state.done[id])toast('ثبت شد؛ همین کافیه ✦');
  }));
  updateProgress();
}
function updateProgress(){
  const tasks=currentTasks();
  const done=tasks.filter(t=>state.done[t.id]).length;
  const p=tasks.length?Math.round(done/tasks.length*100):0;
  $('#doneCount').textContent=fa(done); $('#totalCount').textContent=fa(tasks.length); $('#heroPercent').textContent=fa(p)+'٪';
  $('#consistencyPercent').textContent=fa(Math.min(94,68+Math.round(p*.25)))+'٪';
  $('#streakValue').textContent=fa(state.streak);
}
function updateSignals(){
  $('#energySignal').textContent=state.energy; $('#sleepSignal').textContent=state.sleep; $('#skinSignal').textContent=state.skin; $('#moodSignal').textContent=state.mood;
  let title='امروز آروم‌تر،<br/>ولی مراقب خودت.';
  let sub='خواب دیشبت کم بوده و به PMS نزدیک می‌شی؛ برنامه امروز رو سبک‌تر کردیم.';
  if(state.energy==='زیاد'&&state.sleep!=='کم'){title='امروز انرژی داری؛<br/>ازش خوب استفاده کن.';sub='خواب و انرژی امروزت خوبه. روتین رو کامل نگه داشتیم، ولی باز هم لازم نیست همه‌چیز بی‌نقص باشه.'}
  if(state.energy==='کم'){title='امروز کمتر،<br/>واقعاً بیشتره.';sub='انرژیت پایینه. حرکت سبک‌تر شده و روتین شب فقط چیزهای ضروری رو نگه داشته.'}
  if(state.skin==='حساس'){title='امروز پوستت<br/>دنبال آرامشه.';sub='چک‌این امروز حساسیت رو نشون می‌ده؛ اکتیوها رو حذف کردیم و روتین شب روی ترمیم سد پوستی می‌چرخه.'}
  $('#heroTitle').innerHTML=title; $('#heroSubtitle').textContent=sub;
}

function view(name){
  $$('.screen').forEach(s=>s.classList.toggle('active',s.dataset.view===name));
  $$('.bottom-nav [data-nav]').forEach(b=>b.classList.toggle('active',b.dataset.nav===name));
  history.replaceState(null,'',`#${name}`); window.scrollTo({top:0,behavior:'smooth'});
}
$$('[data-nav]').forEach(b=>b.addEventListener('click',()=>view(b.dataset.nav)));

const sheets={checkin:$('#checkinSheet'),symptoms:$('#symptomsSheet'),cabinet:$('#cabinetSheet'),challenge:$('#challengeSheet'),shop:$('#shopSheet'),quickadd:$('#quickAddSheet')};
function openSheet(name){
  const d=sheets[name]; if(!d)return;
  if(typeof d.showModal==='function'&&!d.open)d.showModal(); else d.setAttribute('open','');
  $('#sheetBackdrop').classList.add('show');
  if(window.lucide)lucide.createIcons();
}
function closeSheet(d){
  const dialog=d?.closest?.('dialog')||d;
  if(dialog?.open&&dialog.close)dialog.close(); else dialog?.removeAttribute?.('open');
  $('#sheetBackdrop').classList.remove('show');
}
$$('[data-sheet]').forEach(el=>el.addEventListener('click',()=>openSheet(el.dataset.sheet)));
$$('[data-open]').forEach(el=>el.addEventListener('click',()=>openSheet(el.dataset.open)));
$$('[data-close]').forEach(el=>el.addEventListener('click',()=>closeSheet(el)));
$('#sheetBackdrop').addEventListener('click',()=>{const open=$$('dialog[open]')[0];if(open)closeSheet(open)});
$('#checkinButton').addEventListener('click',()=>openSheet('checkin'));
$('#quickAddButton').addEventListener('click',()=>openSheet('quickadd'));
$('#addRoutineButton').addEventListener('click',()=>{toast('ساخت روتین جدید در نسخه بعدی دمو باز می‌شه')});

$$('.option-row button,.mood-row button').forEach(btn=>btn.addEventListener('click',()=>{
  const group=btn.closest('[data-group]'); $$('button',group).forEach(x=>x.classList.remove('selected')); btn.classList.add('selected');
}));
$('#checkinForm').addEventListener('submit',e=>{
  e.preventDefault();
  ['energy','sleep','skin','mood'].forEach(k=>{const b=$(`[data-group="${k}"] .selected`);if(b)state[k]=b.dataset.value});
  state.checkins=(state.checkins||0)+1; save(); updateSignals(); renderTasks(); closeSheet($('#checkinSheet')); toast('امروزت شخصی‌سازی شد ✦');
});

$('#quickAddForm').addEventListener('submit',e=>{
  e.preventDefault(); const title=$('#customTaskInput').value.trim(); if(!title)return;
  const time=$('#customTaskTime').value; state.custom.push({id:'custom-'+Date.now(),title,detail:'کار شخصی امروز',time,tag:'من'}); save(); renderTasks(); e.currentTarget.reset(); closeSheet($('#quickAddSheet')); toast('به امروزت اضافه شد');
});

$('#periodButton').addEventListener('click',()=>{
  state.period=!state.period; save(); $('#periodState').textContent=state.period?'پریود ثبت شد':'پریود نیستم'; $('#periodButton').classList.toggle('active',state.period); toast(state.period?'شروع پریود ثبت شد':'ثبت پریود برداشته شد');
});
$$('#symptomGrid button').forEach(btn=>btn.addEventListener('click',()=>btn.classList.toggle('selected')));
$('[data-save-symptoms]').addEventListener('click',()=>{
  state.symptoms=$$('#symptomGrid button.selected').map(x=>x.textContent.trim()); save(); closeSheet($('#symptomsSheet')); toast('علائم امروز ثبت شد');
});

$$('[data-routine-filter]').forEach(btn=>btn.addEventListener('click',()=>{
  $$('[data-routine-filter]').forEach(x=>x.classList.remove('active')); btn.classList.add('active');
  const type=btn.dataset.routineFilter; $$('#routineCards article').forEach(card=>card.classList.toggle('hidden',type!=='all'&&card.dataset.type!==type));
}));
$$('[data-routine-start]').forEach(btn=>btn.addEventListener('click',()=>{view('today');setTimeout(()=>$('#todayTaskList').scrollIntoView({behavior:'smooth',block:'center'}),120);toast('روتین صبح آماده‌ست؛ یکی‌یکی انجامش بده')}));

function renderCalendar(){
  const grid=$('#calendarGrid'); if(!grid)return;
  let html='';
  for(let i=0;i<35;i++){
    const d=((i+29)%31)+1; let c='';
    if([5,6,7,8,9].includes(d))c+=' period';
    if([15,16,17,18,19,20].includes(d))c+=' fertile';
    if(d===24)c+=' today';
    html+=`<span class="${c.trim()}">${fa(d)}</span>`;
  }
  grid.innerHTML=html;
}
function renderChart(){
  const values=[48,60,42,72,65,84,76,88,69,80,91,73,83,77];
  $('#miniChart').innerHTML=values.map(v=>`<i style="height:${v}%"></i>`).join('');
}

function guideReply(q){
  const baseSkin=state.skin==='خشک'||state.skin==='حساس'
    ?`چون پوستت رو «${state.skin}» ثبت کردی، امشب بهتره روتین ترمیمی و کوتاه باشه: شوینده ملایم، آبرسان و مرطوب‌کننده.`
    :`پوستت امروز «${state.skin}» ثبت شده؛ روتین معمولت رو می‌تونی نگه داری، فقط لازم نیست محصول جدیدی اضافه کنی.`;
  if(q.includes('PMS'))return `الان روز ۲۴ چرخه‌ای و انرژی‌ت «${state.energy}» ثبت شده. برای امروز روی آب کافی، غذای منظم، حرکت سبک و خواب زودتر تمرکز کن. لازم نیست کارهای بیشتری به روزت اضافه کنی.`;
  if(q.includes('امشب')||q.includes('روتین'))return `${baseSkin} چون خواب دیشبت «${state.sleep}» بوده، نسخه کوتاه روتین برای امشب منطقی‌تره.`;
  if(q.includes('خشک')||q.includes('پوست'))return `${baseSkin} اگر خشکی مداوم، دردناک یا همراه با التهاب جدی بود بهتره برای ارزیابی تخصصی اقدام کنی.`;
  return `با توجه به چک‌این امروز: انرژی «${state.energy}»، خواب «${state.sleep}»، پوست «${state.skin}» و حال «${state.mood}» ثبت شده. برای امروز بهتره روی همان برنامه کوتاهی که وستا ساخته بمانی و چیزی اضافه نکنی.`;
}
function sendGuide(text){
  const q=text.trim(); if(!q)return; const thread=$('#guideThread');
  thread.insertAdjacentHTML('beforeend',`<article class="guide-message user"><span></span><div><p>${escapeHtml(q)}</p></div></article>`);
  setTimeout(()=>{thread.insertAdjacentHTML('beforeend',`<article class="guide-message vesta"><span>V</span><div><small>برای امروزت</small><p>${guideReply(q)}</p><em>بر اساس چک‌این امروز + روز ۲۴ چرخه</em></div></article>`);window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'})},220);
}
function escapeHtml(s){return s.replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
$('#guideSend').addEventListener('click',()=>{sendGuide($('#guideInput').value);$('#guideInput').value=''});
$('#guideInput').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();$('#guideSend').click()}});
$$('[data-prompt]').forEach(btn=>btn.addEventListener('click',()=>sendGuide(btn.dataset.prompt)));

$('#joinChallenge').addEventListener('click',()=>{state.challenge=true;save();closeSheet($('#challengeSheet'));toast('Glow Reset شروع شد ✦')});
$('#searchButton').addEventListener('click',()=>{view('guide');setTimeout(()=>$('#guideInput').focus(),100)});

function toast(text){const t=$('#toast');t.textContent=text;t.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove('show'),1700)}
function init(){
  try{$('#todayDate').textContent=new Intl.DateTimeFormat('fa-IR',{weekday:'long',day:'numeric',month:'long'}).format(new Date())}catch{}
  $('#periodState').textContent=state.period?'پریود ثبت شد':'پریود نیستم';
  updateSignals(); renderTasks(); renderCalendar(); renderChart();
  const hash=location.hash.slice(1); if(['today','routines','guide','cycle','me'].includes(hash))view(hash);
  if(window.lucide)lucide.createIcons({attrs:{'stroke-width':1.7}});
  if('serviceWorker'in navigator)navigator.serviceWorker.register('/sw.js?v=10').catch(()=>{});
}
init();
