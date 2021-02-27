const mongoose = require('mongoose') ;

const { GuitarStand } =require('../../../models/accessories/guitarStand')

exports.addGuitarStand = (req, res)=>{
    const guitarStand = new GuitarStand(req.body);
    
    guitarStand.save((err, doc)=>{
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