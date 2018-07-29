//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
  if(err) {
    return console.log('Unable to connect to mongodb server!.');
  }
    console.log('Connected to MongoDB server');
    
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5b30e5199c3cc033477c429e')
    },
    {
        $set: {
            completed: true
        }
    },
    {
        returnOriginal: false
    }
)
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    })

    //db.close();
});