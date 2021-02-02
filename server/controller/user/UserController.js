const { User } = require('../../models/User')

exports.resigterUser = (req,res)=>{
    const user = new User(req.body);

    user.save((err, doc)=>{
        if(err) return res.json({success:false, err});
        res.status(200).json({
            success:true,
            userdata:doc
        })
    })
}

exports.userAuthentication = (req,res)=>{
    res.status(200).json({
        isAdmin:req.user.role === 0 ? false: true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role:req.user.role,
        cart:req.user.cart,
        history:req.user.history
    })

}

exports.loginUser=(req,res)=>{
    User.findOne({'email':req.body.email}, (err, user)=>{
        if(!user) return res.json({ loginSuccess: false, message: "Auth Failed, Email not found!"})
        
        user.comparePassword(req.body.password, (err, isMatch)=>{
            if(!isMatch) return res.json({loginSuccess:false, message:"Worng Passowrd"})

            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);
                res.cookie('w_auth', user.token).status(200).json({
                    loginSuccess:true
                })
            })
        })
    })
}

exports.logoutUser = (req, res)=>{
    User.findOneAndUpdate({_id:req.user._id},
        {token:""},
        (err, doc)=>{
            if(err) return res.json({success:false, err});
            return res.status(200).send({
                success:true
            })
        })
}