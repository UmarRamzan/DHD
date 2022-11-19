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

function query_promise(connection, query) {
    return new Promise((resolve, reject) =>{
        connection.query(query, (err, result) => {
            if (err)
                return reject(err);
            resolve(result);
        });
    });
}

export async function doctor_seed_info(req, response) {

    let account_ID = req.body.account_ID
    let first_name = req.body.first_name
    let last_name = req.body.last_name
    let specialization = req.body.specialization
    let timings = req.body.timings
    let online_Availability = req.body.online_Availability
    let charges = req.body.charges
    let personal_bio = req.body.personal_bio

    let associated_hospitals = req.body.associated_hospitals
    
    let connection = create_connection()

    let seed_query = `INSERT INTO doctor (Account_ID, First_name, Last_name, Specialization, Timings, Online_Availability, Charges, Personal_bio) VALUES (?)`
    let values = [account_ID, first_name, last_name, specialization, timings, online_Availability, charges, personal_bio]

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