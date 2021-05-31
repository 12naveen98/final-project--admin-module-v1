const express = require('express');
const config = require('./Config/Config');
const Enrollment = require('../Backend/Model/EnrollmentData');
const cors = require('cors');
const nodemailer = require('nodemailer');
var excel = require('excel4node');

const bodyParser=require('body-parser')
// var multer  = require('multer')
// const path = require('path');


const app = new express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// //for saving image
// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, 'uploads')
//   },
//   filename: (req, file, cb) => {
//       cb(null, file.fieldname + '-' + Date.now())
//   }
// });

// var upload = multer({ dest: './uploads' })


//for getting data of inactive users to make them active
app.get('/inactive', function(req,res){
    res.header("Access-Control-Allow-origin","*");
    res.header('Access-Control-Allow-origin:GET,POST,PATCH,PUT,DELETE,OPTION'); 
    Enrollment.find({"isactiveind":"0"}).then(function(data){
        //console.log(data);           
        res.send(data);  
    })
   // console.log("inside inactive users");
    
});

//for getting data of users who have done payment
app.get('/payment', function(req,res){
    res.header("Access-Control-Allow-origin","*");
    res.header('Access-Control-Allow-origin:GET,POST,PATCH,PUT,DELETE,OPTION');
    Enrollment.find({"ispaymentind":"1"}).then(function(data){
      //  console.log(data);           
        res.send(data);  
      
      // Create a new instance of a Workbook class
var workbook = new excel.Workbook();

// Add Worksheets to the workbook
var worksheet = workbook.addWorksheet('Sheet 1');


// Create a reusable style
var style = workbook.createStyle({
  font: {
    color: 'black',
    size: 9
  }
 // numberFormat: '$#,##0.00; ($#,##0.00); -'
});

// Set value of cell A1 firstname
worksheet.cell(1,1).string('Firstname').style(style);
worksheet.cell(1,2).string('Lastname').style(style);
worksheet.cell(1,3).string('Email').style(style);
worksheet.cell(1,4).string('Phone').style(style);
worksheet.cell(1,5).string('Address').style(style);
worksheet.cell(1,6).string('Landmark').style(style);
worksheet.cell(1,7).string('City').style(style);
worksheet.cell(1,8).string('District').style(style);
worksheet.cell(1,9).string('zip').style(style);
worksheet.cell(1,10).string('Qualification').style(style);
worksheet.cell(1,11).string('yearOfPassOut').style(style);
worksheet.cell(1,12).string('Skillset').style(style);
worksheet.cell(1,13).string('TechTraining').style(style);
worksheet.cell(1,14).string('EmployeeStatus').style(style);
worksheet.cell(1,15).string('Year').style(style);
worksheet.cell(1,16).string('Course').style(style);
worksheet.cell(1,17).string('Fees').style(style);


  for(let i=0;i<data.length;i++){
    var row=2;
  
console.log(data[i]);
 worksheet.cell(row,1).string(data[i].firstname).style(style);
 worksheet.cell(row,2).string(data[i].lastname).style(style);
 worksheet.cell(row,3).string(data[i].email).style(style);
 worksheet.cell(row,4).number(data[i].phone).style(style);
 worksheet.cell(row,5).string(data[i].address1).style(style);
 worksheet.cell(row,6).string(data[i].landmark).style(style);
 worksheet.cell(row,7).string(data[i].city).style(style);
 worksheet.cell(row,8).string(data[i].district).style(style);
 worksheet.cell(row,9).number(data[i].zip).style(style);
 worksheet.cell(row,10).string(data[i].qualification).style(style);
 worksheet.cell(row,11).number(data[i].yearofpassout).style(style);
 worksheet.cell(row,12).string(data[i].skillset).style(style);
 worksheet.cell(row,13).string(data[i].techTraining).style(style);
 worksheet.cell(row,14).string(data[i].empstatus).style(style);
 worksheet.cell(row,15).number(data[i].year).style(style);
 worksheet.cell(row,16).string(data[i].course).style(style);
 worksheet.cell(row,17).number(data[i].amount).style(style);

 row=row+1;

 workbook.write('Excel.xlsx');
  }
 
})
 
   // console.log("inside paid users");
    
});

//for getting count of active users
app.get('/activecount', function(req,res){
    res.header("Access-Control-Allow-origin","*");
    res.header('Access-Control-Allow-origin:GET,POST,PATCH,PUT,DELETE,OPTION');
    Enrollment.countDocuments({"isactiveind":"1"}, function(err,result){
        if (err) {
            res.send(err);
          } else {
            res.json(result);
          }
    })
   // console.log("inside activecount");
  
});   

//for getting count of inactive users
app.get('/inactivecount', function(req,res){
    res.header("Access-Control-Allow-origin","*");
    res.header('Access-Control-Allow-origin:GET,POST,PATCH,PUT,DELETE,OPTION');
    Enrollment.countDocuments({"isactiveind":"0"}, function(err,result){
        if (err) {
            res.send(err);
          } else {
            res.json(result);
          }
    })
// console.log("inside inactivecount");
 
});

//for getting count of users who hasnt done payment
app.get('/paymentcount', function(req,res){
    res.header("Access-Control-Allow-origin","*");
    res.header('Access-Control-Allow-origin:GET,POST,PATCH,PUT,DELETE,OPTION');
    Enrollment.countDocuments({"ispaymentind":"1"}, function(err,result){
        if (err) {
            res.send(err);
          } else {
            res.json(result);
          }
    })
  // console.log("inside paid users");
  
});  

