// Thank You page — populate order summary & launch confetti

function populateSummary() {
  const raw = sessionStorage.getItem('adaure_order');
  if (!raw) return;

  const d = JSON.parse(raw);
  const fullName = `${d.firstName} ${d.lastName}`.trim();

  const el = id => document.getElementById(id);

  if (el('customerName')) el('customerName').textContent = d.firstName + '!';
  if (el('summaryName'))    el('summaryName').textContent    = fullName;
  if (el('summaryPackage')) el('summaryPackage').textContent = d.pkgLabel || d.pkg;
  if (el('summaryPrice'))   el('summaryPrice').textContent   = d.price    || '—';
  if (el('summaryPhone'))   el('summaryPhone').textContent   = (d.callCode || '') + ' ' + (d.callPhone || '—');

  const addr = [d.address, d.city, d.state].filter(Boolean).join(', ');
  if (el('summaryAddress')) el('summaryAddress').textContent = addr || '—';
}

// Confetti
function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#C9961A', '#E8B830', '#7B1A1A', '#FFFFFF', '#A07A10', '#FF6B6B', '#FFE066'];
  const pieces = Array.from({ length: 140 }, () => ({
    x:     Math.random() * canvas.width,
    y:     Math.random() * canvas.height - canvas.height,
    w:     Math.random() * 11 + 5,
    h:     Math.random() * 7 + 3,
    color: colors[Math.floor(Math.random() * colors.length)],
    speed: Math.random() * 3 + 1.5,
    angle: Math.random() * 360,
    spin:  (Math.random() - 0.5) * 7,
    drift: (Math.random() - 0.5) * 1.5,
  }));

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      ctx.save();
      ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
      ctx.rotate((p.angle * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, 1 - frame / 200);
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
      p.y     += p.speed;
      p.x     += p.drift;
      p.angle += p.spin;
    });
    frame++;
    if (frame < 220) requestAnimationFrame(draw);
    else { ctx.clearRect(0, 0, canvas.width, canvas.height); }
  }
  draw();
}

document.addEventListener('DOMContentLoaded', () => {
  populateSummary();
  launchConfetti();
});

window.addEventListener('resize', () => {
  const canvas = document.getElementById('confetti-canvas');
  if (canvas) { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
});
