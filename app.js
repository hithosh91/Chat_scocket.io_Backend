const express = require("express");

const dotenv = require("dotenv");
const router = require("./Routes/Auth.routes");
const mongooes = require("mongoose");
const cokkies = require("cookie-parser");
const messageroute = require("./Routes/MessageRoutes");
const userro = require("./Routes/User.route");
const cors = require("cors");
const { app, server } = require("../Backend/socket/Socket");
dotenv.config();

const port = process.env.PORT || 4000;
const url = process.env.URL;

//middleware

app.use(cokkies());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", router);
app.use("/message", messageroute);
app.use("/users", userro);
//to parse the income request with json payload

//mongooes db
mongooes
  .connect(url)
  .then(() => {
    console.log("mongod db atlas is conneted");
  })
  .catch((error) => {
    console.log("error while connect db");
    console.log(error.message);
  });

server.listen(port, () => {
  console.log(`server is runnign on port ${port}`);
});
