const app = require("./app");
require("dotenv").config();
require("colors");
const { PORT } = require("./config");

const Discord = require("discord.js");

global.client = new Discord.Client({
  intents: [
    "GUILDS",
    "GUILD_MEMBERS",
    "GUILD_BANS",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "DIRECT_MESSAGES",
    "DIRECT_MESSAGE_REACTIONS",
    "GUILD_EMOJIS_AND_STICKERS",
    "GUILD_VOICE_STATES",
  ],
});
global.log = {
  error: `${"[MEOWCUP]".green} >>> ${"ERROR".red} >>> `,
  db: `${"[MEOWCUP]".green} >>> ${"DATABASE".blue} >>> `,
  system: `${"[MEOWCUP]".green} >>> ${"SYSTEM".green} >>> `,
};

global.token = process.env.TOKEN;
global.db = process.env.DB;

client.login(token);

client.on("ready", () => {
  console.clear();
  console.log(log.system + "MEOWCUP Discord Client ready.");
  require("./db");
  app.listen(PORT);
  console.log(log.system + `Server is running on port ${PORT}`);
});
