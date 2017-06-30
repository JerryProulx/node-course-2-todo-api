const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


//Remove all!!
// Todo.remove().then((result) => {
//   console.log(result);
// });



//find the first matching and remove
Todo.findOneAndRemove({
  _id: '5956a709d9deaa6071a41146'
}).then((doc) => {
  console.log(doc);
}, (err) => {
  console.log(err);
})


//find by id and remove
// Todo.findByIdAndRemove('5956a709d9deaa6071a41146').then((doc) => {
//   console.log('todo removed: ', doc);
// }, (err) => {
//   console.log(err);
// });
