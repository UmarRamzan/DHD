import axios from 'axios'

let url = `http://localhost:3001/api`

// for all functions the resulting data can be accessed by using .data on the returned object

export async function validateEmail(email) {

    const request = {
        "email": email
    }

    return await axios.post(`${url}/general/validateEmail`, request)
}

export async function removeAccount(accountID) {
    
    const request = {
        "accountID": accountID
    }

    return await axios.post(`${url}/general/removeAccount`, request)
}

// create a new account of account_type with the specified email and password
// returns a json object containing "is_succesful" and "account_ID" / "error_message"
export async function signup(email, password, accountType) {

    const request = {
        "email": email,
        "password": password,
        "accountType": accountType
    }

    return await axios.post(`${url}/general/signup`, request)

}

// login to an existing account with the specified email and password
// return a json object containing "is_succesful" and "account_ID" / "error_message"
export async function login(email, password) {

    const request = {
        "email": email,
        "password": password
    }

    return await axios.post(`${url}/general/login`, request)
}

// add a row containing the specified values into the patient table
// only pass an account_ID that has been returned by the server for this user
// returns a json object containing "is_successful" and any possible "error_message"
export async function patientAddEntry(accountID, firstName, lastName, dateOfBirth, gender) {

    const request = {
        "accountID": accountID,
        "firstName": firstName,
        "lastName": lastName,
        "dateOfBirth": dateOfBirth,
        "gender": gender
    }

    return await axios.post(`${url}/patient/patientAddEntry`, request)
}

// add a row containing the specified values into the doctor table
// only pass an account_ID that has been returned by the server for this user
// returns a json object containing "is_successful" and any possible "error_message"
export async function doctorAddEntry(accountID, firstName, lastName, dateOfBirth, gender, specialization, city, address, timings, personalBio, onlineAvailability, charges) {

    const request = {
        "accountID": accountID,
        "firstName": firstName,
        "lastName": lastName,
        "dateOfBirth": dateOfBirth,
        "gender": gender,
        "specialization": specialization,
        "city": city,
        "address": address,
        "timings": timings,
        "onlineAvailability": onlineAvailability,
        "charges": charges,
        "personalBio": personalBio
    }

    return await axios.post(`${url}/doctor/doctorAddEntry`, request)
}

// add a row containing the specified values into the hospital table
// only pass an account_ID that has been returned by the server for this user
// returns a json object containing "is_successful" and any possible "error_message"
export async function hospitalAddEntry(accountID, name, city, address) {

    const request = {
        "accountID": accountID,
        "name": name,
        "city": city,
        "address": address
    }

    return await axios.post(`${url}/hospital/hospitalAddEntry`, request)
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

export async function patientGetInfo(account_ID) {

    const request = {
        "account_ID": account_ID
    }

    console.log(request)

    return await axios.post(`${url}/patient/patient_get_info`, request)
}

export async function doctorGetInfo(accountID) {

    const request = {
        "accountID": accountID
    }

    return await axios.post(`${url}/doctor/doctorGetInfo`, request)
}

export async function hospitalGetInfo(accountID) {

    const request = {
        "accountID": accountID
    }

    return await axios.post(`${url}/hospital/hospitalGetInfo`, request)
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
export async function createBooking(patientID, doctorID, date, time) {

    const request = {
        "patientID": patientID,
        "doctorID": doctorID,
        "date": date,
        "time": time
    }

    return await axios.post(`${url}/general/createBooking`, request)
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

export async function getBookings(accountID, accountType) {
    const request = {
        "accountID": accountID,
        "accountType": accountType
    }

    return await axios.post(`${url}/general/getBookings`, request)
}

// search for relevant doctors and hospitals using search_string and the specified city
// returns a json object containing two lists: "doctor_list" and "hospital_list"
export async function search(searchString, city) {

    const request = {
        "searchString": searchString,
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


export async function doctorGetReview(accountID) {
    const request = {
        "accountID": accountID,
    }

    return await axios.post(`${url}/doctor/doctorGetReview`, request)
}