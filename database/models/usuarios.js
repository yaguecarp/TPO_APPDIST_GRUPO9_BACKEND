import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
    idUsuario: Number,
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const UsuarioPassword =
  mongoose.models?.UsuarioPassword ||
  mongoose.model("UsuarioPassword", usuarioSchema);
