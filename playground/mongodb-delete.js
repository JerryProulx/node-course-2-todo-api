// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err){
    return console.log('Unable to connect to MongoDB server: ', err);
  }
  console.log('Connected to MongoDB server');

  //deleteMany
  // db.collection('Todos').deleteMany({
  //   text: 'Something to do'
  // }).then((result)=>{
  //   console.log(`${result.n}`);
  // }, (err)=>{
  //   console.log(err);
  // });


  //deleteOne
  // db.collection('Todos').deleteOne({
  //   text: 'Something to do'
  // }).then((result)=>{
  //   console.log(result);
  // }, (err)=>{
  //   console.log(err);
  // });

  //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({
  //   text: 'Something too'
  // }).then((todo)=>{
  //   console.log(todo);
  // }, (err) => {
  //   console.log('No item to delete: ', err);
  // })

  db.collection('Users').deleteMany({
    name: 'Molly'
  }).then((result)=>{
    console.log(result);
  }, (err)=>{
    console.log(err);
  })

  db.collection('Users').findOneAndDelete({
    _id: new ObjectID('59552ca1eef1e103c4165741')
  }).then((todo) => {
    console.log(todo);
  }, (err) => {
    console.log(err);
  })


  // db.close();
});
