var mongoose = require('mongoose');

var Todo = mongoose.model('ToDo', {
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
    },
    _creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    }
})

// var newTodo = new Todo({
//   });

// var newTodo = new Todo({
//   text: 'Cook dinner at home',
//   completed: true,
//   completedAt: new Date()
// });

// newTodo.save()
// .then((res) => {
//   console.log('Saved Todo',res)
// })
// .catch((e) => {
//     console.log('Unable to save',e)
// });

module.exports = { Todo };