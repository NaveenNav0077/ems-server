const mongoose = require('../config/db');

const employeeSchema = new mongoose.Schema ({
  username: {
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  phoneNumber:{
    type:Number,
    required:true
  },
  admin:{
    type:Boolean,
    default:false
  }
});

const Employee = new mongoose.model("Employee", employeeSchema);

module.exports = Employee;