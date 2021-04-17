const express = require('express');
const router = express.Router();

const userController = require('../../controller/user/UserController');
// middlewares 
const {auth} = require('../../middleware/Auth');

const multer = require('multer');
const { admin } = require('../../middleware/Admin');
const fs = require('fs');
const path = require('path');

let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, './client/public/uploads')
    },
    filename:(req,file, cb)=>{
        cb(null, `${Date.now()}_${file.originalname.replace(/\s/g, '')}`)
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === "image/jpeg") {
        cb(null, true)
    }
    else {
        cb(()=>res.staus(400).json({message:'Only jpg, png is allowed'}), false)
    }
}

const upload = multer({
    storage:storage,
    limits: {
            fileSize:1024*1024*5
        },
    fileFilter:fileFilter
    }).single('file');

router.post('/uploadfile', auth, admin, (req, res) => {
    upload(req,res,err=>{
        if(err){
            return res.json({success:false, err})
        }
        else{
            console.log(res.req.file)
            return res.json({
                success:true, 
                file:res.req.file,
                url:res.req.file.filename
            })
        }
    })
}) 
router.get('/admin_files', auth, admin , (req,res)=>{
    const dir = path.resolve(".")+'/client/public/uploads/'
            fs.readdir(dir,(err,items)=>{
                return res.status(200).send(items)
            
    })
});
router.get('/remove_image', auth, admin , (req,res)=>{
    let image_name = req.query.filename;
    const pathname = path.resolve(".")+`/client/public/uploads/${image_name}`
    fs.unlink(pathname,(err)=>{
        if(err) {
            return res.json({success:false, err})
        }
        else{
            return res.json({success:true, message:'image removed'})
        }
    })
});

router.post('/register',userController.resigterUser);
router.post('/update_profile', auth, userController.updateProfile);

router.get('/auth', auth, userController.userAuthentication);

router.post('/login',userController.loginUser);

router.get('/logout',auth, userController.logoutUser);

router.post('/addToCart',auth, userController.addToCart );

router.get('/removeFromCart', auth, userController.removeFromCart)

module.exports = router;

