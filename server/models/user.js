var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
});

var User = mongoose.model('User', userSchema);


// var newUser = new User({
//   email: '     example@example.com    '
// });
//
// newUser.save().then((user)=>{
//   console.log(JSON.stringify(user, undefined, 2));
// }, (error) => {
//   console.log(error);
// });


module.exports = {User};
