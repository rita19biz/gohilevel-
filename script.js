// Sales page JS — Purchase Ticker

const purchases = [
  { name: 'Chidinma', city: 'Lagos Island' },
  { name: 'Ngozi', city: 'Abuja' },
  { name: 'Fatima', city: 'Kano' },
  { name: 'Adaeze', city: 'Enugu' },
  { name: 'Yetunde', city: 'Ibadan' },
  { name: 'Blessing', city: 'Port Harcourt' },
  { name: 'Chiamaka', city: 'Onitsha' },
  { name: 'Zainab', city: 'Kaduna' },
  { name: 'Chibundo', city: 'Aba' },
  { name: 'Toyin', city: 'Abeokuta' },
  { name: 'Aisha', city: 'Sokoto' },
  { name: 'Kemi', city: 'Ikeja, Lagos' },
  { name: 'Nneka', city: 'Owerri' },
  { name: 'Ifunanya', city: 'Anambra' },
  { name: 'Chioma', city: 'Asaba' },
  { name: 'Esther', city: 'Jos' },
  { name: 'Grace', city: 'Benin City' },
  { name: 'Patience', city: 'Uyo' },
  { name: 'Toluwalope', city: 'Surulere, Lagos' },
  { name: 'Funmilayo', city: 'Ilorin' },
  { name: 'Amara', city: 'Awka' },
  { name: 'Obiageli', city: 'Warri' },
  { name: 'Uchechi', city: 'Calabar' },
  { name: 'Emeka', city: 'Lekki, Lagos' },
  { name: 'Chukwudi', city: 'Maiduguri' },
  { name: 'Tunde', city: 'Osogbo' },
  { name: 'Dayo', city: 'Akure' },
  { name: 'Musa', city: 'Katsina' },
  { name: 'Ahmad', city: 'Bauchi' },
  { name: 'Chidi', city: 'Umuahia' },
  { name: 'Nnamdi', city: 'Lokoja' },
  { name: 'Ikenna', city: 'Nnewi' },
  { name: 'Sonia', city: 'Wuse, Abuja' },
  { name: 'Rejoice', city: 'Yola' },
  { name: 'Precious', city: 'Makurdi' },
  { name: 'Oluwaseun', city: 'Ikorodu, Lagos' },
  { name: 'Adunola', city: 'Ile-Ife' },
  { name: 'Chinyere', city: 'Orlu' },
  { name: 'Maryam', city: 'Gusau' },
  { name: 'Halimah', city: 'Birnin Kebbi' },
];

let tickerClosed = false;
let tickerIdx = Math.floor(Math.random() * purchases.length);
const ticker    = document.getElementById('purchaseTicker');
const tickerMsg = document.getElementById('tickerMsg');

function showTicker() {
  if (tickerClosed || !ticker) return;
  const p = purchases[tickerIdx % purchases.length];
  tickerIdx++;

  tickerMsg.innerHTML =
    `<span class="ticker-name">${p.name}</span> from <span class="ticker-loc">${p.city}</span> ` +
    `just ordered <span class="ticker-product">Adaure Argan Hair Oil!</span>`;

  ticker.classList.remove('ticker-hidden', 'ticker-exit');
  ticker.classList.add('ticker-enter');

  setTimeout(() => {
    if (!tickerClosed) hideTicker();
  }, 5500);
}

function hideTicker() {
  if (!ticker) return;
  ticker.classList.remove('ticker-enter');
  ticker.classList.add('ticker-exit');
  setTimeout(() => {
    ticker.classList.add('ticker-hidden');
    ticker.classList.remove('ticker-exit');
  }, 450);
}

function closeTicker() {
  tickerClosed = true;
  hideTicker();
}

// First show after 4s, then repeat every 12s
setTimeout(() => {
  showTicker();
  setInterval(() => { if (!tickerClosed) showTicker(); }, 12000);
}, 4000);

// Auto-select package from URL param
(function () {
  const params = new URLSearchParams(window.location.search);
  const pkg = params.get('pkg');
  if (pkg) sessionStorage.setItem('adaure_preselect_pkg', pkg);
})();

// Smooth scroll for any #anchor links on this page
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
