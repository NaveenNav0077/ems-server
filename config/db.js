const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(
    process.env.URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    },
    (err)=>{
    if(err){
        console.log('Error during connecting with cloud !!! '+err);
    }
    else{
        console.log('Sucessfully connected with cloud !!!');
    }
});

module.exports = mongoose;