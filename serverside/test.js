var bcrypt = require("bcryptjs");

var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("test123", salt);
var password = "fuckyou";

bcrypt.compare(password, hash, (error, isSame) => {
  if (error) {
    console.log("something got fucked");
  }
  if (!isSame) {
    console.log("wrong password");
  } else {
    console.log("all good");
  }
});

// bcrypt.compareSync("hello", hash); //true
// bcrypt.compareSync("not_bacon", hash); // false

// console.log("password: " + hash);
// console.log(bcrypt.compareSync("test123", hash));

// // 1. Import and initialize Knex.js
// const Knex = require("knex");
// const knexFile = require("./knexfile.js");
// const knex = Knex(knexFile.development);
// // 2. Import Objection.js Model class
// const { Model } = require("objection");
// // 3. Bind all models to the knex instance
// Model.knex(knex);
// // 4. Create the User model class
// class User extends Model {
//   static get tableName() {
//     return "users";
//   }
// }
// // 5. Run the query in async/await
// const getUsers = async () => {
//   // returns all users
//   const users = await User.query();
//   console.log(users);
// };
// getUsers();
