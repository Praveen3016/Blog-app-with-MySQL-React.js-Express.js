import express from 'express'
import { register , login , logout , updateUser  , getUser} from '../controller/auth.js';

const router = express.Router();

router.post("/register" ,register);
router.get("/register" ,getUser);
router.post("/login" ,login);
router.post("/logout" ,logout);
router.put("/update/:id" ,updateUser);



 

export default router   