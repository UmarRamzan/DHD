import axios from 'axios'
import { config } from 'dotenv'

config({path:"../backend/.env"})

let url = `http://localhost:${process.env.PORT}/api`

// for all functions the resulting data can be accessed by using .data on the returned object

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
export async function patient_add_entry(account_ID, first_name, last_name) {

    const request = {
        "account_ID": account_ID,
        "first_name": first_name,
        "last_name": last_name
    }

    return await axios.post(`${url}/patient/patient_add_entry`, request)
}

// add a row containing the specified values into the doctor table
// only pass an account_ID that has been returned by the server for this user
// returns a json object containing "is_successful" and any possible "error_message"
export async function doctor_add_entry(account_ID, first_name, last_name, specialization, city, address, timings, personal_bio, online_Availability, charges, associated_hospitals) {

    const request = {
        "account_ID": account_ID,
        "first_name": first_name,
        "last_name": last_name,
        "specialization": specialization,
        "associated_hospitals": associated_hospitals,
        "city": city,
        "address": address,
        "timings": timings,
        "online_Availability": online_Availability,
        "charges": charges,
        "personal_bio": personal_bio
    }

    return await axios.post(`${url}/doctor/doctor_add_entry`, request)
}

// add a row containing the specified values into the hospital table
// only pass an account_ID that has been returned by the server for this user
// returns a json object containing "is_successful" and any possible "error_message"
export async function hospital_add_entry(account_ID, name, city, address) {
    const request = {
        "account_ID": account_ID,
        "name": name,
        "city": city,
        "address": address
    }

    return await axios.post(`${url}/hospital/hospital_add_entry`, request)
}

// search for relevant doctors and hospitals using search_string and the specified city
// returns a json object containing two lists: "doctor_list" and "hospital_list"
export async function search(search_string, city) {

    const request = {
        "search_string": search_string,
        "city": city
    }

    return await axios.post(`${url}/general/search`, request)
}