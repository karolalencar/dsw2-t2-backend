import express from 'express';
import { createCobranca, retrieveCobrancasAndClientes, retrievePaidCobrancasAndClientes, retrieveExpectedCobrancasAndClientes, retrieveOverdueCobrancasAndClientes, retrievePaidCharges, retrieveExpectedCharges, retrieveOverdueCharges } from '../persistence/cobrancaPersistence.js';

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

router.get('/pagas', async (req, res) => {
    try {
            const allPaidCobrancas = await retrievePaidCobrancasAndClientes();
            return res.json(allPaidCobrancas);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving charges');
    }
});

router.get('/previstas', async (req, res) => {
    try {
        /*if (req.query.gambler_id) {
            const bets = await retrieveBetsByGamblerId(req.query.gambler_id);
            return res.json(bets);
        } else {*/
            const allExpectedCobrancas = await retrieveExpectedCobrancasAndClientes();
            return res.json(allExpectedCobrancas);
        /*}*/
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving charges');
    }
});

router.get('/vencidas', async (req, res) => {
    try {
        /*if (req.query.gambler_id) {
            const bets = await retrieveBetsByGamblerId(req.query.gambler_id);
            return res.json(bets);
        } else {*/
            const allOverdueCobrancas = await retrieveOverdueCobrancasAndClientes();
            return res.json(allOverdueCobrancas);
        /*}*/
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving charges');
    }
});




export default router;