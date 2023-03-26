import express from 'express';
import { createCliente, retrieveClientesOk, retrieveClientesNotOk } from '../persistence/clientePersistence.js';

const router = express.Router();

router.put('/', async (req, res) => {
    try {
        /*if (req.body.id) {
            const updatedCliente = await updateCliente(req.body);
            return res.json(updatedCliente);

        } else {*/
            const newCliente = await createCliente(req.body);
            return res.json(newCliente);
        /*}*/
    } catch (err) {
        console.log(err);
        res.status(500).send('Error creating/updating client');
    }
});

router.get('/', async (req, res) => {
    try {
        const clientes = await retrieveClientesOk();
        /*if (clientes) {*/
            return res.json(clientes);
        /*} else {
            res.status(404).send('Client does not exist');
        }*/
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving client');
    }
})

router.get('/ok', async (req, res) => {
    try {
        const clientesOk = await retrieveClientesOk();
        /*if (clientes) {*/
            return res.json(clientesOk);
        /*} else {
            res.status(404).send('Client does not exist');
        }*/
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving client');
    }
})

router.get('/not_ok', async (req, res) => {
    try {
        const clientesNotOk = await retrieveClientesNotOk();
        /*if (clientes) {*/
            return res.json(clientesNotOk);
        /*} else {
            res.status(404).send('Client does not exist');
        }*/
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving client');
    }
})

export default router;