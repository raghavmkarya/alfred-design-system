(() => {
  const type = new URLSearchParams(location.search).get("type") || "launch";
  const variants = {
    launch: {
      audience: "Company announcement",
      eyebrow: "Decision intelligence",
      title: "Know what changed. Decide what to do.",
      body: "Alfred turns connected business signals into evidence-backed recommendations and approved action.",
      cta: "Explore Alfred",
    },
    investor: {
      audience: "Investor update",
      eyebrow: "Confidential update",
      title: "A clearer operating picture, with evidence attached.",
      body: "Approved company progress, product evidence, and next priorities enter this update from the campaign source.",
      cta: "Review the update",
    },
    founder: {
      audience: "Founder announcement",
      eyebrow: "Why we built Alfred",
      title: "Teams do not need another dashboard to interpret.",
      body: "They need a reliable path from a changing signal to evidence, a decision, and an accountable action.",
      cta: "Read the founder letter",
    },
    customer: {
      audience: "Customer and waitlist",
      eyebrow: "Alfred product update",
      title: "Your next decision starts with what changed.",
      body: "See the signal, inspect the evidence, and review the recommended next step in one place.",
      cta: "Seek Alfred",
    },
  };
  const variant = variants[type] || variants.launch;
  document.querySelector("#email-audience").textContent = variant.audience;
  document.querySelector("#email-eyebrow").textContent = variant.eyebrow;
  document.querySelector("#email-title").textContent = variant.title;
  document.querySelector("#email-body").textContent = variant.body;
  document.querySelector("#email-cta").textContent = variant.cta;
  document.body.dataset.type = type;
  document.body.dataset.ready = "1";
})();
