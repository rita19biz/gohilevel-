// Order form — package selection, validation, submission

// Pre-select package if coming from sales page
(function () {
  const saved = sessionStorage.getItem('adaure_preselect_pkg');
  const urlPkg = new URLSearchParams(window.location.search).get('pkg');
  const target = urlPkg || saved;
  if (target) {
    const opt = document.querySelector(`.pkg-opt[data-pkg="${target}"]`);
    if (opt) {
      document.querySelectorAll('.pkg-opt').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      document.getElementById('selectedPkg').value   = opt.dataset.pkg;
      document.getElementById('selectedPrice').value  = opt.dataset.price;
      document.getElementById('selectedLabel').value  = opt.dataset.label;
    }
  }
})();

function selectPkg(el) {
  document.querySelectorAll('.pkg-opt').forEach(o => o.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('selectedPkg').value   = el.dataset.pkg;
  document.getElementById('selectedPrice').value  = el.dataset.price;
  document.getElementById('selectedLabel').value  = el.dataset.label;
}

// Validators
const rules = {
  firstName:  v => v.trim().length >= 2  ? '' : 'Please enter your first name.',
  lastName:   v => v.trim().length >= 2  ? '' : 'Please enter your last name.',
  callPhone:  v => v.trim().replace(/\D/g,'').length >= 7 ? '' : 'Please enter a valid phone number.',
  address:    v => v.trim().length >= 5  ? '' : 'Please enter your delivery address.',
  city:       v => v.trim().length >= 2  ? '' : 'Please enter your city or town.',
  state:      v => v !== ''              ? '' : 'Please select your state.',
  hairIssue:  v => v.trim().length >= 3  ? '' : 'Please describe your current hair issue.',
};

function showErr(id, msg) {
  const input = document.getElementById(id);
  const err   = document.getElementById(id + 'Err');
  if (input) input.classList.toggle('err', !!msg);
  if (err)   err.textContent = msg;
}

function validate(id) {
  const el = document.getElementById(id);
  if (!el || !rules[id]) return true;
  const msg = rules[id](el.value);
  showErr(id, msg);
  return msg === '';
}

// Live validation on blur
Object.keys(rules).forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('blur', () => validate(id));
});

document.getElementById('orderForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const fields  = Object.keys(rules);
  const allValid = fields.map(id => validate(id)).every(Boolean);

  if (!allValid) {
    const first = fields.find(id => !validate(id));
    if (first) document.getElementById(first).focus();
    return;
  }

  // Show loading
  const btn     = document.getElementById('submitBtn');
  const text    = document.getElementById('btnText');
  const spinner = document.getElementById('spinner');
  btn.disabled         = true;
  text.style.display   = 'none';
  spinner.style.display = 'inline-block';

  // Collect data
  const data = {
    firstName:   document.getElementById('firstName').value.trim(),
    lastName:    document.getElementById('lastName').value.trim(),
    email:       document.getElementById('email').value.trim(),
    callCode:    document.getElementById('callCode').value,
    callPhone:   document.getElementById('callPhone').value.trim(),
    waCode:      document.getElementById('waCode').value,
    waPhone:     document.getElementById('waPhone').value.trim(),
    address:     document.getElementById('address').value.trim(),
    city:        document.getElementById('city').value.trim(),
    state:       document.getElementById('state').value,
    deliveryNote:document.getElementById('deliveryNote').value.trim(),
    hairIssue:   document.getElementById('hairIssue').value.trim(),
    pkg:         document.getElementById('selectedPkg').value,
    price:       document.getElementById('selectedPrice').value,
    pkgLabel:    document.getElementById('selectedLabel').value,
  };

  sessionStorage.setItem('adaure_order', JSON.stringify(data));

  setTimeout(() => {
    window.location.href = 'thank-you.html';
  }, 1000);
});
