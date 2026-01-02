import express from "express";
import loadDB from "./startup/db.js";
import loadRoutes from "./startup/routes.js";
const app = express();

loadDB();
loadRoutes(app);
app.listen(3000, () => console.log("connected to port 3000..."));
