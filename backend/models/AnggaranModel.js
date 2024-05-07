import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Anggaran = db.define(
  "anggaran",
  {
    name: DataTypes.STRING,
    jumlah: DataTypes.DECIMAL(15, 0),
  },
  {
    freezeTableName: true,
  }
);

export default Anggaran;

(async () => {
  await db.sync();
})();
