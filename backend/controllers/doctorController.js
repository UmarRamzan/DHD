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

// add a new entry into the doctors table
export async function doctorAddEntry(req, response) {

    let account_ID = req.body.account_ID
    let first_name = req.body.first_name
    let last_name = req.body.last_name
    let specialization = req.body.specialization
    let city = req.body.city
    let address = req.body.address
    let timings = req.body.timings
    let online_Availability = req.body.online_Availability
    let charges = req.body.charges
    let personal_bio = req.body.personal_bio
    
    let connection = create_connection()

    let seed_query = `INSERT INTO doctor (Account_ID, First_name, Last_name, Specialization, City, Address, Timings, Personal_bio, Online_Availability, Charges) VALUES (?)`
    let values = [account_ID, first_name, last_name, specialization, city, address, timings, personal_bio, online_Availability, charges]

    connection.query(seed_query, [values], (err, res) => {

        if (err) {
            let return_message = {
                "is_successful": false,
                "error_message": "Could not create a new doctor entry"
            }

            response.send(return_message)
            console.log(err)

        } else {

            let return_message = {
                "is_successful": true,
            }

            response.send(return_message)
        }
    })

    connection.end()
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