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

    let query_doctor = `SELECT * FROM doctor WHERE City = ? AND (First_Name = ? OR Last_Name = ? OR Specialization = ?) `
    let values_doctor = [city, search_string, search_string, search_string]

    let query_hospital = `SELECT * FROM hospital WHERE City = ? AND Name = ?`
    let values_hospital = [city, search_string]

    let connection = create_connection()

    connection.query(query_doctor, values_doctor, (err, res) => {
        if (err) {
            console.log(err)

        } else {
            let doctor_list = res
            connection.query(query_hospital, values_hospital, (err, res) => {
                if (err) {
                    console.log(err)
        
                } else {
                    let hospital_list = res

                    let return_message = {
                        "doctor_list": doctor_list,
                        "hospital_list": hospital_list
                    }
                
                    response.send(return_message)
                }
            })
        }
    })
}

export async function associate_doctor_hospital(req, response) {

    let doctor_ID = req.body.doctor_ID
    let hospital_ID = req.body.hospital_ID

    let insert_query = `INSERT INTO doctor_hospital VALUES (?)`
    let values = [doctor_ID, hospital_ID]

    let connection = create_connection()

    connection.query(insert_query, [values], (err, res) => {
        if (err) {
            let return_message = {
                "is_successful": false
            }

            response.send(return_message)
            console.log(err)
            
        } else {
            let return_message = {
                "is_successful": true
            }

            response.send(return_message)
        }
    })

    connection.end()
}

export async function create_booking(req, response) {

    let patient_ID = req.body.patient_ID
    let doctor_ID = req.body.doctor_ID
    let year = req.body.year
    let month = req.body.month
    let day = req.body.day
    let hour = req.body.hour

    let insert_query = `INSERT INTO booking (Patient_ID, Doctor_ID, Year, Month, Day, Hour) VALUES (?)`
    let values = [patient_ID, doctor_ID, year, month, day, hour]

    let connection = create_connection()
    connection.query(insert_query, [values], (err, res) => {
        if (err) {
            let return_message = {
                "is_successful": false
            }

            response.send(return_message)
            console.log(err)
        } else {

            let return_message = {
                "is_successful": true
            }

            response.send(return_message)
        }
    })
}