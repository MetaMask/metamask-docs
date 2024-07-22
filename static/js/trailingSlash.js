// custom handling of trailing slash static/trailingSlash.js
(function() {
  if (window.location.pathname.substr(-1) !== '/') {
    window.location.pathname += '/';
  }
})();
