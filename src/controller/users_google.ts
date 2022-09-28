import { RequestHandler } from "express";
import UsersGoogle from "../models/UsersGoogle";
import { generateToken } from "../auth/users/AuthServices";

export const loginGoogle: RequestHandler = async (req, res) => {
  const { email, sub } = req.body;
  const token = generateToken({ email, sub });
  try {
    const isUser = await UsersGoogle.findOne({
      where: { email },
    });

    if (isUser) {
      const isCorrectSub = await isUser?.isSubCorret(sub, isUser);
      if (isCorrectSub) {
        return res.status(200).json({ user: isUser, token });
      }
      return res
        .status(404)
        .json({ error: "erro ao fazer login com sua conta google" });
    }

    const user = await UsersGoogle.create({ ...req.body });
    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(400).json({ error: "Erro ao fazer login com o google" });
  }
};
