var mongoose=require('mongoose');

var MyModel=mongoose.model('countries', 
new mongoose.Schema(
    {
     countryCode: String, 
     countryName: String, 
     currencyCode: String,
     population: Number,
     capital:String,
     continent:String,
     languages:String
    }
), 
'countries');  

module.exports=MyModel;