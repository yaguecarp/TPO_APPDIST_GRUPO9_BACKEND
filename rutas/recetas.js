import express from "express";
import {
  getRecetas,
  getRecetasById,
  setReceta,
  deleteReceta,
  updateReceta,
  getRecetaByNombre,
} from "../controladores/recetas.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const recetas = await getRecetas();
  res.status(200).json(recetas);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const recetas = await getRecetasById(id);
  if (!recetas) return res.status(404).json({ msg: "Receta no encontrada." });
  res.status(200).json(recetas);
});

router.get("/getByName/:nombre", async (req, res) => {
  const {nombre} = req.params;
  const receta = await getRecetaByNombre(nombre);
  if (!receta) return res.status(404).json({msg: 'Receta no encontrada.'})
  res.status(200).json(receta)
})

router.post("/", async (req, res) => {
  const {
    idUsuario,
    nombre,
    descripcion,
    foto,
    porciones,
    cantidadPersonas,
    idTipo,
  } = req.body;
  try {
    await setReceta(
      idUsuario,
      nombre,
      descripcion,
      foto,
      porciones,
      cantidadPersonas,
      idTipo
    );
    res.status(201).json({ msg: "Receta creada con exito." });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const receta = await getRecetasById(id);
    if (!receta) return res.status(404).json({ msg: "Receta no encontrada." });
    await deleteReceta(id);
    res.status(200).json({ msg: "Receta eliminada." });
  } catch (error) {
    console.log(error);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  let { nombre, descripcion, foto, porciones, cantidadPersonas, idTipo } =
    req.body;

  const receta = await getRecetasById(id);

  if (nombre === null || nombre === undefined) {
    nombre = receta.nombre;
  }
  if (descripcion === null || descripcion === undefined) {
    descripcion = receta.descripcion;
  }
  if (foto === null || foto === undefined) {
    foto = receta.foto;
  }
  if (porciones === null || porciones === undefined) {
    porciones = receta.porciones;
  }
  if (cantidadPersonas === null || cantidadPersonas === undefined) {
    cantidadPersonas = receta.cantidadPersonas;
  }
  if (idTipo === null || idTipo === undefined) {
    idTipo = receta.idTipo;
  }

  try {
    await updateReceta(
      id,
      nombre,
      descripcion,
      foto,
      porciones,
      cantidadPersonas,
      idTipo
    );
    res.status(200).json({ msg: "Receta actualizada con exito." });
  } catch (error) {
    console.log(error);
  }
});

export default router;
