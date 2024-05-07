import express from "express";
import { getAnggaran } from "../controllers/AnggaranController.js";

const router = express.Router();

router.get("/anggaran", getAnggaran);

export default router;
