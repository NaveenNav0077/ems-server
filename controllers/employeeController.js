const Employee = require('../models/employeeSchema');
require('dotenv').config()
const mailchimp = require("@mailchimp/mailchimp_marketing");
/*
mailchimp.setConfig({
  apiKey: process.env.API_KEY,
  server: "us9",
});
*/
const getEmployees = (req,res)=>{
    try{
        Employee.find({}, (err,result)=>{
            res.json({ 
                "status" : 200, 
                "result" : result,
            })
        })
    } catch (err){
        console.log(err);
    }
}

const getEmployee = async (req,res)=>{
    try{
        const { id } = await req.params;
        Employee.findOne( { _id:id }, (err, result)=>{
            res.json({ 
                "status" : 200, 
                "result" : result,
            })
        })
    } catch (err){
        console.log(err);
    }
}

const postEmployee = async (req,res)=>{
    try{
        const { username, password, phoneNumber } = await req.body;
        Employee.findOne({ username }, async (err, result)=>{
            if(result===null){
                // await mailchimp.lists.addListMember("2d71e622be", {
                //     email_address: username,
                //     full_name:username.split('@')?.length > 0 && username.split('@')[0],
                //     status: "pending",
                // });
                Employee({ username, password, phoneNumber }).save(async (err, employee)=>{
                    res.json({ 
                        "status" : 200, 
                        "result" : employee
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
    } catch (err){
        console.log(err);
    }
}

const putEmployee = async (req,res)=>{
    try{
        const { id } = await req.params;
        const { username, phoneNumber } = await req.body;
        Employee.findOne({ _id:id }, (err, result)=>{
            if(result!==null){        
                result.username = username;
                result.phoneNumber = phoneNumber;
                result.save((err, result)=>{
                    res.json({ 
                        "status" : 200, 
                        "result" : result,
                        "message":"Employe updated sucessfuly!",
                    })
                })   
            } else {
                res.json({ 
                    "status" : 400,  
                    "message": 'Employee not exsist', 
                });
            }    
        })
    } catch (err){
        console.log(err);
    }
}

const deleteEmployee = async (req,res)=>{
    try{
        const { id } = await req.params;
        Employee.findOne({ _id:id }, (err, result)=>{
            if(result!==null){
                result.remove();
                result.save((err, result)=>{
                    res.json({ 
                        "status" : 200, 
                        "result" : {
                            message:"Employe deleted sucessfuly!"
                        },
                    })
                })     
            } else {
                res.json({ 
                    "status" : 400,  
                    "message": 'Employee not exsist', 
                });
            }   
                   
        })
    } catch (err){
        console.log(err);
    }
}

module.exports = { getEmployees, getEmployee, postEmployee, putEmployee, deleteEmployee }
 