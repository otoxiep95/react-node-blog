const express = require("express");
const app = express();
// Require router files
const usersRoutes = require("./api/users");
const blogPostsRoutes = require("./api/blogposts");
// Include the routes to express
app.use("/users", usersRoutes);
app.use("/blogposts", blogPostsRoutes);
// Export the file to be used in server.js
module.exports = app;
