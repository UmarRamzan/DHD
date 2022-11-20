
import { createConnection } from 'mysql2';
import { config } from 'dotenv';

config({path:".env"});

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

const create_account = `CREATE TABLE IF NOT EXISTS account (
    Account_ID INT AUTO_INCREMENT,
    Account_Type VARCHAR(15),
    Email VARCHAR(25),
    Password VARCHAR(25),
    PRIMARY KEY (Account_ID)
)`

const create_patient = `CREATE TABLE IF NOT EXISTS patient (
    Account_ID INT,
    First_Name VARCHAR(25),
    Last_Name VARCHAR(25),
    PRIMARY KEY (Account_ID)
)`

const create_doctor = `CREATE TABLE IF NOT EXISTS doctor (
    Account_ID INT,
    First_Name VARCHAR(25),
    Last_Name VARCHAR(25),
    Specialization VARCHAR(25),
    City VARCHAR(25),
    Address VARCHAR(50),
    Timings VARCHAR(25),
    Personal_Bio VARCHAR(500),
    Online_Availability INT,
    Charges INT,
    PRIMARY KEY (Account_ID)
)`

const create_hospital = `CREATE TABLE IF NOT EXISTS hospital (
    Account_ID INT,
    Name VARCHAR(50),
    City VARCHAR(50),
    Address VARCHAR(50),
    PRIMARY KEY (Account_ID)
)`

const create_doctor_hospital = `CREATE TABLE IF NOT EXISTS doctor_hospital (
    Doctor_ID INT,
    Hospital_ID INT,
    PRIMARY KEY (Doctor_ID, Hospital_ID)
)`

const create_booking = `CREATE TABLE IF NOT EXISTS booking (
    Booking_ID INT AUTO_INCREMENT,
    Patient_ID INT,
    Doctor_ID INT,
    Year INT,
    Month INT,
    Day INT,
    Hour INT,
    PRIMARY KEY (Booking_ID)
)`

const create_review = `CREATE TABLE IF NOT EXISTS review (
    Review_ID INT AUTO_INCREMENT,
    Patient_ID INT,
    Doctor_ID INT,
    Rating INT,
    Review_Text VARCHAR(500),
    PRIMARY KEY (Review_ID)
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
        process_query(create_account)
        process_query(create_patient)
        process_query(create_doctor)
        process_query(create_hospital)
        process_query(create_doctor_hospital)
        process_query(create_booking)
        process_query(create_review)

        connection.end()
    }
})