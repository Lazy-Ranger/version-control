const fs = require("fs");
const path = require("path");

const { prompt, closePrompt } = require("./utils");
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
    return;
  }

  const fileVersions = fileMetadata.versions;

  console.log("Choose file version : ");

  fileVersions.forEach((version, index) => {
    console.log(`version: ${index + 1} , date: ${version.date}`);
  });

  const vn = await prompt(": ");

  const versionDetail = fileVersions.find((version) => version.name === +vn);

  if (!versionDetail) {
    console.log("Not a valid version number");
    return;
  }

  const data = await file_system.readFile(versionDetail.file);

  console.log(data);
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

  closePrompt();
}

main();
