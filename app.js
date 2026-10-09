const opening = document.querySelector('#opening');
const invitation = document.querySelector('#invitation');
const music = document.querySelector('#music');
const toggle = document.querySelector('#music-toggle');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const params = new URLSearchParams(location.search);
let opened = false;
document.body.classList.add('cover-visible');
function updateMusic() {
  toggle.setAttribute('aria-pressed', String(!music.paused));
  toggle.setAttribute('aria-label', music.paused ? 'تشغيل الموسيقى' : 'إيقاف الموسيقى');
  toggle.textContent = music.paused ? '♫' : 'Ⅱ';
}
music.addEventListener('play', updateMusic);
music.addEventListener('pause', updateMusic);
music.addEventListener('error', updateMusic);
toggle.addEventListener('click', async () => {
  if (!music.paused) music.pause();
  else { try { await music.play(); } catch { updateMusic(); } }
});
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
}, { threshold: .08 });
function gentlyScrollAfterReveal() {
  if (reducedMotion) return;
  let timer;
  let frame;
  let stopped = false;
  let started;
  let previousBehavior;
  const interruptEvents = ['wheel', 'touchstart', 'pointerdown', 'keydown'];
  const stop = () => {
    stopped = true;
    clearTimeout(timer);
    cancelAnimationFrame(frame);
    if (previousBehavior !== undefined) {
      document.documentElement.style.scrollBehavior = previousBehavior;
    }
    interruptEvents.forEach(type => window.removeEventListener(type, stop));
  };
  interruptEvents.forEach(type => window.addEventListener(type, stop, { passive: true }));
  timer = setTimeout(() => {
    if (stopped) return;
    const from = window.scrollY;
    const remaining = document.documentElement.scrollHeight - window.innerHeight - from;
    const distance = Math.min(Math.max(Math.round(window.innerHeight * .13), 72), 120, remaining);
    if (distance <= 1) { stop(); return; }
    previousBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    const animate = now => {
      if (stopped) return;
      if (started === undefined) started = now;
      const progress = Math.min((now - started) / 2000, 1);
      const eased = progress < .5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      window.scrollTo({ top: from + distance * eased, left: 0, behavior: 'auto' });
      if (progress < 1) frame = requestAnimationFrame(animate);
      else stop();
    };
    frame = requestAnimationFrame(animate);
  }, 800);
}
function showInvitation(playMusic = true) {
  if (opened) return;
  opened = true;
  if (playMusic) { music.volume = .55; music.play().catch(updateMusic); }
  document.querySelector('.cover').classList.add('flipping');
  if (!reducedMotion && playMusic) {
    for (let i = 0; i < 22; i++) {
      const petal = document.createElement('span'); petal.className = 'petal';
      Object.assign(petal.style, { left: `${Math.random() * 100}%`, width: `${8 + Math.random() * 14}px`, height: '18px', animationDelay: `${Math.random() * .8}s` });
      document.body.append(petal); setTimeout(() => petal.remove(), 4500);
    }
  }
  setTimeout(() => {
    invitation.hidden = false; toggle.hidden = false;
    document.body.classList.remove('cover-visible'); opening.style.opacity = '0';
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    window.scrollTo(0, 0);
    setTimeout(() => {
      opening.hidden = true;
      if (playMusic) {
        document.querySelector('.scroll-cue').focus({ preventScroll: true });
        gentlyScrollAfterReveal();
      }
    }, reducedMotion ? 0 : 700);
  }, reducedMotion || !playMusic ? 0 : 1400);
}
document.querySelector('#open').addEventListener('click', () => showInvitation());
const guest = params.get('guest')?.replace(/-/g, ' ').replace(/\s+/g, ' ').trim();
if (guest) { document.querySelector('#guest-name').textContent = guest; document.querySelector('#guest').hidden = false; }
if (params.has('preview')) showInvitation(false);
const wedding = new Date('2026-12-25T18:00:00+03:00').getTime();
function countdown() {
  const total = Math.max(0, Math.floor((wedding - Date.now()) / 1000));
  const values = { days: Math.floor(total / 86400), hours: Math.floor(total % 86400 / 3600), minutes: Math.floor(total % 3600 / 60), seconds: total % 60 };
  Object.entries(values).forEach(([key, value]) => { document.getElementById(key).textContent = String(value).padStart(2, '0'); });
}
countdown(); setInterval(countdown, 1000);
document.querySelector('#calendar').href = 'https://www.google.com/calendar/render?' + new URLSearchParams({action:'TEMPLATE',text:'حفل زفاف علي و ميس',dates:'20261225T150000Z/20261225T170000Z',ctz:'Asia/Amman',details:'يسعدنا دعوتكم لحضور حفل زفاف علي و ميس في صالة السوسنة.',location:'صالة السوسنة، الأردن'});
