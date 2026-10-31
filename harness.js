import fs from "node:fs";

import {
  validateRecord,
  normalizeRecord,
  filterRecords,
  searchRecords,
  sortRecords,
  summarizeRecords,
  buildReport
} from "./toolkit.js";

const games = JSON.parse(
  fs.readFileSync("./data/games.json", "utf8")
);

const boundary = JSON.parse(
  fs.readFileSync("./data/boundary-records.json", "utf8")
);

const empty = JSON.parse(
  fs.readFileSync("./data/empty.json", "utf8")
);

let passed = 0;
let failed = 0;

function runCase(name, expected, actual) {
  const success = JSON.stringify(actual) === JSON.stringify(expected);

  console.log(
    `${success ? "PASS" : "FAIL"}  ${name}  expected: ${JSON.stringify(expected)}  actual: ${JSON.stringify(actual)}`
  );

  if (success) {
    passed++;
  } else {
    failed++;
  }
}

// 1. Valid record
runCase(
  "valid game record",
  true,
  validateRecord(games[0]).valid
);

// 2. Invalid record
runCase(
  "invalid minutes validation",
  false,
  validateRecord(boundary[1]).valid
);

// 3. Normalize extra spaces
runCase(
  "normalize trims title",
  "ROBOT GARDEN",
  normalizeRecord(boundary[2]).title
);

// 4. Filter Puzzle games
runCase(
  "filter Puzzle games",
  3,
  filterRecords(games, game => game.category === "Puzzle").length
);

// 5. Search by title
runCase(
  "search by title",
  ["Cloud Cards"],
  searchRecords(games, "Cloud").map(game => game.title)
);

// 6. Search by creator
runCase(
  "search by creator",
  ["Cloud Cards"],
  searchRecords(games, "Ren").map(game => game.title)
);

// 7. Search ignores capitalization
runCase(
  "search ignores capitalization",
  ["Cloud Cards"],
  searchRecords(games, "REN").map(game => game.title)
);

// 8. Sort by minutes
runCase(
  "sort puts shortest game first",
  "Cloud Cards",
  sortRecords(games, "minutes")[0].title
);

// 9. Equal values sort alphabetically
runCase(
  "equal minutes sort alphabetically",
  ["City Builder Practice", "River Routes"],
  sortRecords(games, "minutes")
    .filter(game => game.minutes === 60)
    .map(game => game.title)
);

// 10. Summarize collection
runCase(
  "summarize total games",
  8,
  summarizeRecords(games).count
);

// 11. Empty array
runCase(
  "empty array summary",
  { count: 0, totalMinutes: 0, averageMinutes: 0 },
  summarizeRecords(empty)
);

// 12. Missing title
runCase(
  "missing title validation",
  false,
  validateRecord(boundary[0]).valid
);

// 13. Invalid number type
runCase(
  "text instead of minutes number",
  false,
  validateRecord(boundary[1]).valid
);

// 14. Nonmutation checks
const originalGames = JSON.stringify(games);
const originalRecord = JSON.stringify(boundary[2]);

sortRecords(games, "minutes");
normalizeRecord(boundary[2]);

runCase(
  "sorting and normalization do not mutate originals",
  true,
  JSON.stringify(games) === originalGames &&
  JSON.stringify(boundary[2]) === originalRecord
);
// Final results
console.log("\nTEST RESULTS");
console.log("Passed:", passed);
console.log("Failed:", failed);
console.log("Total:", passed + failed);