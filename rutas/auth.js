import express from "express";
import jwt from "jsonwebtoken";
import { UsuarioPassword } from "../database/models/usuarios.js";
import { getUsuariosById } from "../controladores/usuarios.js";
import mongodbClient from "../database/mongodb.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  mongodbClient();
  const userReq = req.body;
  const user = await UsuarioPassword.findOne({
    idUsuario: userReq.idUsuario,
    password: userReq.password,
  });
  if (!user) return res.status(404).json({ status: "User not found" });
  const userData = await getUsuariosById(userReq.idUsuario);
  const token = jwt.sign({ user }, process.env.TOKEN_SECRET);
  res.status(200).json({ userData, token });
});

export default router;
