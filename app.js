const path = require("path");

const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const notFoundController = require("./controllers/not-found");
const mongoConnect = require("./util/database").mongoConnect;

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(notFoundController.pageNotFound);

mongoConnect((client) => {
  app.listen(3000);
});
