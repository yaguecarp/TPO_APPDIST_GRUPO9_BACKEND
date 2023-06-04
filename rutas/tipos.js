import express from "express";
import {
  getTipos,
  getTiposById,
  setTipo,
  deleteTipo,
  updateTipo,
} from "../controladores/tipos.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const tipos = await getTipos();
  res.status(200).json(tipos);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const tipos = await getTiposById(id);
  if (!tipos) return res.status(404).json({ msg: "Tipo no encontrado." });
  res.status(200).json(tipos);
});

router.post("/", async (req, res) => {
  const { descripcion } = req.body;
  try {
    await setTipo(descripcion);
    res.status(201).json({ msg: "Tipo creado con exito." });
  } catch (error) {
    console.log(error);
  }
});

/* OJO CON LA ELIMINACION EN CASCADA POR SER FOREIGN KEY */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tipo = await getTiposById(id);
    if (!tipo) return res.status(404).json({ msg: "Tipo no encontrado." });
    await deleteTipo(id);
    res.status(200).json({ msg: "Tipo eliminado." });
  } catch (error) {
    console.log(error);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { descripcion } = req.body;

  const tipo = await getTiposById(id);

  try {
    await updateTipo(id, descripcion);
    res.status(200).json({ msg: "Tipo actualizado con exito." });
  } catch (error) {
    console.log(error);
  }
});

export default router;
