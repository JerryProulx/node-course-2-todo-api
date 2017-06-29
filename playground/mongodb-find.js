// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err){
    return console.log('Unable to connect to MongoDB server: ', err);
  }
  console.log('Connected to MongoDB server');

  var col = db.collection('Todos');

  // col.find({completed: true}).toArray().then((docs)=>{
  //   console.log('Todos')
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err)=>{
  //   console.log('Unable to fetch todos');
  // });

  // col.find({
  //   _id: new ObjectID('59552ac976b19903bcc4f835')
  // }).toArray().then((docs)=>{
  //   console.log('Todos')
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err)=>{
  //   console.log('Unable to fetch todos');
  // });
  //
  // col.find().count(function(err, count){
  //   if(err){
  //     console.log(err);
  //   }else{
  //     console.log(`There is ${count} todos in the db`);
  //   }
  // });
  //
  // col.find().count().then((count) => {
  //   console.log(count);
  // }, (err) => {
  //   console.log(err);
  // });

  db.collection('Users').find({name: 'Jerry'}).count().then((count)=>{
    console.log(`There's ${count} user(s) named Jerry`);
  }, (err)=>{
    console.log(err);
  });

  db.collection('Users').find({name: 'Jerry'}).toArray().then((docs)=>{
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err)=>{
    console.log(err);
  })



  // db.close();
});
