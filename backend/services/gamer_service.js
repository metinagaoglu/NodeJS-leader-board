const MoneyTransferHistory = require('@models/MoneyTransferHistory');
const Gamer = require('@models/Gamer');
const eventEmitter = require('@events/event_emitter');


async function addingMoney(userId, money_amount) {

    //TODO: transaction
    try {
 
        const gamer = await Gamer.findOneAndUpdate({
            _id: userId
        }, {
            $inc: {
                money: money_amount
            }
        }).exec();

        // Money transfer add
        let money_transfer = new MoneyTransferHistory({
            gamerId: userId,
            money: money_amount,
        });

        await money_transfer.save({
            timestamps: {
                createdAt: true,
                updatedAt: false
            }
        });

        eventEmitter.emit('added.money.to.user',{
            gamer: gamer,
            money: money_amount
        })

    } catch(e) {
        //TODO: error log
        console.log(e);
        return;
    }

}


module.exports = {
    addingMoney
}