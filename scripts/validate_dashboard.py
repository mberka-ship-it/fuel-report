#!/usr/bin/env python3
"""Fail the workflow if the refreshed dashboard is incomplete or inconsistent."""

from __future__ import annotations

import base64
import gzip
import json
import re
from datetime import date
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"
SNAPSHOT = ROOT / "data" / "snapshot.json"
REQUIRED_DATASETS = {
    "fuelplan_summary",
    "qld_outages",
    "shipment_days",
    "price_movements",
    "benchmark_change",
    "mso_trend",
    "mso_latest",
    "qld_demand_index",
    "qld_demand_summary",
    "import_origins",
    "scenario_week8",
    "developments",
}


def main() -> None:
    document = INDEX.read_text(encoding="utf-8")
    match = re.search(
        r'<template\b[^>]*\bid=["\']data-analytics-portable-artifact-payload-source["\'][^>]*>(.*?)</template>',
        document,
        re.IGNORECASE | re.DOTALL,
    )
    if not match:
        raise SystemExit("embedded dashboard payload is missing")
    encoded = re.sub(r"\s+", "", match.group(1))
    artifact = json.loads(gzip.decompress(base64.b64decode(encoded)))
    public = json.loads(SNAPSHOT.read_text(encoding="utf-8"))

    datasets = artifact["snapshot"]["datasets"]
    missing = REQUIRED_DATASETS.difference(datasets)
    if missing:
        raise SystemExit(f"missing datasets: {sorted(missing)}")
    for name in REQUIRED_DATASETS:
        if not isinstance(datasets[name], list) or not datasets[name]:
            raise SystemExit(f"dataset is empty: {name}")
    if datasets != public["datasets"]:
        raise SystemExit("public snapshot and embedded dashboard payload disagree")

    source_periods = public["sourcePeriods"]
    for name, value in source_periods.items():
        try:
            parsed = date.fromisoformat(value)
        except ValueError as error:
            raise SystemExit(f"invalid source date for {name}: {value}") from error
        if parsed > date.today():
            raise SystemExit(f"future source date for {name}: {value}")

    latest_mso = {row["fuel"] for row in datasets["mso_latest"]}
    if latest_mso != {"Petrol", "Diesel", "Jet fuel"}:
        raise SystemExit(f"unexpected MSO fuels: {sorted(latest_mso)}")
    if len(datasets["shipment_days"]) != 4:
        raise SystemExit("shipment dataset must contain current/prior crude and clean-product rows")

    description = artifact["manifest"].get("description", "")
    if "checked" not in description.lower():
        raise SystemExit("dashboard description is missing its checked date")
    print("Dashboard payload, source periods and normalized snapshot are consistent.")


if __name__ == "__main__":
    main()
