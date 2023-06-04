import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import mongodbClient from "./database/mongodb.js";

import usuarios from "./rutas/usuarios.js";
import recetas from "./rutas/recetas.js";
import tipos from "./rutas/tipos.js"
import authRoute from './rutas/auth.js'

const app = express();

dotenv.config();

app.set("PORT", process.env.PORT);

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/usuarios", usuarios);
app.use("/api/recetas", recetas);
app.use("/api/tipos", tipos);
app.use("/api/auth", authRoute )


app.listen(app.get("PORT"), () => {
  console.log(`Server on port ${app.get("PORT")}`);
});
