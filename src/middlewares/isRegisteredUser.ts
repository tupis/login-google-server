import { RequestHandler } from "express";
import Users from "../models/Users";

const isRegisteredUser: RequestHandler = async (req, res, next) => {
  const { email } = req.body;
  const isUser = await Users.findOne({
    where: {
      email,
    },
  });

  if (isUser) {
    return res.status(404).json({ error: "Usuário ja registrado" });
  }

  next();
};

export default isRegisteredUser;
