var models = require('./models');
var validateEmail = require('./utils/string').validateEmail;

if (!validateEmail(process.argv[2])){
    console.log('Provided email is not right.');
    console.log('Remember: \nnodejs [email] [password] [firstName] [lastName]');
    return 1;
}

var user = new models.User({
    email: process.argv[2],
    firstName: process.argv[4],
    lastName: process.argv[5],
    permissions: {
        createUser: true,
        deleteUser: true,
        createPost: true,
        updatePost: true,
        deletePost: true
    }
});

user.setPassword(process.argv[3])
console.log('Created user: ');
console.log('email:' + user.email);
console.log('first name:' + user.firstName);
console.log('last name:' + user.lastName);
