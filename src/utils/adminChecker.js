const { Permissions } = require("discord.js");

const checkAdmin = (bitfield = 0) => {
  let permissionsArray = [];
  const objectLength = Object.keys(Permissions.FLAGS).length;
  const permessi = Object.keys(Permissions.FLAGS);
  // console.log(permessi);
  for (let i = objectLength - 1; i >= 0; i--) {
    const result = parseInt(Permissions.FLAGS[permessi[i]]);
    if (result <= bitfield) {
      bitfield = bitfield - result;
      permissionsArray.push(permessi[i]);
      // console.log(i + " > MATCH!" + " " + permessi[i] + " " + bitfield);
    }
    // } else if (bitfield == 0) {
    //   console.log("CONCLUSO! " + bitfield);
    // } else {
    //   console.log(i + " NON MATCHED!!" + " " + permessi[i] + " " + bitfield);
    // }
  }
  return permissionsArray;
};

const isAdmin = (permissionsValue) => {
  try {
    const permessi = checkAdmin(permissionsValue);
    if (permessi.includes("MANAGE_GUILD")) {
      return true;
    }

    return false;
  } catch (e) {
    console.log(e);
  }
};

module.exports = { isAdmin };
