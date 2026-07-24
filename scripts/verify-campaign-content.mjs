import { readdirSync, readFileSync } from "node:fs";
import { basename, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const campaignDirectory = resolve(root, "data/campaigns");
const lifecycleStates = new Set(["draft", "reviewed", "approved", "embargoed", "public"]);
const approvalStates = new Set(["pending", "approved", "rejected"]);
const audienceValues = new Set([
  "general-market",
  "prospects",
  "waitlist",
  "customers",
  "founders",
  "investors",
  "press",
  "employees",
  "partners",
  "candidates",
  "internal-launch-team",
]);
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const versionPattern = /^[0-9]+\.[0-9]+\.[0-9]+$/;
const placeholderPattern = /\[[A-Z][A-Z0-9 _/-]*\]/;

function pushError(errors, path, message) {
  errors.push(`${path}: ${message}`);
}

function requireObject(value, path, errors) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    pushError(errors, path, "must be an object");
    return false;
  }
  return true;
}

function requireArray(value, path, errors) {
  if (!Array.isArray(value)) {
    pushError(errors, path, "must be an array");
    return false;
  }
  return true;
}

function validateSlug(value, path, errors) {
  if (typeof value !== "string" || !slugPattern.test(value)) {
    pushError(errors, path, "must be a lowercase kebab-case ID");
  }
}

function validateLifecycle(value, path, errors) {
  if (!lifecycleStates.has(value)) {
    pushError(errors, path, `must be one of ${[...lifecycleStates].join(", ")}`);
  }
}

function validateApproval(approval, path, errors, ownerCodes) {
  if (!requireObject(approval, path, errors)) return;
  if (!approvalStates.has(approval.status)) {
    pushError(errors, `${path}.status`, "has an invalid approval status");
  }
  if (!ownerCodes.has(approval.ownerCode)) {
    pushError(errors, `${path}.ownerCode`, "does not reference a declared owner");
  }
  if (approval.status === "approved") {
    for (const field of ["assignee", "evidence", "approvedBy", "approvedAt"]) {
      if (typeof approval[field] !== "string" || !approval[field].trim()) {
        pushError(errors, `${path}.${field}`, "is required for approved content");
      }
    }
  }
}

function collectContentValues(value, path = "$", results = []) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectContentValues(item, `${path}[${index}]`, results));
    return results;
  }
  if (!value || typeof value !== "object") return results;
  if (
    typeof value.contentId === "string" &&
    typeof value.value === "string" &&
    typeof value.state === "string"
  ) {
    results.push({ value, path });
  }
  for (const [key, child] of Object.entries(value)) {
    collectContentValues(child, `${path}.${key}`, results);
  }
  return results;
}

