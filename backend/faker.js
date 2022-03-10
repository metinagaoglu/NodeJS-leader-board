const Gamer = require('./models/Gamer');
const Chance = require('chance');
const mongoClient = require('./database/mongodb_conn');

let chance = new Chance();

for (let i = 0; i < 1000; i++) {
	let gamer = new Gamer({
		username: chance.name(),
		age: chance.age(),
		money: 0,
	});
	gamer.save((err, data) => {
		if (err) {
		}
	});
}