const Express = require("express");
require("dotenv/config");
const app = Express();
const cors = require("cors");
const morgan = require("morgan");
//const loginRoute = require("../routes/login.route");
const productsRoutes = require("../routes/products.routes");
const usersRoutes = require("../routes/users.routes");
const port = process.env.PORT;
require("../database/dbConnection");


app.use(Express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/users", usersRoutes);
app.use("/products", productsRoutes);
//app.use("/login", loginRoute);

app.listen(port, () => {
  console.log(`estamos escuchando el puerto ${port}`);
});
