const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    company:{
        type: mongoose.Schema.ObjectId,
        ref: 'Company',
        require:true
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        require:true
    },
    sessionDate:{
        type:Date,
        require:true
    },
    createdAt :{
        type:Date,
        default : Date.now
    }
});


module.exports = mongoose.model('Session',SessionSchema);