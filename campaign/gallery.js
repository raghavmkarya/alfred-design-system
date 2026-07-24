(() => {
  const assets = window.ALFRED_CAMPAIGN_CATALOG?.assets || [];
  const form = document.querySelector("#filters");
  const grid = document.querySelector("#gallery-grid");
  const status = document.querySelector("#gallery-status");
  const previous = document.querySelector("#previous");
  const next = document.querySelector("#next");
  const pageLabel = document.querySelector("#page-label");
  const pageSize = 18;
  let page = 0;

  const dimensions = [
    "campaignId",
    "family",
    "platform",
    "placement",
    "composition",
    "theme",
    "copyMode",
    "approvalState",
    "outputType",
  ];
  for (const key of dimensions) {
    const select = form.elements[key];
    const values = [...new Set(assets.map((asset) => asset[key]))].sort();
    for (const value of values) select.add(new Option(value.replaceAll("-", " "), value));
  }

  function selectedAssets() {
    const data = new FormData(form);
    return assets.filter((asset) =>
      dimensions.every((key) => !data.get(key) || asset[key] === data.get(key)),
    );
  }

  function render() {
    const filtered = selectedAssets();
    const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
    page = Math.min(page, pages - 1);
    const visible = filtered.slice(page * pageSize, (page + 1) * pageSize);
    const safe = form.elements.safe.checked ? "&safe=1" : "";
    const crop = form.elements.crop.value
      ? `&crop=${encodeURIComponent(form.elements.crop.value)}`
      : "";
    status.textContent = `${filtered.length.toLocaleString()} visible of ${assets.length.toLocaleString()} public-safe variants`;
    grid.innerHTML = visible
      .map((asset) => {
        const scale = 300 / Math.max(asset.dimensions.width, asset.dimensions.height);
        const link = `render.html?asset=${encodeURIComponent(asset.assetId)}${safe}${crop}`;
        return `
          <article class="asset-card">
            <div class="asset-preview">
              <iframe title="${asset.family} preview" loading="lazy" src="${link}" style="--source-width:${asset.dimensions.width}px;--source-height:${asset.dimensions.height}px;--preview-scale:${scale}"></iframe>
            </div>
            <div class="asset-meta">
              <h2>${asset.family.replaceAll("-", " ")}</h2>
              <p>${asset.platform} ${asset.placement} · ${asset.dimensions.width} × ${asset.dimensions.height}<br>${asset.composition} · ${asset.copyMode} · ${asset.theme}</p>
              <a href="${link}" target="_blank" rel="noreferrer">Open exact master</a>
            </div>
          </article>`;
      })
      .join("");
    pageLabel.textContent = `Page ${page + 1} of ${pages}`;
    previous.disabled = page === 0;
    next.disabled = page >= pages - 1;
  }

  form.addEventListener("change", () => { page = 0; render(); });
  previous.addEventListener("click", () => { page -= 1; render(); scrollTo({ top: 0, behavior: "smooth" }); });
  next.addEventListener("click", () => { page += 1; render(); scrollTo({ top: 0, behavior: "smooth" }); });
  render();
})();
