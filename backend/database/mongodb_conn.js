const mongoose = require('mongoose');
const config = require('@config/index');

main().catch(err => console.log(err));

async function main() {
	await mongoose.connect(config.mongo.connectionString);
}

module.exports =() => {
	main()
}