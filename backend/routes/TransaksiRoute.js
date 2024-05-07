import express from "express";
import {
  createTransaksi,
  deleteTransaksi,
  getTransaksi,
  getTransaksiByKategoriId,
  updateTransaksi,
} from "../controllers/TransaksiController.js";

const router = express.Router();

router.get("/transaksi", getTransaksi);
router.get("/transaksi/kategori/:id", getTransaksiByKategoriId);
router.post("/transaksi", createTransaksi);
router.get("/transaksi/grouped-by-date", getTransaksi);
router.delete("/transaksi/:id", deleteTransaksi);
router.patch("/transaksi/:id", updateTransaksi);

export default router;
