import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import pool from "./db.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use(express.static(__dirname));

app.get("/usuarios", async (req, res) => {
  const resultado = await pool.query("SELECT * FROM usuarios ORDER BY id");

  res.json(resultado.rows);
});

app.post("/usuarios", async (req, res) => {
  const { nome, idade } = req.body;

  await pool.query("INSERT INTO usuarios(nome, idade) VALUES($1,$2)", [
    nome,
    idade,
  ]);

  res.sendStatus(201);
});

app.put("/usuarios/:id", async (req, res) => {
  const id = req.params.id;

  const { nome, idade } = req.body;

  await pool.query("UPDATE usuarios SET nome=$1, idade=$2 WHERE id=$3", [
    nome,
    idade,
    id,
  ]);

  res.sendStatus(200);
});

app.delete("/usuarios/:id", async (req, res) => {
  const id = req.params.id;

  await pool.query("DELETE FROM usuarios WHERE id=$1", [id]);

  res.sendStatus(200);
});

app.listen(process.env.PORT, () => {
  console.log("Servidor rodando");
});
