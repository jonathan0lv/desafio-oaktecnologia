import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function ProductForm() {
  const [form, setForm] = useState({ nome: '', descricao: '', valor: 0, disponivel: true });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/produtos', form);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Produto</h2>
      <input
        name="nome"
        placeholder="Nome do Produto"
        value={form.nome}
        onChange={handleChange}
        required
      />
      <textarea
        name="descricao"
        placeholder="Descrição"
        value={form.descricao}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="valor"
        placeholder="Valor"
        value={form.valor}
        onChange={handleChange}
        required
      />
      <select
        name="disponivel"
        value={form.disponivel}
        onChange={(e) => setForm({ ...form, disponivel: e.target.value === 'true' })}
      >
        <option value="true">Disponível</option>
        <option value="false">Indisponível</option>
      </select>
      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default ProductForm;
