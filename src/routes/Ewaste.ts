import express from 'express';
import controller from '../controllers/Ewaste';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.ewaste.create), controller.createEwaste);
router.get('/get/:ewasteId', controller.readEwaste);
router.get('/get/', controller.readAll);
router.patch('/update/:ewasteId', ValidateSchema(Schemas.ewaste.create), controller.updateEwaste);
router.delete('/delete/:ewasteId', controller.deleteEwaste);

export default router;