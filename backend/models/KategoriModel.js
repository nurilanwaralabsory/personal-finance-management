import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Kategori = db.define(
  "kategori",
  {
    name: DataTypes.ENUM("Pemasukan", "Pengeluaran"),
  },
  {
    freezeTableName: true,
  }
);

export default Kategori;

(async () => {
  await db.sync();
})();
