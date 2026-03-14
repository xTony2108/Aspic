import mongoose from "mongoose";
import Appointment from "./models/Appointment";

const { MONGO_DB_URI } = process.env;

if (!MONGO_DB_URI) {
  throw new Error("MONGO_DB_URI non è definito tra le variabili d'ambiente");
}

const connect = async () => {
  try {
    await mongoose.connect(MONGO_DB_URI);
    console.log("ATLAS DB CONNECTED");
  } catch (error) {
    console.log(error);
  }
};

const models = { Appointment: Appointment };

export default { models, connect };
