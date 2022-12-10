import express, { json } from 'express'
import { config } from 'dotenv';
import cors from 'cors'

import router from './routes/routes.js'

config({path:".env"});

// create the server
const app = express()

// enable cors to allow for communication between different server
//app.use(cors());
//app.use(cors({origin: 'https://dhd-seven.vercel.app/'}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*')
    next();
});

// parse incoming JSON requests and place parsed data within req.body
app.use(json())

// listen for any requests made to the server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})

// print any requests made to the server
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// route requests to the server using the router specified in routes/routes.js
app.post('/api/general/signup', router)
app.post('/api/general/login', router)
app.post('/api/general/validateEmail', router)
app.post('/api/general/updateAccount', router)
app.post('/api/general/removeAccount', router)
app.post('/api/general/search', router)
app.post('/api/general/accountGetInfo', router)
app.post('/api/general/searchSpecialization', router)

app.post('/api/general/reviewAddEntry', router)
app.post('/api/general/getReviews', router)
app.post('/api/general/removeReview', router)
app.post('/api/general/getRecord', router)
app.post('/api/general/getRecords', router)

app.post('/api/general/createBooking', router)
app.post('/api/general/validateBooking', router)
app.post('/api/general/updateBooking', router)
app.post('/api/general/cancelBooking', router)
app.post('/api/general/getBookings', router)

app.post('/api/general/doctorHospitalAddEntry', router)
app.post('/api/general/getDoctorHospital', router)
app.post('/api/general/getDoctorHospitalDoctor', router)
app.post('/api/general/getDepartments', router)
app.post('/api/general/removeDoctorHospital', router)

app.post('/api/patient/patientAddEntry', router)
app.post('/api/patient/patientUpdateEntry', router)
app.post('/api/patient/patientGetInfo', router)
app.post('/api/patient/getPatientName', router)
app.post('/api/patient/removePatient', router)

app.post('/api/doctor/doctorAddEntry', router)
app.post('/api/doctor/doctorUpdateEntry', router)
app.post('/api/doctor/doctorGetInfo', router)
app.post('/api/doctor/getDoctorName', router)
app.post('/api/doctor/removeDoctor', router)

app.post('/api/hospital/hospitalAddEntry', router)
app.post('/api/hospital/hospitalUpdateEntry', router)
app.post('/api/hospital/hospitalGetInfo', router)
app.post('/api/hospital/removeHospital', router)
app.post('/api/hospital/getHospitalName', router)
app.post('/api/hospital/searchHospitalByCity', router)