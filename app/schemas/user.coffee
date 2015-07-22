mongoose = require "mongoose"
#bcrypt = require "bcrypt"
#SALT_WORK_FACTOR = 0

UserSchema = new mongoose.Schema({
  name:
    unique: true
    type: String
  password: String,
  role:
    type: Number
    default: 11
  meta:
    createAt:
      type: Date
      default : Date.now()
    updateAt:
      type: Date
      default : Date.now()
})

UserSchema.pre 'save', (next) ->
  if @isNew
    @meta.createAt = @meta.updateAt = Date.now()
  else
    @meta.createAt = Date.now()
  next()

###
  bcrypt.genSalt SALT_WORK_FACTOR, (err, salt) ->
    if err
      next err
    bcrypt.hash @password, salt, (err,hash) ->
      if err
        next err

      @password = hash
      next()
###

UserSchema.statics = {
  fetch: (cb) ->
    @.find({})
    .sort 'meta.updateAt'
    .exec cb
  findById: (id, cb) ->
    @.findOne({_id: id})
    .exec cb
}

module.exports = UserSchema