function validateCampaign(campaign, label) {
  const errors = [];
  if (!requireObject(campaign, "$", errors)) return errors;

  validateSlug(campaign.campaignId, "$.campaignId", errors);
  if (typeof campaign.campaignName !== "string" || !campaign.campaignName.trim()) {
    pushError(errors, "$.campaignName", "is required");
  }
  if (typeof campaign.version !== "string" || !versionPattern.test(campaign.version)) {
    pushError(errors, "$.version", "must use semantic version form");
  }
  validateLifecycle(campaign.lifecycle, "$.lifecycle", errors);

  if (!requireObject(campaign.narrative, "$.narrative", errors)) return errors;
  if (campaign.narrative.category !== "decision intelligence") {
    pushError(errors, "$.narrative.category", "must be decision intelligence");
  }

  if (requireArray(campaign.audiences, "$.audiences", errors)) {
    for (const audience of campaign.audiences) {
      if (!audienceValues.has(audience)) {
        pushError(errors, "$.audiences", `contains unknown audience ${audience}`);
      }
    }
  }

  const ownerCodes = new Set();
  if (requireArray(campaign.owners, "$.owners", errors)) {
    campaign.owners.forEach((owner, index) => {
      const path = `$.owners[${index}]`;
      if (!requireObject(owner, path, errors)) return;
      if (ownerCodes.has(owner.code)) pushError(errors, `${path}.code`, "must be unique");
      ownerCodes.add(owner.code);
      if (typeof owner.role !== "string" || !owner.role.trim()) {
        pushError(errors, `${path}.role`, "is required");
      }
    });
  }

  const ids = new Map();
  const addId = (id, path) => {
    validateSlug(id, path, errors);
    if (ids.has(id)) pushError(errors, path, `duplicates ${ids.get(id)}`);
    else ids.set(id, path);
  };

  const contentValues = collectContentValues(campaign);
  for (const { value, path } of contentValues) {
    addId(value.contentId, `${path}.contentId`);
    validateLifecycle(value.state, `${path}.state`, errors);
    if (!ownerCodes.has(value.ownerCode)) {
      pushError(errors, `${path}.ownerCode`, "does not reference a declared owner");
    }
    validateApproval(value.approval, `${path}.approval`, errors, ownerCodes);
    if (value.state !== "draft" && placeholderPattern.test(value.value)) {
      pushError(errors, `${path}.value`, "contains a placeholder outside draft state");
    }
  }

  for (const [index, cta] of (campaign.messaging?.ctas || []).entries()) {
    const path = `$.messaging.ctas[${index}]`;
    addId(cta.ctaId, `${path}.ctaId`);
    validateLifecycle(cta.state, `${path}.state`, errors);
    if (!ownerCodes.has(cta.ownerCode)) {
      pushError(errors, `${path}.ownerCode`, "does not reference a declared owner");
    }
    validateApproval(cta.approval, `${path}.approval`, errors, ownerCodes);
    if (
      cta.state !== "draft" &&
      (placeholderPattern.test(cta.label) || placeholderPattern.test(cta.destination))
    ) {
      pushError(errors, path, "contains a placeholder outside draft state");
    }
  }

  const citations = new Set();
  if (requireArray(campaign.citations, "$.citations", errors)) {
    campaign.citations.forEach((citation, index) => {
      const path = `$.citations[${index}]`;
      if (!requireObject(citation, path, errors)) return;
      addId(citation.citationId, `${path}.citationId`);
      citations.add(citation.citationId);
      validateLifecycle(citation.state, `${path}.state`, errors);
      validateApproval(citation.approval, `${path}.approval`, errors, ownerCodes);
    });
  }

  if (requireArray(campaign.proofPoints, "$.proofPoints", errors)) {
    campaign.proofPoints.forEach((claim, index) => {
      const path = `$.proofPoints[${index}]`;
      if (!requireObject(claim, path, errors)) return;
      addId(claim.claimId, `${path}.claimId`);
      validateLifecycle(claim.state, `${path}.state`, errors);
      validateApproval(claim.approval, `${path}.approval`, errors, ownerCodes);
      if (["market-fact", "company-fact"].includes(claim.classification)) {
        if (!Array.isArray(claim.citationIds) || claim.citationIds.length === 0) {
          pushError(errors, `${path}.citationIds`, "requires at least one citation");
        }
      }
      for (const citationId of claim.citationIds || []) {
        if (!citations.has(citationId)) {
          pushError(errors, `${path}.citationIds`, `references missing citation ${citationId}`);
        }
      }
      if (claim.classification === "northwind-demo") {
        if (typeof claim.demoDataPath !== "string" || !claim.demoDataPath.startsWith("$.")) {
          pushError(errors, `${path}.demoDataPath`, "must reference data/demo-data.json");
        }
        if (claim.visibleLabel !== "Northwind Labs demo") {
          pushError(errors, `${path}.visibleLabel`, "must be Northwind Labs demo");
        }
      }
      if (claim.classification === "placeholder") {
        if (claim.state !== "draft") {
          pushError(errors, `${path}.state`, "placeholder claims are draft-only");
        }
        if (!placeholderPattern.test(claim.statement)) {
          pushError(errors, `${path}.statement`, "placeholder claims must be visibly bracketed");
        }
      }
    });
  }

  const personIds = new Set();
  for (const [index, person] of (campaign.people || []).entries()) {
    const path = `$.people[${index}]`;
    addId(person.personId, `${path}.personId`);
    personIds.add(person.personId);
    validateApproval(person.approval, `${path}.approval`, errors, ownerCodes);
  }
  const quoteIds = new Set();
  for (const [index, quote] of (campaign.quotes || []).entries()) {
    const path = `$.quotes[${index}]`;
    addId(quote.quoteId, `${path}.quoteId`);
    quoteIds.add(quote.quoteId);
    if (!personIds.has(quote.personId)) {
      pushError(errors, `${path}.personId`, "does not reference a declared person");
    }
    validateApproval(quote.approval, `${path}.approval`, errors, ownerCodes);
  }

  if (requireObject(campaign.funding, "$.funding", errors)) {
    const { funding } = campaign;
    validateApproval(funding.approval, "$.funding.approval", errors, ownerCodes);
    if (!["restricted", "embargoed", "public"].includes(funding.visibility)) {
      pushError(errors, "$.funding.visibility", "has an invalid visibility");
    }
    if (funding.visibility !== "public") {
      if (funding.distribution?.includeInDefaultGallery !== false) {
        pushError(errors, "$.funding.distribution.includeInDefaultGallery", "must be false for restricted or embargoed funding");
      }
      if (funding.distribution?.includeInDefaultExport !== false) {
        pushError(errors, "$.funding.distribution.includeInDefaultExport", "must be false for restricted or embargoed funding");
      }
    }
    if (campaign.lifecycle === "public" && funding.visibility !== "public") {
      pushError(errors, "$.funding.visibility", "must be public when the campaign is public");
    }
    for (const quoteId of funding.quoteIds || []) {
      if (!quoteIds.has(quoteId)) {
        pushError(errors, "$.funding.quoteIds", `references missing quote ${quoteId}`);
      }
    }
  }

  const referenceableIds = new Set(ids.keys());
  for (const [index, pack] of (campaign.channelPacks || []).entries()) {
    const path = `$.channelPacks[${index}]`;
    addId(pack.packId, `${path}.packId`);
    validateLifecycle(pack.state, `${path}.state`, errors);
    validateApproval(pack.approval, `${path}.approval`, errors, ownerCodes);
    for (const audience of pack.audiences || []) {
      if (!campaign.audiences.includes(audience)) {
        pushError(errors, `${path}.audiences`, `references undeclared audience ${audience}`);
      }
    }
    for (const contentId of pack.contentIds || []) {
      if (!referenceableIds.has(contentId)) {
        pushError(errors, `${path}.contentIds`, `references missing content ${contentId}`);
      }
    }
  }

  if (["reviewed", "approved", "embargoed", "public"].includes(campaign.lifecycle)) {
    const unnamedOwners = campaign.owners.filter((owner) => !owner.assignee);
    if (unnamedOwners.length) {
      pushError(
        errors,
        "$.owners",
        `named assignees required after draft: ${unnamedOwners.map((owner) => owner.code).join(", ")}`,
      );
    }
  }

  if (errors.length) {
    return errors.map((error) => `${label} ${error}`);
  }
  return [];
}

