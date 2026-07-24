(() => {
  const data = window.ALFRED_PRODUCT_ASSETS;
  const params = new URLSearchParams(location.search);
  const productId = params.get("product") || data.productShots[0].id;
  const cropId = params.get("crop") || "desktop";
  const transparent = params.get("transparent") === "1";
  const product = data.productShots.find((item) => item.id === productId);
  const crop = data.crops.find((item) => item.id === cropId);
  if (!product || !crop) {
    document.body.dataset.error = "invalid-product-or-crop";
    document.body.dataset.ready = "1";
    return;
  }
  document.documentElement.style.setProperty("--shot-width", `${crop.width}px`);
  document.documentElement.style.setProperty("--shot-height", `${crop.height}px`);
  document.querySelector("#product-name").textContent = product.name;
  document.querySelector("#product-focus").textContent = product.focus;
  document.querySelector("#product-id").textContent = product.id;
  document.querySelector(".product-canvas").setAttribute("aria-label", product.alt);
  document.body.dataset.product = product.id;
  document.body.dataset.crop = crop.id;
  if (transparent) document.body.dataset.transparent = "1";
  document.body.dataset.ready = "1";
})();
