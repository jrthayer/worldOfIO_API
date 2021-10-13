const mongoose = require("mongoose");
const winston = require("winston");

const db = process.env.db;

mongoose.connect(db).then(() => winston.info(`Connected to ${db}...`));
