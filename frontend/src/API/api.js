import axios from 'axios'

let url = `http://localhost:3000/api`

// for all functions the resulting data can be accessed by using .data on the returned object

// create a new account of account_type with the specified email and password
// returns a json object containing "is_succesful" and "account_ID" / "error_message"
export async function signup_post(email, password, account_type) {

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

// update column_name to new_value for patient_ID in the patient table
// returns a json object containing "is_successful" and any possible "error_message"
export async function patient_update_entry(patient_ID, column_name, new_value) {

    const request = {
        "patient_ID": patient_ID,
        "column_name": column_name,
        "new_value": new_value
    }

    return await axios.post(`${url}/patient/patient_update_entry`, request)
}

// add a row containing the specified values into the doctor table
// only pass an account_ID that has been returned by the server for this user
// returns a json object containing "is_successful" and any possible "error_message"
export async function doctor_add_entry(account_ID, first_name, last_name, specialization, city, address, timings, personal_bio, online_Availability, charges) {

    const request = {
        "account_ID": account_ID,
        "first_name": first_name,
        "last_name": last_name,
        "specialization": specialization,
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

// associate the specified doctor and hospital by adding an entry to the doctor_hospital table
// returns a json object containing "is_successful" and any possible "error_message"
export async function associate_doctor_hospital(doctor_ID, hospital_ID) {

    const request = {
        "doctor_ID": doctor_ID,
        "hospital_ID": hospital_ID
    }

    return await axios.post(`${url}/general/associate_doctor_hospital`, request)
}

// create a new booking for the specified patient and doctor at the specified time
// returns a json object containing "is_successful" and any possible "error_message"
export async function create_booking(patient_ID, doctor_ID, year, month, day, hour) {

    const request = {
        "patient_ID": patient_ID,
        "doctor_ID": doctor_ID,
        "year": year,
        "month": month,
        "day": day,
        "hour": hour
    }

    return await axios.post(`${url}/general/create_booking`, request)
}

// reschedule the booking with booking_ID to the new time parameters
// returns a json object containing "is_successful" and any possible "error_message"
export async function update_booking(booking_ID, new_year, new_month, new_day, new_hour) {

    const request = {
        "booking_ID": booking_ID,
        "new_year": new_year,
        "new_month": new_month,
        "new_day": new_day,
        "new_hour": new_hour
    }

    return await axios.post(`${url}/general/update_booking`, request)
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

// find all doctors specializing in a particular field
// returns a json object containing a list of doctors
export async function search_specialization(specialization) {

    const request = {
        "specialization": specialization,
    }

    return await axios.post(`${url}/general/search_specialization`, request)
}

// final all hospitals within a certain city
// returns a json object containing a list of hospitals
export async function search_hospitals_by_city(city) {
    const request = {
        "city": city,
    }

    return await axios.post(`${url}/general/search_hospital_by_city`, request)
}

signup_post("patient", "email", "123")