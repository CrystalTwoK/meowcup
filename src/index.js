const app = require("./app");
require("dotenv").config();
const { PORT } = require("./config");
require("./db");

global.db = process.env.DB;

app.listen(PORT);
console.log(`Server is running on port ${PORT}`);
