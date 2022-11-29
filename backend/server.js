import express, { json } from 'express'
import { config } from 'dotenv';
import cors from 'cors'

import router from './routes/routes.js'

config({path:".env"});

// create the server
const app = express()

// enable cors to allow for communication between different server
app.use(cors());

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
app.post('/api/general/search', router)
app.post('/api/general/searchSpecialization', router)
app.post('/api/general/associateDoctorHospital', router)
app.post('/api/general/createBooking', router)
app.post('/api/general/updateBooking', router)

app.post('/api/patient/patientAddEntry', router)
app.post('/api/patient/patientUpdateEntry', router)
app.post('/api/patient/patientGetInfo', router)

app.post('/api/doctor/doctorAddEntry', router)
app.post('/api/doctor/doctorGetInfo', router)

app.post('/api/hospital/hospitalAddEntry', router)
app.post('/api/hospital/searchHospitalByCity', router)