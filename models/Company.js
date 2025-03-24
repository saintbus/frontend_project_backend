const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true, 
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    website: {
        type: String,
        required: [true, 'Please add a website'],
        match: [/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(\/[a-zA-Z0-9-._~:\/?#@!$&'()*+,;=%]*)?$/, 'Please add a valid website'],
        unique: true
    },
    description: {
        type: String,
        requried: [true, 'Please add a description']
    },
    tel: {
        type: String,
        required: [true, 'Please add a tel']
    },
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

CompanySchema.virtual('sessions', {
    ref: 'Session',
    localField: '_id',
    foreignField: 'company',
    justOne: false
});

module.exports = mongoose.model('Company', CompanySchema);