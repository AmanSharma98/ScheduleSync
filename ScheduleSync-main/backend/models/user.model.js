const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    password: {
        type: String,
        required: true
    }
}, { versionKey: false, timestamps: false });

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;