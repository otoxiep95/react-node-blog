exports.seed = function (knex) {
  // Deletes ALL data of todos
  return knex("blog_posts")
    .del()
    .then(() => {
      //Delete ALL data of users
      return knex("users").del();
    })
    .then(() => {
      //Inserts new data into users
      return knex("users").insert([
        {
          first_name: "Alberto",
          last_name: "Pacheco",
          email: "adummydummypapa@gmail.com",
          password:
            "$2a$10$iI639qF9gX0hqktt745/TO1nKb1KR8ClP1KoJoPG0mcNZzM15Nwcm", //test123
        },
      ]);
    })
    .then((users) => {
      /**
* We can use the callback of the previous users inserts,
* which returns a single item or an array of items (array
only available in PostgreSQL), to
* insert todos data and establish the relationship with
users.
*/
      return knex("blog_posts").insert([
        {
          user_id: 1, //-> Alberto
          title: "First Blog Post",
          content: "This is my first blog post",
          post_date: "",
        },
        {
          user_id: 1, //-> Alberto
          title: "Second Blog Post",
          content: "This is my second blog post... dahm",
          post_date: "",
        },
      ]);
    });
};
