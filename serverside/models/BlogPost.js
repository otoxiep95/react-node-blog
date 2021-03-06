// Import Model class from Objection.js
const { Model } = require("objection");
// Import User class model for relationMappings()
const User = require("./User.js");
// Create the Todo model class
class BlogPost extends Model {
  static get tableName() {
    return "blog_posts";
  }

  // defines the relations to other models.
  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "blog_posts.user_id",
          to: "users.id",
        },
      },
    };
  }
}
// Export the Todo to be used in routes
module.exports = BlogPost;
