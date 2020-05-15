exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id");
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("email").notNullable();
      table.string("password").notNullable();
    })
    .createTable("blog_posts", (table) => {
      table.increments("id");
      table.string("title").notNullable();
      table.string("content").notNullable();
      table.datetime("post_date");
      table.integer("user_id").unsigned().notNullable();

      // Set the foreign key
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
  return (
    knex.schema
      // Here, delete tables in reverse order because todos depends on users
      .dropTableIfExists("blog_posts")
      .dropTableIfExists("users")
  );
};
