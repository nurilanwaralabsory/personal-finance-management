import Anggaran from "../models/AnggaranModel.js";

export const getAnggaran = async (req, res) => {
  try {
    const response = await Anggaran.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};
