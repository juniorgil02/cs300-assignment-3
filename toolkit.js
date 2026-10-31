// Assignment 3: JavaScript Data Toolkit
//
// Write and export your seven functions in this file. You may use these names:
//
//   validateRecord(record)            returns useful error information for one record
//   normalizeRecord(record)           returns a cleaned copy; never changes the original record
//   filterRecords(records, condition) returns the records that match a condition you pass in
//   searchRecords(records, query)     matches 2+ properties, ignoring capitalization
//   sortRecords(records, property)    returns a new sorted array; never changes the original array
//   summarizeRecords(records)         returns a summary, such as a count, total, or average
//   buildReport(records, query)       combines at least two of the functions above
//
// Above each function, write a short comment: what it takes, what it returns,
// and whether it changes its input. Decide your tie rule for equal values
// and the shape of your validation errors before you write the code.
/**
 * Checks whether a game record contains all required properties.
 * @param {Object} record - The game record to validate.
 * @returns {Object} An object containing valid status and errors.
 * Does not modify the original record.
 */
function validateRecord(record) {
  const errors = [];

  if (!record || typeof record !== "object" || Array.isArray(record)) {
    return {
      valid: false,
      errors: ["Record must be an object."]
    };
  }

  const requiredProperties = [
    "id",
    "title",
    "creator",
    "category",
    "minutes",
    "description"
  ];

  requiredProperties.forEach(function(property) {
  if (property !== "minutes") {
    if (
      typeof record[property] !== "string" ||
      record[property].trim() === ""
    ) {
      errors.push(property + " is required.");
    }
  }
});

  if (
    typeof record.minutes !== "number" ||
    !Number.isInteger(record.minutes) ||
    record.minutes < 0
  ) {
    errors.push("Minutes must be a non-negative whole number.");
  }

  return {
    valid: errors.length === 0,
    errors: errors
  };
}/**
 * Takes one game record and returns a cleaned copy.
 * Removes extra spaces and standardizes category capitalization.
 * Does not modify the original record.
 */
function normalizeRecord(record) {
  const cleanedRecord = { ...record };

  for (const property in cleanedRecord) {
    if (typeof cleanedRecord[property] === "string") {
      cleanedRecord[property] = cleanedRecord[property].trim();
    }
  }

  cleanedRecord.category = cleanedRecord.category
    .toLowerCase()
    .replace(/\b\w/g, letter => letter.toUpperCase());

  return cleanedRecord;
}
/**
 * Takes an array of game records and a condition function.
 * Returns a new array containing records that match the condition.
 * Does not modify the original array.
 */
function filterRecords(records, condition) {
  return records.filter(condition);
}
/**
 * Takes an array of games and a search query.
 * Returns games whose title or creator contains the query,
 * ignoring capitalization. Does not modify the original array.
 */
function searchRecords(records, query) {
  const searchTerm = query.toLowerCase().trim();

  return records.filter(function(game) {
    return (
      game.title.toLowerCase().includes(searchTerm) ||
      game.creator.toLowerCase().includes(searchTerm)
    );
  });
}
/**
 * Takes an array of games and a property name.
 * Returns a new array sorted by that property.
 * Equal minutes are sorted alphabetically by title.
 * Does not modify the original array.
 */
function sortRecords(records, property) {
  return [...records].sort(function(a, b) {
    if (a[property] < b[property]) return -1;
    if (a[property] > b[property]) return 1;

    return a.title.localeCompare(b.title);
  });
}
/**
 * Takes an array of game records.
 * Returns the count, total minutes, and average playing time.
 * Does not modify the original array.
 */
function summarizeRecords(records) {
  const totalMinutes = records.reduce(function(total, game) {
    return total + game.minutes;
  }, 0);

  return {
    count: records.length,
    totalMinutes: totalMinutes,
    averageMinutes: records.length === 0
      ? 0
      : totalMinutes / records.length
  };
}
/**
 * Takes the game collection and a search query.
 * Returns matching games, sorted games, and their summary.
 * Does not modify the original collection.
 */
function buildReport(records, query) {
  const matchingGames = searchRecords(records, query);
  const sortedGames = sortRecords(matchingGames, "minutes");
  const summary = summarizeRecords(sortedGames);

  return {
    query: query,
    matchingGames: matchingGames,
    sortedGames: sortedGames,
    summary: summary
  };
}
export {
  validateRecord,
  normalizeRecord,
  filterRecords,
  searchRecords,
  sortRecords,
summarizeRecords,
buildReport
};