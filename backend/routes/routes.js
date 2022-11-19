import Router from 'express'
import { signup_post, login_post } from '../controllers/general_controller.js'

const router = Router()

router.post('/api/general/signup_post', signup_post)
router.post('/api/general/login_post', login_post)

export default router