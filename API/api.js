import axios from 'axios'
import { config } from 'dotenv'

config({path:"../backend/.env"})

let url = `http://localhost:${process.env.PORT}/api`

// returns a json object containing "is_succesful" and "account_ID"
export async function signup_post(account_type, email, password) {

    const request = {
        "account_type": account_type,
        "email": email,
        "password": password
    }

    return await axios.post(`${url}/general/signup_post`, request)
}

// return a json object containing "is_succesful" and "account_ID"
export async function login_post(email, password) {

    const request = {
        "email": email,
        "password": password
    }

    return await axios.post(`${url}/general/login_post`, request)
}

signup_post("Doctor", "abc", "pass")