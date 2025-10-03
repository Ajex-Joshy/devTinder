### Cron Job

A cron job is a scheduled task that runs automatically at specified intervals on Unix-like operating systems (Linux, macOS, etc.).

- “Cron” stands for Chronos (Greek for “time”).
- It uses a cron daemon (a background process) to execute commands or scripts based on a schedule.
- The schedule is defined using a cron expression (a special syntax with 5 fields: minute, hour, day of month, month, day of week).

Use cases

- Automated backups
- Sending scheduled emails
- Running cleanup scripts
- Refreshing cache or logs

To achieve this in node we will use a package called node-cron

- node-cron is a Node.js library that allows you to schedule tasks (like functions, scripts, or commands) using cron expressions.
- It works similarly to the cron system in Linux, but directly inside your Node.js app.

```js
const cron = require("node-cron");

// Run a task every minute
cron.schedule("* * * * *", () => {
  console.log("Running a task every minute");
});
```

```
* * * * * *
│ │ │ │ │ │
│ │ │ │ │ └─ day of week (0 - 7) (0 or 7 = Sunday)
│ │ │ │ └─── month (1 - 12)
│ │ │ └───── day of month (1 - 31)
│ │ └─────── hour (0 - 23)
│ └───────── minute (0 - 59)
└─────────── second (0 - 59)   (optional)
```

```js
cron.schedule("*/5 * * * * *", () => {
  console.log("Runs every 5 seconds");
});

cron.schedule("0 0 * * *", () => {
  console.log("Runs every day at 12:00 AM");
});

cron.schedule("0 9 * * 1", () => {
  console.log("Weekly report generated");
});
```

study cron expression
simulator - https://crontab.guru/
