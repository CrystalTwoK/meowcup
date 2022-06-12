const app = require("./app");
require("dotenv").config();
require("colors");
const { PORT } = require("./config");
require("./db");
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
console.clear();

global.db = process.env.DB;

app.listen(PORT);
console.log(log.system + `Server is running on port ${PORT}`);
