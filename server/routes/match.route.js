import express from 'express';
import { createMatch, getMatchDetails, getMatchHistory, scoreUpdate, startSecondInning } from '../controllers/match.controller.js';
import { editName } from '../controllers/crudOperation.controller.js';

const router = express.Router();


router.get('/', (req, res) => {
    res.send('Match route working');
});


router.get('/matchHistory', getMatchHistory);
router.post('/createMatch', createMatch);
router.get("/:matchId", getMatchDetails);
router.post("/:matchId/startSecondInning", startSecondInning);
router.patch("/:matchId/scoreUpdate", scoreUpdate);
router.patch("/editName", editName);


export default router;