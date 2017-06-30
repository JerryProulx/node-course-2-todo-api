var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});


// var newTodo = new Todo({
//   text: '   this is a todo'
// });
//
// newTodo.save().then((todo)=>{
//   console.log('Saved todo:', todo);
// }, (e) =>{
//   console.log('unable to save to do');
// });


module.exports = {Todo};
