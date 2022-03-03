const mongoose = require('mongoose');
const {
	Schema
} = mongoose;

const GamerSchema = new Schema({
	username: {
		type: String,
		minLength: 2,
		maxLength: 30,
		unique: true
	},
	age: {
		type: Number,
		min: 18,
		max: 99
	},
	money: Number,
	created_date: {
		type: Date,
		default: Date.now
	},
});

module.exports = mongoose.model('gamer', GamerSchema);