//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
  if(err) {
    return console.log('Unable to connect to mongodb server!.');
  }
    console.log('Connected to MongoDB server');
    
    // db.collection('ToDos').deleteMany({text: 'Walk the dog'})
    // .then((res) => {
    //     console.log(res);
    // })
    // .catch((e) => {
    //     console.log(e);
    // })

    // db.collection('ToDos').deleteOne({text: 'Something to do'})
    // .then((res) => {
    //     console.log(res);
    // })
    // .catch((e) => {
    //     console.log(e);
    // })

    db.collection('ToDos').findOneAndDelete({completed: true})
    .then((res) => {
        console.log(res);
    })
    .catch((e) => {
        console.log(e);
    })


    //db.close();
});