"""Render the shipped templates; HA services are mocked, not integration-tested."""

import argparse
import ast
from datetime import datetime, timedelta
import json
from pathlib import Path
import re
import subprocess
import unittest

from jinja2 import StrictUndefined
from jinja2.sandbox import ImmutableSandboxedEnvironment
import yaml


ROOT = Path(__file__).resolve().parent
PACKAGE = yaml.safe_load((ROOT / "schultermine.yaml").read_text(encoding="utf-8"))
BLOCK = PACKAGE["template"][0]
TODAY = datetime(2026, 10, 15)
CALENDAR = BLOCK["variables"]["schulkalender"]


def as_datetime(value, default=None):
    try:
        return datetime.fromisoformat(value)
    except (TypeError, ValueError):
        return default


ENV = ImmutableSandboxedEnvironment(undefined=StrictUndefined)
ENV.globals.update(today_at=lambda: TODAY, timedelta=timedelta, as_datetime=as_datetime)
ENV.filters.update(
    regex_match=lambda value, pattern: re.match(pattern, value) is not None,
    regex_replace=lambda value, pattern, replacement="": re.sub(pattern, replacement, value),
)


def render(value, context):
    if not isinstance(value, str):
        return value
    rendered = ENV.from_string(value).render(context).strip()
    # HA strips rendered whitespace and converts literal lists/dicts/bools.
    try:
        return ast.literal_eval(rendered)
    except (ValueError, SyntaxError):
        return rendered


def run_response(response):
    context = dict(BLOCK["variables"])
    for action in BLOCK["actions"]:
        if "action" in action:
            context[action["response_variable"]] = response
        else:
            for key, value in action["variables"].items():
                context[key] = render(value, context)
    sensor = BLOCK["sensor"][0]
    return {
        "available": render(sensor["availability"], context),
        "state": render(sensor["state"], context),
        **{key: render(value, context) for key, value in sensor["attributes"].items()},
    }


def run_events(events):
    return run_response({CALENDAR: {"events": events}})


def event(title="Mathearbeit [3,4]", start="2026-10-22", end="2026-10-23"):
    return {"summary": title, "start": start, "end": end}


class CalendarExampleTests(unittest.TestCase):
    def test_complete_entry(self):
        result = run_events([event()])
        self.assertIs(result["available"], True)
        self.assertEqual(result["state"], 1)
        self.assertEqual(result["entries"], [{
            "date": "2026-10-22", "match": "period", "action": "note",
            "text": "Mathearbeit", "periods": ["3", "4"],
        }])

    def test_whitespace_and_duplicates(self):
        result = run_events([event("  Diktat [ 2, 2, 3 ]"), event("  Diktat [ 2, 2, 3 ]")])
        self.assertEqual(result["state"], 1)
        self.assertEqual(result["entries"][0]["text"], "Diktat")
        self.assertEqual(result["entries"][0]["periods"], ["2", "3"])

    def test_missing_and_invalid_titles(self):
        titles = ["Arbeit", "[3]", "  [3]", "Arbeit []", "Arbeit [0]",
                  "Arbeit [3-4]", "Arbeit [MP]", "Arbeit [3,]", "Arbeit [03]",
                  "Arbeit\nDiktat [3]", "Arbeit [3]\n", None, 42]
        result = run_events([event(title) for title in titles])
        self.assertEqual(result["entries"], [])
        self.assertEqual(result["ignorierte_termine"], len(titles))

    def test_timed_multiday_and_bad_dates(self):
        events = [event(start="2026-10-22T08:00:00+02:00", end="2026-10-22T08:45:00+02:00"),
                  event(end="2026-10-24"), event(end="2026-10-22"),
                  event(start="2026-02-30"), event(end="2026-13-23"),
                  event(start=None), {}, None, "invalid"]
        result = run_events(events)
        self.assertEqual(result["entries"], [])
        self.assertEqual(result["ignorierte_termine"], len(events))

    def test_empty_calendar_is_available_and_removes_old_entries(self):
        self.assertEqual(run_events([event()])["state"], 1)
        result = run_events([])
        self.assertIs(result["available"], True)
        self.assertEqual(result["state"], 0)
        self.assertEqual(result["entries"], [])

    def test_failure_is_not_reported_as_empty_success(self):
        responses = [None, {}, {CALENDAR: None}, {CALENDAR: {}},
                     {CALENDAR: {"events": None}}, {CALENDAR: {"events": "[]"}},
                     {CALENDAR: {"events": {}}}]
        for response in responses:
            with self.subTest(response=response):
                self.assertIs(run_response(response)["available"], False)

    def test_today_and_exclusive_range(self):
        events = []
        for offset in [-1, 0, 59, 60]:
            start = TODAY + timedelta(days=offset)
            events.append(event(start=start.date().isoformat(),
                                end=(start + timedelta(days=1)).date().isoformat()))
        result = run_events(events)
        self.assertEqual([entry["date"] for entry in result["entries"]],
                         ["2026-10-15", "2026-12-13"])

    def test_all_day_across_daylight_saving_boundary(self):
        result = run_events([event(start="2026-10-25", end="2026-10-26")])
        self.assertEqual(result["entries"][0]["date"], "2026-10-25")

    def test_sorted_and_updated(self):
        result = run_events([event(), event("Diktat [2]", "2026-10-16", "2026-10-17")])
        self.assertEqual(result["entries"][0]["text"], "Diktat")
        self.assertEqual(run_events([event("Neue Arbeit [4]")])["entries"][0]["text"], "Neue Arbeit")

    def test_request_bounds_and_retry(self):
        action = BLOCK["actions"][1]
        self.assertTrue(action["continue_on_error"])
        self.assertEqual(render(action["data"]["start_date_time"], {}), "2026-10-15T00:00:00")
        self.assertEqual(render(action["data"]["end_date_time"], {}), "2026-12-14T00:00:00")
        self.assertEqual(BLOCK["triggers"][1]["minutes"], "/15")

    def test_real_card_contract(self):
        result = subprocess.run(
            ["node", str(ROOT / "test_card_contract.mjs"), str(CARD_MODULE)],
            input=json.dumps(run_events([event()])["entries"]),
            capture_output=True, text=True, encoding="utf-8", check=False,
        )
        self.assertEqual(result.returncode, 0, result.stderr)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--card-module", type=Path, required=True)
    options, remaining = parser.parse_known_args()
    CARD_MODULE = options.card_module.resolve(strict=True)
    unittest.main(argv=[__file__, *remaining])
