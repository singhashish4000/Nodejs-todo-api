const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser'); 
const {ObjectID} = require('mongodb');


var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate'); 

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', authenticate,(req, res) => {
  var todo = new Todo({
      text: req.body.text,
      _creator: req.user._id
  });

  todo.save()
  .then((doc) => {
     res.send(doc);
  })
  .catch((e) => {
    res.status(400).send(e);
  })
})

app.get('/todos', authenticate,(req,res) => {
    Todo.find({_creator: req.user_id})
    .then((doc) => {
      res.send({doc});
    })
    .catch((e) => {
      res.status(400).send(e);
    })
}); 

app.get('/todos/:id', authenticate,(req,res) => {
    var id = req.params.id;
     if(!ObjectID.isValid(id)) {
      return res.status(400).send('Invalid id.');
    }
    Todo.findOne({_id: id, _creator: req.user._id})
    .then((todo) => {
      if (!todo) {
        return res.status(400).send('Data not found.')
      }
       res.send(todo);
    })
    .catch((e) => {
      res.status(400).send(e);
    })
});

app.delete('/todos/:id', authenticate,(req,res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)) {
    return res.status(400).send();
  }
  Todo.findOneAndRemove({_id: id, _creator: req.user._id})
  .then((doc) => {
    res.send(doc);
  })
  .catch((e) => {
    res.send(e);
  });
});

app.patch('/todos/:id', authenticate,(req,res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text','completed']);
  
  if(!ObjectID.isValid(id)) {
    return res.status(400).send('id not valid');
  }
  
  if(_.isBoolean(body.completed) && body.completed) {
     body.completedAt = new Date().getTime();
  } else {
     body.completed = false;
     body.completedAt = null;
  }
  
  Todo.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, {new: true})
  .then((doc) => {
     if(!doc) {
       return res.status(400).send('No such data');
     }
     res.send({doc});
  })
  .catch((e) => {
    res.status(400).send(e);
  });

});

// POST /users

app.post('/users',(req,res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save()
  .then((user) => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  })
  .catch((e) => {
    res.status(400).send(e);
  })
  
});

//POST /users/login 
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  
  User.findByCredentials(body.email, body.password)
  .then((user) => {
    return user.generateAuthToken()
    .then((token) => {
      res.header('x-auth', token).send(user);
    })
  })
  .catch((e) => {
    res.status(400).send();
  });
});


app.get('/users/me', authenticate,(req,res) => {
  res.send(req.user);
  // var token = req.header('x-auth');
  // User.findByToken(token)
  // .then((user) => {
  //   if (!user) {
  //     return Promise.reject();
  //   } 
  //    res.send(user);
  // })
  // .catch((e) => {
  //    res.status(401).send();
  // });
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token)
  .then(() => {
    res.status(200).send();
  })
  .catch((e) => {
    res.status(400).send();
  });
});

app.listen(port, () => {
    console.log(`Started server on port ${port}`);
});