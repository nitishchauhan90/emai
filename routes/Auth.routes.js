import express from 'express'
import { register, verifyemail } from '../controllers/Auth.js'

const AuthRoutes = express.Router();

AuthRoutes.post('/register',register)

AuthRoutes.post('/verifyemail',verifyemail)

export default AuthRoutes