const readline = require("readline");
const path = require("path");
const file_system = require("./file_system");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function closePrompt() {
  if (rl) {
    rl.close();
  }
}

function prompt(message) {
  return new Promise((resolve) => {
    rl.question(message, (ans) => {
      resolve(ans);
    });
  });
}

async function isFileExistsInHistory(VERSION_FILE, fileLoc) {
  const VERSION_STORE = JSON.parse(await file_system.readFile(VERSION_FILE));
  const filename = path.basename(fileLoc);
  let fileMetadata;

  for (const key in VERSION_STORE) {
    if (key === filename) {
      fileMetadata = VERSION_STORE[key];
      break;
    }
  }

  return {
    VERSION_FILE_CONTENT: VERSION_STORE,
    fileMetadata,
  };
}

module.exports = {
  prompt,
  closePrompt,
  isFileExistsInHistory,
};