const schemaPath = resolve(root, "schemas/campaign-content.schema.json");
JSON.parse(readFileSync(schemaPath, "utf8"));

const campaignFiles = readdirSync(campaignDirectory)
  .filter((file) => file.endsWith(".example.json"))
  .sort();
if (!campaignFiles.length) {
  console.error("No campaign fixtures found.");
  process.exit(1);
}

const allErrors = [];
const parsedCampaigns = [];
for (const file of campaignFiles) {
  const campaign = JSON.parse(readFileSync(resolve(campaignDirectory, file), "utf8"));
  parsedCampaigns.push({ file, campaign });
  allErrors.push(...validateCampaign(campaign, file));
}

const fixture = structuredClone(parsedCampaigns[0].campaign);
const negativeCases = [
  {
    name: "company fact without citation",
    expected: "requires at least one citation",
    mutate(campaign) {
      campaign.proofPoints[0].classification = "company-fact";
      campaign.proofPoints[0].citationIds = [];
    },
  },
  {
    name: "restricted funding in default export",
    expected: "must be false for restricted or embargoed funding",
    mutate(campaign) {
      campaign.funding.visibility = "restricted";
      campaign.funding.distribution.includeInDefaultExport = true;
    },
  },
  {
    name: "public campaign with restricted funding",
    expected: "must be public when the campaign is public",
    mutate(campaign) {
      campaign.lifecycle = "public";
      campaign.funding.visibility = "restricted";
    },
  },
  {
    name: "approved placeholder content",
    expected: "contains a placeholder outside draft state",
    mutate(campaign) {
      campaign.messaging.headlines.primary.state = "approved";
    },
  },
];

const validationCases = JSON.parse(
  readFileSync(resolve(campaignDirectory, "campaign-validation-cases.json"), "utf8"),
);
for (const negativeCase of negativeCases) {
  const declaredCase = validationCases.cases.find(
    (entry) => entry.expectedError === negativeCase.expected,
  );
  if (!declaredCase) {
    allErrors.push(`validation case registry is missing: ${negativeCase.expected}`);
  }
}
for (const requiredKind of ["valid", "invalid", "demo", "confidential", "embargoed"]) {
  if (!validationCases.cases.some((entry) => entry.kind === requiredKind)) {
    allErrors.push(`validation case registry lacks ${requiredKind}`);
  }
}

for (const negativeCase of negativeCases) {
  const candidate = structuredClone(fixture);
  negativeCase.mutate(candidate);
  const errors = validateCampaign(candidate, negativeCase.name);
  if (!errors.some((error) => error.includes(negativeCase.expected))) {
    allErrors.push(
      `negative self-test did not produce "${negativeCase.expected}": ${negativeCase.name}`,
    );
  }
}

if (allErrors.length) {
  console.error(allErrors.join("\n"));
  process.exit(1);
}

console.log(
  `Verified ${campaignFiles.length} campaign fixture, ${validationCases.cases.length} declared cases, campaign schema JSON, and ${negativeCases.length} negative guards.`,
);
