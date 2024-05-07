import { Sequelize } from "sequelize";

const db = new Sequelize("crud_db", "root", "jamalatus", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
