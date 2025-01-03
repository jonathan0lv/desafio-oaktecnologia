const express = require('express');
const router = express.Router();
const db = require('../database');

// Listar produtos
router.get('/', (req, res) => {
  db.all('SELECT * FROM produtos ORDER BY valor ASC', [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

// Cadastrar produto
router.post('/', (req, res) => {
  const { nome, descricao, valor, disponivel } = req.body;
  db.run(
    'INSERT INTO produtos (nome, descricao, valor, disponivel) VALUES (?, ?, ?, ?)',
    [nome, descricao, valor, disponivel ? 1 : 0],
    function (err) {
      if (err) return res.status(500).send(err.message);
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Excluir produto
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  console.log('Recebido para exclusão no backend:', id); // Log para depuração
  db.run('DELETE FROM produtos WHERE id = ?', [id], function (err) {
    if (err) {
      console.error('Erro ao excluir o produto:', err.message);
      return res.status(500).send(err.message);
    }
    if (this.changes === 0) {
      console.log('Produto não encontrado para exclusão:', id);
      return res.status(404).send('Produto não encontrado.');
    }
    console.log('Produto excluído com sucesso:', id);
    res.status(200).send(`Produto com ID ${id} foi excluído.`);
  });
});

module.exports = router;
