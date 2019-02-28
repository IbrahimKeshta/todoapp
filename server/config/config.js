var config = require("./config.json");
// var envConfig = config[env]; // return an objects of the env
// takes an object like envConfig return them as array
Object.keys(config).forEach(key => {
  process.env[key] = config[key];
});
