import Router from 'express'

import * as generalController from '../controllers/generalController.js'
import * as patientController from '../controllers/patientController.js'
import * as doctorController from '../controllers/doctorController.js'
import * as hospitalController from '../controllers/hospitalController.js'

// create the router
const router = Router()

// define the functions to be called when a specific route is requested

// general functions
router.post('/api/general/signup', generalController.signup)
router.post('/api/general/login', generalController.login)
router.post('/api/general/search', generalController.search)
router.post('/api/general/validateEmail', generalController.validateEmail)
router.post('/api/general/updateAccount', generalController.updateAccount)
router.post('/api/general/removeAccount', generalController.removeAccount)
router.post('/api/general/searchSpecialization', generalController.searchSpecialization)
router.post('/api/general/associateDoctorHospital', generalController.associateDoctorHospital)
router.post('/api/general/createBooking', generalController.createBooking)
router.post('/api/general/updateBooking', generalController.updateBooking)
router.post('/api/general/cancelBooking', generalController.cancelBooking)
router.post('/api/general/accountGetInfo', generalController.accountGetInfo)
router.post('/api/general/getBookings', generalController.getBookings)
router.post('/api/general/reviewAddEntry', generalController.reviewAddEntry)

// patient functions
router.post('/api/patient/patientAddEntry', patientController.patientAddEntry)
router.post('/api/patient/removePatient', patientController.removePatient)
router.post('/api/patient/patientGetInfo', patientController.patientGetInfo)
router.post('/api/patient/patientUpdateEntry', patientController.patientUpdateEntry)

// doctor functions
router.post('/api/doctor/doctorAddEntry', doctorController.doctorAddEntry)
router.post('/api/doctor/doctorGetInfo', doctorController.doctorGetInfo)
router.post('/api/doctor/removeDoctor', doctorController.removeDoctor)

// hospital functions
router.post('/api/hospital/hospitalAddEntry', hospitalController.hospitalAddEntry)
router.post('/api/hospital/hospitalGetInfo', hospitalController.hospitalGetInfo)
router.post('/api/hospital/removeHospital', hospitalController.removeHospital)
router.post('/api/hospital/searchHospitalByCity', hospitalController.searchHospitalByCity)

export default router