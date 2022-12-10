import { createConnection } from 'mysql2';
import { config } from 'dotenv';

config({path:".env"});

// Create a connection to the sql server
function validateConnection() {

    let connection = createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        port:process.env.DB_PORT,
        multipleStatements: false
    })

    connection.connect((err) => {
        if (err) {
            console.log("Connection Failed")
        } else {
            console.log("Connected")
        }
    })

    return connection
}

// add a new entry into the doctors table
export async function doctorAddEntry(req, response) {

    let accountID = req.body.accountID
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let dateOfBirth = req.body.dateOfBirth
    let gender = req.body.gender
    let specialization = req.body.specialization
    let city = req.body.city
    let address = req.body.address
    let startTime = req.body.startTime
    let endTime = req.body.endTime
    let onlineAvailability = req.body.onlineAvailability
    let hourlyCharge = req.body.hourlyCharge
    let personalBio = req.body.personalBio
    
    let connection = validateConnection()

    let seedQuery = `INSERT INTO Doctor VALUES (?)`
    let values = [accountID, firstName, lastName, dateOfBirth, gender, specialization, city, address, startTime, endTime, personalBio, onlineAvailability, hourlyCharge]

    connection.query(seedQuery, [values], (err, res) => {

        if (err) {
            let returnMessage = {
                "isSuccessful": false,
                "errorMessage": "Could not create a new doctor entry"
            }

            response.send(returnMessage)
            connection.end()
            
            console.log(err)

        } else {

            let returnMessage = {
                "isSuccessful": true,
            }

            response.send(returnMessage)
            connection.end()
        }
    })

    
}

export async function doctorUpdateEntry(req, response) {

    let doctorID = req.body.doctorID
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let dateOfBirth = req.body.dateOfBirth
    let gender = req.body.gender
    let specialization = req.body.specialization
    let city = req.body.city
    let address = req.body.address
    let startTime = req.body.startTime
    let endTime = req.body.endTime
    let onlineAvailability = req.body.onlineAvailability
    let hourlyCharge = req.body.hourlyCharge
    let personalBio = req.body.personalBio

    let updateDoctor = `UPDATE Doctor SET firstName = ?, lastName = ?, dateOfBirth = ?, gender = ?, specialization = ?, city = ?, address = ?, startTime = ?, endTime = ?, personalBio = ?, onlineAvailability = ?, hourlyCharge = ? WHERE accountID = ?`
    let values = [firstName, lastName, dateOfBirth, gender, specialization, city, address, startTime, endTime, personalBio, onlineAvailability, hourlyCharge, doctorID]

    let connection = validateConnection()
    connection.query(updateDoctor, values, (err, res) => {
        if (err) {
            let returnMessage = {
                "isSuccessful": false,
                "errorMessage": "Could not update doctor record"
            }
            response.send(returnMessage)
            connection.end()

            console.log(err)

        } else {

            let returnMessage = {
                "isSuccessful": true
            }
            response.send(returnMessage)
            connection.end()
        }
    })

    connection.end()
}

export async function doctorGetInfo(req, response) {

    let accountID = req.body.accountID

    let getInfo = `SELECT * FROM Doctor WHERE accountID = ?`
    let values = [accountID]

    let connection = validateConnection()
    connection.query(getInfo, [values], (err, res) => {
        if (err) {
            console.log(err)
        } else {
            let data = res[0]

            let returnMessage = {
                "isSuccessful": true,
                "firstName": data.firstName,
                "lastName": data.lastName,
                "dateOfBirth": data.dateOfBirth,
                "gender": data.gender,
                "specialization": data.specialization,
                "city": data.city,
                "address": data.address,
                "startTime": data.startTime,
                "endTime": data.endTime,
                "personalBio": data.personalBio,
                "onlineAvailability": data.onlineAvailability,
                "hourlyCharges": data.hourlyCharge,
            }

            response.send(returnMessage)
            connection.end()
        }
    })

}

export async function removeDoctor(req, response) {

    let accountID = req.body.accountID

    let connection = validateConnection()

    let deleteAccount = `DELETE FROM Doctor WHERE accountID = ?`
    let values = [accountID]

    connection.query(deleteAccount, values, (err, res) => {

        if (err) {
            let returnMessage = {
                "isSuccessful": false,
                "errorMessage": "Could not delete the account"
            }
            response.send(returnMessage)
            connection.end()

        } else {
            let returnMessage = {
                "isSuccessful": true
            }
            response.send(returnMessage)
            connection.end()
        }
    })
}

export async function getDoctorName(req, response) {

    let accountID = req.body.accountID

    let getInfo = `SELECT firstName, lastName FROM Doctor WHERE accountID = ?`
    let values = [accountID]

    let connection = validateConnection()
    connection.query(getInfo, [values], (err, res) => {
        if (err) {
            console.log(err)
        } else {
            let data = res[0]

            let returnMessage = {
                "isSuccessful": true,
                "firstName": data.firstName,
                "lastName": data.lastName
            }

            response.send(returnMessage)
            connection.end()
        }
    })

}