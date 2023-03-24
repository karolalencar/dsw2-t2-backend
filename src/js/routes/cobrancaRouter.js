import express from 'express';
import { createCobranca, retrieveCobrancasAndClientes } from '../persistence/cobrancaPersistence.js';

const router = express.Router();

router.put('/', async (req, res) => {
    try {
        /*if (req.body.id) {
            const updatedBet = await updateBet(req.body);
            return res.json(updatedBet);
        } else {*/
        const newCobranca = await createCobranca(req.body);
        return res.json(newCobranca);
       /* }*/
    } catch (err) {
        /*if (err.cause?.code === 'ER_NO_REFERENCED_ROW_2') {
            res.status(400).send('Gambler ' + req.body.gambler_id + ' does not exist');
        } else {*/
            console.log(err);
            res.status(500).send('Error creating bet');
        /*}*/
    }
});

// Retrieve a gambler by gambler_id (provided via query param)
router.get('/', async (req, res) => {
    try {
        /*if (req.query.gambler_id) {
            const bets = await retrieveBetsByGamblerId(req.query.gambler_id);
            return res.json(bets);
        } else {*/
            const allCobrancas = await retrieveCobrancasAndClientes();
            return res.json(allCobrancas);
        /*}*/
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving charges');
    }
});


export default router;