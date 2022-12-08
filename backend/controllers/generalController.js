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

export async function updateAccount(req, response) {

    let accountID = req.body.accountID
    let newEmail = req.body.newEmail
    let newPassword = req.body.newPassword

    let connection = validateConnection()

    let updateAccount = `UPDATE Account SET email = ?, password = ? WHERE accountID = ?`
    let values = [newEmail, newPassword, accountID]

    connection.query(updateAccount, values, (err, res) => {

        if (err) {
            let returnMessage = {
                "isSuccessful": false,
                "errorMessage": "Could not update the account"
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

export async function removeAccount(req, response) {

    let accountID = req.body.accountID

    let connection = validateConnection()

    let deleteAccount = `DELETE FROM Account WHERE accountID = ?`
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

    let selectQuery = `SELECT * FROM Account WHERE email = ?`
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
                    "errorMessage": "Email does not exist"
                }

                response.send(returnMessage)
                connection.end()

            } else {
                if (res[0].password != password) {
                    let returnMessage = {
                        "isSuccessful": false,
                        "errorMessage": "Password is incorrect"
                    }
    
                    response.send(returnMessage)
                    connection.end()
                } else {
                    let returnMessage = {
                        "isSuccessful": true,
                        "accountID": res[0].accountID,
                        "accountType": res[0].accountType
                    }
    
                    response.send(returnMessage)
                    connection.end()
                }  
            }
        }
    })

    connection.end()
}

export async function search(req, response) {

    let searchString = req.body.searchString
    let city = req.body.city

    let queryDoctor = `SELECT * FROM Doctor WHERE city = ? AND (firstName LIKE ? OR lastName LIKE ? OR specialization LIKE ?)`
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

export async function accountGetInfo(req, response) {
    let accountID = req.body.accountID

    let getData = `SELECT * FROM Account WHERE accountID = ?`
    let values = [accountID]

    let connection = validateConnection()
    connection.query(getData, [values], (err, res) => {
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
                "accountID": data.accountID,
                "email": data.email,
                "password": data.password,
                "accountType": data.accountType
            }

            response.send(returnMessage)
        }
    })
}

