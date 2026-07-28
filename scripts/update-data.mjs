import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const snapshotPath = path.join(root, "data", "snapshot.json");
const sourceUrl = "https://fuelplan.gov.au/fuel-statistics";

const response = await fetch(sourceUrl, {
  headers: { "user-agent": "fuel-report-data-refresh/1.0" },
});
if (!response.ok) throw new Error(`Fuel Plan returned HTTP ${response.status}`);

const html = await response.text();
const text = html
  .replace(/<br\s*\/?>/gi, "\n")
  .replace(/<[^>]+>/g, " ")
  .replace(/&nbsp;|&#160;/gi, " ")
  .replace(/&amp;/gi, "&")
  .replace(/\s+/g, " ")
  .trim();

function numberAfter(pattern, label) {
  const match = text.match(pattern);
  if (!match) throw new Error(`Could not parse ${label}`);
  return Number(match[1].replace(/,/g, ""));
}

function isoDate(day, monthName, year) {
  const months = {
    January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
    July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
  };
  const date = new Date(Date.UTC(Number(year), months[monthName], Number(day)));
  return date.toISOString().slice(0, 10);
}

const stockDateMatch = text.match(/Days of fuel reserves held under MSO (\d{1,2}) ([A-Za-z]+) (\d{4})/);
const flowDateMatch = text.match(/Ships on water to Australia As at (\d{1,2}) ([A-Za-z]+) (\d{4})/);
const priceDateMatch = text.match(/Retail price (\d{1,2}) ([A-Za-z]+) (\d{4})/);
if (!stockDateMatch || !flowDateMatch || !priceDateMatch) {
  throw new Error("Could not parse one or more source dates");
}

const snapshot = JSON.parse(await fs.readFile(snapshotPath, "utf8"));
const nextStockDate = isoDate(...stockDateMatch.slice(1));
const nextFlowDate = isoDate(...flowDateMatch.slice(1));
const nextPriceDate = isoDate(...priceDateMatch.slice(1));

if (snapshot.meta.stockAsOf !== nextStockDate) {
  snapshot.national.priorWeek = {
    coverDays: { ...snapshot.national.coverDays },
    stocksML: { ...snapshot.national.stocksML },
  };
}
if (snapshot.meta.flowAsOf !== nextFlowDate) {
  snapshot.flows.priorCleanProductTankers = snapshot.flows.cleanProductTankers;
  snapshot.flows.priorCleanProductEquivalentDays = snapshot.flows.cleanProductEquivalentDays;
}
if (snapshot.meta.flowAsOf !== nextFlowDate) {
  snapshot.queensland.priorPetrolStockouts = snapshot.queensland.petrolStockouts;
  snapshot.queensland.priorDieselStockouts = snapshot.queensland.dieselStockouts;
}

snapshot.meta.generatedAt = new Date().toISOString();
snapshot.meta.stockAsOf = nextStockDate;
snapshot.meta.flowAsOf = nextFlowDate;
snapshot.meta.priceAsOf = nextPriceDate;

snapshot.national.coverDays.petrol = numberAfter(
  /National days of coverage[\s\S]*?Petrol (\d+(?:\.\d+)?)/,
  "petrol cover",
);
snapshot.national.coverDays.diesel = numberAfter(
  /National days of coverage[\s\S]*?Petrol \d+(?:\.\d+)? \d+(?:\.\d+)? Diesel (\d+(?:\.\d+)?)/,
  "diesel cover",
);
snapshot.national.coverDays.jet = numberAfter(
  /National days of coverage[\s\S]*?Diesel \d+(?:\.\d+)? \d+(?:\.\d+)? Jet fuel (\d+(?:\.\d+)?)/,
  "jet cover",
);

snapshot.national.stocksML.petrol = numberAfter(
  /Fuel reserves in megalitres[\s\S]*?Petrol ([\d,]+)/,
  "petrol stock",
);
snapshot.national.stocksML.diesel = numberAfter(
  /Fuel reserves in megalitres[\s\S]*?Petrol [\d,]+ [\d,]+ Diesel ([\d,]+)/,
  "diesel stock",
);
snapshot.national.stocksML.jet = numberAfter(
  /Fuel reserves in megalitres[\s\S]*?Diesel [\d,]+ [\d,]+ Jet fuel ([\d,]+)/,
  "jet stock",
);

snapshot.national.scheduledArrivalsBillionLitres = numberAfter(
  /A reported ([\d.]+) billion litres/,
  "scheduled arrivals",
);
snapshot.prices.brisbanePetrolAudPerL = numberAfter(
  /BRIS \$([\d.]+)[^(]*\([^)]*\) \$[\d.]+/,
  "Brisbane petrol price",
);
snapshot.prices.brisbaneDieselAudPerL = numberAfter(
  /BRIS \$[\d.]+[^(]*\([^)]*\) \$([\d.]+)/,
  "Brisbane diesel price",
);
snapshot.prices.brentUsdPerBarrel = numberAfter(/Brent Crude US\$([\d.]+)/, "Brent");
snapshot.prices.singaporeGasoilUsdPerBarrel = numberAfter(
  /Singapore Gasoil \(diesel\) US\$([\d.]+)/,
  "Singapore gasoil",
);

snapshot.flows.crudeTankers = numberAfter(
  /Ships on water to Australia[\s\S]*?Crude oil (\d+) tankers/,
  "crude tanker count",
);
snapshot.flows.crudeEquivalentDays = numberAfter(
  /Ships on water to Australia[\s\S]*?Crude oil \d+ tankers equivalent to (\d+) days/,
  "crude days",
);
snapshot.flows.cleanProductTankers = numberAfter(
  /Clean refined products (\d+) tankers/,
  "clean tanker count",
);
snapshot.flows.cleanProductEquivalentDays = numberAfter(
  /Clean refined products \d+ tankers equivalent to (\d+) days/,
  "clean product days",
);

snapshot.queensland.petrolStockouts = numberAfter(
  /QLD \(1,800 sites\) (\d+)/,
  "Queensland petrol stockouts",
);
snapshot.queensland.dieselStockouts = numberAfter(
  /QLD \(1,800 sites\) \d+ \([^)]*\) (\d+)/,
  "Queensland diesel stockouts",
);

await fs.writeFile(snapshotPath, `${JSON.stringify(snapshot, null, 2)}\n`);
console.log(`Updated ${path.relative(root, snapshotPath)} from ${sourceUrl}`);
