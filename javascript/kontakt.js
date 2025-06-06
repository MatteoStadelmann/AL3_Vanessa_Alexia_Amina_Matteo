// javascript/kontakt.js

window.addEventListener('DOMContentLoaded', () => {
    const form    = document.getElementById('kontakt-form');
    const spinner = document.getElementById('spinner');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearErrors();
  
      const vorname   = document.getElementById('vorname').value.trim();
      const nachname  = document.getElementById('nachname').value.trim();
      const email     = document.getElementById('email').value.trim();
      const telefon   = document.getElementById('telefon').value.trim();
      const nachricht = document.getElementById('nachricht').value.trim();
  
      let valid = true;
      if (!/^[A-Za-zÄÖÜäöüß]{2,}$/.test(vorname)) {
        valid = false;
        showError('vorname', 'Vorname muss mindestens 2 Buchstaben enthalten.');
      }
      if (!/^[A-Za-zÄÖÜäöüß]{2,}$/.test(nachname)) {
        valid = false;
        showError('nachname', 'Nachname muss mindestens 2 Buchstaben enthalten.');
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        valid = false;
        showError('email', 'Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      }
      if (telefon.length > 0 && !/^[0-9+\s-]{7,20}$/.test(telefon)) {
        valid = false;
        showError('telefon', 'Telefonnummer (7–20 Zeichen, Ziffern, Leerzeichen, +, -).');
      }
      if (nachricht.length < 10 || nachricht.length > 1000) {
        valid = false;
        showError('nachricht', 'Nachricht muss zwischen 10 und 1000 Zeichen lang sein.');
      }
      if (!valid) return;
  
      spinner.classList.remove('hidden');
  
      try {
        const existsResult = await dbClient.query(
          "SELECT COUNT(*) AS cnt FROM kontakt WHERE email = ?;",
          [email]
        );
        // existsResult[1] enthält die Datenzeilen
        const count = existsResult[1][0].cnt;
        if (count > 0) {
          showError('email', 'Diese E-Mail wird schon verwendet.');
          return;
        }
  
        await dbClient.insertInto("kontakt", {
          vorname:   vorname,
          nachname:  nachname,
          email:     email,
          telefon:   telefon,
          nachricht: nachricht
        });
        alert('Ihre Nachricht wurde erfolgreich gesendet!');
        form.reset();
      } catch (err) {
        console.error("DB‐Error im Formular:", err);
        alert('Fehler beim Speichern. Bitte versuchen Sie es später erneut.');
      } finally {
        spinner.classList.add('hidden');
      }
    });
  });
  
  function showError(fieldId, message) {
    const errorEl = document.getElementById('error-' + fieldId);
    errorEl.textContent = message;
    document.getElementById(fieldId).classList.add('input-error');
  }
  
  function clearErrors() {
    ['vorname','nachname','email','telefon','nachricht'].forEach(id => {
      document.getElementById('error-' + id).textContent = '';
      document.getElementById(id).classList.remove('input-error');
    });
  }