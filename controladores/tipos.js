import sqlConnector from "../database/sqlConnector.js";
import mssql from "mssql";
import { deleteRecetaByTipo } from "./recetas.js";

export async function getTipos() {
  try {
    const conection = await sqlConnector();
    const result = await conection.query`SELECT * FROM tipos`;
    return result.recordset;
  } catch (error) {
    console.log(error);
  }
}

export async function getTiposById(id) {
  try {
    const conection = await sqlConnector();
    const result =
      await conection.query`SELECT * FROM tipos WHERE idTipo = ${id}`;
    if (result.recordset.length === 0) return null;
    return result.recordset[0];
  } catch (error) {}
}

export async function setTipo(descripcion) {
  try {
    await sqlConnector();
    const transaction = new mssql.Transaction();
    transaction.begin((err) => {
      const request = new mssql.Request(transaction);
      request.query(
        `INSERT INTO tipos VALUES ('${descripcion}')`,
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

export async function deleteTipo(id) {
  try {
    deleteRecetaByTipo(id)
    await sqlConnector();
    const transaction = new mssql.Transaction();
    transaction.begin((err) => {
      const request = new mssql.Request(transaction);
      request.query(`DELETE FROM tipos WHERE idTipo = ${id}`, (err, result) => {
        console.log(err);
        transaction.commit((err) => {
          console.log(err);
          console.log("Transaction committed");
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
}

export async function updateTipo(descripcion) {
  try {
    await sqlConnector();
    const transaction = new mssql.Transaction();
    transaction.begin((err) => {
      const request = new mssql.Request(transaction);
      request.query(
        `UPDATE tipos set descripcion = '${descripcion}' WHERE idTipo = ${id}`,
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
