(() => {
  const form = document.getElementById('lookupForm');
  const input = document.getElementById('phoneInput');
  const error = document.getElementById('formError');
  const results = document.getElementById('results');
  const searchButton = document.getElementById('searchButton');
  const clearButton = document.getElementById('clearButton');

  const setText = (id, value) => { document.getElementById(id).textContent = value; };
  const typeNames = {
    MOBILE: 'Mobile', FIXED_LINE: 'Fixed line', FIXED_LINE_OR_MOBILE: 'Fixed / mobile',
    TOLL_FREE: 'Toll free', PREMIUM_RATE: 'Premium rate', SHARED_COST: 'Shared cost',
    VOIP: 'VoIP', PERSONAL_NUMBER: 'Personal number', PAGER: 'Pager', UAN: 'UAN', UNKNOWN: 'Unknown'
  };

  function analyze(raw) {
    if (!window.libphonenumber) {
      throw new Error('Phone validation library did not load. Check your internet connection and reload.');
    }
    const cleaned = raw.trim();
    if (!cleaned) throw new Error('Masukkan nomor telepon terlebih dahulu.');
    const parsed = window.libphonenumber.parsePhoneNumberFromString(cleaned, 'ID');
    if (!parsed) throw new Error('Format nomor tidak dikenali. Coba gunakan kode negara, misalnya +62812...');
    const possible = parsed.isPossible();
    const valid = parsed.isValid();
    const region = parsed.country || 'Unknown / undetermined';
    const countryName = region !== 'Unknown / undetermined' && window.Intl?.DisplayNames
      ? new Intl.DisplayNames(['id'], { type: 'region' }).of(region)
      : region;
    const type = parsed.getType() || 'UNKNOWN';
    return {
      e164: parsed.number,
      international: parsed.formatInternational(),
      national: parsed.formatNational(),
      country: countryName || region,
      region,
      type: typeNames[type] || 'Unknown',
      possible,
      valid
    };
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    error.textContent = '';
    searchButton.disabled = true;
    searchButton.querySelector('span').textContent = 'ANALYZING...';
    try {
      const data = analyze(input.value);
      setText('normalizedNumber', data.e164);
      setText('internationalNumber', `International: ${data.international} · National: ${data.national}`);
      setText('validity', data.valid ? 'VALID' : (data.possible ? 'POSSIBLE' : 'INVALID'));
      document.getElementById('validity').style.color = data.valid ? 'var(--green)' : '#f0c46d';
      setText('country', data.country);
      setText('countryCode', `ISO region: ${data.region}`);
      setText('numberType', data.type);
      setText('possible', data.possible ? 'Yes' : 'No');
      setText('resultHeadline', data.valid ? 'NUMBER FORMAT VALIDATED' : 'NUMBER FORMAT NEEDS REVIEW');
      setText('resultSubline', 'Numbering metadata parsed locally in this browser. No identity lookup was performed.');
      results.classList.remove('hidden');
      results.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (err) {
      error.textContent = err.message || 'Terjadi kesalahan saat memproses nomor.';
      results.classList.add('hidden');
    } finally {
      searchButton.disabled = false;
      searchButton.querySelector('span').textContent = 'ANALYZE NUMBER';
    }
  });

  clearButton.addEventListener('click', () => {
    input.value = '';
    error.textContent = '';
    results.classList.add('hidden');
    input.focus();
    document.getElementById('lookup').scrollIntoView({ behavior: 'smooth' });
  });
})();
