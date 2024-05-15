import express from 'express'
import { getPersonalProfile , updatePersonalProfile , setPersonalProfile } from '../controller/personalProfile.js';

const router = express.Router();

router.post('/:id', setPersonalProfile);
router.get('/:id', getPersonalProfile);
router.put('/update/:id', updatePersonalProfile);


export default router