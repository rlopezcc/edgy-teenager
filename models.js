var mongoose = require('mongoose');
var crypto = require('crypto');
var uuid = require('node-uuid');

var db = mongoose.createConnection('localhost', 'edgyTeenager');

mongoose.connect('mongodb://localhost/edgyTeenager');

db.on('error', console.error.bind(console, 'connection error: '));

db.once('open', function () {
    console.log('Database connected.');
});

function exportThisMutherFucker(mongoose) {

    // Schemas.
    var PostSchema = new mongoose.Schema({
        title: String,
        picture: String,
        body: String
    });

    var UserSchema = new mongoose.Schema({
        email: { type: String, index: true, unique: true, required: true },
        firstName: String,
        lastName: String,
        password: String,
        salt: {type: String, required: true, default: uuid.v1},
        permissions: {
            createUser: Boolean,
            deleteUser: Boolean,
            createPost: Boolean,
            updatePost: Boolean,
            deletePost: Boolean
        }
    });

    var sessionSchema = new mongoose.Schema({
        _id: String,
        data: { type: mongoose.Schema.Types.Mixed, required: true },

    });

    var hash = function (passwd, salt) {
        return crypto.createHmac('sha256', salt).update(passwd).digest('hex');
    };

    // Instance methods.

    UserSchema.method('setPassword', function (str) {
        this.password = hash(str, this.salt);
        this.save();
    });

    UserSchema.method('hasPerm', function (permission) {
        return this.permissions[permission] === true;
    });

    UserSchema.method('checkPassword', function (str) {
        return this.password === hash(str, this.salt);
    });

    // Finally, module.models.

    var models = {
        Post: mongoose.model('Post', PostSchema),
        User: mongoose.model('User', UserSchema)
    };

    return models;
}

module.exports = exportThisMutherFucker(mongoose);