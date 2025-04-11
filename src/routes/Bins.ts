import express from 'express';
import controller from '../controllers/Bins';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.bins.create), controller.createBins);
router.get('/get/:binId', controller.readBins);
router.get('/get/', controller.readAll);
router.patch('/update/:binId', ValidateSchema(Schemas.bins.create), controller.updateBins);
router.delete('/delete/:binId', controller.deleteBins);

export default router;