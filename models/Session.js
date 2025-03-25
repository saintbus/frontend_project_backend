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
},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

// CompanySchema.virtual('sessions', {
//     ref: 'Session',
//     localField: '_id',
//     foreignField: 'company',
//     justOne: false
// });

SessionSchema.virtual('Company', {
    ref: 'Company',
    localField: '_id',
    foreignField: 'session',
    justOne: false
});

SessionSchema.virtual('User', {
    ref: 'User',
    localField: '_id',
    foreignField: 'session',
    justOne: false
});


module.exports = mongoose.model('Session',SessionSchema);