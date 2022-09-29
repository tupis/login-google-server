import { verify } from "jsonwebtoken";
import authConfig from "../config/jwt";

const AuthToken = (req: any, res: any, next: any): void | object => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ Error: "Sem token!" });
  }
  verify(token, authConfig.secret, (error: any, decoded: any) => {
    if (error) {
      return res.status(402).json({ Error: "Token Inválido" });
    } else {
      req.user = decoded;
      next();
    }
  }) as any;
};

export default AuthToken;
