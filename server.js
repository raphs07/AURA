require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// IMPORTA AS ROTAS PRIMEIRO
const usuariosRoutes = require('./routes/usuarios');
const parceirosRoutes = require('./routes/parceiros');

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ARQUIVOS ESTÁTICOS
app.use(express.static(path.join(__dirname, 'public')));

// ROTAS
app.use('/usuarios', usuariosRoutes);
app.use('/parceiros', parceirosRoutes);

// TESTE
app.get('/teste', (req, res) => {
    res.send('Servidor funcionando');
});

// HOME
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});