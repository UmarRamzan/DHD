import { createConnection } from 'mysql2';
import { config } from 'dotenv';
import sha1 from 'sha1';

config({path:".env"});

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

export async function validateEmail(req, response) {

    let email = req.body.email

    let connection = validateConnection()

    let emailValidation = `SELECT * FROM Account WHERE email = ?`
    let values = [email]

    connection.query(emailValidation, values, (err, res) => {

        if (err) {
            let returnMessage = {
                "isSuccessful": false,
                "errorMessage": "Could not process validation request"
            }
            response.send(returnMessage)
            connection.end()

        } else {
            if (res.length != 0) {
                let returnMessage = {
                    "isSuccessful": false,
                    "errorMessage": "Email already exists"
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
        }
    })
}

export async function signup(req, response) {

    let email = req.body.email
    let password = sha1(req.body.password)
    let accountType = req.body.accountType

    let connection = validateConnection()

    let emailValidation = `SELECT * FROM Account WHERE email = ?`
    let values = [email]

    connection.query(emailValidation, values, (err, res) => {

        if (err) {
            let returnMessage = {
                "isSuccessful": false,
                "errorMessage": "Could not process signup request"
            }
            response.send(returnMessage)
            connection.end()

        } else {
            if (res.length != 0) {
                let returnMessage = {
                    "isSuccessful": false,
                    "errorMessage": "Email already exists"
                }
                response.send(returnMessage)
                connection.end()

            } else {
                let insertQuery = `INSERT INTO Account (accountType, email, password) VALUES (?)`
                let values = [accountType, email, password]
            
                connection.query(insertQuery, [values], (err, res) => {
            
                    if (err) {
                        let returnMessage = {
                            "isSuccessful": false,
                            "errorMessage": "Could not process signup request"
                        }
                        response.send(returnMessage)
                        connection.end()
            
                        console.log(err)
                        
                    } else {
                        let accountID = res.insertId
            
                        let returnMessage = {
                            "isSuccessful": true,
                            "accountID": accountID
                        }
                        response.send(returnMessage)
                        connection.end()
                    }
                })

            }
        }
    })
}

export async function login(req, response) {

    let email = req.body.email
    let password = sha1(req.body.password)

    let connection = validateConnection()

    let selectQuery = `SELECT * FROM Account WHERE email = ? AND password = ?`
    let values = [email, password]

    connection.query(selectQuery, values, (err, res) => {

        if (err) {
            let returnMessage = {
                "isSuccessful": false,
                "errorMessage": "Could not process login request"
            }
            response.send(returnMessage)

            console.log(err)

        } else {

            if (res.length == 0){
                let returnMessage = {
                    "isSuccessful": false,
                    "errorMessage": "Email or Password is incorrect"
                }

                response.send(returnMessage)
                connection.end()

            } else {
                let returnMessage = {
                    "isSuccessful": true,
                    "accountID": res[0].AccountID
                }
                console.log(res)
                response.send(returnMessage)
            }
        }
    })

    connection.end()
}

export async function search(req, response) {

    let searchString = req.body.searchString
    let city = req.body.city

    let queryDoctor = `SELECT * FROM Doctor WHERE city = ? AND (firstName LIKE ? OR lastName LIKE ? OR specialization LIKE ?) `
    let valuesDoctor = [city, `${searchString}%`, `${searchString}%`, `${searchString}%`]

    let queryHospital = `SELECT * FROM Hospital WHERE city = ? AND name LIKE ?`
    let valuesHospital = [city, `${searchString}%`]

    let connection = validateConnection()

    connection.query(queryDoctor, valuesDoctor, (err, res) => {
        if (err) {
            console.log(err)

        } else {
            let doctorList = res
            connection.query(queryHospital, valuesHospital, (err, res) => {
                
                if (err) {
                    console.log(err)
        
                } else {
                    let hospitalList = res

                    let returnMessage = {
                        "doctorList": doctorList,
                        "hospitalList": hospitalList
                    }
                    
                    response.send(returnMessage)
                    connection.end()
                }
            })
        }
    })

}

export async function searchSpecialization(req, response) {
    
    let specialization = req.body.specialization

    let search_query = `SELECT * FROM doctor WHERE Specialization = ?`
    let values = [specialization]

    let connection = validateConnection()

    connection.query(search_query, [values], (err, res) => {
        if (err) {
            console.log(err)
        } else {
            let doctor_list = res

            let return_message = {
                "doctor_list": doctor_list,
            }
        
            response.send(return_message)
        }
    })

    connection.end()
}

export async function associateDoctorHospital(req, response) {

    let doctor_ID = req.body.doctor_ID
    let hospital_ID = req.body.hospital_ID

    let insert_query = `INSERT INTO doctor_hospital VALUES (?)`
    let values = [doctor_ID, hospital_ID]

    let connection = validateConnection()

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

export async function createBooking(req, response) {

    let patientID = req.body.patientID
    let doctorID = req.body.doctorID
    let bookingDate = req.body.bookingDate
    let bookingTime = req.body.bookingTime

    let insertQuery = `INSERT INTO Booking (patientID, doctorID, bookingDate, bookingTime) VALUES (?)`
    let values = [patientID, doctorID, bookingDate, bookingTime]

    let connection = validateConnection()
    connection.query(insertQuery, [values], (err, res) => {
        if (err) {
            let returnMessage = {
                "isSuccessful": false
            }

            response.send(returnMessage)
            console.log(err)
        } else {

            let returnMessage = {
                "isSuccessful": true
            }

            response.send(returnMessage)
        }
    })
    connection.end()
}

export async function updateBooking(req, response) {}