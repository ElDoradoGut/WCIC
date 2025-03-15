import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import { getRecetas, getRecetaById, getRecetaByName, getRecetasByIngredients, createReceta, updateReceta, deleteReceta } from './controllers/controller.receta.js';
import { getAllIngredientes, getIngredienteById, createIngrediente, updateIngrediente, deleteIngrediente } from './controllers/controller.ingrediente.js';

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL).then(() => console.log("Conexion exitosa"));

app.use(cors());

app.use(helmet());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Error")
})

app.listen(4000, () => console.log("Funciona el servidor correctamente"));
app.use(express.json());

app.get('/recetas', getRecetas);
app.get('/recetas/:id', getRecetaById);
app.get('/recetas/name/:name', getRecetaByName);
app.post('/recetas/search', getRecetasByIngredients);
app.post('/recetas', createReceta);
app.put('/recetas/:id', updateReceta);
app.delete('/recetas/:id', deleteReceta);

app.get('/ingredientes', getAllIngredientes);
app.get('/ingredientes/:id', getIngredienteById);
app.post('/ingredientes', createIngrediente);
app.put('/ingredientes/:id', updateIngrediente);
app.delete('/ingredientes/:id', deleteIngrediente);