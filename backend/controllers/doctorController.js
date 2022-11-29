import { createConnection } from 'mysql2';
import { config } from 'dotenv';
import first from 'ee-first';

config({path:".env"});

// Create a connection to the sql server
function validateConnection() {

    let connection = createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
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
    let timings = req.body.timings
    let onlineAvailability = req.body.onlineAvailability
    let charges = req.body.charges
    let personalBio = req.body.personalBio
    
    let connection = validateConnection()

    let seedQuery = `INSERT INTO Doctor VALUES (?)`
    let values = [accountID, firstName, lastName, dateOfBirth, gender, specialization, city, address, timings, personalBio, onlineAvailability, charges]

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

export async function doctorGetInfo(req, response) {

    let accountID = req.body.accountID

    let getInfo = `SELECT * FROM doctor WHERE accountID = ?`
    let values = [accountID]

    let connection = validateConnection()
    connection.query(getInfo, [values], (err, res) => {
        if (err) {
            console.log(err)
        } else {
            let data = res[0]

            let returnMessage = {
                "firstName": data.firstName,
                "lastName": data.lastName,
                "dateOfBirth": data.dateOfBirth,
                "gender": data.gender,
                "specialization": data.specialization,
                "city": data.city,
                "address": data.address,
                "timings": data.timings,
                "personalBio": data.personalBio,
                "onlineAvailability": data.onlineAvailability,
                "charges": data.charges,
            }

            response.send(returnMessage)
            connection.end()
        }
    })

}

// update an existing entry within the doctors table
export async function doctorUpdateEntry(req, response) {}