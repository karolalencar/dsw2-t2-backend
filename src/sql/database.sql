DROP DATABASE dsw2_t2;

CREATE DATABASE dsw2_t2;

USE dsw2_t2;

CREATE TABLE clientes (
    id BINARY(16) NOT NULL,
    nome VARCHAR(256) NOT NULL,
    email VARCHAR(256) NOT NULL,
    cpf VARCHAR(256) NOT NULL,
    telefone VARCHAR(24) NOT NULL,
    cep VARCHAR(256) NOT NULL,
    bairro VARCHAR(256) NOT NULL,
    endereco VARCHAR(256) NOT NULL,
    complemento VARCHAR(256) NOT NULL,
    cidade VARCHAR(256) NOT NULL,
    uf VARCHAR(10) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE cobrancas (
    id BINARY(16) NOT NULL,
    nome VARCHAR(256) NOT NULL,
    descricao VARCHAR(256) NOT NULL,
    vencido TEXT NOT NULL,
    vencimento DATE NOT NULL,
    valor VARCHAR(256) NOT NULL,
    status VARCHAR(24) NOT NULL,
    cliente_id BINARY(16) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(cliente_id)
        REFERENCES clientes(id)
);

