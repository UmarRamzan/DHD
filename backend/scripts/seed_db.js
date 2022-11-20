const dotenv = require("dotenv");
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');
const csv = require('csv-parser');
dotenv.config({path:".env"});
var app = express();
const util = require('util');
const exec = util.promisify(require('child_process').exec);
app.use(bodyParser.urlencoded({extended:true}));


var connectionString = mysql.createConnection(
    {
        host:"localhost",
        user: "root",
        password:"pass",
        database:"dhd"
    }
);
async function reader(file)
{
    const results = [];
    return new Promise(function(resolve,reject){
        fs.createReadStream(file).pipe(csv()).on('data', (data) => results.push(data)).on('end', () => {
            resolve(results)
        })
    });
    
}


function seedData(query)
{
    /*
    Call this fuction to  insert a record into your db to the respective table using 
    the query.The variable query corresponds to the sql query you will write to accomplish this. 
     */
    return new Promise ((resolve, reject) => {
        connectionString.query(query, (err2, result) => {
            if (err2) {
                console.log("Seeding failed");
                console.log(query)
                reject(err2);
            }
            else {
                resolve();
                //console.log("Seeding done.");
            }
   })
})
}




connectionString.connect(async (err)=>
{
    seedData("TRUNCATE account")
    seedData("TRUNCATE hospital")
    seedData("TRUNCATE doctor")
    seedData("TRUNCATE patient")
    seedData("TRUNCATE doctor_hospital")
    if(err)
    {
        console.log(err);
    }
    else
    {
        let fileAccount = await reader('Accounts.csv')
        console.log("seeding acc")
        for (row of fileAccount){

            var Q1 = "INSERT INTO account";
            Q1 = Q1 + " VALUES ("+ row.account_ID+ "," +"'"+row.account_Type+"'"+ "," +"'"+row.email+"'"+ "," +"'"+row.password+"'" + ")";
            let p1 = await seedData(Q1);


        }
        let fileHospitals = await reader('Hospitals.csv')
        console.log("seeding hos")
        for (row of fileHospitals){

            var Q3 = "INSERT INTO hospital";
            Q3 = Q3 + " VALUES ("+ row.account_ID+ "," +"'"+ row.name+"'" + "," +"'"+row.city+"'" + "," +"'"+row.address+"'" + ")";
            let p3 = await seedData(Q3);


        }
        let fileDoctors = await reader('Doctors.csv')
        console.log("seeding doctor")
        for (row of fileDoctors){

            var Q2 = "INSERT INTO doctor";
            Q2 = Q2 + " VALUES ("+ row.account_ID+ "," +"'"+row.first_name+"'"+ "," +"'"+row.last_name+"'"+ "," +"'"+row.specialization+"'"+ ","+"'"+row.city+"'"+ "," +"'"+row.address+"'"+ ","+"'"+row.timings+"'"+ ","+"'"+row.information +"'"+","+ row.online_availability+ ","+ row.charges+")";
            let p2 = await seedData(Q2);
            


        }
        let filePatient = await reader('Patients.csv')
        console.log("seeding patients")
        for (row of filePatient){

            var Q4 = "INSERT INTO patient";
            Q4 = Q4 + " VALUES ("+ row.account_ID+ "," + "'"+row.first_name+"'" + "," +"'"+row.last_name+"'" + ")";
            let p4 = await seedData(Q4);


        }
        let fileDoc_Hos = await reader('Doctor_Hos.csv')
        console.log("seeding doc_hos")
        for (row of fileDoc_Hos){

            var Q5 = "INSERT INTO doctor_hospital";
            Q5 = Q5 + " VALUES ("+ row.docotor_ID+ "," + row.hospital_ID+")";
            let p5 = await seedData(Q5);


        }
        
        console.log("DONE");
        connectionString.end();
    }
});