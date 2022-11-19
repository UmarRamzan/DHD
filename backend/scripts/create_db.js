
import { createConnection } from 'mysql2';
import { config } from 'dotenv';

config({path:"../.env"});

// Create a connection to the sql server
const connection = createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
});

// Process a general sql query and throw any resulting errors
function process_query(query) {
    connection.query(query, (err, res) => {
        if (err) {throw err} else {console.log("Query Processed")}
    })
}

const createAccount = `CREATE TABLE IF NOT EXISTS account (
    Account_ID INT AUTO_INCREMENT,
    Account_Type VARCHAR(15),
    Email VARCHAR(50),
    Password VARCHAR(50),
    PRIMARY KEY (Account_ID)
)`

const createPatient = `CREATE TABLE IF NOT EXISTS patient (
    Account_ID INT,
    First_Name VARCHAR(50),
    Last_Name VARCHAR(50),
    PRIMARY KEY (Account_ID)
)`

const createDoctor = `CREATE TABLE IF NOT EXISTS doctor (
    Account_ID INT,
    First_Name VARCHAR(50),
    Last_Name VARCHAR(50),
    PRIMARY KEY (Account_ID)
)`

const createHospital = `CREATE TABLE IF NOT EXISTS hospital (
    Account_ID INT,
    Name VARCHAR(50),
    City VARCHAR(50),
    Address VARCHAR(50),
    PRIMARY KEY (Account_ID)
)`

connection.connect((err) => {
    if (err) {
        console.log("Could not connect to the mysql server")
        console.log(err)

    } else {
        console.log("Connected to the mysql server")

        // delete the database for testing
        process_query(`DROP DATABASE dhd`)
        
        // create and use the dhd database
        process_query(`CREATE DATABASE IF NOT EXISTS dhd`)
        process_query(`USE dhd`)

        // Create all of the required tables
        process_query(createAccount)
        process_query(createPatient)
        process_query(createDoctor)
        process_query(createHospital)

        connection.end()
    }
})