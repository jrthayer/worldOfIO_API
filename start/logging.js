const winston = require("winston");
var path = require("path");
var logDir = "logs";

winston.add(
    new winston.transports.Console({
        colorize: true,
        prettyPrint: true,
        handleExceptions: true,
        handleRejections: true,
    })
);

winston.add(
    new winston.transports.File({
        filename: path.join(logDir, "/logfile.log"),
        handleExceptions: true,
        handleRejections: true,
    })
);
