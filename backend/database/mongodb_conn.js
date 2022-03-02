const mongoose = require('mongoose');

main().catch(err => console.log(err));

//TODO: get this parameter from enviroment variable.
async function main() {
	await mongoose.connect('mongodb://mongo:27017/samplegame');
}

module.exports =() => {
	main()
}