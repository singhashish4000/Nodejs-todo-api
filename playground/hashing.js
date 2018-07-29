const {SHA256} = require('crypto-js');
const bcrypt = require('bcryptjs');

// var password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

var hashed = '$2a$10$iH7Y3ZoSPZpot98gwSEet.jXplh8QraAGU97zbAZY8hCwvopCnPea';

bcrypt.compare('123abc!', hashed, (err, result) => {
   console.log(result);
});

// var message = 'I am user number 3';

// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);

// console.log(`Hash: ${hash}`)