(() => {
  const escape = (value) =>
    String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");

  const productWindow = () => `
    <section class="proof-window" aria-label="Alfred product proof">
      <div class="proof-window__bar">
        <span></span><span></span><span></span>
        <strong>Daily Brief</strong>
        <small>Northwind Labs demo</small>
      </div>
      <div class="proof-window__body">
        <div class="brief-nav"><i></i><i></i><i></i><i></i></div>
        <div class="brief-main">
          <p class="proof-kicker">What changed</p>
          <strong>Paid demand softened while branded discovery rose.</strong>
          <div class="mini-chart"><span></span><span></span><span></span><span></span><span></span><span></span></div>
          <div class="decision-row"><b>Recommended next step</b><em>Review evidence</em></div>
        </div>
      </div>
    </section>`;

  const memoryMap = () => {
    const nodes = ["Signal", "Evidence", "Decision", "Action"];
    return `
      <section class="system-illustration" aria-label="Alfred Core memory illustration">
        <div class="orbit orbit-a"></div>
        <div class="orbit orbit-b"></div>
        <div class="memory-core"><span>A</span><small>Alfred Core</small></div>
        ${nodes.map((label, index) => `<div class="system-node node-${index + 1}"><i></i><span>${label}</span></div>`).join("")}
      </section>`;
  };

  const decisionFlow = () => `
    <section class="editorial-proof" aria-label="Decision flow">
      <span>Signal</span><i></i><span>Evidence</span><i></i><span>Decision</span><i></i><span>Action</span>
    </section>`;

  const comparison = () => `
    <section class="comparison-primitive" aria-label="Before and after comparison">
      <div><small>Before</small><strong>Fragmented signals</strong><span>Separate tools and unresolved context</span></div>
      <i aria-hidden="true">→</i>
      <div><small>With Alfred</small><strong>One decision path</strong><span>Evidence, approval, and memory together</span></div>
    </section>`;

  const quote = (asset, kind) => `
    <section class="quote-primitive ${kind}">
      <span aria-hidden="true">“</span>
      <blockquote>${escape(asset.content.headline)}</blockquote>
      <footer>${kind === "press" ? "Publication treatment" : "Founder quote treatment"}</footer>
    </section>`;

  const marketStat = (asset) => `
    <section class="stat-primitive" aria-label="Sourced market or demo stat">
      <strong>${escape(asset.content.proof || "Approved metric")}</strong>
      <span>${escape(asset.content.proofLabel || "Source required before export")}</span>
    </section>`;

  const annotationRail = () => `
    <section class="annotation-primitive">
      ${productWindow()}
      <ol><li><b>01</b> Signal</li><li><b>02</b> Evidence</li><li><b>03</b> Approval</li></ol>
    </section>`;

  const funding = (asset) => `
    <section class="funding-primitive">
      <small>${asset.approvalState === "public" ? "Public funding announcement" : "Restricted funding treatment"}</small>
      <strong>${escape(asset.content.fundingAmount || "Funding details restricted")}</strong>
      <span>${escape(asset.content.fundingRound || "Amount and round appear only after approval")}</span>
    </section>`;

  const partnerRail = () => `
    <section class="partner-rail">
      <span>Approved investor</span><span>Approved partner</span><span>Approved advisor</span>
    </section>`;

  const countdown = (asset) => `
    <section class="date-primitive">
      <small>Launch sequence</small>
      <strong>${escape(asset.content.releaseDate || "Date pending approval")}</strong>
      <span>Static fallback remains complete</span>
    </section>`;

  const categoryLockup = () => `
    <section class="category-primitive">
      <span>Signals</span><i></i><span>Evidence</span><i></i><strong>Decision intelligence</strong>
    </section>`;

  const metricTreatment = (asset) => `
    <section class="metric-primitive">
      <small>${escape(asset.content.proofLabel || "Approved source")}</small>
      <strong>${escape(asset.content.proof || "Metric pending approval")}</strong>
      <span>Source · period · unit · status</span>
    </section>`;

  const editorialHeadline = () => `
    <section class="editorial-lines" aria-hidden="true">
      <i></i><i></i><i></i><i></i><i></i>
    </section>`;

  const legalBlock = (asset) => `
    <section class="legal-primitive">
      <b>${escape(asset.content.proofLabel || "Approval status")}</b>
      <span>${asset.sensitive ? "Restricted information. Do not distribute." : "Claims require source review before public export."}</span>
    </section>`;

  const registry = {
    "funding-masthead": funding,
    "category-lockup": categoryLockup,
    "founder-quote": (asset) => quote(asset, "founder"),
    "partner-lockup": partnerRail,
    "market-stat": marketStat,
    "product-window": productWindow,
    "annotation-rail": annotationRail,
    comparison,
    "press-quote": (asset) => quote(asset, "press"),
    "decision-flow": decisionFlow,
    "memory-map": memoryMap,
    "metric-treatment": metricTreatment,
    countdown,
    "event-date": countdown,
    "editorial-headline": editorialHeadline,
    "cta-footer": editorialHeadline,
    "legal-block": legalBlock,
  };

  window.AlfredCampaignPrimitives = {
    ids: Object.keys(registry),
    render(asset) {
      const renderer = registry[asset.primitive] || editorialHeadline;
      return renderer(asset);
    },
  };
})();
