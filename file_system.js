const fs = require("fs");
const { resolve } = require("path");

function isDirExists(dir) {
  return new Promise((resolve) => {
    fs.opendir(dir, (err, dh) => {
      if (err && err.code === "ENOENT") {
        resolve(false);
      } else {
        dh.close();
        resolve(true);
      }
    });
  });
}

function mkDir(dir) {
  return new Promise((resolve) => {
    fs.mkdir(dir, (err) => {
      resolve();
    });
  });
}

function writeFile(fileLoc, data) {
  return new Promise((resolve) => {
    fs.writeFile(fileLoc, data, (err) => {
      resolve(data);
    });
  });
}

function readFile(fileLoc) {
  return new Promise((resolve) => {
    fs.readFile(fileLoc, "utf8", (err, data) => {
      resolve(data);
    });
  });
}

function copyFile(src, target) {
  return new Promise((resolve) => {
    fs.copyFile(src, target, (err) => {
      resolve();
    });
  });
}

function watchFile(fileLoc, callbackFn) {
  fs.watch(fileLoc, { interval: 1000 }, (evtName, fileName) => {
    if (evtName === "change") {
      callbackFn();
    }
  });
}

module.exports = {
  isDirExists,
  mkDir,
  writeFile,
  readFile,
  copyFile,
  watchFile,
};
