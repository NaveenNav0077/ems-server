const jwt = require('jsonwebtoken');

const employeeToken = (req,res,next)=>{
    try{
        const bearerHeader = req.headers.authorization;
        if( bearerHeader !== undefined ){ 
            const bearerToken = bearerHeader.split(' ');
            const token = bearerToken[1];
            jwt.verify( token, process.env.ADMINSECRET, (err,result)=>{ 
                if(err){ 
                    jwt.verify( token, process.env.EMPLOYESECRET, (err,result)=>{ 
                        if(err){ 
                            res.json({  
                                "status" : 400,  
                                "message": 'Error occured while verifying token or token expired'
                            });
                        }
                        if(result!==undefined){ 
                            next(); 
                        }
                    }); 
                }
                if(result!==undefined){ 
                    next(); 
                }
            }); 
        } else { 
            res.json({  
                "status" : 400,  
                "message": 'unauthorized request'
            });
        }
    }
    catch(err){
        console.log(err);
    }
}


const adminToken = (req,res,next)=>{
    try{
        const bearerHeader = req.headers.authorization;
        if( bearerHeader !== undefined ){ 
            const bearerToken = bearerHeader.split(' ');
            const token = bearerToken[1];
            jwt.verify( token, process.env.ADMINSECRET, (err,result)=>{ 
                if(err){ 
                    res.json({  
                        "status" : 400,  
                        "message": 'Error occured while verifying token or token expired'
                    });
                }
                if(result!==undefined){ 
                    next(); 
                }
            }); 
        } else { 
            res.json({  
                "status" : 400,  
                "message": 'unauthorized request'
            });
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports = { adminToken, employeeToken }