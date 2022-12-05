import { createConnection } from 'mysql2';
import { config } from 'dotenv';

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

export async function hospitalAddEntry(req, response) {

    let accountID = req.body.accountID
    let name = req.body.name
    let city = req.body.city
    let address = req.body.address
    
    let connection = validateConnection()

    let seedQuery = `INSERT INTO hospital (accountID, name, city, address) VALUES (?)`
    let values = [accountID, name, city, address]

    connection.query(seedQuery, [values], (err, res) => {

        if (err) {

            let returnMessage = {
                "isSuccessful": false,
                "errorMessage": "Could not create a new hospital entry",
            }

            response.send(returnMessage)
            console.log(err)

        } else {

            let returnMessage = {
                "isSuccessful": true,
            }

            response.send(returnMessage)
        }
    })

    connection.end()
}

export async function hospitalGetInfo(req, response) {

    let accountID = req.body.accountID

    let getInfo = `SELECT * FROM hospital WHERE accountID = ?`
    let values = [accountID]

    let connection = validateConnection()
    connection.query(getInfo, [values], (err, res) => {
        if (err) {
            console.log(err)
        } else {

            let data = res[0]

            let returnMessage = {
                "isSuccessful": true,
                "name": data.name,
                "city": data.city,
                "address": data.address,
            }

            response.send(returnMessage)
            connection.end()
        }
    })
}

export async function searchHospitalByCity(req, response) {

}

export async function removeHospital(req, response) {

    let accountID = req.body.accountID

    let connection = validateConnection()

    let deleteAccount = `DELETE FROM Hospital WHERE accountID = ?`
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