# Strait of Hormuz and Brisbane/SEQ fuel supply

**Archived assessment date:** 28 July 2026 (Australia/Brisbane)

> This document is a historical reviewed narrative. Current quantitative values
> are maintained in the dashboard and `data/snapshot.json`; do not treat figures
> below as the latest release.

## Bottom line

SEQ is likely to remain physically supplied over the next four to eight weeks,
but the system is fragile rather than comfortable. National stocks are above
their March-quarter averages, 3.1 billion litres of crude and major fuels are
scheduled to arrive over four weeks, Lytton is operating, and Queensland retail
stock-outs are limited. The main downside is diesel: global refined-product
markets have recovered more slowly than crude markets and Singapore gasoil
remains far above its pre-conflict price.

There is no public, audited Brisbane or SEQ terminal-inventory series. Any exact
claim about litres currently in local tanks would therefore be false precision.
The dashboard uses a clearly labelled planning proxy and exposes the
replenishment assumptions that drive its scenarios.

## 1. Strait of Hormuz

The June partial reopening materially improved Gulf oil flows, but did not
restore normal operations. The IEA estimated June Gulf exports, including
bypass routes, at 16.1 million barrels per day (mb/d), up sharply but still well
below the 24 mb/d pre-war average. Gulf refined-product and LPG exports remained
below half of their pre-war rate even as crude flows recovered to nearly
three-quarters. Renewed July hostilities mean the IEA's recovery outlook is
conditional rather than secure. ([IEA Oil Market Report, July 2026](https://www.iea.org/reports/oil-market-report-july-2026))

On 21 July, the IEA said Gulf exports had fallen from late-June highs, available
commercial inventories were still being drawn down, and diesel and gasoline
markets were considerably tighter than crude. About 290 million barrels of the
400-million-barrel coordinated emergency release had reached the market.
([IEA Executive Director statement](https://www.iea.org/news/iea-executive-director-statement-on-oil-markets))

Maritime risk remains severe. The IMO has documented attacks on civilian
shipping, mine risk and the continued absence of unconditional safe passage.
On 27 July, commercial traffic was reported at a three-week low despite renewed
diplomatic efforts. ([IMO Hormuz updates](https://www.imo.org/en/mediacentre/hottopics/pages/middle-east-strait-of-hormuz.aspx);
[AP, 27 July](https://apnews.com/article/d57e675a7be6dbdd34561909ced240d0))

Physical substitution is partial. Saudi and UAE pipelines can make roughly
3.5–5.5 mb/d available outside Hormuz, far below normal Strait flows, while
threats around Bab el-Mandeb weaken the Red Sea alternative.
([IEA Middle East market background](https://www.iea.org/topics/the-middle-east-and-global-energy-markets);
[US EIA chokepoints analysis](https://www.eia.gov/international/content/analysis/special_topics/World_Oil_Transit_Chokepoints/))

## 2. Implications for Australia

Australia's direct route exposure is lower than its market exposure. In May
2026, Singapore, South Korea and Malaysia supplied about 3.04 billion litres,
or 66.7%, of Australia's 4.56 billion litres of imported petrol, diesel and jet
fuel. This is derived from the latest complete Australian Petroleum Statistics
(APS) country data. These cargoes do not need to be Gulf-origin to be repriced
or constrained by Gulf crude and product shortages.
([Australian Petroleum Statistics 2026](https://www.energy.gov.au/publications/australian-petroleum-statistics-2026))

The price channel is already visible. In the week to 22 July, Brent was 18%
above its pre-conflict level and Singapore gasoil was 71% above. Brisbane retail
averages were $1.80/L for petrol and $2.17/L for diesel.
([Australian Government Fuel Plan](https://fuelplan.gov.au/fuel-statistics))

Substitution remains possible through:

1. additional product from Singapore, South Korea, Malaysia and other Asian
   exporters;
2. continued Lytton output using its diversified light-sweet crude slate;
3. longer-haul US and European cargoes.

The trade-off is time and cost. Long-haul replacement cannot fully offset a
regional middle-distillate shortage immediately, and diesel/jet availability is
more constrained than crude availability. Ampol reported 1,434 ML of Lytton
production in Q1 2026, up 10%, and had secured crude into July at the time of its
April update. Its current fuel update says Lytton crude and product sourcing is
diversified across Asia-Pacific and global markets.
([Ampol 1Q 2026 ASX announcement](https://www.asx.com.au/asx/v2/statistics/displayAnnouncement.do?display=pdf&idsId=03084979);
[Ampol fuel update](https://www.ampol.com.au/frequently-asked-questions/fuel-supply-update))

## 3. Current Australian and Queensland buffers

As at 21 July, stocks held under the national Minimum Stockholding Obligation
were:

| Fuel | Volume | Normal-consumption cover | Week-on-week |
|---|---:|---:|---:|
| Petrol | 1,814 ML | 42 days | -4 days |
| Diesel | 3,534 ML | 38 days | -1 day |
| Jet fuel | 892 ML | 32 days | -2 days |

As at 24 July, Australia had 44 clean-product tankers on water, equivalent to 14
days, down from 48 tankers and 17 days a week earlier. Queensland reported 10
petrol and 14 diesel stock-outs among 1,800 retail sites—0.56% and 0.78%,
respectively. These figures indicate local distribution friction, not a
state-wide bulk-stock failure. ([Fuel Plan](https://fuelplan.gov.au/fuel-statistics);
[DCCEEW MSO statistics](https://www.dcceew.gov.au/energy/security/australias-fuel-security/minimum-stockholding-obligation/statistics))

## 4. Brisbane/SEQ demand and stock proxy

Queensland trailing-12-month sales to May 2026 were 3,223 ML petrol, 8,817 ML
diesel and 2,031 ML jet fuel. The dashboard estimates SEQ daily demand at:

| Fuel | SEQ estimate | Method |
|---|---:|---|
| Petrol | 6.18 ML/day | 70% of Queensland trailing-12-month sales |
| Diesel | 9.17 ML/day | IOR's 110 ML terminal described as up to 12 Brisbane-market days |
| Jet fuel | 3.90 ML/day | 70% of Queensland trailing-12-month sales |

The petrol and jet shares reflect SEQ's concentration of Queensland population
and aviation activity. The diesel estimate is lower than a population share
because substantial Queensland diesel demand occurs in regional mining,
agriculture and freight. IOR's disclosed terminal capacity provides an
independent Brisbane-market anchor.
([ABS regional population](https://www.abs.gov.au/statistics/people/population/regional-population/latest-release);
[IOR Lytton disclosure](https://www.ior.com.au/wp-content/uploads/2024/11/IOR-BDV-STD-01-Modern-Slavery-Statement.pdf))

Applying national cover to those demand estimates produces planning equivalents
of 260 ML petrol, 348 ML diesel and 125 ML jet fuel. These are **not observed
local stocks**; they answer “what volume would correspond to the national cover
if available to SEQ at the estimated demand rate?”

## 5. Eight-week outlook

The model changes days of cover by:

`weekly change = 7 × (replenishment as % of normal demand − demand as % of normal)`

| Scenario | Petrol replenishment | Diesel | Jet | Petrol at week 8 | Diesel at week 8 | Jet at week 8 |
|---|---:|---:|---:|---:|---:|---:|
| Base | 98% | 96% | 98% | 40.9 days | 35.8 days | 30.9 days |
| Tight | 90% | 85% | 88% | 36.4 days | 29.6 days | 25.3 days |
| Severe | 75% | 60% | 70% | 28.0 days | 15.6 days | 15.2 days |

The base case is the most defensible planning case while scheduled cargoes
arrive and Lytton remains available. The tight case becomes more plausible after
repeated clean-product cargo slippage or another fall in Asian refinery output.
The severe case requires a renewed large route shock, an extended Lytton outage,
or an inability to replace missing diesel and jet cargoes.

These scenarios are stress tests, not probabilistic forecasts. The
replenishment percentages are editable because public data does not reveal
future cargo allocation to SEQ.

## 6. Decision triggers

Move away from the base case if one or more of the following occur:

- clean-product cargo cover falls below 10 days or declines for two consecutive
  weeks;
- national diesel cover falls below 25 days (severe below 18);
- Queensland retail stock-outs exceed 5% of reporting sites or rise broadly for
  several weeks;
- Lytton has an unplanned outage;
- Gulf merchant-ship attacks, insurance withdrawal or Bab el-Mandeb disruption
  materially reduce protected transit;
- Singapore gasoil remains disconnected from falling crude prices, signalling
  a continuing physical product shortage.

## Confidence

- **Current national stocks and retail outages:** high; official weekly data.
- **Hormuz direction:** medium; strong official evidence, but rapidly changing
  military and diplomatic conditions.
- **SEQ daily demand:** medium; grounded in APS and disclosed infrastructure.
- **Exact local stocks:** low; commercial terminal inventories are unavailable.
- **Four-to-eight-week directional outlook:** low-to-medium; sensitive to cargo
  allocation, refinery uptime and demand response.
