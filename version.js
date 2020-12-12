const fs = require("fs");
const path = require("path");

const { prompt } = require("./utils");
const file_system = require("./file_system");
const { HISTORY_DIR, VERSION_FILE } = require("./config");

async function readFileHistory(fileLoc) {
  const VERSION_STORE = JSON.parse(await file_system.readFile(VERSION_FILE));
  const filename = path.basename(fileLoc);
  let fileMetadata;

  for (const key in VERSION_STORE) {
    if (key === filename) {
      fileMetadata = VERSION_STORE[key];
      break;
    }
  }

  if (!fileMetadata) {
    console.log(`${filename} history not found`);
  }
}

async function writeFileHistory(fileLoc) {}

async function initVersionControl() {
  const isDirExists = await file_system.isDirExists(HISTORY_DIR);

  if (!isDirExists) {
    await file_system.mkDir(HISTORY_DIR);
    await file_system.writeFile(VERSION_FILE, JSON.stringify({}));
  }
}

async function main() {
  await initVersionControl();

  const fileLoc = await prompt("Enter file location : ");
  const option = await prompt("1. Read history\n2. Write History\n");

  switch (+option) {
    case 1:
      await readFileHistory(fileLoc);
      break;

    case 2:
      await writeFileHistory(fileLoc);
      break;
  }
}

main();
