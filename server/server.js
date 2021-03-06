require('./config/config.js');

const _= require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

//middleware
var {authenticate} = require('./middleware/authenticate');


var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', authenticate, function(req, res){
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });
  todo.save().then((todo)=>{
    res.send(todo);
  }, (err) =>{
    res.status(400).send(err);
  })
});

app.get('/todos',authenticate, function(req, res){
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({
      todos
    });
  }, (err) => {
    if(err){
      res.status(400).send(err);
    }
  });
});

app.get('/todos/:id',authenticate, function(req, res){
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }, (err) => {
    res.status(400).send(err);
  });

});

app.delete('/todos/:id',authenticate, function(req, res){
  //get the id
  var id = req.params.id;

  //validate if the id is a valid ID
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  // Remove the todo with the specified ID
  // Todo.findByIdAndRemove(id).then((todo) => {
  //   if(!todo){
  //     return res.status(404).send();
  //   }
  //   res.send({todo});
  // }).catch((e) => {
  //   res.status(400).send();
  // });

  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });

});

app.patch('/todos/:id', authenticate, function(req, res) {
  var id = req.params.id;

  var body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  // Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
  //   if(!todo){
  //     return res.status(404).send();
  //   }
  //   res.send({todo});
  // }).catch((e) => res.status(400).send(e));

  Todo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id
  }, {$set: body}, {new: true}).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => res.status(400).send(e));


});



app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() =>{
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});


app.get('/users/me', authenticate, function(req, res) {
  res.send(req.user);
});

//LOGIN user
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/users/me/token', authenticate, function(req, res){
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

app.listen(port, function(){
  console.log(`server started on port ${port}`);
});


module.exports = {
  app
}
