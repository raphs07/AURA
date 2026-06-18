const express = require('express');
const router = express.Router();

const db = require('../database/db');

router.post('/cadastro', (req, res) => {

    console.log('================================');
    console.log('REQUISIÇÃO DE CADASTRO PARCEIRO');
    console.log(req.body);
    console.log('================================');

    const { empresa, email, telefone } = req.body;
console.log('================================');
console.log('VALORES RECEBIDOS:');
console.log('Empresa:', empresa);
console.log('Email:', email);  
console.log('Telefone:', telefone);
console.log('================================');

    if (!empresa || !email || !telefone) {
        return res.status(400).json({
            mensagem: 'Preencha todos os campos.'
        });
    }

    const sql = `
        INSERT INTO parceiros (empresa, email, telefone)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [empresa, email, telefone], (err, result) => {

        if (err) {

            console.log('ERRO MYSQL:');
            console.log(err);

            return res.status(500).json({
                mensagem: 'Erro ao cadastrar parceiro.',
                erro: err.message
            });
        }

        console.log('Parceiro cadastrado com sucesso!');
        console.log('ID:', result.insertId);

        res.status(201).json({
            mensagem: 'Parceiro cadastrado com sucesso!',
            id: result.insertId
        });

    });

});

module.exports = router;