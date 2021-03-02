
const patPres = require('../models/patPres');



module.exports = {

    /*
    addPres: async(req, res) => {

        try {
        const  {med_name, duration, morning_dose, evening_dose} = req.body;
        //const userinfo = req.body.id
        const medDets = {med_name: med_name, duration: duration, morning_dose: morning_dose, evening_dose: evening_dose};

        const newAddPres = new patPres({userinfo: req.body.id, $push: { medDetails: medDets }});

        const savedPres = await newAddPres.save();

        res.json({message: 'patient prescription saved successfully', result: savedPres})
        } catch (err) {
            res.status(400).json({
                status: 'fail',
                message: err
            })
        }
    },
    */

    allPatPres: async(req, res) => {
        
        try
        {
        const patpres = await patPres.find({}).populate({path: 'userinfo', select: 'UID patient_name'}).sort('-createdAt');

        res.status(200).json({
                status: 'success',
                results: patpres.length,
                data: patpres
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
    },

    patPrescrip: async(req, res) => {
        const id = req.params.patid;
    
        patPres.find({userinfo: id})
        .populate({path: 'userinfo', select: 'UID patient_name'})
        .then(data => {
            if (!data)
              res.status(404).send({ message: "Not found patient prescription detials with id " + id });
            else res.json(data);
          })
        .catch(err => {
            res
              .status(500)
              .send({ message: "Error retrieving patient prescription details with id=" + id });
          });
    },

    addPres: async(req, res) => {

        const id = req.params.presid;

        const  {med_name, duration, morning_dose, evening_dose} = req.body;
        //const userinfo = req.body.id
        const medDets = {med_name: med_name, duration: duration, morning_dose: morning_dose, evening_dose: evening_dose};
    
        // Find and add prescription detials with the request body
        patPres.findByIdAndUpdate(id, {$push: {medDetails: medDets}}, {safe: true, upsert: true, useFindAndModify: false})
        .then(result => {
            if(!result) {
                return res.status(404).send({
                    message: "patient details not found"
                });
            }
            else
            res.send({message: "prescription details was added successfully.", data: result });
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "prescription details not found with id " + req.params.id
                });                                      
            }
            return res.status(500).send({ 
                message: "Something wrong adding prescription details with id " + req.params.id
            });
        });
    },

    updPres: async(req, res) => {

        //const patid = req.params.patid;
        const medid = req.params.medetid;

        if(!req.body) {
            return res.status(400).send({
                message: "prescription content cannot be empty"
            });
        }

        patPres.update({'medDetails._id': medid}, req.body, {new: true, useFindAndModify: false}, 
        function (err, result) {
            if(err)
            res.send({status: 'fail', err: err.message})
            return res.json({status: 'success', data: result}) 
        })


    },

    delPres: async(req, res) => {

        const pres_id = req.param.presid;
        const medet_id = req.params.medetid;

        const  {med_name, duration, morning_dose, evening_dose} = req.body;
        //const userinfo = req.body.id
        const medDets = {med_name: med_name, duration: duration, morning_dose: morning_dose, evening_dose: evening_dose};

        patPres.findByIdAndUpdate(pres_id, { $pull: {medDetails: { _id: medet_id}}}, {safe: true, upsert: true, useFindAndModify: false})
        .then(data => {
            if (!data) {
            res.status(404).send({message: `Cannot delete prescription details with id=${medet_id}. Not Found`});
            } else {
            res.send({
            message: "prescription details was deleted successfully",
            result: data
            });
            }
        })
        .catch(err => {
          res.status(500).send({
            message: "Could not delete prescription details",
            messg: err.message
          });
        });
    }

}