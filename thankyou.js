// Thank You page — populate order summary + confetti

const packageLabels = {
  starter:  '1 Bottle — Starter · $39.99',
  growth:   '3 Bottles — Growth Kit · $99.99',
  ultimate: '6 Bottles — Ultimate Bundle · $179.99',
};

const countryNames = {
  US: 'United States', GB: 'United Kingdom', CA: 'Canada',
  AU: 'Australia', NG: 'Nigeria', ZA: 'South Africa',
  GH: 'Ghana', OTHER: 'International',
};

function populateSummary() {
  const raw = sessionStorage.getItem('luxegrow_order');
  if (!raw) return;

  const d = JSON.parse(raw);
  const name = `${d.firstName} ${d.lastName}`;

  document.getElementById('customerName').textContent = d.firstName + '!';
  document.getElementById('summaryName').textContent    = name;
  document.getElementById('summaryEmail').textContent   = d.email;
  document.getElementById('summaryPackage').textContent = packageLabels[d.package] || d.package;
  document.getElementById('summaryAddress').textContent =
    `${d.address}, ${d.city}, ${d.zip}, ${countryNames[d.country] || d.country}`;
}

// ── Confetti ────────────────────────────────────────────────
function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx    = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#C9A84C', '#E8CC7A', '#52B788', '#FFFFFF', '#A07832', '#2D6A4F'];
  const pieces = Array.from({ length: 120 }, () => ({
    x:    Math.random() * canvas.width,
    y:    Math.random() * canvas.height - canvas.height,
    w:    Math.random() * 10 + 5,
    h:    Math.random() * 6 + 3,
    color: colors[Math.floor(Math.random() * colors.length)],
    speed: Math.random() * 3 + 1.5,
    angle: Math.random() * 360,
    spin:  (Math.random() - 0.5) * 6,
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
      ctx.globalAlpha = Math.max(0, 1 - frame / 180);
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
      p.y     += p.speed;
      p.x     += p.drift;
      p.angle += p.spin;
    });
    frame++;
    if (frame < 200) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  draw();
}

document.addEventListener('DOMContentLoaded', () => {
  populateSummary();
  launchConfetti();
});

window.addEventListener('resize', () => {
  const canvas = document.getElementById('confetti-canvas');
  if (canvas) {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});
