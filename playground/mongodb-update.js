// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err){
    return console.log('Unable to connect to MongoDB server: ', err);
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('59554463ae94dcf3aedc18d2')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // })

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5955408259d480042a7070a0')
  }, {
    $set: {
      email: 'FloFlo@hotmail.com'
    },
    $inc: {
      age: +1
    }
  },{
    returnOriginal: false
  }).then((result)=>{
    console.log(result);
  })

  // db.close();
});
