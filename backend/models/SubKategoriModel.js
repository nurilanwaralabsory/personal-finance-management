import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Kategori from "./KategoriModel.js";

const { DataTypes } = Sequelize;

const SubKategori = db.define(
  "sub_kategori",
  {
    name: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

SubKategori.belongsTo(Kategori, {
  foreignKey: "kategori_id",
});

export default SubKategori;

(async () => {
  await db.sync();
})();
