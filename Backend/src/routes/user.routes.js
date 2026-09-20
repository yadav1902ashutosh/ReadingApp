import {Router} from 'express';
import {loginUser, registerUser, logoutUser, getCurrentUser} from "../controllers/user.controller.js"
import { verifyJWT } from '../middlewares/auth.middleware.js';


const router = Router()

//setting routs for register users
router.route("/register").post(registerUser)

//setting routes for login users
router.route("/login").post(loginUser)

//setting secured routes using middleware services
router.route("/logout").post(verifyJWT, logoutUser)

router.route("/current-user").get(verifyJWT, getCurrentUser)



export default router