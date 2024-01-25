import express, { Application, Request, Response } from "express";
import {
  createBranch,
  deleteBranch,
  getBranch,
  getBranchDetail,
  getBranchStats,
  updateBranch,
} from "./controllers/branchController";
import userRoute from "./routes/userRoute";
import postRoute from "./routes/postRoute";
import managerRoute from "./routes/managerRoute";
import { scheduleTask } from "./cron/scheduleTask";
import exampleQueue from "./queues/queue";

const app: Application = express();
const port: number = 3456;
app.use(express.json()); // Body Parser

app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/manager", managerRoute);

app.post("/api/branch", createBranch);
app.get("/api/branch", getBranch);
app.get("/api/branch/:id", getBranchDetail);
app.get("/api/branch-stats", getBranchStats);
app.put("/api/branch/:id", updateBranch);
app.delete("/api/branch/:id", deleteBranch);

app.get("/api", (req: Request, res: Response) => {
  res.status(200).send({
    hello: "world",
  });
});

scheduleTask();

app.get("/enqueue", async (req: Request, res: Response) => {
  await exampleQueue.add('exampleJob', { data: "some data" });
  res.send("Job enqueued!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