//for editing user details
app.post('/update',function(req,res){
    res.header("Access-Control-Allow-origin","*");
    res.header('Access-Control-Allow-origin:GET,POST,PATCH,PUT,DELETE,OPTION');
    const old={
         regid:req.body.Data.regid
       //regid:"ictk001"
    };
    const latest={
        
            $set:{
                 firstname:req.body.Data.firstname,
                 lastname:req.body.Data.lastname,
                 email:req.body.Data.email,
                 phone:req.body.Data.phone,
                 address1:req.body.Data.address1,
                 landmark:req.body.Data.landmark,
                 city:req.body.Data.city,
                 district:req.body.Data.district,
                 zip:req.body.Data.zip,
                 qualification:req.body.Data.qualification,
                 yearofpassout:req.body.Data.yearofpassout,
                 skillset:req.body.Data.skillset,
                 empstatus:req.body.Data.empstatus,
                 techTraining:req.body.Data.techTraining,
                 year:req.body.Data.year,
                 course:req.body.Data.course,
                 amount:req.body.Data.amount
                //  image: {
                //   data: fs.readFileSync(req.body.Data.image),
                //   contentType: 'image/png'
                //}

            }
           
    };
    console.log(old);
    console.log(latest);
    
    Enrollment.updateOne(old,latest,function(req,res){
        var data=Enrollment(latest);
        data.save();
       console.log("successful");
         })
        
    });


 //for activating user account
app.post('/activate',function(req,res){
    res.header("Access-Control-Allow-origin","*");
    res.header('Access-Control-Allow-origin:GET,POST,PATCH,PUT,DELETE,OPTION');
    const old={
         regid:req.body.Data.regid
       //regid:"ictk001"
    };
    const latest={
        
            $set:{
                 isactiveind:"1"

                // isactiveind:"1"
                
            }
        
    };
     console.log(old);
     console.log(latest);
    
    Enrollment.updateOne(old,latest,function(req,res){
        var data=Enrollment(latest);
        data.save();
        //console.log("successful");
         })
        
    });   


    //for getting count of all users
app.get('/totalusers', function(req,res){
    res.header("Access-Control-Allow-origin","*");
    res.header('Access-Control-Allow-origin:GET,POST,PATCH,PUT,DELETE,OPTION');
    Enrollment.countDocuments({"regid":{ $exists: true }} ,function(err,result){
        if (err) {
            res.send(err);
          } else {
            res.json(result);
          }
    })
   //console.log("inside total users");
  
});  

  //for getting data from search bar
  app.get('/:regid', function(req,res){
    res.header("Access-Control-Allow-origin","*");
    res.header('Access-Control-Allow-origin:GET,POST,PATCH,PUT,DELETE,OPTION');
    const id= req.params.regid;
    //console.log("regid:" +req.params['regid'])
    Enrollment.find({"regid":id}).then(function(data){   
     // console.log("searching...")
        //console.log(data);           
        res.send(data);  
    })
  })

  //for deleting a user
  app.delete('/delete/:regid', function(req,res){
  res.header("Access-Control-Allow-origin","*");
  res.header('Access-Control-Allow-origin:GET,POST,PATCH,PUT,DELETE,OPTION'); 
  const id= req.params.regid;
  //console.log("regid:" +req.params['regid'])
  Enrollment.deleteOne({"regid":id}).then(function(data){
    console.log("deleting...")
    //console.log(data);           
    res.send(data); 
    })

  })


//for sending notification
app.post('/mailer',function(req,res){
console.log("inside mailer")
res.header("Access-Control-Allow-origin","*");
res.header('Access-Control-Allow-origin:GET,POST,PATCH,PUT,DELETE,OPTION'); 
const mailto= req.body.Data.email;
const id=req.body.Data.regid;
Enrollment.find({"regid":id}).then(function(data){   
  // console.log("searching...")
     console.log(data);  
     Data=JSON.stringify(data);  
     console.log(Data);          
     res.send(data); 
 
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: '@gmail.com',
              pass: ''
            }
          });
          
          var mailOptions = {
            from: '@gmail.com',
            to: mailto,
            subject: 'Recipent bill',
            text: 'The Amount paid for the course '+ 'coursename' +' by '+'applicant name '+'is Amount.'+
            'Thank you for joining the course. Happy learning!!!' 
          };


                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });

    
    })
   })


    //for deactivating user account
app.post('/deactivate',function(req,res){
  res.header("Access-Control-Allow-origin","*");
  res.header('Access-Control-Allow-origin:GET,POST,PATCH,PUT,DELETE,OPTION');
  const old={
       regid:req.body.Data.regid
     //regid:"ictk001"
  };
  const latest={
      
          $set:{
               isactiveind:"0"

              // isactiveind:"1"
              
          }
      
  };
   console.log(old);
   console.log(latest);
  
  Enrollment.updateOne(old,latest,function(req,res){
      var data=Enrollment(latest);
      data.save();
      //console.log("successful");
       })
      
  });   

//paid users details
// app.get('/payment', function(req,res){
//   res.header("Access-Control-Allow-origin","*");
//   res.header('Access-Control-Allow-origin:GET,POST,PATCH,PUT,DELETE,OPTION');
//   Enrollment.find({"ispaymentind":"1"}).then(function(data){
//     //  console.log(data);           
//       res.send(data);  
  

//       //let output = table(data);
//       //console.log(output);

//   //  fs.writeFile("tabledata.txt", data,"utf8", function(err) {
//   //   if(err) {
//   //       return console.log(err);
//   //   }

//   //   console.log("The file was saved!");
//   //     });
//    })
  
// });
  
app.listen(2000, function(){
    console.log('listening to port 2000');
});