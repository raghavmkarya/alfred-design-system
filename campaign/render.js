(() => {
  const payload = window.ALFRED_CAMPAIGN_CATALOG;
  const params = new URLSearchParams(location.search);
  const assetId = params.get("asset") || payload?.assets?.[0]?.assetId;
  const showSafeZones = params.get("safe") === "1";
  const crop = params.get("crop") || "";
  const asset = payload?.assets?.find((item) => item.assetId === assetId);
  const root = document.querySelector("#asset-root");

  if (!asset) {
    root.innerHTML = '<p class="render-error">Campaign asset not found.</p>';
    document.body.dataset.ready = "1";
    return;
  }

  const escaped = (value) =>
    String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");

  function productProof() {
    return `
      <section class="proof-window" aria-label="Alfred product proof">
        <div class="proof-window__bar">
          <span></span><span></span><span></span>
          <strong>Daily Brief</strong>
          <small>Northwind Labs demo</small>
        </div>
        <div class="proof-window__body">
          <div class="brief-nav">
            <i></i><i></i><i></i><i></i>
          </div>
          <div class="brief-main">
            <p class="proof-kicker">What changed</p>
            <strong>Paid demand softened while branded discovery rose.</strong>
            <div class="mini-chart"><span></span><span></span><span></span><span></span><span></span><span></span></div>
            <div class="decision-row"><b>Recommended next step</b><em>Review evidence</em></div>
          </div>
        </div>
      </section>`;
  }

  function illustration() {
    const nodes = ["Signal", "Evidence", "Decision", "Action"];
    return `
      <section class="system-illustration" aria-label="Signal to evidence to decision illustration">
        <div class="orbit orbit-a"></div>
        <div class="orbit orbit-b"></div>
        <div class="memory-core"><span>A</span><small>Alfred Core</small></div>
        ${nodes.map((label, index) => `<div class="system-node node-${index + 1}"><i></i><span>${label}</span></div>`).join("")}
      </section>`;
  }

  function supportingVisual() {
    if (asset.composition === "product-led" && asset.primitive !== "annotation-rail") {
      return window.AlfredCampaignPrimitives.render({ ...asset, primitive: "product-window" });
    }
    if (asset.composition === "illustration-led" && asset.primitive !== "memory-map") {
      return window.AlfredCampaignPrimitives.render({ ...asset, primitive: "memory-map" });
    }
    return window.AlfredCampaignPrimitives.render(asset);
  }

  function safeZones() {
    const overlays = showSafeZones
      ? asset.safeZones
      .map(
        (zone) => `
          <div class="safe-zone" style="inset:${zone.top}px ${zone.right}px ${zone.bottom}px ${zone.left}px">
            <span>${escaped(zone.zoneId)} safe zone</span>
          </div>`,
      )
      .join("")
      : "";
    const cropZone = crop
      ? asset.safeZones.find((zone) => zone.zoneId === crop)
      : null;
    const cropOverlay = cropZone
      ? `<div class="crop-zone" style="inset:${cropZone.top}px ${cropZone.right}px ${cropZone.bottom}px ${cropZone.left}px"><span>${escaped(cropZone.zoneId)} crop preview</span></div>`
      : "";
    return `${overlays}${cropOverlay}`;
  }

  const disclaimer =
    asset.content.proofClassification === "northwind-demo"
      ? "Northwind Labs demo"
      : asset.content.citationIds.length
        ? `Sources: ${asset.content.citationIds.join(", ")}`
        : "Claims require approval before public export";

  document.documentElement.dataset.theme = asset.theme;
  document.documentElement.style.setProperty("--frame-w", `${asset.dimensions.width}px`);
  document.documentElement.style.setProperty("--frame-h", `${asset.dimensions.height}px`);
  document.body.style.width = `${asset.dimensions.width}px`;
  document.body.style.height = `${asset.dimensions.height}px`;
  document.body.dataset.crop = crop;
  const primarySafeZone = asset.safeZones[0];
  root.innerHTML = `
    <article class="campaign-frame composition-${asset.composition} ratio-${asset.dimensions.aspectRatio.replace(":", "-")}" data-family="${escaped(asset.family)}" data-lifecycle="${escaped(asset.campaignLifecycle)}" data-copy-mode="${escaped(asset.copyMode)}" style="--safe-top:${primarySafeZone.top}px;--safe-right:${primarySafeZone.right}px;--safe-bottom:${primarySafeZone.bottom}px;--safe-left:${primarySafeZone.left}px">
      <header class="campaign-header">
        <img src="../assets/logos/${asset.theme === "dark" ? "alfred-logo-white.svg" : "alfred-logo-primary.svg"}" alt="Alfred" />
        <span>${escaped(asset.platform)} / ${escaped(asset.placement)}</span>
      </header>
      <section class="campaign-message">
        <p class="campaign-eyebrow">${escaped(asset.content.eyebrow)}</p>
        <h1>${escaped(asset.content.headline)}</h1>
        ${asset.content.proof ? `<p class="campaign-proof">${escaped(asset.content.proof)}</p>` : ""}
      </section>
      ${supportingVisual()}
      <footer class="campaign-footer">
        <span class="campaign-cta">${escaped(asset.content.cta)} <b aria-hidden="true">→</b></span>
        <span class="campaign-disclaimer">${escaped(disclaimer)}</span>
      </footer>
      <span class="campaign-index">${escaped(asset.family.replaceAll("-", " "))}</span>
      ${["approved", "public"].includes(asset.campaignLifecycle) ? "" : `<span class="state-watermark">${escaped(asset.campaignLifecycle)} preview · not for distribution</span>`}
      ${safeZones()}
    </article>`;
  document.title = `${asset.family} | ${asset.platform} ${asset.placement}`;
  document.body.dataset.ready = "1";
})();
