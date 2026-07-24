(() => {
  const catalog = window.ALFRED_CAMPAIGN_CATALOG;
  const mediaKit = window.ALFRED_MEDIA_KIT;
  const headline = catalog.assets.find(
    (asset) => asset.family === "category-definition" && asset.copyMode === "long",
  );
  document.querySelector("#press-headline").textContent =
    headline?.content.headline || "Decision intelligence for every function.";
  document.querySelector("#press-state").textContent =
    `${catalog.campaign.lifecycle} preview · not for distribution`;

  const publicAssets = mediaKit.assets.filter(
    (asset) => mediaKit.publicBundle.includes(asset.assetId) && asset.status === "public",
  );
  document.querySelector("#media-assets").innerHTML = publicAssets
    .map(
      (asset) => `
        <article>
          <span>${asset.kind.replaceAll("-", " ")}</span>
          <h3>${asset.assetId.replaceAll("-", " ")}</h3>
          <p>${asset.alt}</p>
          <a href="../../${asset.source}" download>Download approved source</a>
        </article>`,
    )
    .join("");
  document.body.dataset.publicAssetCount = String(publicAssets.length);
  document.body.dataset.ready = "1";
})();
