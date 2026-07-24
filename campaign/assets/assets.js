(() => {
  const data = window.ALFRED_PRODUCT_ASSETS;
  document.querySelector("#product-gallery").innerHTML = data.productShots
    .map(
      (product) => `
        <article>
          <iframe title="${product.alt}" loading="lazy" src="./product-shot.html?product=${product.id}&crop=desktop"></iframe>
          <h3>${product.name}</h3>
          <p>${product.focus}</p>
          <span>Desktop · portrait · square · motion-ready</span>
        </article>`,
    )
    .join("");
  document.querySelector("#illustration-gallery").innerHTML = data.illustrations
    .map(
      (illustration) => `
        <article>
          <img src="../generated/alfred-flagship-launch/illustrations/${illustration.id}.svg" alt="${illustration.alt}" />
          <h3>${illustration.id.replaceAll("-", " ")}</h3>
          <p>${illustration.alt}</p>
        </article>`,
    )
    .join("");
  document.body.dataset.ready = "1";
})();
