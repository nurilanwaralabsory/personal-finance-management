import { response } from "express";
import Transaksi from "../models/TransaksiModel.js";

export const getTransaksi = async (req, res) => {
  try {
    const response = await Transaksi.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createTransaksi = async (req, res) => {
  try {
    await Transaksi.create(req.body);
    res.status(201).json({ msg: "Transaksi Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const getTransaksiByKategoriId = async (req, res) => {
  try {
    const response = await Transaksi.findAll({
      where: {
        kategori_id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getTransaksiGroupedByDate = async (req, res) => {
  try {
    // mengambil semua data dari database menggunakan sequelize
    const allData = await Transaksi.findAll();
    const groupedData = allData.reduce((acc, curr) => {
      const createdAt = new Date(curr.createdAt).toDateString();
      if (!acc[createdAt]) {
        acc[createdAt] = [];
      }
      acc[createdAt].push(curr);
      return acc;
    }, {});
    res.status(200).json(groupedData);
  } catch (error) {
    console.error("Error while fetching and grouping data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteTransaksi = async (req, res) => {
  try {
    await Transaksi.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Transaksi Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateTransaksi = async (req, res) => {
  try {
    await Transaksi.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Transaksi Updated" });
  } catch (error) {
    console.log(error.message);
  }
};
