const express = require('express');
const rotas = express.Router();
const usuarioController = require('../controller/usuarioController');
//const { buscarPorUsername } = require('../repository/usuarioRepository');

rotas.get('/listar', usuarioController.listar)
rotas.post('/inserir', usuarioController.inserir)
rotas.get('/busca', usuarioController.buscarPorUsername)
rotas.get('/:id', usuarioController.buscarPorId)
rotas.put('/:id_', usuarioController.atualizar)
rotas.delete('/:id', usuarioController.deletar)

module.exports = rotas