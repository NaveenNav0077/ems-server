const Employee = require('../models/employeeSchema');
const jwt = require('jsonwebtoken');

const SignIn = async (req,res)=>{
    try{
        const { username, password, phoneNumber } = await req.body;
        Employee.findOne({ username }, async (err, result)=>{
            if(result===null){
                Employee({ username, password, phoneNumber }).save(async (err,employee)=>{
                    const token = await jwt.sign({ password : employee.password }, process.env.EMPLOYESECRET);
                    res.json({ 
                        "status" : 200, 
                        "message": 'Employee registerd signin', 
                        "result" : employee,
                        "token": token
                    });
                });
            } else {
                //If Employee alredy exsist
                res.json({ 
                  "status" : 400,  
                  "message": 'Employee alredy exsist', 
                });
            }
        });  
    } catch(err) {
        console.log(err);
    }
}

const Login = async (req,res)=>{
    try{
        const { username, password } = await req.body;
        Employee.findOne({ username }, async(err, employee)=>{
            if(employee !== null && employee?.password === password ){
                let token;
                if(employee?.admin === true){
                    token = await jwt.sign({ password : employee.password }, process.env.ADMINSECRET);
                } else {
                    token = await jwt.sign({ password : employee.password }, process.env.EMPLOYESECRET);
                } 
                res.json({ 
                    "status" : 200, 
                    "message": 'Employee logedin sucessfully', 
                    "result" : employee,
                    "token": token
                });
            } else {
                //If Employee not exsist
                res.json({ 
                  "status" : 400,  
                  "message": 'Employee not exsist or password incorrect', 
                });
            }
        });  
    } catch(err) {
        res.json({ 
            "status" : 500,  
            "message": 'Error occured during login', 
        });
    }
}

module.exports = { SignIn, Login  }
 