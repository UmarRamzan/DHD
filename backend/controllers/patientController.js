import { createConnection } from 'mysql2';
import { config } from 'dotenv';
import first from 'ee-first';

config({path:".env"});

// Create a connection to the sql server
function create_connection() {

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

export async function patientAddEntry(req, response) {

    let accountID = req.body.accountID
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let dateOfBirth = req.body.dateOfBirth
    let gender = req.body.gender
    
    let connection = create_connection()

    let seedQuery = `INSERT INTO patient VALUES (?)`
    let values = [accountID, firstName, lastName, dateOfBirth, gender]

    connection.query(seedQuery, [values], (err, res) => {

        if (err) {

            let returnMessage = {
                "isSuccessful": false,
                "errorMessage": "Could not create a new patient entry",
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

export async function patientUpdateEntry(req, response) {
    let patient_ID = req.body.patient_ID
    let column_name = req.body.column_name
    let new_value = req.body.new_value

    let update_query = `UPDATE patient SET ? = ? WHERE Patient_ID = ?`
    let values = [column_name, new_value, patient_ID]

    let connection = create_connection()
    connection.query(update_query, [values], (err, res) => {
        if (err) {
            console.log(err)
        } else {
            console.log(res)
        }
    })

    connection.end()
}

export async function patientGetInfo(req, response) {
    let accountID = req.body.accountID

    let findPatient = `SELECT * FROM Patient WHERE accountID = ?`
    let values = [accountID]

    let connection = create_connection()
    connection.query(findPatient, [values], (err, res) => {
        if (err) {
            let returnMessage = {
                "isSuccessful": false,
                "errorMessage": "Could not process information request"
            }

            response.send(returnMessage)
            console.log(err)
        } else {

            let data = res[0]

            let returnMessage = {
                "isSuccessful": true,
                "firstName": data.firstName,
                "lastName": data.lastName,
                "dateOfBirth": data.dateOfBirth,
                "gender": data.gender
            }

            response.send(returnMessage)
        }
    })

}