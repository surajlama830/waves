const mongoose = require('mongoose') ;

const { GuitarTuner } =require('../../../models/accessories/GuitarTuner')

exports.addGuitarTuner = (req, res)=>{
    const guitarTuner = new GuitarTuner(req.body);
    
    guitarTuner.save((err, doc)=>{
        if(err) return res.json({
            success:false,
            err
        });
        res.status(200).json({
            success:true,
            item:doc
        })
    })
}