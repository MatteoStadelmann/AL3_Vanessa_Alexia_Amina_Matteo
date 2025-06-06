document.getElementById('mehr-erfahren').addEventListener('click', function () {
    const extra = document.getElementById('extra-text');
    if (extra.style.display === 'block') {
      extra.style.display = 'none';
      this.textContent = 'MEHR ERFAHREN';
    } else {
      extra.style.display = 'block';
      this.textContent = 'WENIGER ANZEIGEN';
    }
  });