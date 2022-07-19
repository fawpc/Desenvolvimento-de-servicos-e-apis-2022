const express = require('express');
const rotas = express.Router();
const bibliotecaController = require('../controller/bibliotecaController');
//const { buscarPorUsername } = require('../repository/bibliotecaRepository');

rotas.get('/livros', bibliotecaController.listarLivros)
rotas.get('/autores', bibliotecaController.listarAutores)
rotas.get('/clientes', bibliotecaController.listarClientes)
rotas.get('/aluguel', bibliotecaController.listarAluguel)
rotas.get('/atrasados', bibliotecaController.listarAtrasados)
rotas.post('/inserir/livros', bibliotecaController.inserirLivros)
rotas.post('/inserir/autores', bibliotecaController.inserirAutores)
rotas.post('/inserir/clientes', bibliotecaController.inserirClientes)
rotas.post('/inserir/aluguel', bibliotecaController.inserirAluguel)
rotas.get('/busca/titulo', bibliotecaController.buscarPorTitulo)
rotas.get('/busca/autor', bibliotecaController.buscarPorNomeAutor)
rotas.get('/busca/pais', bibliotecaController.buscarPorPais)
rotas.get('/busca/cliente', bibliotecaController.buscarPorNomeCliente)
rotas.get('busca/:id_aluguel', bibliotecaController.buscarPorIdAluguel)
rotas.get('/busca/cli-aluguel', bibliotecaController.buscarPorNomeClienteAluguel)
rotas.get('/busca/cli-atrasado', bibliotecaController.buscarPorAluguelAtrasado)
rotas.put('/atualizar/livro/:isbn', bibliotecaController.atualizarLivros)
rotas.put('/atualizar/autor/:id_autor', bibliotecaController.atualizarAutores)
rotas.put('/atualizar/cliente/:matricula', bibliotecaController.atualizarClientes)
rotas.put('/atualizar/aluguel/:id_aluguel', bibliotecaController.atualizarAluguel)
rotas.delete('/apagar/livro/:isbn', bibliotecaController.deletarLivros)
rotas.delete('/apagar/autor/:id_autor', bibliotecaController.deletarAutores)
rotas.delete('/apagar/cliente/:matricula', bibliotecaController.deletarClientes)
rotas.delete('/apagar/aluguel/:id_aluguel', bibliotecaController.deletarAluguel)
module.exports = rotas