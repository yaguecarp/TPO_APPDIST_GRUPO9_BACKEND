import sqlConnector from "../database/sqlConnector.js";
import mssql from "mssql";

export async function getRecetas() {
  try {
    const conection = await sqlConnector();
    const result = await conection.query`SELECT * FROM recetas`;
    return result.recordset;
  } catch (error) {
    console.log(error);
  }
}

export async function getRecetasById(id) {
  try {
    const conection = await sqlConnector();
    const result =
      await conection.query`SELECT * FROM receta WHERE idReceta = ${id}`;
    if (result.recordset.length === 0) return null;
    return result.recordset[0];
  } catch (error) {}
}

export async function setReceta(
  idUsuario,
  nombre,
  descripcion,
  foto,
  porciones,
  cantidadPersonas,
  idTipo
) {
  try {
    await sqlConnector();
    const transaction = new mssql.Transaction();
    transaction.begin((err) => {
      const request = new mssql.Request(transaction);
      request.query(
        `INSERT INTO recetas (idUsuario, nombre, descripcion, foto, porciones, cantidadPersonas, idTipo) VALUES ('${idUsuario}','${nombre}','${descripcion}','${foto}','${porciones}','${cantidadPersonas}', '${idTipo}')`,
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

export async function deleteReceta(id) {
  try {
    await sqlConnector();
    const transaction = new mssql.Transaction();
    transaction.begin((err) => {
      const request = new mssql.Request(transaction);
      request.query(
        `DELETE FROM recetas WHERE idReceta = ${id}`,
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

export async function deleteRecetaByTipo(idTipo) {
  try {
    await sqlConnector();

    const transaction = new mssql.Transaction();
    transaction.begin((err) => {
      const request = new mssql.Request(transaction);
      request.query(
        `DELETE FROM recetas where idTipo = ${idTipo}`,
        (err, result) => {
          console.log(err);

          transaction.commit((err) => {
            console.log(err);

            console.log("Transaction committed.");
          });
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
}

export async function updateReceta(
  id,
  nombre,
  descripcion,
  foto,
  porciones,
  cantidadPersonas,
  idTipo
) {
  try {
    await sqlConnector();
    const transaction = new mssql.Transaction();
    transaction.begin((err) => {
      const request = new mssql.Request(transaction);
      request.query(
        `UPDATE recetas set nombre = '${nombre}', descripcion = '${descripcion}', foto = '${foto}', porciones = '${porciones}', cantidadPersonas = '${cantidadPersonas}', idTipo = '${idTipo}' WHERE idUsuario = ${id}`,
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
