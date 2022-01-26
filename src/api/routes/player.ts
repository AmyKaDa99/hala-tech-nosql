import { Router } from 'express';

import PlayerController from '../controllers/player';

const router = Router();

router.post('/', PlayerController.addPlayer);

router.get('/', PlayerController.getAllPlayers);

router.patch('/:id', PlayerController.updatePlayer);




export default router;