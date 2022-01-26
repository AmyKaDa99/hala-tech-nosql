import { Router } from 'express';

import PositionController from '../controllers/position';

const router = Router();

router.post('/', PositionController.addPosition);

router.get('/', PositionController.getAllPositions);

router.patch('/:id', PositionController.updatePosition);




export default router;