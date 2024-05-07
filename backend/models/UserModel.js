import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const User = db.define(
  "users",
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    saldo: DataTypes.DECIMAL(15, 2),
  },
  {
    freezeTableName: true,
  }
);

export default User;

(async () => {
  await db.sync();
})();
