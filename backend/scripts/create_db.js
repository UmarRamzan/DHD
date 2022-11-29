
import { createConnection } from 'mysql2';
import { config } from 'dotenv';

config({path:".env"});

// Create a connection to the sql server
const connection = createConnection({
    host: "localhost",
    user: "root",
    password: "pass",
});

// Process a general sql query and throw any resulting errors
function processQuery(query) {
    connection.query(query, (err, res) => {
        if (err) {throw err} else {console.log("Query Processed")}
    })
}

const createAccount = `CREATE TABLE IF NOT EXISTS Account (
    accountID INT AUTO_INCREMENT,
    accountType VARCHAR(15),
    email VARCHAR(50),
    password VARCHAR(50),
    PRIMARY KEY (accountID)
)`

const createPatient = `CREATE TABLE IF NOT EXISTS Patient (
    accountID INT,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    dateOfBirth DATE,
    gender VARCHAR(10),
    PRIMARY KEY (accountID)
)`

const createDoctor = `CREATE TABLE IF NOT EXISTS Doctor (
    accountID INT,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    specialization VARCHAR(50),
    city VARCHAR(50),
    address VARCHAR(50),
    timings VARCHAR(50),
    personal_Bio VARCHAR(500),
    online_Availability INT,
    charges INT,
    PRIMARY KEY (accountID)
)`

const createHospital = `CREATE TABLE IF NOT EXISTS Hospital (
    accountID INT,
    name VARCHAR(50),
    city VARCHAR(50),
    address VARCHAR(50),
    PRIMARY KEY (accountID)
)`

const createDoctorHospital = `CREATE TABLE IF NOT EXISTS DoctorHospital (
    doctorID INT,
    hospitalID INT,
    PRIMARY KEY (doctorID, hospitalID)
)`

const createBooking = `CREATE TABLE IF NOT EXISTS Booking (
    bookingID INT AUTO_INCREMENT,
    patientID INT,
    doctorID INT,
    bookingDate DATE,
    bookingTime TIME,
    PRIMARY KEY (bookingID)
)`

const createReview = `CREATE TABLE IF NOT EXISTS Review (
    reviewID INT AUTO_INCREMENT,
    patientID INT,
    doctorID INT,
    rating INT,
    reviewText VARCHAR(500),
    PRIMARY KEY (reviewID)
)`

connection.connect((err) => {
    if (err) {
        console.log("Could not connect to the mysql server")
        console.log(err)

    } else {
        console.log("Connected to the mysql server")

        // delete the database for testing
        processQuery(`DROP DATABASE dhd`)
        
        // create and use the dhd database
        processQuery(`CREATE DATABASE IF NOT EXISTS dhd`)
        processQuery(`USE dhd`)

        // Create all of the required tables
        processQuery(createAccount)
        processQuery(createPatient)
        processQuery(createDoctor)
        processQuery(createHospital)
        processQuery(createDoctorHospital)
        processQuery(createBooking)
        processQuery(createReview)

        connection.end()
    }
})