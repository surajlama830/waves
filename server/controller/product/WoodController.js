const { Wood } = require('../../models/Woods');

exports.addProductWood = (req, res)=>{
    const wood = new Wood(req.body);

    wood.save((err,doc)=>{
        if(err) return res.json({success:false, err});
        res.status(200).json({
            success:true,
            wood:doc
        })
    })
}

exports.getProductWood =  (req, res)=>{
    Wood.find({},(err, woods)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(woods);
    })
}