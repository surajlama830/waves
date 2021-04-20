const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accerroriesSchema = mongoose.Schema({
    name:{
        required:true,
        type:String,
        unique:1,
        maxlength:100
    },
    description:{
        required:true,
        type:String,
        maxlength:100000
    },
    price:{
        required:true,
        type:Number,
        maxlength:255
    },
    brand:{
        type:Schema.Types.ObjectId,
        ref:'Brand',
        required:true
    },
    shipping:{
        required:true,
        type:Boolean
    },
    stock:{
        required:true,
        type:Number,
        maxLength:100
    },
    sold:{
        type:Number,
        maxlength:100,
        default:0
    },
    publish:{
        required:true,
        type:Boolean
    },
    images:{
        type:Array,
        default:[]
    }
},{timestamps:true});

const GuitarBags = mongoose.model('GuitarBags', accerroriesSchema);

module.exports = { GuitarBags }