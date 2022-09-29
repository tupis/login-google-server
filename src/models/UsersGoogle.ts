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

export default class UsersGoogle extends Model<IUsersGoogle> {
  isSubCorret!: (password: string, user: any) => Promise<boolean>;
}

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
      unique: true,
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

UsersGoogle.prototype.isSubCorret = async (sub, user) => {
  const result = await bcrypt.compare(sub, user.sub);
  return result;
};
