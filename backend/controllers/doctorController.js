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

    let account_ID = req.body.account_ID

    let select_query = `SELECT * FROM doctor WHERE Account_ID = ?`
    let values = [account_ID]

    let connection = create_connection()
    connection.query(select_query, [values], (err, res) => {
        if (err) {
            console.log(err)
        } else {
            let data = res[0]

            let return_message = {
                "firstName": data.First_Name,
                "lastName": data.Last_Name,
                "specialization": data.Specialization,
                "city": data.City,
                "address": data.Address,
                "timings": data.Timings,
                "personalBio": data.Personal_Bio,
                "onlineAvailability": data.Online_Availability,
                "charges": data.Charges,
            }

            response.send(return_message)
            connection.end()
        }
    })

}

// update an existing entry within the doctors table
export async function doctorUpdateEntry(req, response) {}