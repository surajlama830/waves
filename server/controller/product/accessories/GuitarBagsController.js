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

exports.getGuitarBag = (req, res)=>{
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;
    GuitarBags.find({})
    .populate('brand')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, docs)=>{
        if(err) return res.status(400).send(err);
        return res.status(200).send(docs)
    })
}

exports.getGuitarBagSingle = (req, res)=>{
    let type = req.query.type;
    let items = req.query.id;

    if(type === "array"){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item=> mongoose.Types.ObjectId(item))
    }
    GuitarBags.find({'_id': {$in : items}})
    .populate('brand')
    .exec((err, docs)=>{
        return res.status(200).send(docs)
    })
}