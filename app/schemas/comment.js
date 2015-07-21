// Generated by CoffeeScript 1.9.3
(function() {
  var CommentSchema, ObjectId, Schema, mongoose;

  mongoose = require("mongoose");

  Schema = mongoose.Schema;

  ObjectId = Schema.Types.ObjectId;

  CommentSchema = new Schema({
    movie: {
      type: ObjectId,
      ref: ' Movie'
    },
    from: {
      type: ObjectId,
      ref: 'User'
    },
    reply: [
      {
        from: {
          type: ObjectId,
          ref: 'User'
        },
        to: {
          type: ObjectId,
          ref: 'User'
        },
        content: String
      }
    ],
    content: String,
    meta: {
      createAt: {
        type: Date,
        "default": Date.now()
      },
      updateAt: {
        type: Date,
        "default": Date.now()
      }
    }
  });

  CommentSchema.pre('save', function(next) {
    if (this.isNew) {
      this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
      this.meta.createAt = Date.now();
    }
    return next();
  });

  CommentSchema.statics = {
    fetch: function(cb) {
      return this.find({}).sort('meta.updateAt').exec(cb);
    },
    findById: function(id, cb) {
      return this.findOne({
        _id: id
      }).exec(cb);
    }
  };

  module.exports = CommentSchema;

}).call(this);

//# sourceMappingURL=comment.js.map