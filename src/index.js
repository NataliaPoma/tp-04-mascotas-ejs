const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("node:path");
const fs = require("fs");
const { leerJson } = require("./archivos");

const PORT = 3000;
const rutaDatos = path.join(__dirname, "..", "datos", "mascotas.json");

async function main() {
  let mascotas = await leerJson(rutaDatos);
  const app = express();

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "..", "views"));
  app.use(expressLayouts);
  app.set("layout", "layouts/main");
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(express.urlencoded({ extended: false }));

  // Inicio
  app.get("/", (req, res) => {
    res.render("inicio", { titulo: "Adopción de Mascotas" });
  });

  // Listado
  app.get("/mascotas", (req, res) => {
    res.render("mascotas/lista", { titulo: "Mascotas disponibles", mascotas });
  });

  // Formulario
  app.get("/mascotas/nueva", (req, res) => {
    res.render("mascotas/nueva", { titulo: "Nueva mascota", error: null, valores: {} });
  });

  // Detalle
  app.get("/mascotas/:id", (req, res) => {
    const id = Number(req.params.id);
    const mascota = mascotas.find(m => m.id === id);
    if (!mascota) {
      return res.status(404).render("no-encontrado", {
        titulo: "Mascota no encontrada",
        mensaje: "No existe una mascota con ese identificador."
      });
    }
    res.render("mascotas/detalle", { titulo: mascota.nombre, mascota });
  });

  // Procesar formulario
  app.post("/mascotas", (req, res) => {
    const { nombre, especie, edad, estado, descripcion } = req.body;
    const nombreLimpio = String(nombre ?? "").trim();
    const especieLimpia = String(especie ?? "").trim();
    const descripcionLimpia = String(descripcion ?? "").trim();
    const edadNum = Number(edad);

    if (!nombreLimpio || !especieLimpia || !descripcionLimpia || !Number.isFinite(edadNum) || edadNum < 0) {
      return res.status(400).render("mascotas/nueva", {
        titulo: "Nueva mascota",
        error: "Completa todos los campos con valores válidos.",
        valores: req.body
      });
    }

    const ultimoId = mascotas.reduce((max, m) => Math.max(max, m.id), 0);
    const nuevaMascota = {
      id: ultimoId + 1,
      nombre: nombreLimpio,
      especie: especieLimpia,
      edad: edadNum,
      descripcion: descripcionLimpia,
      estado,
      imagen: "/img/mascota.svg"
    };

    mascotas.push(nuevaMascota);
    res.redirect("/mascotas");
  });

  app.listen(PORT, () => {
    console.log(`Aplicación disponible en http://localhost:${PORT}`);
  });
}

main().catch(error => {
  console.error("No se pudo iniciar la aplicación:", error);
  process.exitCode = 1;
});
