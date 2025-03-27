import express from "express";
import {
  insert,
  login,
  updateTask,
  getAllUser,
  getUserById,
  deleteNewTAsk
} from "../Controllers/User.controller.js";

const router = express.Router();

router.post("/insert", insert);
router.post("/login", login);
router.post("/updateNewTask", updateTask);
router.get("/getAllUser", getAllUser);
router.post("/getUserById", getUserById);
router.post("/deleteNewTAsk", deleteNewTAsk);

export default router;
