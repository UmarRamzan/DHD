import Router from 'express'
import { signup_post, login_post, search } from '../controllers/general_controller.js'

const router = Router()

router.post('/api/general/signup_post', signup_post)
router.post('/api/general/login_post', login_post)
router.get('/api/general/search', search)

export default router