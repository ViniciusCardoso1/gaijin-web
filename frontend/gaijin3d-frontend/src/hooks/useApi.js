import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:3001/api';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (endpoint, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, error };
};

export const useProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const { request, loading, error } = useApi();

  const carregarProdutos = async (searchTerm = '') => {
    try {
      const endpoint = searchTerm 
        ? `/produtos/buscar?q=${encodeURIComponent(searchTerm)}`
        : '/produtos';
      
      const data = await request(endpoint);
      setProdutos(data);
      return data;
    } catch (err) {
      console.error('Erro ao carregar produtos:', err);
      setProdutos([]);
    }
  };

  const adicionarProduto = async (produto, password) => {
    try {
      const data = await request('/produtos', {
        method: 'POST',
        body: JSON.stringify({ ...produto, password }),
      });
      await carregarProdutos();
      return data;
    } catch (err) {
      console.error('Erro ao adicionar produto:', err);
      throw err;
    }
  };

  const atualizarProduto = async (id, produto, password) => {
    try {
      const data = await request(`/produtos/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...produto, password }),
      });
      await carregarProdutos();
      return data;
    } catch (err) {
      console.error('Erro ao atualizar produto:', err);
      throw err;
    }
  };

  const removerProduto = async (id, password) => {
    try {
      await request(`/produtos/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ password }),
      });
      await carregarProdutos();
    } catch (err) {
      console.error('Erro ao remover produto:', err);
      throw err;
    }
  };

  const uploadImagem = async (file) => {
    try {
      const formData = new FormData();
      formData.append('imagem', file);

      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erro no upload da imagem');
      }

      const data = await response.json();
      return `http://localhost:3001${data.url}`;
    } catch (err) {
      console.error('Erro no upload:', err);
      throw err;
    }
  };

  const verificarAuth = async (password) => {
    try {
      await request('/admin/auth', {
        method: 'POST',
        body: JSON.stringify({ password }),
      });
      return true;
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  return {
    produtos,
    loading,
    error,
    carregarProdutos,
    adicionarProduto,
    atualizarProduto,
    removerProduto,
    uploadImagem,
    verificarAuth,
  };
};

