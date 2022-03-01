const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
	await mongoose.connect('mongodb://mongo:27017/samplegame');
}

module.exports =() => {
	main()
}