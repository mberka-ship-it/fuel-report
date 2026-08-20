# SEQ Fuel Security Monitor

A static, source-backed dashboard covering:

- the current Strait of Hormuz disruption;
- Australian refined-fuel stocks, cargoes and prices;
- Brisbane / South East Queensland demand and retail availability;
- an editable 8-week stock-cover scenario model.

## Data refresh

The `Refresh and publish dashboard` GitHub Action runs every day at 9:17 am
Australia/Brisbane time and can also be run manually from the Actions tab. It:

1. checks the current [Fuel Plan](https://fuelplan.gov.au/fuel-statistics) page;
2. reads the latest official weekly MSO workbook;
3. discovers and reads the newest monthly Australian Petroleum Statistics workbook;
4. recalculates the dashboard datasets and eight-week sensitivity;
5. validates the normalized snapshot against the dataset embedded in `index.html`;
6. records the checked snapshot and deploys the same files to GitHub Pages.

The public dashboard is a self-contained portable artifact. Its interactive
reader uses a compressed dataset embedded in `index.html`; `data/snapshot.json`
is the matching readable audit copy. Both files are updated together.

The job fails closed: a missing source, changed schema, empty dataset or mismatch
stops publication, leaving the previous successful deployment online.

Official sources publish on different clocks. A daily check does not turn weekly
MSO or monthly APS releases into daily observations, so every panel names its
actual source period. Quantitative releases refresh automatically; geopolitical
and policy interpretation remains explicitly dated reviewed context.

## Local preview

Serve the repository with any static web server and open `index.html`. For
example, with Python installed:

```sh
python3 -m http.server 8000
```

The page includes its dataset and reader runtime, so no API or third-party
JavaScript dependency is required in the visitor's browser.

## Model limitation

Brisbane / SEQ commercial terminal inventories are not published. The dashboard
uses Brisbane retail prices as a direct SEQ signal and clearly labels Queensland
availability and sales as statewide proxies. National MSO holdings and the
eight-week sensitivity are not estimates of stock physically located in SEQ.
