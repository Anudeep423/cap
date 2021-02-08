const mongoose = require("mongoose");   
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;
//const patSchema = require('./patientModel').patientSchema;

const patRepUpl = new Schema ({
    
    //patient: patSchema,

    report: {
        type: Object,
        default: 'no file'
    },

    reportpath: String
}, {timestamps: true});

module.exports = mongoose.model('uploads', patRepUpl);