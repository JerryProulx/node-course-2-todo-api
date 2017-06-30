var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', function(req, res){
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((todo)=>{
    res.send(todo);
  }, (err) =>{
    res.status(400).send(err);
  })
});

app.get('/todos', function(req, res){
  Todo.find().then((todos) => {
    res.send({
      todos
    });
  }, (err) => {
    if(err){
      res.status(400).send(err);
    }
  });
});

app.get('/todos/:id', function(req, res){
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }, (err) => {
    res.status(400).send(err);
  });

});


app.post('/user', (req, res) => {
  var newUser = new User({
    email: req.body.email
  });

  newUser.save().then((user) =>{
    res.send(user);
  }, (err) => {
    res.status(400).send(err);
  })
});

app.listen(3000, function(){
  console.log('server started on port 3000');
});


module.exports = {
  app
}
