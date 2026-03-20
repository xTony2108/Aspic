// CONNESSIONE AL DB E LISTEN

import app from "./app";
import connect from "./db";

const { SERVER_PORT } = process.env || "3000";

if (!SERVER_PORT) {
  throw new Error("SERVER_PORT non è definito tra le variabili d'ambiente");
}
const startServer = async () => {
  try {
    await connect();
    app.listen(Number(SERVER_PORT), "0.0.0.0", () => {
      console.log(`SERVER UP AND RUNNING ON PORT ${SERVER_PORT}`);
    });
  } catch (error) {
    console.error(`Errore durante la connessione al DB: ${error}`);
    process.exit(1);
  }
};

startServer();
