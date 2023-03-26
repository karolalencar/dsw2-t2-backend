import express from 'express';
import cors from 'cors'; // Just use in development. In production, set policies correctly!

import clienteRouter from './routes/clienteRouter.js';
import cobrancaRouter from './routes/cobrancaRouter.js';

const app = express();

const port = 5000;

app.use(cors()); // Just use in development. In production, set policies correctly!
app.use(express.json());
app.use('/clientes', clienteRouter);
app.use('/cobrancas', cobrancaRouter);

app.listen(port, () => { console.log('Listening on port ' + port); });