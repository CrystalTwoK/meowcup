const { connect } = require("mongoose");
const { MONGODB_URI } = require("./config");

//initialize db connection

connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected.");
  })
  .catch((e) => {
    console.log(e);
  });
