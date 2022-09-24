import { Sequelize } from "sequelize-typescript";

const connection = new Sequelize({
  username: "tupis",
  password: "123456",
  database: "logingoogle",
  host: "localhost",
  dialect: "postgres",
});

export default connection;
