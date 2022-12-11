import { createConnection } from 'mysql2';
import { config } from 'dotenv';
import { createReadStream } from 'fs';
import csv from 'csv-parser';

config({path:".env"});

var connectionString = createConnection(

    {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        multipleStatements: false
    }
);

async function reader(file)
{
    const results = [];
    return new Promise(function(resolve,reject){
        createReadStream(file).pipe(csv()).on('data', (data) => results.push(data)).on('end', () => {
            resolve(results)
        })
    });
    
}

function seedData(query)
{
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
    // delete all data within the specified tables
    await seedData("TRUNCATE account")
    await seedData("TRUNCATE hospital")
    await seedData("TRUNCATE doctor")
    await seedData("TRUNCATE patient")
    await seedData("TRUNCATE doctor_hospital")

    if(err)
    {
        console.log(err);
    }
    else
    {
        let fileAccount = await reader('./scripts/seed_data/Accounts.csv')
        console.log("seeding account")
        for (const row of fileAccount){
            row.account_ID += 1
            var Q1 = "INSERT INTO account";
            Q1 = Q1 + " VALUES ("+ row.account_ID+ "," +"'"+row.account_Type+"'"+ "," +"'"+row.email+"'"+ "," +"'"+row.password+"'" + ")";
            let p1 = await seedData(Q1);
        }

        let fileHospitals = await reader('./scripts/seed_data/Hospitals.csv')
        console.log("seeding hospital")
        for (const row of fileHospitals){
            var Q3 = "INSERT INTO hospital";
            Q3 = Q3 + " VALUES ("+ row.account_ID+ "," +"'"+ row.name+"'" + "," +"'"+row.city+"'" + "," +"'"+row.address+"'" + ")";
            let p3 = await seedData(Q3);
        }

        let fileDoctors = await reader('./scripts/seed_data/Doctors.csv')
        console.log("seeding doctor")
        for (const row of fileDoctors){
            var Q2 = "INSERT INTO doctor";
            Q2 = Q2 + " VALUES ("+ row.account_ID+ "," +"'"+row.first_name+"'"+ "," +"'"+row.last_name+"'"+ "," +"'"+row.specialization+"'"+ ","+"'"+row.city+"'"+ "," +"'"+row.address+"'"+ ","+"'"+row.timings+"'"+ ","+"'"+row.personal_bio +"'"+","+ row.online_availability+ ","+ row.charges+")";
            let p2 = await seedData(Q2);
        }

        let filePatient = await reader('./scripts/seed_data/Patients.csv')
        console.log("seeding patients")
        for (const row of filePatient){
            var Q4 = "INSERT INTO patient";
            Q4 = Q4 + " VALUES ("+ row.account_ID+ "," + "'"+row.first_name+"'" + "," +"'"+row.last_name+"'" + ")";
            let p4 = await seedData(Q4);
        }

        let fileDoc_Hos = await reader('./scripts/seed_data/Doctor_Hos.csv')
        console.log("seeding doc_hos")
        for (const row of fileDoc_Hos){
            var Q5 = "INSERT INTO doctor_hospital";
            Q5 = Q5 + " VALUES ("+ row.docotor_ID+ "," + row.hospital_ID+")";
            let p5 = await seedData(Q5);
        }
        
        console.log("Seeding Complete");
        connectionString.end();
    }
});