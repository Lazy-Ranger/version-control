const path = require("path");

const HISTORY_DIR = path.join(__dirname, "history");
const VERSION_FILE = path.join(HISTORY_DIR, "version.json");

module.exports = {
  HISTORY_DIR,
  VERSION_FILE,
};
