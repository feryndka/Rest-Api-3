import cron from "node-cron";

export const scheduleTask = () => {
  cron.schedule("* * * * *", () => {
    console.log("Task running every minute.");
  });
};
