mongoose = require "mongoose"
MovieSchema = new mongoose.Schema({
  director: String
  title: String
  language: String
  country: String
  summary: String
  flash: String
  poster: String
  flash: String
  year: Number
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