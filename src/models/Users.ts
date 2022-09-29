import { DataType } from "sequelize-typescript";
import { Model } from "sequelize";
import connection from "../config/config";
import * as bcrypt from "bcrypt";

export interface IUsers {
  id: number;
  name: string;
  email: string;
  password: string;
}

export default class Users extends Model<IUsers> {
  isCorrectPassword!: (password: string, user: any) => Promise<boolean>;
}

Users.init(
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
    password: {
      type: DataType.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    tableName: "users",
  }
);

Users.beforeCreate(async (user: any) => {
  const hashedPassword = await bcrypt.hash(
    user.password,
    Number(process.env.BCRYPT_SALT)
  );
  user.password = hashedPassword;
});

Users.beforeUpdate(async (record: any) => {
  const hashedPassword = await bcrypt.hash(
    record.dataValues.password,
    Number(process.env.BCRYPT_SALT)
  );

  record.dataValues.password = hashedPassword;
});

Users.prototype.isCorrectPassword = async (password, user) => {
  const result = await bcrypt.compare(password, user.password);

  return result;
};
