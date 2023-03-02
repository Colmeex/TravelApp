//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn, loadCountries } = require("./src/db.js");

// Syncing all the models at once.
//
conn.sync({ force: true }).then(() => {
  // metodo 'sync' para sincronizar la base de datos y 'force:true' para crear las tablas de las basse de datos
  server.listen(3001, async () => {
    // cuando se sincroniza la base de datos el metodo listen se ejecutara cuando el servidor este listo para aceptar conexiones
    console.log("%s listening at 3001"); // eslint-disable-line no-console
    await loadCountries(); //loadCountries carga los datos de los paises
  });
});

//añado async y await para que el llamado de loadCountries() se haga despues de que el servidor inicie, de lo contrario se hacia el llamado antes de deacptar la conexion
