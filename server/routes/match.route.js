import express from 'express';
import { createMatch, getMatchDetails, getMatchHistory, startSecondInning } from '../controllers/match.controller.js';

const router = express.Router();


router.get('/', (req, res) => {
    res.send('Match route working');
});


router.get('/matchHistory', getMatchHistory);
router.post('/createMatch', createMatch);
router.get("/:matchId", getMatchDetails);
router.post("/:matchId/startSecondInning", startSecondInning);


export default router;