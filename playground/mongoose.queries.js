const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '59568e5df9a2dc05af42e9d2';

if(!ObjectID.isValid(id)) {
  console.log('ID not valid');
}

User.findById(id).then((user) => {
  if(!user) {
    return console.log('Unable to fund user');
  }
  console.log('User: ', user);
}, (err) => {
  console.log(err);
})


// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos: ', todos);
// }, (err) => {
//   console.log(err);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('todo: ', todo);
// }, (err) => {
//   console.log(err);
// });

// Todo.findById(id).then(function(todo){
//   if(!todo){
//     return console.log('ID not found');
//   }
//   console.log('todo: ', todo);
// }).catch((err) => {
//   console.log(err);
// });
