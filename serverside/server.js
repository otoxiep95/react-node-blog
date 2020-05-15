// Route Class
const express = require("express");
const app = express();
// const KnexSessionStore = require("connect-session-knex")(session); // Store sessions in MySQL database using Knex (sessions MUST be stored outside of cache)

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Require router files
const apiRoutes = require("./routes/api");

const Knex = require("knex");
const knexFile = require("./knexfile.js");
const knex = Knex(knexFile.development);

const { Model } = require("objection");

Model.knex(knex);

const session = require("express-session");

app.use(
  session({
    secret: `secret-key`,
    resave: false,
    saveUninitialized: false,
  })
);

// Limit the amount of requests on the auth routes
// const rateLimit = require("express-rate-limit");

// const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 4, // limit each IP to 4 requests per windowMs
// });

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "POST,GET,OPTIONS,PUT,DELETE,PATCH"
  );
  next();
});
app.use("/api", apiRoutes);

// Start the server
const server = app.listen(9090, (error) => {
  if (error) {
    console.log("Error in the server");
  }
  console.log("Server is running on port", server.address().port);
});
