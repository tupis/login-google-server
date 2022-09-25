import authConfig from "../../config/jwt";
import { sign } from "jsonwebtoken";

interface ILogin {
  email: string;
  password?: string;
  sub?: string;
}

export const generateToken = (login: ILogin) => {
  const token = sign(
    {
      ...login,
    },
    authConfig.secret,
    { expiresIn: authConfig.expires }
  );
  return token;
};
