import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";
import Kategori from "./KategoriModel.js";

const { DataTypes } = Sequelize;

const Transaksi = db.define(
  "transaksi",
  {
    jumlah: DataTypes.DECIMAL(15, 2),
    deskripsi: DataTypes.TEXT,
  },
  {
    freezeTableName: true,
  }
);

Transaksi.belongsTo(User, {
  foreignKey: "user_id",
});

Transaksi.belongsTo(Kategori, {
  foreignKey: "kategori_id",
});

export default Transaksi;

(async () => {
  await db.sync();
})();
