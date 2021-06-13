const Logger = require('js-logger');
// import Logger from 'js-logger'
const isProduction = process.env.NODE_ENV === 'development';
const logLevel = isProduction ? "DEBUG" : "WARN"
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
      defaultLevel : Logger[logLevel],
        formatter: function (messages, context) {
            // Logger.trace(context);
          // prefix each log message with a timestamp.
          messages.unshift(logDecorators[context.level.name]);
          messages.unshift(new Date().toLocaleTimeString());
        },
      }
);
Logger.info("logger started")
Logger.info("Log Level", Logger.getLevel())
Logger.trace(Logger)

window.Logger = Logger

export default Logger