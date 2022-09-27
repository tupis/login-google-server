import { DataType } from "sequelize-typescript";
import { Model } from "sequelize";
import connection from "../config/config";
import * as bcrypt from "bcrypt";

export interface IUsersGoogle {
  id: number;
  email: string;
  name: string;
  sub: string;
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
    name: {
      type: DataType.STRING,
      allowNull: false,
    },
    sub: {
      type: DataType.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    tableName: "users_google",
  }
);

UsersGoogle.beforeCreate(async (user: any) => {
  const hashedSub = await bcrypt.hash(
    user.sub,
    Number(process.env.BCRYPT_SALT)
  );
  user.sub = hashedSub;
});
