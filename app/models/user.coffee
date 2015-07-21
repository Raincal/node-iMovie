mongoose = require 'mongoose'
UserSchema = require '../schemas/user'
User = mongoose.model 'User', Userschema
module.exports = User
