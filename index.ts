import express, { Application, Request, Response } from "express";
import {
  createBranch,
  deleteBranch,
  getBranch,
  getBranchDetail,
  getBranchStats,
  updateBranch,
} from "./controllers/branchController";
import userRoute from "./routes/userRoute"
import postRoute from "./routes/postRoute"
import managerRoute from "./routes/managerRoute"

const app: Application = express();
app.use(express.json()); // Body Parser

app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)

app.use("/api/manager", managerRoute)

app.post("/api/branch", createBranch);
app.get("/api/branch", getBranch);
app.get("/api/branch/:id", getBranchDetail);
app.get('/api/branch-stats', getBranchStats)
app.put("/api/branch/:id", updateBranch);
app.delete("/api/branch/:id", deleteBranch);

app.get("/api", (req: Request, res: Response) => {
  res.status(200).send({
    hello: "world",
  });
});

app.listen(3456, () => {
  console.log("API run on port", 3456);
});
