(() => {
  const payload = window.ALFRED_CAMPAIGN_CATALOG;
  const assets = payload?.assets || [];
  const params = new URLSearchParams(location.search);
  const stressLong = params.get("stress") === "long";
  const forceMissing = params.get("missing") === "1";
  const simulateEmbargo = params.get("embargoed") === "1";
  const sample = assets.find((asset) => asset.copyMode === "medium") || assets[0];
  const category = assets.find(
    (asset) => asset.family === "category-definition" && asset.copyMode === "long",
  );
  const productAsset = assets.find(
    (asset) => asset.family === "product-proof" && asset.composition === "product-led",
  );

  const heroHeadline = stressLong
    ? "Detect what changed across every operating function, understand the evidence behind it, and choose the next approved action with confidence."
    : category?.content.headline || sample?.content.headline || "Decision intelligence for every function.";
  document.querySelector("#hero-headline").textContent = heroHeadline;
  document.querySelector("#hero-support").textContent =
    category?.content.proof || "Approved campaign support copy appears here.";
  document.querySelector("#site-state").textContent =
    payload.campaign.lifecycle === "public"
      ? ""
      : `${payload.campaign.lifecycle} website preview · not for distribution`;

  const heroVisual = document.querySelector("#hero-visual");
  heroVisual.innerHTML = window.AlfredCampaignPrimitives.render({
    ...productAsset,
    primitive: "product-window",
  });

  const stories = {
    changed: {
      number: "01",
      title: "Detect the signal.",
      body: "Alfred monitors connected business systems and identifies the movement that needs attention.",
    },
    why: {
      number: "02",
      title: "Trace the evidence.",
      body: "Every explanation stays linked to its source, period, unit, status, and decision context.",
    },
    next: {
      number: "03",
      title: "Choose an approved action.",
      body: "Recommendations expose confidence, reversibility, and the human approval required to proceed.",
    },
  };
  const storyPanel = document.querySelector("#story-panel");
  function setStory(key) {
    const story = stories[key];
    storyPanel.innerHTML = `<span>${story.number}</span><div><h3>${story.title}</h3><p>${story.body}</p></div>`;
    document.querySelectorAll("[data-story]").forEach((button) => {
      button.setAttribute("aria-selected", String(button.dataset.story === key));
    });
  }
  document.querySelectorAll("[data-story]").forEach((button) => {
    button.addEventListener("click", () => setStory(button.dataset.story));
  });
  setStory("changed");

  const productViews = [
    ["daily-brief", "Daily Brief"],
    ["seek-alfred", "Seek Alfred"],
    ["evidence-ledger", "Evidence Ledger"],
    ["decision-fork", "Decision Fork"],
  ];
  const productTabs = document.querySelector(".product-tabs");
  const productStage = document.querySelector("#product-stage");
  function setProduct(id) {
    productTabs.querySelectorAll("button").forEach((button) => {
      button.setAttribute("aria-selected", String(button.dataset.product === id));
    });
    productStage.innerHTML = window.AlfredCampaignPrimitives.render({
      ...productAsset,
      primitive: id === "evidence-ledger" ? "annotation-rail" : "product-window",
    });
    productStage.dataset.product = id;
  }
  productTabs.innerHTML = productViews
    .map(([id, label], index) => `<button role="tab" data-product="${id}" aria-selected="${index === 0}">${label}</button>`)
    .join("");
  productTabs.addEventListener("click", (event) => {
    if (event.target.matches("[data-product]")) setProduct(event.target.dataset.product);
  });
  setProduct("daily-brief");

  const recognition = document.querySelector("#recognition");
  const publicFunding = assets.some((asset) => asset.family === "funding-announcement");
  if (publicFunding && !simulateEmbargo) {
    recognition.hidden = false;
    document.querySelector("#recognition-content").innerHTML =
      '<h2>Approved investor and partner recognition</h2><p>Only public, approved lockups appear in this section.</p>';
  }

  const founderLetter = document.querySelector("#founder-letter");
  const letterStatus = document.querySelector("#letter-status");
  if (forceMissing) {
    founderLetter.innerHTML = "<p>Founder letter is not available in this campaign version.</p>";
    letterStatus.textContent = "Optional content absent";
  } else {
    founderLetter.innerHTML =
      "<p>Business teams do not need another place to inspect metrics. They need a reliable way to move from a signal to evidence, from evidence to a decision, and from a decision to an accountable action.</p><p>Alfred is built to make that path visible, reviewable, and reusable across the organization.</p>";
    letterStatus.textContent = "Draft editorial treatment";
  }

  const pressGrid = document.querySelector("#press-grid");
  pressGrid.innerHTML = forceMissing
    ? '<article><span>Empty state</span><h3>No approved press quotes yet.</h3><p>The layout remains complete without logos or coverage.</p></article>'
    : '<article><span>Press release</span><h3>Approved announcement copy</h3><p>Public facts flow from the campaign record.</p></article><article><span>Media kit</span><h3>Product, founder, and brand assets</h3><p>Only approved public files enter the download bundle.</p></article><article><span>Coverage</span><h3>Publication treatments</h3><p>Quotes remain hidden until permission and source approval exist.</p></article>';

  document.querySelector("#launch-timeline").innerHTML = [
    ["Campaign approval", payload.campaign.lifecycle],
    ["Public release", simulateEmbargo ? "Embargoed" : "Date pending approval"],
    ["Product update", "Approved product release"],
    ["Next milestone", "Quarterly visual-system review"],
  ]
    .map(([title, status]) => `<li><span></span><div><h3>${title}</h3><p>${status}</p></div></li>`)
    .join("");

  if (simulateEmbargo && document.body.textContent.match(/Series [A-Z]|funding amount:/i)) {
    document.body.dataset.embargoLeak = "1";
  }
  document.body.dataset.ready = "1";
})();
