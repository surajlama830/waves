const mongoose = require('mongoose') ;

const { GuitarPicks } =require('../../../models/accessories/guitarPicks')

exports.addGuitarPicks = (req, res)=>{
    const guitarPicks = new GuitarPicks(req.body);
    
    guitarPicks.save((err, doc)=>{
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