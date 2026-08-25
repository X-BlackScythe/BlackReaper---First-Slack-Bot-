require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/blackreaper-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();

app.command("/blackreaper-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Available Commands:
/blackreaper-ping - Check bot latency
/blackreaper-help - Show available commands
/blackreaper-catfact - Get a cat fact`
  });
});