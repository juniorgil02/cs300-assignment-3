# Assignment 3: JavaScript Data Toolkit

**Name:** Gerardo Gil  
**Scenario:** Game Collection  
**Route:** Console

## Project Overview

This project is a JavaScript data toolkit for managing and searching a collection of games. It allows users to search games by title or creator, sort matching games by estimated playing time, validate and normalize records, and generate collection summaries.

## Project Files

- `toolkit.js` — Contains seven functions for validation, normalization, filtering, searching, sorting, summarizing, and building reports.
- `harness.js` — Contains 14 named test cases that verify the toolkit's functionality.
- `data/games.json` — Main game collection dataset.
- `data/boundary-records.json` — Records used to test edge cases.
- `data/empty.json` — Empty dataset for testing.
- `SCENARIOS.md` — Assignment scenario descriptions.
- `package.json` — Project configuration.

## How to Run

1. Open the project folder in VS Code.
2. Open the terminal in the project folder.
3. Run:

```bash
node harness.js
```

The harness runs 14 named tests and displays the expected results, actual results, and PASS or FAIL status.

## Verification

The final test run passed all 14 tests with zero failures.