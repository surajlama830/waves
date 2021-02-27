const mongoose = require('mongoose') ;

const { GuitarBags } =require('../../../models/accessories/guitarBags')

exports.addGuitarBag = (req, res)=>{
    const guitarBags = new GuitarBags(req.body);
    guitarBags.save((err, doc)=>{
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