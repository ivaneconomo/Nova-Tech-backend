const Express = require("express");
require("dotenv/config");
const app = Express();
const cors = require("cors");
const morgan = require("morgan");
const userRoutes = require("../routes/user.routes");
const loginRoute = require("../routes/login.route");
const productsRoutes = require("../routes/products.routes");
require("../database/dbConnection");

app.use(Express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/users", userRoutes);
app.use("/products", productsRoutes);
app.use("/login", loginRoute);

app.listen(port, () => {
  console.log(`estamos escuchando el puerto ${port}`);
});
