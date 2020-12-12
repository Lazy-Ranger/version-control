const readline = require("readline");

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

module.exports = {
  prompt,
  closePrompt,
};
