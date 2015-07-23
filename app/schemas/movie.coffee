mongoose = require "mongoose"
Schema = mongoose.Schema
ObjectId = Schema.Types.ObjectId

MovieSchema = new Schema({
  director: String
  title: String
  language: String
  country: String
  summary: String
  flash: String
  poster: String
  flash: String
  year: Number
  pv:
    type: Number
    default: 0
  category:
    type: ObjectId
    ref: 'Category'
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

MovieSchema.pre 'save', (next) ->
  if @isNew
    @meta.createAt = @meta.updateAt = Date.now()
  else
    @meta.createAt = Date.now()
  next()

MovieSchema.statics = {
  fetch: (cb) ->
    @.find({})
    .sort 'meta.updateAt'
    .exec cb
  findById: (id, cb) ->
    @.findOne({_id: id})
    .exec cb
}

module.exports = MovieSchema