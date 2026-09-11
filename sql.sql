--CREATE DATABASE noorm;

CREATE TABLE usuarios(
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    idade INT,
    email VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS tarefas (
    id_tarefa SERIAL PRIMARY KEY,
    descricao VARCHAR(100) NOT NULL,
    status VARCHAR(100) NOT NULL,
    data_criacao DATE NOT NULL,
    data_conclusao DATE,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);