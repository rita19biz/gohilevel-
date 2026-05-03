// Order form validation and submission

const packagePrices = {
  starter: { label: '1 Bottle — Starter', price: '$39.99' },
  growth:  { label: '3 Bottles — Growth Kit', price: '$99.99' },
  ultimate:{ label: '6 Bottles — Ultimate Bundle', price: '$179.99' },
};

const validators = {
  firstName: v => v.trim().length >= 2  ? '' : 'Please enter your first name.',
  lastName:  v => v.trim().length >= 2  ? '' : 'Please enter your last name.',
  email:     v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.',
  phone:     v => v.trim().length >= 7  ? '' : 'Please enter a valid phone number.',
  address:   v => v.trim().length >= 5  ? '' : 'Please enter your shipping address.',
  city:      v => v.trim().length >= 2  ? '' : 'Please enter your city.',
  zip:       v => v.trim().length >= 3  ? '' : 'Please enter your ZIP / postal code.',
  country:   v => v !== ''              ? '' : 'Please select your country.',
  package:   v => v !== ''              ? '' : 'Please select a package.',
};

function showError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + 'Error');
  if (input) input.classList.toggle('invalid', !!message);
  if (error) error.textContent = message;
}

function validateField(fieldId) {
  const input = document.getElementById(fieldId);
  if (!input || !validators[fieldId]) return true;
  const error = validators[fieldId](input.value);
  showError(fieldId, error);
  return error === '';
}

// Live validation on blur
Object.keys(validators).forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('blur', () => validateField(id));
});

document.getElementById('orderForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const fields = Object.keys(validators);
  const valid = fields.map(id => validateField(id)).every(Boolean);

  if (!valid) {
    const firstInvalid = fields.find(id => !validateField(id));
    if (firstInvalid) document.getElementById(firstInvalid).focus();
    return;
  }

  // Show loading state
  const btn     = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const btnLoad = document.getElementById('btnLoading');
  btn.disabled    = true;
  btnText.style.display = 'none';
  btnLoad.style.display = 'inline';

  // Collect form data and persist for thank-you page
  const data = {
    firstName: document.getElementById('firstName').value.trim(),
    lastName:  document.getElementById('lastName').value.trim(),
    email:     document.getElementById('email').value.trim(),
    address:   document.getElementById('address').value.trim(),
    city:      document.getElementById('city').value.trim(),
    zip:       document.getElementById('zip').value.trim(),
    country:   document.getElementById('country').value,
    package:   document.getElementById('package').value,
  };

  sessionStorage.setItem('luxegrow_order', JSON.stringify(data));

  // Simulate brief processing delay then redirect
  setTimeout(() => {
    window.location.href = 'thank-you.html';
  }, 1200);
});
