const mongoose = require('mongoose');
const {
	Schema
} = mongoose;

const MoneyTransferHistory = new Schema({
	gamerId: { type: Schema.Types.ObjectId, ref: 'Gamer' },
    money: Number
});

module.exports = mongoose.model('moneytransfer', MoneyTransferHistory);