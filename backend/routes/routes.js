import Router from 'express'

import * as general_controller from '../controllers/general_controller.js'
import * as doctor_controller from '../controllers/doctor_controller.js'

const router = Router()

router.post('/api/general/signup_post', general_controller.signup_post)
router.post('/api/general/login_post', general_controller.login_post)
router.post('/api/doctor/doctor_seed_info', doctor_controller.doctor_seed_info)
router.get('/api/general/search', general_controller.search)

export default router