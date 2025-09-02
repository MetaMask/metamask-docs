document.addEventListener("DOMContentLoaded", function () {
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      const codeBlocks = document.querySelectorAll("code");

      codeBlocks.forEach(function (codeBlock) {
        const hasCodeFocus = codeBlock.querySelector(".code-focus") !== null;

        if (hasCodeFocus) {
          codeBlock.classList.add("blurred-code");
        }
      });
    });
  });

  // Start observing the document for additions to the DOM
  observer.observe(document.body, { childList: true, subtree: true });
});
