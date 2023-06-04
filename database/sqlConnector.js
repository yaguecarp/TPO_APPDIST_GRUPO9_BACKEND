import mssql from "mssql";

// CONFIGURACION DRIVER MSSQL
const sqlConfig = {
  user: "admin",
  password: "admin",
  database: "tpo-appdist",
  server: "localhost",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

export default async function sqlConnector(){
    console.log(`SQL CONNECTED`)
    return await mssql.connect(sqlConfig);
}