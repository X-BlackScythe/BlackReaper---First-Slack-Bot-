const axios = require("axios");

require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

app.command("/blackreaper-ping", async ({ ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

app.command("/blackreaper-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text: `Available Commands:
/blackreaper-ping - Responds with Pong
/blackreaper-help - Show available commands
/blackreaper-catfact - Get a cat fact
/blackreaper-joke - Get a random joke
/blackreaper-roll - Roll a dice (1-6)
/blackreaper-coinflip - Flip a coin
/blackreaper-dogphoto - Get a random dog photo`,
  });
});

app.command("/blackreaper-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `Cat Fact:\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a cat fact." });
  }
});

app.command("/blackreaper-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({
      text: `${response.data.setup}\n\n${response.data.punchline}`,
    });
  } catch (err) {
    await respond({ text: "Failed to fetch a joke." });
  }
});

app.command("/blackreaper-roll", async ({ ack, respond }) => {
  await ack();

  const roll = Math.floor(Math.random() * 6) + 1;
  await respond({ text: `You rolled a ${roll}!` });
});

app.command("/blackreaper-coinflip", async ({ ack, respond }) => {
  await ack();

  const result = Math.random() < 0.5 ? "Heads" : "Tails";
  await respond({ text: `Coin Flip Result: ${result}` });
});

app.command("/blackreaper-dogphoto", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://dog.ceo/api/breeds/image/random");

    await respond({
      text: ` Random Dog!\n${response.data.message}`,
    });
  } catch (err) {
    await respond({ text: "Failed to fetch a dog." });
  }
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();