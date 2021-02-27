const mongoose = require('mongoose') ;

const { GuitarStrap } =require('../../../models/accessories/guitarStraps')

exports.addGuitarStrap = (req, res)=>{
    const guitarStrap = new GuitarStrap(req.body);
    
    guitarStrap.save((err, doc)=>{
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