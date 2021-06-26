const { is, debugInfo } = require('electron-util');
const Logger = require('js-logger');
const electronLog = require('electron-log');
const path = require('path');

electronLog.transports.console.level = false;
electronLog.transports.file.resolvePath = (variables) => {
  return path.join(variables.libraryDefaultDir, new Date().toISOString().split('T')[0] + ".log");
}

const logLevel = is.development ? "DEBUG" : "WARN"
const logDecorators = {
  "TRACE": "🔍",
  "DEBUG": "🧪",
  "INFO": "✨",
  "WARN": "⚠",
  "ERROR": "❗",
  "FATAL": "💥",
}
Logger.useDefaults(
  {
    defaultLevel: Logger[logLevel],
  }
);

const consoleHandler = Logger.createDefaultHandler({
  formatter: (messages, context) => {
    // Logger.trace(context);
    // prefix each log message with a timestamp.
    messages.unshift(logDecorators[context.level.name]);
    messages.unshift(new Date().toLocaleTimeString());
  },
});
const fileHandler = (messages, context) => {
  try {
    if(context.level.name === "ERROR"){
      electronLog.error(messages, debugInfo())
      console.log("logged error to file")
    } else if (context.level.name === "WARN") {
      electronLog.warn(messages, debugInfo())
      console.log("logged warn to file")
    }
  } catch (e) {
    console.log("tried to log to file, failed:", e)
  }
}
Logger.setHandler(function (messages, context) {
  consoleHandler(messages, context);
  fileHandler(messages, context);
});

Logger.info("logger started")
Logger.info("Log Level", Logger.getLevel())
Logger.trace(Logger)

window.Logger = Logger

export default Logger