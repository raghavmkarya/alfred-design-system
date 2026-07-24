import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export const root = resolve(import.meta.dirname, "..");
export const campaignDirectory = resolve(root, "data/campaigns");
export const generatedDirectory = resolve(root, "campaign/generated");
export const placeholderPattern = /\[[A-Z0-9][A-Z0-9 _:/.-]*\]/;
export const lifecycleOrder = ["draft", "reviewed", "approved", "embargoed", "public"];
export const filenamePattern =
  "{campaignId}__{family}__{platform}-{placement}__{composition}__{copyMode}__{theme}__v{campaignVersion}__{scale}x.{format}";

export function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

export function loadCampaign(campaignId = "flagship-launch") {
  const path = resolve(campaignDirectory, `${campaignId}.example.json`);
  return { path, campaign: readJson(path) };
}

export function loadFactoryDefinitions() {
  return {
    placements: readJson(resolve(campaignDirectory, "placements.json")),
    families: readJson(resolve(campaignDirectory, "launch-families.json")),
    schema: readJson(resolve(root, "schemas/visual-template-manifest.schema.json")),
  };
}

export function collectContent(campaign) {
  const records = new Map();
  function visit(value) {
    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }
    if (!value || typeof value !== "object") return;
    for (const idKey of ["contentId", "ctaId", "claimId", "citationId", "quoteId", "personId"]) {
      if (typeof value[idKey] === "string") records.set(value[idKey], value);
    }
    Object.values(value).forEach(visit);
  }
  visit(campaign);
  return records;
}

export function contentText(record) {
  if (!record) return "";
  return record.value || record.label || record.statement || record.text || record.name || "";
}

export function versionForFilename(version) {
  return version.replaceAll(".", "_");
}

export function renderFilename(asset, scale = 1, format = "png") {
  return filenamePattern
    .replace("{campaignId}", asset.campaignId)
    .replace("{family}", asset.family)
    .replace("{platform}", asset.platform)
    .replace("{placement}", asset.placement)
    .replace("{composition}", asset.composition)
    .replace("{copyMode}", asset.copyMode)
    .replace("{theme}", asset.theme)
    .replace("{campaignVersion}", versionForFilename(asset.campaignVersion))
    .replace("{scale}", String(scale))
    .replace("{format}", format);
}

function copyLimits(placement, copyMode) {
  const vertical = placement.height / placement.width > 1.4;
  const compact = placement.height / placement.width < 0.65;
  const profiles = {
    short: { characters: compact ? 44 : 54, words: 8, lines: compact ? 2 : 3 },
    medium: { characters: compact ? 62 : vertical ? 96 : 78, words: vertical ? 15 : 12, lines: vertical ? 5 : 4 },
    long: { characters: compact ? 78 : vertical ? 150 : 110, words: vertical ? 24 : 18, lines: vertical ? 7 : 5 },
  };
  return profiles[copyMode];
}

function slotsFor(placement, copyMode, family) {
  const headline = copyLimits(placement, copyMode);
  return [
    {
      slotId: "eyebrow",
      required: true,
      contentTypes: ["plain-text"],
      limits: { characters: 42, words: 6, lines: 1 },
      fallback: "Decision intelligence",
    },
    {
      slotId: "headline",
      required: true,
      contentTypes: ["content-value", "claim", "quote"],
      limits: headline,
      fallback: null,
    },
    {
      slotId: "proof",
      required: ["market-problem", "demo-scenario", "post-launch-recap"].includes(family),
      contentTypes: ["claim", "citation", "northwind-demo"],
      limits: { characters: 120, words: 20, lines: 4 },
      fallback: "No proof is shown until an approved claim is available.",
    },
    {
      slotId: "cta",
      required: true,
      contentTypes: ["cta"],
      limits: { characters: 38, words: 6, lines: 1 },
      fallback: "Seek Alfred",
    },
    {
      slotId: "disclaimer",
      required: false,
      contentTypes: ["citation", "demo-label", "legal"],
      limits: { characters: 150, words: 24, lines: 3 },
      fallback: null,
    },
  ];
}

function selectedCopyId(campaign, family, copyMode) {
  const variants = campaign.messaging?.headlines?.[copyMode];
  if (Array.isArray(variants) && variants[0]?.contentId) return variants[0].contentId;
  return family.headlineId || "headline-primary";
}

