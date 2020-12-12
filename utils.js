const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(message) {
  return new Promise((resolve) => {
    rl.question(message, (ans) => {
      rl.close();
      resolve(ans);
    });
  });
}

module.exports = {
  prompt,
};
