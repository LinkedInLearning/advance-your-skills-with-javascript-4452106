class Logger {
  constructor() {
    if (Logger.instance == null) {
      this.logs = [];
      Logger.instance = this;
    }
    return Logger.instance;
  }

  log(message) {
    this.logs.push(message);
  }

  getLogCount() {
    return this.logs.length;
  }

  showLog() {
    const logResult = this.logs.map((log, index) => `${index + 1}. ${log}`);
    const logCount = this.getLogCount();
    return {
      logs: logResult,
      logCount: logCount,
    };
  }
}

const loggerInstance = new Logger();
Object.freeze(loggerInstance);

const handler = {
  get: function (target, prop) {
    if (prop === "log") {
      return function (message) {
        const timestamp = new Date();
        return target[prop](`${timestamp} - ${message}`);
      };
    } else if (prop === "showLog") {
      return target[prop].bind(target);
    } else {
      return target[prop];
    }
  },
};

const logger = new Proxy(loggerInstance, handler);

const logEntries = [
  "User Maiken created.",
  "User Simran created.",
  "User Simran updated.",
  "User Maiken deleted.",
];

logEntries.forEach((entry) => {
  logger.log(entry);
});

const result = logger.showLog();

console.log(result);
