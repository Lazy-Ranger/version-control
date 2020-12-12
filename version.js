const fs = require("fs");
const path = require("path");

const { prompt } = require("./utils");
const file_system = require("./file_system");
const { HISTORY_DIR, VERSION_FILE } = require("./config");

function readFileHistory(fileLoc) {}

function writeFileHistory(fileLoc) {}

async function initVersionControl() {
  const isDirExists = await file_system.isDirExists(HISTORY_DIR);

  if (!isDirExists) {
    await file_system.mkDir(HISTORY_DIR);
    await file_system.writeFile(VERSION_FILE, "{}");
  }
}

async function main() {
  await initVersionControl();

  const fileLoc = await prompt("Enter file location : ");
  const option = +(await prompt("1. Read history\n2. Write History\n"));

  switch (option) {
    case 1:
      readFileHistory(fileLoc);
      break;

    case 2:
      writeFileHistory(fileLoc);
      break;
  }
}

main();
