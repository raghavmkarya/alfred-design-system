(() => {
  const params = new URLSearchParams(location.search);
  const view = params.get("view") || "deck";
  const mode = params.get("mode") || "confidential";
  const root = document.querySelector("#deck-root");
  const data = window.ALFRED_INVESTOR_DECK;

  const escape = (value) =>
    String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");

  function proofFooter(slide) {
    if (!slide.source && !slide.proofStatus) return "";
    return `<footer class="proof-footer"><span>Source: ${escape(slide.source)}</span><span>Period: ${escape(slide.period)}</span><span>Unit: ${escape(slide.unit)}</span><strong>${escape(slide.proofStatus)}</strong></footer>`;
  }

  function pattern(slide) {
    if (["chart", "market", "model", "allocation"].includes(slide.type)) {
      return `<div class="deck-chart" aria-label="Placeholder chart pattern"><i></i><i></i><i></i><i></i><i></i><span>Approved values enter from the source model</span></div>`;
    }
    if (["flow", "workflow", "gtm", "expansion"].includes(slide.type)) {
      return `<div class="deck-flow"><span>Signal</span><i></i><span>Evidence</span><i></i><span>Decision</span><i></i><span>Action</span></div>`;
    }
    if (["architecture", "moat"].includes(slide.type)) {
      return `<div class="deck-core"><span>Systems</span><span>Evidence</span><strong>Alfred Core<small>Decision memory</small></strong><span>Approval</span><span>Outcome</span></div>`;
    }
    if (slide.type === "competition") {
      return `<div class="position-map"><span>Passive reporting</span><span>Decision intelligence</span><span>Autonomous action</span><i></i><b>Alfred</b></div>`;
    }
    if (slide.type === "product") {
      const product = window.ALFRED_CAMPAIGN_CATALOG.assets.find((asset) => asset.family === "product-proof");
      return window.AlfredCampaignPrimitives.render({ ...product, primitive: "product-window" });
    }
    if (slide.type === "comparison") {
      return `<div class="deck-comparison"><div><small>Current state</small><strong>Fragmented interpretation</strong></div><i>→</i><div><small>With Alfred</small><strong>Evidence-backed decision path</strong></div></div>`;
    }
    if (slide.type === "team") {
      return `<div class="team-slots"><span>Approved founder</span><span>Approved leader</span><span>Approved advisor</span></div>`;
    }
    return `<div class="deck-lines"><i></i><i></i><i></i><i></i></div>`;
  }

  function slideMarkup(slide, index, total) {
    const publicMode = mode === "public";
    const watermark = publicMode ? "Public adaptation" : "Confidential · draft";
    return `
      <article class="investor-slide" data-slide-id="${escape(slide.id)}" data-slide-type="${escape(slide.type)}">
        <header><span>${escape(slide.kicker)}</span><span>${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}</span></header>
        <section class="slide-copy"><h1>${escape(slide.title)}</h1><p>${escape(slide.body)}</p></section>
        <section class="slide-pattern">${pattern(slide)}</section>
        ${proofFooter(slide)}
        <span class="deck-watermark">${watermark}</span>
      </article>`;
  }

  function compactPage(title, slides, kind) {
    return `<section class="compact-document ${kind}">
      <header><img src="../../assets/logos/alfred-logo-white.svg" alt="Alfred" /><span>${escape(title)}</span></header>
      <h1>${escape(slides[0].title)}</h1>
      <div class="compact-grid">${slides.map((slide) => `<article><span>${escape(slide.kicker)}</span><h2>${escape(slide.title)}</h2><p>${escape(slide.body)}</p></article>`).join("")}</div>
      <footer>Confidential · draft · v1.0.0</footer>
    </section>`;
  }

  function dataRoomPage(data) {
    return `<section class="data-room-document">
      <header><img src="../../assets/logos/alfred-logo-white.svg" alt="Alfred" /><span>Confidential data room</span></header>
      <h1>Alfred diligence materials</h1>
      <div>${data.dataRoomSections.map((section, index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><h2>${section}</h2><p>Approved ${section.toLowerCase()} files and section divider.</p></article>`).join("")}</div>
      <footer>Access-controlled source files only</footer>
    </section>`;
  }

  if (data) {
      if (view === "teaser") {
        root.innerHTML = compactPage("Investor teaser", data.slides.slice(0, 6), "teaser");
      } else if (view === "summary") {
        const ids = ["thesis", "product", "market", "moat", "traction", "team", "vision"];
        root.innerHTML = compactPage(
          "Visual executive summary",
          data.slides.filter((slide) => ids.includes(slide.id)),
          "summary",
        );
      } else if (view === "data-room") {
        root.innerHTML = dataRoomPage(data);
      } else {
        root.innerHTML = `<section class="investor-deck">${data.slides.map((slide, index) => slideMarkup(slide, index, data.slides.length)).join("")}</section>`;
      }
      document.body.dataset.view = view;
      document.body.dataset.mode = mode;
    document.body.dataset.ready = "1";
  }
})();
