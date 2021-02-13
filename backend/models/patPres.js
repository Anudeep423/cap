const mongoose = require("mongoose");   
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;
//const patSchema = require('./patientModel').patientSchema;

const patPresMod = new Schema ({

    userinfo: {
        type: ObjectId,
        ref: 'patients'
    },

    medDetails: [{
        med_name: {
            type: String,
            required: true
        },

        duration: {
            type: String,
            required: true
        },

        morning_dose: {
            type: String,
            required: true
        },

        evening_dose: {
            type: String,
            required: true
        }

    }]}, {timestamps: true});

const patPresModel = mongoose.model('prescriptions', patPresMod);

module.exports = patPresModel;