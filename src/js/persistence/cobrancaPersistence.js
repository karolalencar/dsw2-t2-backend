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

const SELECT_PAID_COBRANCAS_AND_CLIENTES =
`SELECT BIN_TO_UUID(cobrancas.id) as cobranca_id, cobrancas.valor as valor_cobranca, clientes.nome as nome_cliente
            FROM cobrancas
            INNER JOIN clientes
            ON cobrancas.cliente_id = clientes.id
            WHERE cobrancas.status = 'paga';`

const SELECT_EXPECTED_COBRANCAS_AND_CLIENTES =
`SELECT BIN_TO_UUID(cobrancas.id) as cobranca_id, cobrancas.valor as valor_cobranca, clientes.nome as nome_cliente
            FROM cobrancas
            INNER JOIN clientes
            ON cobrancas.cliente_id = clientes.id
            WHERE cobrancas.status = 'prevista';`

const SELECT_OVERDUE_COBRANCAS_AND_CLIENTES =
`SELECT BIN_TO_UUID(cobrancas.id) as cobranca_id, cobrancas.valor as valor_cobranca, clientes.nome as nome_cliente
            FROM cobrancas
            INNER JOIN clientes
            ON cobrancas.cliente_id = clientes.id
            WHERE cobrancas.status = 'vencida';`

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
            'Error creating charge', err);
    }
}

export async function retrieveCobrancasAndClientes() {
    try {
        const [rows] = await getPool().execute(SELECT_COBRANCAS_AND_CLIENTES);
        return rows;
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error retrieving charge: ', err);
    }
}

export async function retrievePaidCobrancasAndClientes() {
    try {
        const [rows] = await getPool().execute(SELECT_PAID_COBRANCAS_AND_CLIENTES);
        return rows;
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error retrieving charge: ', err);
    }
}

export async function retrieveExpectedCobrancasAndClientes() {
    try {
        const [rows] = await getPool().execute(SELECT_EXPECTED_COBRANCAS_AND_CLIENTES);
        return rows;
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error retrieving charge: ', err);
    }
}

export async function retrieveOverdueCobrancasAndClientes() {
    try {
        const [rows] = await getPool().execute(SELECT_OVERDUE_COBRANCAS_AND_CLIENTES);
        return rows;
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error retrieving charge: ', err);
    }
}


