require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const cluster = require('cluster');
const os =require('os');
const cpus = os.cpus().length;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

//Connecting with database
require('./config/db');
const Employee = require('./models/employeeSchema');

const authendicationRoutes = require('./routes/authendicationRoute'); 
const employeeRoutes = require('./routes/employeeRoute'); 

app.use('/auth', authendicationRoutes);
app.use('/employee', employeeRoutes);

app.get('/',(req,res)=>{
    res.status(200).json({
        'message':'Employee Management App'
    })
})

app.use((req, res, next) => {
    res.status(404).json({ status:400, message:"Sorry can't find that!"});
})

// if(cluster.isMaster){
//     console.log("server up and running on port "+process.env.PORT)
//     for(let i=0;i<cpus;i++){
//         cluster.fork();
//     }
//     cluster.on('exit',(worker, code, signal)=>{
//         cluster.fork();
//     })
// } else {
     app.listen(process.env.PORT, ()=>console.log("cluster id : "+process.pid))
// }
