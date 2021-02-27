const mongoose = require('mongoose') ;

const { GuitarCapo } =require('../../../models/accessories/guitarCapo')

exports.addGuitarCapo = (req, res)=>{
    const guitarCapo = new GuitarCapo(req.body);
    
    guitarCapo.save((err, doc)=>{
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