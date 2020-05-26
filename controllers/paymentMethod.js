const databaseModel = require('../models/paymentMethods'); 

//function that inserts a payment method in PaymentMethod table
async function insertPaymentMethod( paymentMethod ) {
    const newPaymentMethod = new databaseModel.PaymentMethods( paymentMethod );

    let savePaymentMethod = await newPaymentMethod.save();
    return savePaymentMethod;
}

//function that returns payment methods in PaymentMethod table
async function getPaymentMethods() {
    let paymentMethods = await databaseModel.PaymentMethods.find();

    return paymentMethods;
}

//function that returns payment method by id
async function getPaymentMethodBy( paymentMethodId ) {
    let paymentMethod = await databaseModel.PaymentMethods.find( { _id: paymentMethodId } )
    .then( result => result );

    return paymentMethod;

}

//function that receives a description and return its Id
 async function getPaymentIdBy( description ) {
    let paymentId = await databaseModel.PaymentMethods.find({ description: description })
    .then( payment => payment[0]._id );

    return paymentId;
} 

//function that deletes one paymentMethod by id
async function deletePaymentMethod( paymentMethodId ) {
    let deletePayment = await databaseModel.PaymentMethods.deleteOne( { _id: paymentMethodId } )
    .then( result => result );

    return deletePayment;
}

//function that updates a payment method by id
async function updatePaymentMethod( paymentMethodId, description ) {
    let updatePayment = await databaseModel.PaymentMethods.updateOne( { _id: paymentMethodId }, { $set: { description: description} })
    .then( result => result);
    
    return updatePayment;
}


module.exports.deletePaymentMethod = deletePaymentMethod;
module.exports.getPaymentMethods = getPaymentMethods;
module.exports.getPaymentMethodBy = getPaymentMethodBy;
module.exports.getPaymentIdBy = getPaymentIdBy; 
module.exports.insertPaymentMethod = insertPaymentMethod;
module.exports.updatePaymentMethod = updatePaymentMethod;