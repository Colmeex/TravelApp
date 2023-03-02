const { Router } = require("express");
// const axios = require("axios");
const { Activity, Country } = require("../db");
// const el = require("express");
const { Sequelize, Op } = require("sequelize");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

/******************RUTAS************************ */
//ruta para obtener todos los paies y por nombre
router.get("/countries", async (req, res) => {
  const name = req.query.name;

  try {
    if (!name) {
      const countries = await Country.findAll({
        include: [
          {
            model: Activity,
            attributes: ["name", "difficulty", "duration", "season"],
            through: { attributes: [] },
          },
        ],
      });
      if (countries) {
        return res.status(200).json(countries);
      } else return res.status(404).send("Pais no encontrado");
    } else {
      console.log("entre en el else");
      const country = await Country.findAll({
        where: {
          name: { [Op.substring]: name },
        },
        include: [
          {
            model: Activity,
            attributes: ["name", "difficulty", "duration", "season"],
            through: { attributes: [] },
          },
        ],
      });
      if (country) {
        res.status(200).json(country);
      } else {
        return res.status(404).send("No se encontro el Pais");
      }
    }
  } catch (error) {
    console.log(error);
  }
});
//ruta para obtener los paises por id
router.get("/countries/:idPais", async (req, res) => {
  const idPais = req.params.idPais;

  try {
    const country = await Country.findOne({
      where: {
        id: idPais.toUpperCase(),
      },
      include: [
        {
          model: Activity,
          attributes: ["name", "difficulty", "duration", "season"],
          through: { attributes: [] },
        },
      ],
    });
    if (country) {
      return res.status(200).json(country);
    } else {
      return res.status(404).send("No se encuentra el pais");
    }
  } catch (error) {
    console.log(error);
  }
});
// console.log("se reinicia");

//Ruta para mostrar Actividades

router.get("/activities", async (req, res) => {
  const activities = await Activity.findAll();
  if (activities) {
    return res.status(200).json(activities);
  } else {
    return res
      .status(400)
      .json(activities.length ? activities : "No existe la actividad");
  }
});

//Ruta para Postear actividades
router.post("/activities", async (req, res) => {
  try {
    const { name, difficulty, duration, season, countries } = req.body;
    if (name && difficulty && duration && season && countries) {
      const actitivity = await Activity.create({
        name,
        difficulty,
        duration,
        season,
      });
      countries.forEach(async (id) => {
        const country = await Country.findOne({
          where: { id: { [Op.iLike]: `%${id}%` } },
        });
        await country?.addActivity(actitivity);
      });
      return res.send(actitivity);
    } else {
      return res.status(404).json("Faltan datos");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
