// Discourage casual saving of portfolio images; Friends keeps its download controls.
// Publicly displayed images cannot be made copy-proof.
(() => {
  const isPortfolioPhoto = (target) => target instanceof HTMLImageElement &&
    !!target.closest('.hero-image, .gallery-item, .photogram-item');
  for (const eventName of ['contextmenu', 'dragstart']) {
    document.addEventListener(eventName, (event) => {
      if (isPortfolioPhoto(event.target)) event.preventDefault();
    });
  }
})();
