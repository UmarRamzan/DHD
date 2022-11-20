import { createConnection } from 'mysql2';
import { config } from 'dotenv';
import first from 'ee-first';

config({path:"../.env"});

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

export async function patient_add_entry(req, response) {

    let account_ID = req.body.account_ID
    let first_name = req.body.first_name
    let last_name = req.body.last_name
    
    let connection = create_connection()

    let seed_query = `INSERT INTO patient (Account_ID, First_Name, Last_Name) VALUES (?)`
    let values = [account_ID, first_name, last_name]

    connection.query(seed_query, [values], (err, res) => {

        if (err) {

            let return_message = {
                "is_successful": false,
                "error_message": "Could not create a new patient entry",
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