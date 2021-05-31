const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/StudentEnrollment',{useNewUrlParser: true, useUnifiedTopology: true});

// mongoose.connect(process.env.MONGODB_URI,(err)=>{
//     if(!err){console.log("connected");}
//     else{console.log("error")}
// })


const Schema = mongoose.Schema;

var Enrollment = new Schema({

    regid:String,
    firstname:String,
    lastname:String,
    email:String,
    phone:Number,
    address1:String,
    landmark:String,
    city:String,
    district:String,
    zip:Number,
    qualification:String,
    yearofpassout:Number,
    skillset:String,
    empstatus:String,
    techTraining:String,
    year:Number,
    course:String,
    ispaymentind:Number,
    isactiveind:Number,
    amount:Number
    // image:{
    //     data: Buffer,
    //     contentType: String
    // }

});

var enrollmentDatas=mongoose.model('enrollmentdata', Enrollment);

module.exports= enrollmentDatas;