(()=>{const l=document.createElement('link');l.rel='stylesheet';l.href='/mobile-fix.css?v=8';document.head.appendChild(l)})();
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)],fa=n=>String(n).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[d]);
const key='vesta-v8';const state=JSON.parse(localStorage.getItem(key)||'null')||{done:{},custom:[],mood:'',cart:0,streak:9,period:false};
const base=[{id:'cleanse',title:'شست‌وشوی صورت',detail:'ژل ملایم',time:'۰۷:۳۰'},{id:'vitc',title:'سرم ویتامین C',detail:'۲ تا ۳ قطره',time:'۰۷:۴۰'},{id:'spf',title:'ضدآفتاب',detail:'SPF 50',time:'۰۷:۴۵'},{id:'walk',title:'۲۰ دقیقه حرکت',detail:'پیاده‌روی یا کشش',time:'۱۷:۰۰'},{id:'night',title:'روتین شب',detail:'پاکسازی و مرطوب‌کننده',time:'۲۲:۳۰'}];
const save=()=>localStorage.setItem(key,JSON.stringify(state));function rows(){return [...base,...state.custom]}
function localizeUI(){const map={
'SELF-CARE, MADE PERSONAL':'مراقبت شخصی، برای خودت',
"TODAY'S RITUAL":'روتین امروز',
'CURATED FOR YOU':'انتخاب‌شده برای تو',
'YOUR DAY':'برنامه امروز',
'MY ROUTINES':'روتین‌های من',
'MORNING ROUTINE':'روتین صبح',
'Glow Morning':'صبحِ روشن',
'MY CABINET':'محصولات من',
'Cleanser':'شوینده صورت',
'Vitamin C':'سرم ویتامین C',
'Moisturizer':'مرطوب‌کننده',
'MY CYCLE':'چرخه من',
'PATTERN':'الگوی این ماه',
'DISCOVER':'کشف',
'FEATURED':'منتخب',
'SUNDAY RESET':'ریست آخر هفته',
'VESTA SHOP':'فروشگاه وستا',
'Daily UV Fluid':'فلوئید ضدآفتاب روزانه',
'Hydra Mist':'میست آبرسان',
'PROFILE':'پروفایل',
'LAST 28 DAYS':'۲۸ روز اخیر',
'Hydration Reset':'ریست آبرسانی',
'Soft Night':'شب آرام',
'Vesta Plus':'وستا پلاس'
};
$$('small,strong,span,h1,h2,h3,p,button').forEach(el=>{const t=el.textContent.trim();if(map[t])el.textContent=map[t]});}
function render(){const w=$('#todayTaskList');if(!w)return;w.innerHTML=rows().map(t=>`<article class="today-task ${state.done[t.id]?'done':''}" data-id="${t.id}"><button class="task-check"></button><div class="task-copy"><strong>${t.title}</strong><small>${t.detail}</small></div><span class="task-time">${t.time}</span></article>`).join('');$$('.task-check',w).forEach(b=>b.onclick=()=>{const id=b.closest('article').dataset.id;state.done[id]=!state.done[id];save();render();progress();if(state.done[id])toast('ثبت شد')});progress()}
function progress(){const all=rows(),d=all.filter(t=>state.done[t.id]).length,p=all.length?Math.round(d/all.length*100):0;$('#doneCount').textContent=fa(d);$('#totalCount').textContent=fa(all.length);$('#heroPercent').textContent=fa(p)+'٪';$('#weekPercent').textContent=fa(Math.max(58,Math.round((p+74)/2)))+'٪';$('#streakValue').textContent=fa(state.streak);$('#cartCount').textContent=fa(state.cart)}
function view(v){$$('.screen').forEach(s=>s.classList.toggle('active',s.dataset.view===v));$$('.bottom-nav button').forEach(b=>b.classList.toggle('active',b.dataset.nav===v));history.replaceState(null,'',`#${v}`);scrollTo({top:0,behavior:'smooth'})}$$('[data-nav]').forEach(b=>b.onclick=()=>view(b.dataset.nav));
$('#startToday')?.addEventListener('click',()=>$('#todayTaskList')?.scrollIntoView({behavior:'smooth',block:'center'}));const q=$('#quickAddDialog');$('#quickAddBtn')?.addEventListener('click',()=>q.showModal());$('#quickAddForm')?.addEventListener('submit',e=>{if(e.submitter?.value==='cancel')return;const i=$('#customTaskInput'),t=i.value.trim();if(!t){e.preventDefault();return}e.preventDefault();state.custom.push({id:'c'+Date.now(),title:t,detail:'کار شخصی',time:'امروز'});i.value='';q.close();save();render();toast('اضافه شد')});
const m=$('#moodDialog');$('#logMoodBtn')?.addEventListener('click',()=>m.showModal());$$('[data-mood]').forEach(b=>b.onclick=()=>{state.mood=b.dataset.mood;save();m.close();toast('حال امروز ثبت شد')});$('#logPeriodBtn')?.addEventListener('click',()=>{state.period=!state.period;save();toast(state.period?'پریود ثبت شد':'ثبت حذف شد')});$$('.add-cart').forEach(b=>b.onclick=()=>{state.cart++;save();progress();toast('به سبد اضافه شد')});$('#notifyBtn')?.addEventListener('click',()=>toast('اعلان جدیدی نداری'));
function calendar(){const g=$('#calendarGrid');if(!g)return;let h='';for(let i=0;i<35;i++){const d=((i+28)%31)+1;let c='';if([5,6,7,8,9].includes(d))c='period';if([23,24,25,26,27].includes(d))c='prediction';if(d===20)c+=(c?' ':'')+'today';h+=`<span class="${c}">${fa(d)}</span>`}g.innerHTML=h}function heat(){const h=$('#heatmap');if(!h)return;const a=[1,2,2,0,3,4,2,1,0,2,3,3,1,0,4,2,3,2,1,0,2,4,4,3,2,1,0,2];h.innerHTML=a.map(v=>`<i class="l${v}"></i>`).join('')}function toast(t){const x=$('#toast');x.textContent=t;x.classList.add('show');clearTimeout(window.__t);window.__t=setTimeout(()=>x.classList.remove('show'),1500)}function init(){try{$('#todayDate').textContent=new Intl.DateTimeFormat('fa-IR',{weekday:'long',day:'numeric',month:'long'}).format(new Date())}catch{}localizeUI();calendar();heat();render();$$('.bottom-nav svg').forEach(svg=>{svg.setAttribute('width','20');svg.setAttribute('height','20');svg.setAttribute('fill','none');svg.setAttribute('stroke','currentColor');svg.querySelectorAll('*').forEach(el=>{el.setAttribute('fill','none');el.setAttribute('stroke','currentColor')})});const h=location.hash.slice(1);if(['today','plan','cycle','discover','me'].includes(h))view(h);if('serviceWorker'in navigator)navigator.serviceWorker.register('/sw.js?v=8').catch(()=>{})}init();