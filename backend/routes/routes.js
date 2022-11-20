import Router from 'express'

import * as general_controller from '../controllers/general_controller.js'
import * as patient_controller from '../controllers/patient_controller.js'
import * as doctor_controller from '../controllers/doctor_controller.js'
import * as hospital_controller from '../controllers/hospital_controller.js'

// create the router
const router = Router()

// define the functions to be called when a specific route is requested

router.post('/api/general/signup_post', general_controller.signup_post)
router.post('/api/general/login_post', general_controller.login_post)
router.post('/api/general/search', general_controller.search)
router.post('/api/general/search_specialization', general_controller.search_specialization)
router.post('/api/general/associate_doctor_hospital', general_controller.associate_doctor_hospital)
router.post('/api/general/create_booking', general_controller.create_booking)
router.post('/api/general/update_booking', general_controller.create_booking)

router.post('/api/patient/patient_add_entry', patient_controller.patient_add_entry)
router.post('/api/patient/patient_update_entry', patient_controller.patient_update_entry)

router.post('/api/doctor/doctor_add_entry', doctor_controller.doctor_add_entry)

router.post('/api/hospital/hospital_add_entry', hospital_controller.hospital_add_entry)

export default router