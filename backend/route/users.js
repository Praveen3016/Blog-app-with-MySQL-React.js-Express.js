import express from 'express'

const router = express.Router();

router.get("/test" ,(req , res) =>{
    res.json("hello user");
})
 

export default router