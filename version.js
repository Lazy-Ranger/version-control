const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const HISTORY_DIR = path.join(__dirname, "history");
const VERSION_FILE = path.join(HISTORY_DIR, "version.json");

function prompt(message) {
  return new Promise((resolve) => {
    rl.question(message, (ans) => {
      rl.close();
      resolve(ans);
    });
  });
}

function readFileHistory(fileLoc) {}

function writeFileHistory(fileLoc) {}

async function initVersionControl() {}

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
