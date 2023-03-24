import { getPool } from './database.js';
import { CustomError, CustomErrorType } from '../utils/utils.js';
import { v4 as uuidv4 } from 'uuid';

const INSERT_CLIENTE =
    `INSERT INTO clientes(id,nome,email,cpf,telefone,cep,bairro,endereco,complemento,cidade,uf)
                 VALUES (UUID_TO_BIN(?),?,?,?,?,?,?,?,?,?,?)`;

const SELECT_ALL_CLIENTES_OK =
    `SELECT clientes.nome, cobrancas.vencimento, cobrancas.valor
            FROM clientes
            JOIN cobrancas
            ON clientes.id = cobrancas.cliente_id
            WHERE cobrancas.status="paga" OR cobrancas.status="prevista"`;

const SELECT_ALL_CLIENTES_NOT_OK =
`SELECT clientes.nome, clientes.vencimento, cobrancas.valor
        FROM clientes
        JOIN cobrancas
        ON clientes.id = cobrancas.cliente_id
        WHERE cobrancas.status="vencida"`;

export async function retrieveClientesOk() {
    try {
        const [rows] = await getPool().execute(SELECT_ALL_CLIENTES_OK);
        return rows;
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error retrieving clients',
            err);
    }
}

export async function retrieveClientesNotOk() {
    try {
        const [rows] = await getPool().execute(SELECT_ALL_CLIENTES_NOT_OK);
        return rows;
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error retrieving clients',
            err);
    }
}

export async function createCliente(cliente) {
    try {
        cliente.id = uuidv4();
        await getPool().execute(INSERT_CLIENTE,
            [
                cliente.id,
                cliente.nome,
                cliente.email,
                cliente.cpf,
                cliente.telefone,
                cliente.cep,
                cliente.bairro,
                cliente.endereco,
                cliente.complemento,
                cliente.cidade,
                cliente.uf
            ]);
        return cliente;
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error creating client', err);
    }
}

/*const INSERT_CLIENTE =
    `INSERT INTO clientes(id,nome,email,cpf,telefone, cep, bairro, endereco, complemento, cidade, uf)
                 VALUES (UUID_TO_BIN(?),?,?,?,?,?,?,?,?,?,?)`;

const UPDATE_CLIENTE =
    `UPDATE gambler set nome=?,email=?,telefone=?
            WHERE BIN_TO_UUID(id)=?`;

const SELECT_CLIENTE_BY_ID =
    `SELECT BIN_TO_UUID(id) as id,nome,email,cpf,telefone, cep, bairro, endereco, complemento, cidade, uf
            FROM clientes
            WHERE id=UUID_TO_BIN(?)`;

const SELECT_CLIENTE_BY_EMAIL =
    `SELECT BIN_TO_UUID(id) as id,nome,email,cpf,telefone, cep, bairro, endereco, complemento, cidade, uf
            FROM clientes
            WHERE email=?`;



export async function retrieveClienteById(id) {
    try {
        const [rows] = await getPool().execute(SELECT_CLIENTE_BY_ID, [id]);
        return rows[0];
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error retrieving client by id: ' + id,
            err);
    }
}

export async function retrieveClienteByEmail(email) {
    try {
        const [rows] = await getPool().execute(SELECT_CLIENTE_BY_EMAIL, [email]);
        return rows[0];
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error retrieving gambler by email: ' + email,
            err);
    }
}

export async function createCliente(cliente) {
    if (await retrieveClienteByEmail(cliente.email)) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Client email already exists: ' + cliente.email,
            null);
    }
    try {
        cliente.id = uuidv4();
        await getPool().execute(INSERT_CLIENTE,
            [
                cliente.id,
                cliente.nome,
                cliente.email,
                cliente.cpf,
                cliente.telefone,
                cliente.cep,
                cliente.bairro,
                cliente.endereco,
                cliente.complemento,
                cliente.cidade,
                cliente.uf
            ]);
        return cliente;
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error creating client: ' + cliente.email,
            err);
    }
}

export async function updateCliente(cliente) {
    try {
        await getPool().execute(UPDATE_CLIENTE,
            [
                cliente.name,
                cliente.phone,
                cliente.birth_date,
                cliente.id,
            ]);
        return cliente;
    } catch (err) {
        throw new CustomError(CustomErrorType.DatabaseError,
            'Error updating gambler: ' + cliente.id,
            err);
    }
}*/