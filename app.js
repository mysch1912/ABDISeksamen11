const express = require("express");
const path = require("path");

const sideRoutes = require("./Routes/sideRoutes.js");
const apiRoutes = require("./Routes/apiRoutes.js");

const app = express();

// ⚠️ STATIC SKAL KOMME FØRST
app.use(express.static(path.join(__dirname, "Public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", sideRoutes);
app.use("/api", apiRoutes);

app.listen(3000, () => {
  console.log("Server kører på http://localhost:3000");
});