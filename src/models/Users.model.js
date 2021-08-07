const mongoose = require("mongoose");

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
	roles: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Role"
		}
	]
});

userSchema.methods.toJSON = function () {
	let user = this.toObject();
	const userRoles = user.roles.map(i => i.name)
	return {
		...user,
		roles: userRoles,
		password: undefined
	}
};

const User = mongoose.model("User", userSchema);

module.exports = User;
