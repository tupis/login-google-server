import { RequestHandler } from "express";
import UsersGoogle from "../models/UsersGoogle";
import { generateToken } from "../auth/users/AuthServices";

const login: RequestHandler = async (req, res) => {
  const { email, sub } = req.body;
  const token = generateToken({ email, sub });
  try {
    const isUser = await UsersGoogle.findOne({
      where: { email: req.body.email },
    });
    if (isUser) {
      return res.status(200).json({ user: isUser, token });
    } else {
      const user = await UsersGoogle.create({ ...req.body });
      return res.status(200).json({ user, token });
    }
  } catch (error) {
    return res.status(400).json({ error: "Erro ao fazer login com o google" });
  }
};

export { login };
