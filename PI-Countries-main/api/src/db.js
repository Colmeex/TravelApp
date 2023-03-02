require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const axios = require("axios");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Country, Activity } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Country.belongsToMany(Activity, { through: "countryActivity" });
Activity.belongsToMany(Country, { through: "countryActivity" });

//Funcion para traer los datos de la api, y creaar un objeto country con varias propiedades (las solicitadas)
const apiInfoCountries = async () => {
  const countryUrl = await axios.get("https://restcountries.com/v3/all");
  return countryUrl.data.map((el) => {
    const country = {
      id: el.cca3,
      name: el.name.common,
      flagImg: el.flags[0],
      continent: el.continents[0],
      capital: el.capital != null ? el.capital[0] : "No data",
      subregion: el.subregion,
      area: el.area,
      population: el.population,
    };
    return country;
  });
};

//Carga los datos de la Api en la base de datos
const loadCountries = async () => {
  try {
    const countries = await Country.findAll();
    if (!countries.length) {
      const array = await apiInfoCountries();
      //Se utiliza bulkCreate para para insertar la info en la tabla Country
      await Country.bulkCreate(array);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
  loadCountries: loadCountries,
};
