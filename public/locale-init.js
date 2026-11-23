// Run before first paint so the saved language and color theme are active immediately
// and the page does not flash default values on reload.
(function () {
  var root = document.documentElement;
  try {
    var savedLocale = localStorage.getItem('portfolio-locale');
    var locale = savedLocale === 'en' || savedLocale === 'es' ? savedLocale : 'es';
    root.dataset.locale = locale;
    root.lang = locale;

    var savedTheme = localStorage.getItem('portfolio-theme');
    var theme =
      savedTheme === 'editorial' || savedTheme === 'daylight' || savedTheme === 'precision'
        ? savedTheme
        : 'precision';
    root.dataset.theme = theme;
  } catch (e) {
    // Private browsing or blocked storage falls back to defaults.
    root.dataset.locale = 'es';
    root.dataset.theme = 'precision';
  }
})();
