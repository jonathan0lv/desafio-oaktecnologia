import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function ProductList() {
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();

  // Função para buscar produtos
  const fetchProdutos = async () => {
    try {
      const { data } = await api.get('/produtos');
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  // Função para excluir produto
  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await api.delete(`/produtos/${id}`);
        fetchProdutos();
      } catch (error) {
        console.error('Erro ao excluir o produto:', error);
      }
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  return (
    <div>
      <button onClick={() => navigate('/cadastro')} className="btn btn-success mb-3">
        Cadastrar Novo Produto
      </button>
      <table className="table table-striped table-hover">
        <thead className="table-success">
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Disponível</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.nome}</td>
              <td>{produto.descricao}</td>
              <td>{produto.valor}</td>
              <td>{produto.disponivel ? 'Sim' : 'Não'}</td>
              <td>
                <button onClick={() => handleDelete(produto.id)} className="btn btn-danger btn-sm">
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
