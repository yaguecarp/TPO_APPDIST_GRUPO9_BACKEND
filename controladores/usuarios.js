import sqlConnector from "../database/sqlConnector.js";
import mongodbClient from "../database/mongodb.js";
import { UsuarioPassword } from "../database/models/usuarios.js";
import mssql from "mssql";

export async function getUsuarios() {
  try {
    const conection = await sqlConnector();
    const result = await conection.query`SELECT * FROM usuarios`;
    // console.dir(result.recordset);
    return result.recordset;
  } catch (error) {
    console.log(error);
  }
}

export async function getUsuariosById(id) {
  try {
    const conection = await sqlConnector();
    const result =
      await conection.query`SELECT * FROM usuarios WHERE idUsuario = ${id}`;
    if (result.recordset.length === 0) return null;
    // console.dir(result.recordset)
    return result.recordset[0];
  } catch (error) {}
}

export async function getUsuariosByMail(mail) {
  try {
    const conection = await sqlConnector();
    const result =
      await conection.query`SELECT * FROM usuarios WHERE mail = ${mail}`;
    if (result.recordset.length === 0) return null;
    // console.dir(result.recordset)
    return result.recordset[0];
  } catch (error) {}
}

export async function getUsuariosByNickname(nickname) {
  try {
    const conection = await sqlConnector();
    const result =
      await conection.query`SELECT * FROM usuarios WHERE nickname = ${nickname}`;
    if (result.recordset.length === 0) return null;
    // console.dir(result.recordset)
    return result.recordset[0];
  } catch (error) {}
}

export async function setUsuario(
  mail,
  nickname,
  habilitado,
  nombre,
  avatar,
  tipo_usuario
) {
  try {
    console.log(mail);
    await sqlConnector();
    const transaction = new mssql.Transaction();
    transaction.begin((err) => {
      const request = new mssql.Request(transaction);
      request.query(
        `INSERT INTO usuarios (mail, nickname, habilitado, nombre, avatar, tipo_usuario) VALUES ('${mail}','${nickname}','${habilitado}','${nombre}','${avatar}','${tipo_usuario}')`,
        (err, result) => {
          if (err) throw err;

          transaction.commit((err) => {
            if (err) throw err;
            console.log("Transaction committed.");
          });
        }
      );
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUsuario(id) {
  try {
    await sqlConnector();
    const transaction = new mssql.Transaction();
    transaction.begin((err) => {
      const request = new mssql.Request(transaction);
      request.query(
        `DELETE FROM usuarios WHERE idUsuario = ${id}`,
        (err, result) => {
          console.log(err);
          transaction.commit((err) => {
            console.log(err);
            console.log("Transaction committed");
          });
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
}

export async function updateUsuario(id, habilitado, avatar) {
  try {
    await sqlConnector();
    const transaction = new mssql.Transaction();
    transaction.begin((err) => {
      const request = new mssql.Request(transaction);
      request.query(
        `UPDATE usuarios set habilitado = '${habilitado}', avatar = '${avatar}' WHERE idUsuario = ${id}`,
        (err, result) => {
          console.log(err);
          transaction.commit((err) => {
            console.log(err);
            console.log("Transaction committed");
          });
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getPassword(id) {
  mongodbClient();
  const usuario = await getUsuariosById(id);
  console.log(usuario);
  if (!usuario) return null;
  const usrpwd = await UsuarioPassword.find({ idUsuario: usuario.idUsuario });
  return usrpwd[0].password;
}

export async function setPassword(id, password) {
  mongodbClient();
  const usuario = await getUsuariosById(id);
  if (!usuario) return null;
  const nuevoUsuarioPassword = new UsuarioPassword({
    idUsuario: id,
    password,
  });

  await nuevoUsuarioPassword.save();
  return nuevoUsuarioPassword;
}

export async function updatePassword(id, newPassword) {
  mongodbClient();
  try {
    const usuarioPasswordId = await UsuarioPassword.find({idUsuario: id})
    const usuario = await UsuarioPassword.findByIdAndUpdate(usuarioPasswordId[0]._id, {
      password: newPassword,
    }, {new: true});
    return usuario;
  } catch (error) {
    console.log(error);
  }
}
