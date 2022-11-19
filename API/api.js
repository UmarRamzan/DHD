import axios from 'axios'
import { config } from 'dotenv'

config({path:"../backend/.env"})

let url = `http://localhost:${process.env.PORT}/api`

// create a new account of account_type with the specified email and password
// returns a json object containing "is_succesful" and "account_ID" / "error_message"
export async function signup_post(account_type, email, password) {

    const request = {
        "account_type": account_type,
        "email": email,
        "password": password
    }

    return await axios.post(`${url}/general/signup_post`, request)
}

// login to an existing account with the specified email and password
// return a json object containing "is_succesful" and "account_ID" / "error_message"
export async function login_post(email, password) {

    const request = {
        "email": email,
        "password": password
    }

    return await axios.post(`${url}/general/login_post`, request)
}

// add a row containing the specified values into the patient table
// only pass an account_ID that has been returned by the server for this user
// returns a json object containing "is_successful" and any possible "error_message"
export async function patient_seed_info(account_ID, first_name, last_name) {

    const request = {
        "account_ID": account_ID,
        "first_name": first_name,
        "last_name": last_name
    }

    return await axios.post(`${url}/patient/patient_seed_info`, request)
}

// add a row containing the specified values into the doctor table
// only pass an account_ID that has been returned by the server for this user
// returns a json object containing "is_successful" and any possible "error_message"
export async function doctor_seed_info(account_ID, first_name, last_name, specialization, associated_hospitals, timings, online_Availability, charges, personal_bio) {

    const request = {
        "account_ID": account_ID,
        "first_name": first_name,
        "last_name": last_name,
        "specialization": specialization,
        "associated_hospitals": associated_hospitals,
        "timings": timings,
        "online_Availability": online_Availability,
        "charges": charges,
        "personal_bio": personal_bio
    }

    return await axios.post(`${url}/doctor/doctor_seed_info`, request)
}

// add a row containing the specified values into the hospital table
// only pass an account_ID that has been returned by the server for this user
// returns a json object containing "is_successful" and any possible "error_message"
export async function hospital_seed_info(account_ID, name, city, address) {
    const request = {
        "account_ID": account_ID,
        "name": name,
        "city": city,
        "address": address
    }

    return await axios.post(`${url}/hospital/hospital_seed_info`, request)
}

// search for relevant doctors and hospitals using search_string and the specified city
// returns a json object containing a list of relevant results
export async function search(search_string, city) {

    const request = {
        "search_string": search_string,
        "city": city
    }

    return await axios.get(`${url}/general/search`, request)
}

doctor_seed_info(1, "first", "last", "spec", "hosp", "1-2", 1, "300", "bio")