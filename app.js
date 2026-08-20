const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const fa=n=>String(n).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[d]);
const storageKey='vesta-v4';
const state=JSON.parse(localStorage.getItem(storageKey)||'null')||{done:{},custom:[],mood:'',lazy:false,cart:0,streak:9,periodLogged:false};
const baseTasks=[
  {id:'cleanse',time:'۰۷:۳۰',title:'شست‌وشوی صورت',detail:'ژل شست‌وشوی ملایم'},
  {id:'vitc',time:'۰۷:۴۰',title:'سرم ویتامین C',detail:'۲ تا ۳ قطره روی پوست خشک'},
  {id:'spf',time:'۰۷:۴۵',title:'ضدآفتاب',detail:'SPF 50 · دو بند انگشت'},
  {id:'move',time:'۱۷:۰۰',title:'۲۰ دقیقه حرکت',detail:'پیاده‌روی یا کشش سبک'},
  {id:'night',time:'۲۲:۳۰',title:'روتین شب',detail:'پاکسازی و مرطوب‌کننده'}
];
const lightIds=['cleanse','spf','night'];
function save(){localStorage.setItem(storageKey,JSON.stringify(state))}
function tasks(){
  const list=state.lazy?baseTasks.filter(t=>lightIds.includes(t.id)):baseTasks;
  return [...list,...state.custom];
}
function renderTasks(){
  const wrap=$('#todayTaskList'); if(!wrap) return;
  wrap.innerHTML=tasks().map(t=>`<article class="timeline-card ${state.done[t.id]?'done':''}" data-id="${t.id}">
    <button class="timeline-check" aria-label="انجام شد"></button>
    <span class="timeline-time">${t.time}</span>
    <strong class="timeline-title">${t.title}</strong>
    <div class="timeline-sub">${t.detail}</div>
  </article>`).join('');
  $$('.timeline-check',wrap).forEach(btn=>btn.addEventListener('click',()=>{
    const id=btn.closest('.timeline-card').dataset.id;
    state.done[id]=!state.done[id]; save(); renderTasks(); updateProgress();
    if(state.done[id]) toast('ثبت شد');
  }));
}
function updateProgress(){
  const list=tasks();
  const done=list.filter(t=>state.done[t.id]).length;
  const total=list.length;
  const pct=total?Math.round(done/total*100):0;
  $('#doneCount').textContent=fa(done);
  $('#totalCount').textContent=fa(total);
  $('#todayMinutes').textContent=fa(state.lazy?9:16);
  $('#heroPercent').textContent=fa(pct)+'٪';
  $('#progressOrb').style.setProperty('--p',pct);
  $('#weekPercent').textContent=fa(Math.max(58,Math.round((pct+76)/2)))+'٪';
  $('#streakValue').textContent=fa(state.streak);
  $('#cartCount').textContent=fa(state.cart);
  $('#lazyLabel').textContent=state.lazy?'نسخه کامل':'نسخه سبک';
}
function switchView(view){
  $$('.screen').forEach(v=>v.classList.toggle('active',v.dataset.view===view));
  $$('.bottom-nav [data-nav]').forEach(b=>b.classList.toggle('active',b.dataset.nav===view));
  history.replaceState(null,'',`#${view}`);
  window.scrollTo({top:0,behavior:'smooth'});
}
$$('[data-nav]').forEach(b=>b.addEventListener('click',()=>switchView(b.dataset.nav)));
function bindTabs(btnSel,panelSel,btnKey,panelKey){
  $$(btnSel).forEach(btn=>btn.addEventListener('click',()=>{
    const value=btn.dataset[btnKey];
    $$(btnSel).forEach(x=>x.classList.toggle('active',x===btn));
    $$(panelSel).forEach(p=>p.classList.toggle('active',p.dataset[panelKey]===value));
  }));
}
bindTabs('[data-plan-tab]','[data-plan-panel]','planTab','planPanel');
bindTabs('[data-discover-tab]','[data-discover-panel]','discoverTab','discoverPanel');
$$('[data-mood]').forEach(btn=>btn.addEventListener('click',()=>{
  state.mood=btn.dataset.mood; save();
  $$('[data-mood]').forEach(x=>x.classList.toggle('selected',x===btn));
  toast(`حال امروز: ${state.mood}`);
}));
function buildCalendar(){
  const grid=$('#calendarGrid'); if(!grid) return;
  let html='';
  for(let i=1;i<=35;i++){
    const day=((i+27)%31)+1; let cls='';
    if([5,6,7,8,9].includes(day)) cls='period';
    if([22,23,24,25,26].includes(day)) cls=(cls?cls+' ':'')+'prediction';
    if(day===18) cls=(cls?cls+' ':'')+'today';
    html+=`<span class="${cls}">${fa(day)}</span>`;
  }
  grid.innerHTML=html;
}
function buildHeatGrid(){
  const levels=['l0','l1','l2','l3'];
  const wrap=$('#heatGrid'); if(!wrap) return;
  let html='';
  for(let i=0;i<28;i++){
    const level=levels[(i*7+i)%levels.length];
    html+=`<span class="${level}"></span>`;
  }
  wrap.innerHTML=html;
}
const dialog=$('#quickAddDialog');
$('#quickAddBtn')?.addEventListener('click',()=>dialog?.showModal());
$('#quickAddForm')?.addEventListener('submit',e=>{
  if(e.submitter?.value==='cancel') return;
  const input=$('#customTaskInput');
  const title=input.value.trim();
  if(!title){e.preventDefault();return;}
  e.preventDefault();
  state.custom.push({id:`c-${Date.now()}`,time:'امروز',title,detail:'کار شخصی'});
  input.value=''; dialog.close(); save(); renderTasks(); updateProgress();
  toast('به امروز اضافه شد');
});
$('#lazyModeBtn')?.addEventListener('click',()=>{
  state.lazy=!state.lazy; save(); renderTasks(); updateProgress();
  toast(state.lazy?'امروز فقط ضروری‌ها':'روتین کامل برگشت');
});
$('#logPeriodBtn')?.addEventListener('click',()=>{
  state.periodLogged=!state.periodLogged; save();
  $('#logPeriodBtn').textContent=state.periodLogged?'امروز ثبت شد':'ثبت امروز';
  toast(state.periodLogged?'ثبت شد':'حذف شد');
});
$$('.add-cart').forEach(btn=>btn.addEventListener('click',()=>{state.cart++; save(); updateProgress(); toast('به سبد خرید اضافه شد');}));
$('#notifyBtn')?.addEventListener('click',()=>toast('فعلاً اعلان جدیدی نداری'));
$('#profileBtn')?.addEventListener('click',()=>switchView('profile'));
function initDate(){
  try{ $('#pageDate').textContent=new Intl.DateTimeFormat('fa-IR',{weekday:'long',day:'numeric',month:'long'}).format(new Date()); }catch{}
}
function toast(msg){const el=$('#toast'); el.textContent=msg; el.classList.add('show'); clearTimeout(window.__toast); window.__toast=setTimeout(()=>el.classList.remove('show'),1800)}
function init(){
  initDate(); buildCalendar(); buildHeatGrid(); renderTasks(); updateProgress();
  if(state.mood){ const el=$(`[data-mood="${state.mood}"]`); if(el) el.classList.add('selected'); }
  if(state.periodLogged) $('#logPeriodBtn').textContent='امروز ثبت شد';
  const hash=location.hash.replace('#','');
  if(['today','plan','cycle','discover','profile'].includes(hash)) switchView(hash);
  if('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(()=>{});
}
init();
