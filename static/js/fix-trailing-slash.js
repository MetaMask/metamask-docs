if (window && window.location && window.location.pathname.endsWith('/') && window.location.pathname !== '/') {
    // Preserve query parameters and hash when removing trailing slash
    const newPath = window.location.pathname.substr(0, window.location.pathname.length - 1);
    const search = window.location.search || '';
    const hash = window.location.hash || '';
    window.history.replaceState('', '', newPath + search + hash);
}
