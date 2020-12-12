const path = require("path");

const { prompt, closePrompt, isFileExistsInHistory } = require("./utils");
const file_system = require("./file_system");
const { HISTORY_DIR, VERSION_FILE } = require("./config");
const { clearTimeout } = require("timers");

async function readFileHistory(fileLoc) {
  const { fileMetadata } = await isFileExistsInHistory(VERSION_FILE, fileLoc);

  if (!fileMetadata) {
    console.log(`${filename} history not found`);
    return;
  }

  const fileVersions = fileMetadata.versions;

  console.log("Choose file version : ");

  fileVersions.forEach((version, index) => {
    console.log(
      `version: ${index + 1} , date: ${new Date(version.date).toUTCString()}`
    );
  });

  const vn = await prompt(": ");

  const versionDetail = fileVersions.find((version) => version.name === +vn);

  if (!versionDetail) {
    console.log("Not a valid version number");
    return;
  }

  const data = await file_system.readFile(
    path.join(HISTORY_DIR, versionDetail.file)
  );

  console.log(data);
}

async function writeFileHistory(fileLoc) {
  let { VERSION_FILE_CONTENT, fileMetadata } = await isFileExistsInHistory(
    VERSION_FILE,
    fileLoc
  );

  const filename = path.basename(fileLoc);

  if (!fileMetadata) {
    VERSION_FILE_CONTENT[filename] = {
      versionCounter: 0,
      versions: [],
    };

    await file_system.writeFile(
      VERSION_FILE,
      JSON.stringify(VERSION_FILE_CONTENT)
    );

    fileMetadata = VERSION_FILE_CONTENT[filename];
  }

  let timer,
    isFileStillWritting = false;

  file_system.watchFile(fileLoc, async () => {
    if (isFileStillWritting) {
      return;
    }

    isFileStillWritting = true;

    timer = setTimeout(async () => {
      await saveHistory(fileMetadata, fileLoc);
      await file_system.writeFile(
        VERSION_FILE,
        JSON.stringify(VERSION_FILE_CONTENT)
      );

      clearTimeout(timer);
      isFileStillWritting = false;
    }, 1007);
  });
}

async function saveHistory(fileMetadata, fileLoc) {
  const versionN = fileMetadata.versionCounter;
  const filename = path.basename(fileLoc);
  const saveFileName = `${versionN + 1}-${filename}`;

  const record = {
    name: versionN + 1,
    date: new Date().toJSON(),
    file: saveFileName,
  };

  fileMetadata.versionCounter = versionN + 1;
  fileMetadata.versions.push(record);

  // f://node/main.js history/v1-main.js
  await file_system.copyFile(fileLoc, path.join(HISTORY_DIR, saveFileName));
}

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
