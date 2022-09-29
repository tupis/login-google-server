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

    const isCorretPassword = await user?.isCorrectPassword(password, user);
    if (!isCorretPassword) {
      return res.status(402).json({ error: "Email ou senha inválido" });
    }

    return res.status(201).json({ user, token });
  } catch (error) {
    return res.status(404).json({ error: "Erro ao fazer o login" });
  }
};

export const updateName: RequestHandler = async (req: any, res) => {
  try {
    const { name } = req.body;
    console.log(req.user.email);
    const newName = await Users.findOne({
      where: {
        email: req.user.email,
      },
    });
    await newName?.update({ name });
    await newName?.save();

    return res.status(201).json({ message: "Nome atualizado com sucesso" });
  } catch (error) {
    return res.status(404).json({ error: "Error ao tentar atualizar o nome" });
  }
};

export const updatePassword: RequestHandler = async (req: any, res) => {
  try {
    const { password } = req.body;
    const newPassword = await Users.findOne({
      where: {
        email: req.user.email,
      },
    });
    await newPassword?.update({ password });
    await newPassword?.save();
    return res.status(201).json({ message: "Senha alterada com sucesso" });
  } catch (error) {
    return res.status(404).json({ error: "Erro ao atualizar a senha" });
  }
};
