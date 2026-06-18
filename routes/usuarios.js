const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.get('/teste', (req, res) => {
    res.send('Rota usuarios funcionando');
});

router.post('/cadastro', (req, res) => {

    console.log('================================');
    console.log('REQUISIÇÃO DE CADASTRO USUÁRIA');
    console.log(req.body);
    console.log('================================');

    const {

            nome,
            email,
            telefone,
            cidade,
            estado,
            data_nascimento,
            senha

    } = req.body;

    if (!nome || !email || !telefone || !cidade || !estado || !data_nascimento || !senha) {
        return res.status(400).json({
            mensagem: 'Preencha todos os campos.'
        });
    }

    const sql = `
        INSERT INTO usuarios (nome, email, telefone, cidade, estado, data_nascimento, senha)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [nome, email, telefone, cidade, estado, data_nascimento, senha], (err, result) => {

        if (err) {

            console.log('ERRO MYSQL:');
            console.log(err);

            return res.status(500).json({
                mensagem: 'Erro ao cadastrar usuária.',
                erro: err.message
            });
        }

        console.log('Usuária cadastrada com sucesso!');
        console.log('ID:', result.insertId);

        res.status(201).json({
            mensagem: 'Usuária cadastrada com sucesso!',
            id: result.insertId
        });

    });

});

module.exports = router;