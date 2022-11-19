import { createConnection } from 'mysql2';
import { config } from 'dotenv';

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

export async function signup_post(req, response) {

    let email = req.body.email
    let password = req.body.password
    let account_type = req.body.account_type

    let connection = create_connection()

    let create_account = `INSERT INTO account (Account_Type, Email, Password) VALUES ("${account_type}", "${email}", "${password}")`

    connection.query(create_account, (err, res) => {
        if (err) {
            console.log(err)
            console.log("Account Creation Failed")
        } else {
            let account_ID = res.insertId

            let return_message = {
                "is_successful": true,
                "account_ID": account_ID
            }

            response.send(return_message)
        }
    })

    connection.end()
}

export async function login_post(req, response) {
    console.log("Login")
}

export async function search(req, response) {

    let search_string = req.body.search_string
    let city = req.body.city

    console.log(search_string)

    let search_query = `SELECT * FROM doctor WHERE City = ? AND (First_Name = ? OR Last_Name = ? OR Specialization = ?) `
    let values = [city, search_string, search_string, search_string]

    let connection = create_connection()

    connection.query(search_query, values, (err, res) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Result")
            console.log(res)

            let return_message = {
                "doctor_list": res
            }

            response.send(return_message)
        }
    })
}