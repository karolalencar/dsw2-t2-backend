import { getPool } from './database.js';
import { CustomError, CustomErrorType } from '../utils/utils.js';
import { v4 as uuidv4 } from 'uuid';

const INSERT_COBRANCA =
    `INSERT INTO cobrancas(id,nome,descricao,vencimento,valor,status,cliente_id)
                 VALUES (UUID_TO_BIN(?),?,?,?,?,?,UUID_TO_BIN(?))`;

const SELECT_COBRANCAS_AND_CLIENTES =
    `SELECT BIN_TO_UUID(cobrancas.id) as cobranca_id, cobrancas.valor as valor_cobranca, clientes.nome as nome_cliente
                FROM cobrancas
                INNER JOIN clientes
                ON cobrancas.cliente_id = clientes.id;`

export async function retrieveCobrancasAndClientes() {
    try {
        const [rows] = await getPool().execute(SELECT_COBRANCAS_AND_CLIENTES);
        return rows;
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error creating bet: ' + cobrancas.id,
                err);
    }
}

export async function createCobranca(cobranca) {
    try {
        await getPool().execute(INSERT_COBRANCA,
            [
                uuidv4(),
                cobranca.nome,
                cobranca.descricao,
                cobranca.vencimento,
                cobranca.valor,
                cobranca.status,
                cobranca.cliente_id
            ]);
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error creating bet for gambler', err);
    }
}

/*const INSERT_COBRANCA =
    `INSERT INTO cobrancas(id,nome,descricao,vencimento,valor,status,cliente_id)
                 VALUES (UUID_TO_BIN(?),?,?,?,?,?,UUID_TO_BIN(?))`;

const UPDATE_COBRANCA =
    `UPDATE cobrancas set valor=?, status=?
            WHERE BIN_TO_UUID(id)=?`;

const SELECT_COBRANCA_BY_CLIENT_ID =
    `SELECT BIN_TO_UUID(id) as id, champion, runner_up, DATE_FORMAT(bet_date,'%Y-%m-%d') as bet_date
            FROM bet
            WHERE gambler_id=UUID_TO_BIN(?)`;

export async function createCobranca(cobranca) {
    try {
        await getPool().execute(INSERT_COBRANCA,
            [
                uuidv4(),
                cobranca.nome,
                cobranca.descricao,
                cobranca.vencimento,
                cobranca.valor,
                cobranca.status
            ]);
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error creating bet for gambler: ' + cobranca.client_id,
            err);
    }
}

export async function updateCobranca(cobranca) {
    try {
        await getPool().execute(UPDATE_COBRANCA,
            [
                cobranca.valor,
                bet.runner_up,
                bet.bet_date,
                bet.id
            ]);
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error updating bet: ' + bet.id,
            err);
    }
}

export async function retrieveBetsByGamblerId(gambler_id) {
    try {
        const [rows] = await getPool().execute(SELECT_BETS_BY_GAMBLER_ID, [gambler_id]);
        return rows;
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error retrieving bet by gambler id: ' + gambler_id,
            err);
    }
}*/

