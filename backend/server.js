import express, { json } from 'express'
import { config } from 'dotenv';
import router from './routes/routes.js'

config({path:".env"});

const app = express()

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})

// convert any json data within the request into a javascript object
app.use(json())

// print any requests made to the server
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.post('/api/general/signup_post', router)
app.post('/api/general/login_post', router)