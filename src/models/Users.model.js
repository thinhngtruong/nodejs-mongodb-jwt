const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: String,
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role'
    }
  ]
});

userSchema.methods.toJSON = function () {
  let user = this.toObject();
  user.id = user._id.toString();
  delete user._id;
  delete user.__v;
  delete user.password;
  const userRoles = user.roles.map(i => i.name);
  return {
    ...user,
    roles: userRoles,
  };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
