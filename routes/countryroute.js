var express=require('express');
var route= express.Router();
var passport = require('passport');
var model=require('../mongo_ops/model');


route.get('/all',passport.authenticate('jwt',{session:false}),function(request,response){
 let token=getToken(request.headers);
 console.log(request.headers);
 if(token){
  model.find({},{_id:0},function(err,data){
         if(err)
           response.json({countries:[]});
         else
           response.json({countries:data});
     })
    }
    else
    return res.status(403).send({success: false, msg: 'Unauthorized request.'});
});

route.get('/all-regex/:cname',function(request,response){
    
     model.find({countryName:{$regex:request.params.cname,$options:'i'}},
     {_id:0},
         function(err,data){
         if(err)
         {
           response.json({countries:[]});
         }
         else
         {
           response.json({countries:data});
         }
     })
   });

   route.put('/change/:country',function(request,response){
    let country=request.params.country;

    
    model.update({countryName:country},{$set:request.body},
       function(error,data){
          if(error)
             response.send({update:"Not happened"});
          else
             response.send({update:"updated successfully"});
       });
});

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
module.exports=route;