const express = require('express');
const cors = require('cors');
const db = require('./database');
const produtosRoutes = require('./routes/produtos');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/produtos', produtosRoutes);

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
