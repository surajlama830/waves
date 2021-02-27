const mongoose = require('mongoose') ;

const { GuitarCable } =require('../../../models/accessories/guitarCable')

exports.addGuitarCable = (req, res)=>{
    const guitarCable = new GuitarCable(req.body);
    
    guitarCable.save((err, doc)=>{
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