const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then(() => {
  console.log('Successfully connected to the database');

  Dishes.create({
    name: 'Uthapizza',
    description: 'Test'
    })
    .then((dish) => {
        console.log(dish);
        return Dishes.find({}).exec();
    })
    .then((dishes) => {
        console.log(dishes);
        return Dishes.remove({});
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });
})
