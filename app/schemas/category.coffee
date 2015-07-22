mongoose = require "mongoose"
Schema = mongoose.Schema
ObjectId = Schema.Types.ObjectId

CategorySchema = new Schema({
  name: String
  movies: [
    type: ObjectId,
    ref: 'Movie'
  ]
  meta: {
    createAt: {
      type: Date
      default : Date.now()
    },
    updateAt: {
      type: Date
      default : Date.now()
    }
  }
})

CategorySchema.pre 'save', (next) ->
  if @isNew
    @meta.createAt = @meta.updateAt = Date.now()
  else
    @meta.createAt = Date.now()
  next()

CategorySchema.statics = {
  fetch: (cb) ->
    @.find({})
    .sort 'meta.updateAt'
    .exec cb
  findById: (id, cb) ->
    @.findOne({_id: id})
    .exec cb
}

module.exports = CategorySchema