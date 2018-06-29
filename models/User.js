const mongooes = require('mongoose');
const Schema = mongooes.Schema;
//const { Schema } = mongooes;

const userSchema = new Schema({
    googleId: String
});

mongooes.model('users', userSchema);
