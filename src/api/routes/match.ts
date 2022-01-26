import { Router } from 'express';

import MatchController from '../controllers/match';

const router = Router();

router.post('/', MatchController.addMatch);

router.get('/', MatchController.getAllMatches);

router.patch('/:id', MatchController.updatePlayerMatch);


export default router;