var env = process.env.NODE_ENV || 'development';

var config = require("./Config.json");

var envConfig = config[env];

Object.keys(envConfig).forEach((key)=> (process.env[key]=envConfig[key]));