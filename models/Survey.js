const mongooes = require('mongoose');
const { Schema } = mongooes;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [String],
    yes: { type: Number, default: 0 },
    no: { type:Number, default: 0 },
    recipients: [RecipientSchema],
    _user: { type: Schema.Types.ObjectId, ref: 'User'},
    dateSend: Date,
    lastResponded: Date
})

mongooes.model('surveys', surveySchema);