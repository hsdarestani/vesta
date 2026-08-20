const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const fa=n=>String(n).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[d]);
const storageKey='vesta-v2';
const state=JSON.parse(localStorage.getItem(storageKey)||'null')||{
  done:{},custom:[],mood:'',lazy:false,cart:0,streak:9,periodLogged:false
};
const defaultTasks=[
  {id:'cleanse',title:'شست‌وشوی صورت',detail:'روتین صبح',time:'صبح'},
  {id:'vitc',title:'سرم ویتامین C',detail:'۲ تا ۳ قطره',time:'صبح'},
  {id:'spf',title:'ضدآفتاب',detail:'SPF 50',time:'صبح'},
  {id:'walk',title:'۲۰ دقیقه حرکت',detail:'پیاده‌روی یا کشش',time:'عصر'},
  {id:'night',title:'پاکسازی و مرطوب‌کننده',detail:'نسخه سبک امشب',time:'شب'}
];
function save(){localStorage.setItem(storageKey,JSON.stringify(state))}
function getTasks(){
  const base=state.lazy?defaultTasks.filter(t=>['cleanse','spf','night'].includes(t.id)):defaultTasks;
  return [...base,...state.custom];
}
function renderTasks(){
  const list=$('#todayTaskList');
  if(!list)return;
  const tasks=getTasks();
  list.innerHTML=tasks.map(t=>`<article class="today-task ${state.done[t.id]?'done':''}" data-id="${t.id}">
    <button class="task-check" aria-label="${state.done[t.id]?'انجام شده':'انجام شد'}"></button>
    <div class="task-copy"><strong>${t.title}</strong><small>${t.detail}</small></div>
    <span class="task-time">${t.time}</span>
  </article>`).join('');
  $$('.today-task .task-check',list).forEach(btn=>btn.addEventListener('click',()=>{
    const id=btn.closest('.today-task').dataset.id;
    state.done[id]=!state.done[id];save();renderTasks();
    if(state.done[id])toast('ثبت شد');
  }));
  updateProgress();
}
function updateProgress(){
  const tasks=getTasks();
  const done=tasks.filter(t=>state.done[t.id]).length;
  const total=tasks.length;
  const pct=total?Math.round(done/total*100):0;
  if($('#doneCount'))$('#doneCount').textContent=fa(done);
  if($('#totalCount'))$('#totalCount').textContent=fa(total);
  if($('#dailyProgress'))$('#dailyProgress').style.width=`${pct}%`;
  if($('#todaySummary'))$('#todaySummary').textContent=`${fa(total)} کار برای امروز · حدود ${fa(state.lazy?9:16)} دقیقه`;
  if($('#weekPercent'))$('#weekPercent').textContent=fa(Math.max(55,Math.round((pct+72)/2)))+'٪';
}
function switchView(view){
  $$('.screen').forEach(v=>v.classList.toggle('active',v.dataset.view===view));
  $$('.bottom-nav [data-nav]').forEach(b=>b.classList.toggle('active',b.dataset.nav===view));
  history.replaceState(null,'',`#${view}`);
  window.scrollTo({top:0,behavior:'smooth'});
}
$$('[data-nav]').forEach(el=>el.addEventListener('click',()=>switchView(el.dataset.nav)));
function bindTabs(buttonSelector,panelSelector,buttonKey,panelKey){
  $$(buttonSelector).forEach(btn=>btn.addEventListener('click',()=>{
    const value=btn.dataset[buttonKey];
    $$(buttonSelector).forEach(x=>x.classList.toggle('active',x===btn));
    $$(panelSelector).forEach(p=>p.classList.toggle('active',p.dataset[panelKey]===value));
  }));
}
bindTabs('[data-plan-tab]','[data-plan-panel]','planTab','planPanel');
bindTabs('[data-discover-tab]','[data-discover-panel]','discoverTab','discoverPanel');
$$('[data-mood]').forEach(btn=>btn.addEventListener('click',()=>{
  state.mood=btn.dataset.mood;save();
  $$('[data-mood]').forEach(x=>x.classList.toggle('selected',x===btn));
  toast(`حال امروز: ${state.mood}`);
}));
function buildCalendar(){
  const grid=$('#calendarGrid');if(!grid)return;
  const days=[];
  for(let i=0;i<35;i++)days.push(((i+28)%31)+1);
  grid.innerHTML=days.map(day=>{
    let cls='';
    if([5,6,7,8,9].includes(day))cls='period';
    if([23,24,25,26,27].includes(day))cls='prediction';
    if(day===20)cls+=`${cls?' ':''}today`;
    return `<span class="${cls}">${fa(day)}</span>`;
  }).join('');
}
const dialog=$('#quickAddDialog');
$('#quickAddBtn')?.addEventListener('click',()=>dialog?.showModal());
$('#quickAddForm')?.addEventListener('submit',e=>{
  if(e.submitter?.value==='cancel')return;
  const input=$('#customTaskInput');const title=input.value.trim();
  if(!title){e.preventDefault();return}
  e.preventDefault();
  state.custom.push({id:`custom-${Date.now()}`,title,detail:'کار شخصی',time:'امروز'});
  save();input.value='';dialog.close();renderTasks();toast('به امروز اضافه شد');
});
$('#lazyModeBtn')?.addEventListener('click',()=>{
  state.lazy=!state.lazy;save();renderTasks();
  $('#lazyModeBtn').textContent=state.lazy?'برگشت به روتین کامل':'روتین امروز رو سبک‌تر کن';
  toast(state.lazy?'امروز فقط سه کار اصلی':'روتین کامل برگشت');
});
$('#logPeriodBtn')?.addEventListener('click',()=>{
  state.periodLogged=!state.periodLogged;save();
  $('#logPeriodBtn').classList.toggle('active',state.periodLogged);
  toast(state.periodLogged?'روز پریود ثبت شد':'ثبت پریود حذف شد');
});
$$('.add-cart').forEach(btn=>btn.addEventListener('click',()=>{
  state.cart++;save();if($('#cartCount'))$('#cartCount').textContent=fa(state.cart);toast('به سبد اضافه شد');
}));
$$('.start-journey').forEach(btn=>btn.addEventListener('click',()=>{
  btn.textContent='مسیر شروع شد ✓';btn.disabled=true;toast('از فردا توی برنامه روزانه می‌بینیش');
}));
$('#notifyBtn')?.addEventListener('click',()=>toast('اعلان جدیدی نداری'));
$('#profileBtn')?.addEventListener('click',()=>switchView('me'));
$('#addRoutineBtn')?.addEventListener('click',()=>toast('ویرایشگر روتین در نسخه بعدی متصل می‌شه'));
$$('.settings-list button,.edit-link,.cabinet-head button').forEach(btn=>btn.addEventListener('click',()=>toast('این بخش برای نسخه بعدی آماده می‌شه')));
function toast(text){
  const t=$('#toast');if(!t)return;t.textContent=text;t.classList.add('show');
  clearTimeout(window.__vestaToast);window.__vestaToast=setTimeout(()=>t.classList.remove('show'),1600);
}
function initDate(){
  try{$('#todayDate').textContent=new Intl.DateTimeFormat('fa-IR',{weekday:'long',day:'numeric',month:'long'}).format(new Date())}catch{}
}
function init(){
  initDate();buildCalendar();renderTasks();
  if(state.mood){const selected=$(`[data-mood="${state.mood}"]`);selected?.classList.add('selected')}
  if($('#cartCount'))$('#cartCount').textContent=fa(state.cart);
  if($('#streakValue'))$('#streakValue').textContent=fa(state.streak);
  if($('#lazyModeBtn')&&state.lazy)$('#lazyModeBtn').textContent='برگشت به روتین کامل';
  if($('#logPeriodBtn'))$('#logPeriodBtn').classList.toggle('active',state.periodLogged);
  const hash=location.hash.slice(1);if(['today','plan','cycle','discover','me'].includes(hash))switchView(hash);
  if('serviceWorker'in navigator)navigator.serviceWorker.register('/sw.js').catch(()=>{});
}
init();
