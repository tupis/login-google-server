import { RequestHandler } from "express";
import Users from "../models/Users";
import { generateToken } from "../auth/users/AuthServices";

export const register: RequestHandler = async (req, res) => {
  try {
    const newUser = await Users.create({ ...req.body });

    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(404).json({ error: "Erro ao criar usuário" });
  }
};

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  const token = generateToken({ email, password });
  try {
    const user = await Users.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Email ou Senha inválido" });
    }

    return res.status(201).json({ user, token });
  } catch (error) {
    return res.status(404).json({ error: "Erro ao fazer o login" });
  }
};
