import mongoose from 'mongoose';
const {
	Schema
} = mongoose;

const MoneyTransferHistory = new Schema({
	gamerId: { type: Schema.Types.ObjectId, ref: 'Gamer' },
    from: String,
    money: Number,
    timestamps: true
});

module.exports = MoneyTransferHistory;