export function buildCatalog(campaign, definitions, options = {}) {
  const includeRestricted = options.includeRestricted === true;
  const records = collectContent(campaign);
  const cta = campaign.messaging?.ctas?.[0];
  const claim = campaign.proofPoints?.[0];
  const fundingAmount = campaign.funding?.visibility === "public"
    ? contentText(campaign.funding.amount)
    : "";
  const fundingRound = campaign.funding?.visibility === "public"
    ? contentText(campaign.funding.roundType)
    : "";
  const catalog = [];

  for (const family of definitions.families.families) {
    if (family.sensitive && campaign.funding.visibility !== "public" && !includeRestricted) continue;
    for (const placement of definitions.placements.placements) {
      for (const composition of definitions.families.compositions) {
        for (const copyMode of definitions.families.copyModes) {
          for (const theme of definitions.families.themes) {
            const headlineId = selectedCopyId(campaign, family, copyMode);
            const headline = records.get(headlineId);
            const asset = {
              manifestVersion: "1.0.0",
              assetId: [
                campaign.campaignId,
                family.family,
                placement.platform,
                placement.placement,
                composition,
                copyMode,
                theme,
              ].join("__"),
              campaignId: campaign.campaignId,
              campaignVersion: campaign.version,
              campaignLifecycle: campaign.lifecycle,
              family: family.family,
              primitive: family.primitive,
              platform: placement.platform,
              placement: placement.placement,
              composition,
              copyMode,
              dimensions: {
                width: placement.width,
                height: placement.height,
                aspectRatio: placement.aspectRatio,
                exportScales: [1, 2],
              },
              safeZones: placement.safeZones,
              themes: [theme],
              theme,
              output: { type: "static", format: "png", posterFrame: true },
              outputType: "static",
              slots: slotsFor(placement, copyMode, family.family),
              assets: [
                {
                  assetId: composition === "product-led" ? "product-shot-daily-brief" : `illustration-${family.primitive}`,
                  required: composition !== "editorial-led",
                  fallback: "editorial-led",
                },
              ],
              content: {
                eyebrow: family.eyebrow,
                headlineId,
                headline: contentText(headline),
                headlineState: headline?.state || "draft",
                ctaId: cta?.ctaId || null,
                cta: cta?.label || "",
                ctaDestination: cta?.destination || "",
                claimId: claim?.claimId || null,
                proof: contentText(claim),
                proofClassification: claim?.classification || null,
                proofLabel: claim?.visibleLabel || null,
                citationIds: claim?.citationIds || [],
                fundingAmount,
                fundingRound,
                releaseDate: campaign.release?.releaseAt || "",
              },
              sensitive: family.sensitive,
              approvalState: family.sensitive ? campaign.funding.visibility : campaign.lifecycle,
              cropBehavior: composition === "editorial-led" ? "editorial-reflow" : "focal-point",
              filename: {
                pattern: filenamePattern,
                destination: `campaign/exports/${campaign.campaignId}/${family.family}/${placement.platform}`,
              },
            };
            asset.exportFilename = renderFilename(asset);
            catalog.push(asset);
          }
        }
      }
    }
  }
  return catalog;
}

function countWords(text) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function lineEstimate(text, charactersPerLine) {
  return Math.max(1, Math.ceil(text.length / charactersPerLine));
}

export function validateCatalog(campaign, catalog, options = {}) {
  const errors = [];
  const ids = new Set();
  const includeRestricted = options.includeRestricted === true;
  const exporting = options.exporting === true;

  for (const asset of catalog) {
    const path = asset.assetId;
    if (ids.has(asset.assetId)) errors.push(`${path}: duplicate asset ID`);
    ids.add(asset.assetId);
    if (asset.dimensions.width < 1 || asset.dimensions.height < 1) {
      errors.push(`${path}: invalid dimensions`);
    }
    if (!asset.safeZones.length) errors.push(`${path}: missing safe zones`);
    for (const zone of asset.safeZones) {
      if (zone.left + zone.right >= asset.dimensions.width) errors.push(`${path}: horizontal safe zone collapses`);
      if (zone.top + zone.bottom >= asset.dimensions.height) errors.push(`${path}: vertical safe zone collapses`);
    }
    for (const slot of asset.slots) {
      const text = asset.content[slot.slotId] || "";
      if (slot.required && !text && !slot.fallback) errors.push(`${path}: missing required slot ${slot.slotId}`);
      if (text.length > slot.limits.characters) errors.push(`${path}: ${slot.slotId} exceeds character limit`);
      if (countWords(text) > slot.limits.words) errors.push(`${path}: ${slot.slotId} exceeds word limit`);
      const charsPerLine = Math.max(8, Math.ceil(slot.limits.characters / slot.limits.lines));
      if (lineEstimate(text, charsPerLine) > slot.limits.lines) errors.push(`${path}: ${slot.slotId} exceeds line estimate`);
    }
    for (const text of Object.values(asset.content)) {
      if (typeof text === "string" && placeholderPattern.test(text) && exporting) {
        errors.push(`${path}: unresolved placeholder`);
      }
    }
    if (asset.sensitive && campaign.funding.visibility !== "public" && !includeRestricted) {
      errors.push(`${path}: restricted funding entered a default catalog`);
    }
    if (asset.content.proof && /\d/.test(asset.content.proof)) {
      const validDemo = asset.content.proofClassification === "northwind-demo" && asset.content.proofLabel === "Northwind Labs demo";
      const cited = asset.content.citationIds.length > 0;
      if (!validDemo && !cited) errors.push(`${path}: numerical proof lacks citation or demo label`);
    }
    if (exporting && !["approved", "public"].includes(asset.approvalState)) {
      errors.push(`${path}: export requires approved or public content`);
    }
  }
  return errors;
}

export function summarizeCatalog(catalog) {
  const unique = (key) => new Set(catalog.map((item) => item[key])).size;
  return {
    assets: catalog.length,
    families: unique("family"),
    platforms: unique("platform"),
    placements: unique("placement"),
    compositions: unique("composition"),
    copyModes: unique("copyMode"),
    themes: unique("theme"),
  };
}
