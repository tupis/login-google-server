import { RequestHandler } from "express";
import UsersGoogle from "../models/UsersGoogle";

const login: RequestHandler = async (req, res) => {
  try {
    const isUser = await UsersGoogle.findOne({
      where: { email: req.body.email },
    });
    if (isUser) {
      return res.status(200).json(isUser);
    } else {
      const user = await UsersGoogle.create({ ...req.body });
      return res.status(200).json(user);
    }
  } catch (error) {
    return res.status(400).json({ error: "Erro ao fazer login com o google" });
  }
};

export { login };
