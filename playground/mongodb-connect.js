// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err){
    return console.log('Unable to connect to MongoDB server: ', err);
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').insertOne({
  //   text: 'Something else to do',
  //   completed: false
  // },(err, result) => {
  //   if(err){
  //     return console.log('Unable to insert todo: ', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // var col = db.collection('Users');
  //
  // col.insertOne({
  //   name: 'Jerry2',
  //   email: 'test@hotmail.com'
  // }, (err, result) => {
  //   if(err){
  //     return console.log('Unable to add data: ', err);
  //   }
  //   console.log(result.ops[0]._id.getTimestamp());
  // })

  db.close();
});
