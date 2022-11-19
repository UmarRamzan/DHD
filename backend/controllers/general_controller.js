import { createConnection } from 'mysql2';
import { config } from 'dotenv';
import { query } from 'express';

config({path:"../.env"});

// Create a connection to the sql server
function create_connection() {

    let connection = createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
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

async function signup_post(req, response) {

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
}

function login_post(req, res) {
    console.log("Login")
}

export {
    signup_post,
    login_post
}