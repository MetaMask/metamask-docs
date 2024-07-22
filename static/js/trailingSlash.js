// custom handling of trailing slash
(function() {
  if (window.location.pathname.substr(-1) !== '/') {
    window.location.pathname += '/';
  }
})();
