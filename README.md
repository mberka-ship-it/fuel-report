# SEQ Fuel Security Monitor

A static, source-backed dashboard covering:

- the current Strait of Hormuz disruption;
- Australian refined-fuel stocks, cargoes and prices;
- Brisbane / South East Queensland demand and retail availability;
- an editable 8-week stock-cover scenario model.

## Data refresh

The dashboard reads `data/snapshot.json`. A scheduled GitHub Action runs every
Saturday after the Australian Government's weekly stock publication and updates
the public headline data from [Fuel Plan](https://fuelplan.gov.au/fuel-statistics).
It can also be run manually from the Actions tab.

The APS demand baseline and geopolitical assessment are reviewed snapshots.
They are not automatically rewritten because source schemas and narrative
judgments need human validation.

## Local preview

Serve the repository with any static web server and open `index.html`. For
example, with Python installed:

```sh
python3 -m http.server 8000
```

The page includes a bundled fallback snapshot if `data/snapshot.json` cannot be
loaded. No build step or third-party JavaScript dependency is required.

## Model limitation

Brisbane / SEQ commercial terminal inventories are not published. The model uses
national MSO days as a planning proxy and sizes local stock equivalents using
Queensland sales and disclosed Lytton storage. The dashboard labels this
distinction throughout.
