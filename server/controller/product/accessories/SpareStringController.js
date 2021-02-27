const mongoose = require('mongoose') ;

const { SpareString } =require('../../../models/accessories/SpareString')

exports.addSpareString = (req, res)=>{
    const spareString = new SpareString(req.body);
    
    spareString.save((err, doc)=>{
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
exports.getStrings = (req, res)=>{
    let type = req.query.type;
    let items = req.query.id;

    if(type === "array"){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item=> mongoose.Types.ObjectId(item))
    }
    SpareString.find({'_id': {$in : items}})
    .populate('brand')
    .exec((err, docs)=>{
        return res.status(200).send(docs)
    })
}