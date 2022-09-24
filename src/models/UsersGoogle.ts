import { DataType } from "sequelize-typescript";
import { Model } from "sequelize";
import connection from "../config/config";

export interface IUsersGoogle {
  id: number;
  email: string;
}

export default class UsersGoogle extends Model<IUsersGoogle> {}

UsersGoogle.init(
  {
    id: {
      type: DataType.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataType.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    tableName: "users_google",
  }
);
