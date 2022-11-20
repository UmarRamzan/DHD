import express, { json } from 'express'
import { config } from 'dotenv';
import router from './routes/routes.js'

config({path:".env"});

// create the server
const app = express()

// listen for any requests made to the server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})

// parse incoming JSON requests and place parsed data within req.body
app.use(json())

// print any requests made to the server
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// route requests to the server using the router specified in routes/routes.js
app.post('/api/general/signup_post', router)
app.post('/api/general/login_post', router)
app.post('/api/general/search', router)
app.post('/api/general/search_specialization', router)
app.post('/api/general/associate_doctor_hospital', router)
app.post('/api/general/create_booking', router)

app.post('/api/patient/patient_add_entry', router)
app.post('/api/doctor/doctor_add_entry', router)
app.post('/api/hospital/hospital_add_entry', router)