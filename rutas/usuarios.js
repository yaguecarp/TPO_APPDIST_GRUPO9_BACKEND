import express from "express";
import {
  getUsuarios,
  getUsuariosById,
  setUsuario,
  deleteUsuario,
  updateUsuario,
  getPassword,
  setPassword,
  updatePassword,
  getUsuariosByMail,
  getUsuariosByNickname
} from "../controladores/usuarios.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const usuarios = await getUsuarios();
  res.status(200).json(usuarios);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const usuario = await getUsuariosById(id);
  if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado." });
  res.status(200).json(usuario);
});

router.get("/getByEmail/:mail", async (req, res) => {
  const { mail } = req.params;
  const usuario = await getUsuariosByMail(mail);
  if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado." });
  res.status(200).json(usuario);
});

router.get("/getByNickname/:nickname", async (req, res) => {
  const { nickname } = req.params;
  const usuario = await getUsuariosByNickname(nickname);
  if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado." });
  res.status(200).json(usuario);
});

router.post("/", async (req, res) => {
  const { mail, nickname, habilitado, nombre, avatar, tipo_usuario } = req.body;
  try {
    await setUsuario(mail, nickname, habilitado, nombre, avatar, tipo_usuario);
    res.status(201).json({ msg: "Usuario grabado con exito." });
  } catch (error) {
    res.status(500).json({ error: "Se ha producido un error." });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await getUsuariosById(id);
    if (!usuario)
      return res.status(404).json({ msg: "Usuario no encontrado." });
    await deleteUsuario(id);
    res.status(200).json({ msg: "Usuario eliminado." });
  } catch (error) {
    console.log(error);
  }
});
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  let { habilitado, avatar } = req.body;

  const usuario = await getUsuariosById(id);

  if (habilitado === null || habilitado === undefined) {
    habilitado = usuario.habilitado;
  }
  if (avatar === null || avatar === undefined) {
    avatar = usuario.avatar;
  }

  try {
    await updateUsuario(id, habilitado, avatar);
    res.status(200).json({ msg: "Usuario actualizado con exito." });
  } catch (error) {
    console.log(error);
  }
});

/* PASSWORD ROUTES */
router.get("/:id/getPassword", async (req, res) => {
  const { id } = req.params;
  const password = await getPassword(id);
  if (!password)
    return res.status(404).json({ msg: "No se ha encontrado el usuario." });
  res.status(200).json(password);
});

router.post("/:id/setPassword", async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const usuarioPassword = await setPassword(id, password);
  if (!usuarioPassword)
    return res.status(404).json({ msg: "No se ha encontrado el usuario." });
  res.status(201).json(usuarioPassword);
});

router.patch("/:id/updatePassword", async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;
  const usuarioUpdated = await updatePassword(id, newPassword);
  res.status(201).json(usuarioUpdated);
});

export default router;
