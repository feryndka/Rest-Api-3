import express,{ Router } from "express";
import { createManager, getManager, updateManager, deleteManager } from "../controllers/managerController";

const router : Router = express.Router()

router.post("/", createManager)
router.get("/", getManager)
router.put("/:id", updateManager)
router.delete("/:id", deleteManager)

export default router