export async function searchSpecialization(req, response) {
    
    let specialization = req.body.specialization

    let search_query = `SELECT * FROM Doctor WHERE Specialization = ?`
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

export async function createBooking(req, response) {

    let patientID = req.body.patientID
    let doctorID = req.body.doctorID
    let date = req.body.date
    let time = req.body.time

    let insertQuery = `INSERT INTO Booking (patientID, doctorID, date, time) VALUES (?)`
    let values = [patientID, doctorID, date, time]

    let connection = validateConnection()
    connection.query(insertQuery, [values], (err, res) => {
        if (err) {
            let returnMessage = {
                "isSuccessful": false,
                "errorMessage": "Could not create booking"
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
}

export async function updateBooking(req, response) {

    console.log(req.body)

    let bookingID = req.body.bookingID
    let patientID = req.body.patientID
    let doctorID = req.body.doctorID
    let date = req.body.date.substring(0,10)
    let time = req.body.time

    let updateQuery = `UPDATE Booking SET patientID = ?, doctorID = ?, date = ?, time = ? WHERE bookingID = ?`
    let values = [patientID, doctorID, date, time, bookingID]

    let connection = validateConnection()
    connection.query(updateQuery, values, (err, res) => {
        if (err) {
            let returnMessage = {
                "isSuccessful": false,
                "errorMessage": "Could not update booking"
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
}

export async function cancelBooking(req, response) {
    let bookingID = req.body.bookingID

    let insertQuery = `DELETE FROM Booking WHERE bookingID = ?`
    let values = [bookingID]

    let connection = validateConnection()
    connection.query(insertQuery, [values], (err, res) => {
        if (err) {
            let returnMessage = {
                "isSuccessful": false,
                "errorMessage": "Could not cancel booking"
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

}

export async function getBookings(req, response) {

    let accountID = req.body.accountID
    let accountType = req.body.accountType

    let findBookings = null
    if (accountType == 'patient') {findBookings = `SELECT * FROM Booking WHERE patientID = ?`}
    else if (accountType == 'doctor') {findBookings = `SELECT * FROM Booking WHERE doctorID = ?`}
    let values = [accountID]

    let connection = validateConnection()
    connection.query(findBookings, [values], (err, res) => {
        if (err) {
            let returnMessage = {
                "isSuccessful": false,
                "errorMessage": "Could not find bookings"
            }

            response.send(returnMessage)
            connection.end()
            
            console.log(err)
        } else {

            console.log(res)

            let returnMessage = {
                "isSuccessful": true,
                "bookings": res
            }

            response.send(returnMessage)
            connection.end()
        }
    })
}

export async function reviewAddEntry(req, response) {

    let patientID = req.body.patientID
    let doctorID = req.body.doctorID
    let rating = req.body.rating
    let reviewText = req.body.reviewText

    let addReview = `INSERT INTO Review (patientID, doctorID, rating, reviewText) VALUES (?)`
    let values = [patientID, doctorID, rating, reviewText]

    let connection = validateConnection()
    connection.query(addReview, [values], (err, res) => {
        if (err) {
            let returnMessage = {
                "isSuccessful": false,
                "errorMessage": "Could not add review"
            }

            response.send(returnMessage)
            connection.end()

            console.log(err)
        } else {

            let returnMessage = {
                "isSuccessful": true,
                "reviewID": res.insertId
            }

            response.send(returnMessage)
            connection.end()
        }
    })
}

export async function getReviews(req, response) {

    let doctorID = req.body.doctorID

    let getReviews = `SELECT * FROM Review WHERE doctorID = ?`
    let values = [doctorID]

    let connection = validateConnection()
    connection.query(getReviews, [values], (err, res) => {
        if (err) {
            let returnMessage = {
                "isSuccessful": false,
                "errorMessage": "Could not get reviews"
            }

            response.send(returnMessage)
            connection.end()

            console.log(err)
        } else {

            let returnMessage = {
                "isSuccessful": true,
                "reviews": res
            }

            response.send(returnMessage)
            connection.end()
        }
    })
}

export async function getRecord(req, response) {

    let patientID = req.body.patientID
    //let rating = req.body.rating

    let query = `SELECT * FROM Review WHERE rating = -1 AND patientID = ?`
    let values = [patientID]

    let connection = validateConnection()
    connection.query(query, [values], (err, res) => {
        if (err) {
            let returnMessage = {
                "isSuccessful": false,
                "errorMessage": "Could not get record"
            }

            response.send(returnMessage)
            connection.end()

            console.log(err)
        } else {

            if (res.length != 0){
                let returnMessage = {
                    "isSuccessful": true,
                    "text": res[0].reviewText,
                    "reviewID": res[0].reviewID
                
            }
            response.send(returnMessage)
            }else{
                let returnMessage = {
                    "isSuccessful": false,
                    "errorMessage": "idk"
                }
            response.send(returnMessage)
            }
            connection.end()
        }
    })
}

export async function getRecords(req, response) {

    let doctorID = req.body.doctorID

    let query = `SELECT * FROM Review WHERE rating = -1 AND doctorID = ?`
    let values = [doctorID]

    let connection = validateConnection()
    connection.query(query, [values], (err, res) => {
        if (err) {
            let returnMessage = {
                "isSuccessful": false,
                "errorMessage": "Could not get records"
            }

            response.send(returnMessage)
            connection.end()

            console.log(err)
        } else {

            if (res.length != 0){
                let returnMessage = {
                    "isSuccessful": true,
                    "records":res
                
            }
            response.send(returnMessage)
            }else{
                let returnMessage = {
                    "isSuccessful": false,
                    "errorMessage": "idk"
                }
            response.send(returnMessage)
            }
            connection.end()
        }
    })
}

export async function removeReview(req, response) {

    let reviewID = req.body.reviewID

    let removeReview = `DELETE FROM Review WHERE reviewID = ?`
    let values = [reviewID]

    let connection = validateConnection()
    connection.query(removeReview, [values], (err, res) => {
        if (err) {
            let returnMessage = {
                "isSuccessful": false,
                "errorMessage": "Could not remove review"
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

export async function doctorHospitalAddEntry(req, response) {

    let doctorID = req.body.doctorID
    let hospitalID = req.body.hospitalID
    let department = req.body.department

    let addEntry = `INSERT INTO DoctorHospital VALUES (?)`
    let values = [doctorID, hospitalID, department]

    let connection = validateConnection()

    connection.query(addEntry, [values], (err, res) => {
        if (err) {
            let return_message = {
                "isSuccessful": false,
                "errorMessage": "Could not add entry"
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
