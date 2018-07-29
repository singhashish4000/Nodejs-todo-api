//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
  if(err) {
    return console.log('Unable to connect to mongodb server!.');
  }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').find({_id: new ObjectID('5b30e1609c3cc033477c414b')}).toArray()
    // .then((res) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(res, undefined, 2));
    // })
    // .catch((e) => {
    //     console.log('Unable to fetch todo.',e);
    // });

    db.collection('Todos').find().count()
    .then((res) => {
        console.log('Todos');
        console.log(res);
    })
    .catch((e) => {
        console.log('Unable to fetch todo.',e);
    });

    //db.close();
});