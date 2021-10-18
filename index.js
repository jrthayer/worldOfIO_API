const winston = require("winston");
const express = require("express");
const app = express();
const { Show, validate } = require("./models/show");

require("./start/logging");
require("./start/validation");
require("./start/config");
require("./start/routes");
require("./start/db");

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
    winston.info(`Listening on port ${port}...`)
);

const req = {
    body: {
        name: "Test Name",
        banner: "test banner",
        time: {
            day: 0,
            minutes: 160,
        },
        completed: true,
        delayed: true,
    },
};

async function test(req) {
    const { error } = validate(req.body);
    if (error) console.log(error.message);

    let show = new Show(req.body);
    await show.save();
}

setTimeout(function () {
    test(req);
}, 5000);

module.exports = server;
