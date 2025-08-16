import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, LogOut, Eye } from 'lucide-react';
import ProductForm from './ProductForm';
import { useProdutos } from '../hooks/useApi';

const AdminPanel = ({ password, onLogout }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const { 
    produtos, 
    loading, 
    error, 
    adicionarProduto, 
    atualizarProduto, 
    removerProduto, 
    uploadImagem 
  } = useProdutos();

  const handleSaveProduct = async (produtoData) => {
    try {
      if (editingProduct) {
        await atualizarProduto(editingProduct.id, produtoData, password);
      } else {
        await adicionarProduto(produtoData, password);
      }
      setShowForm(false);
      setEditingProduct(null);
    } catch (error) {
      throw error;
    }
  };

  const handleEditProduct = (produto) => {
    setEditingProduct(produto);
    setShowForm(true);
  };

  const handleDeleteProduct = async (produto) => {
    if (window.confirm(`Tem certeza que deseja remover "${produto.nome}"?`)) {
      try {
        await removerProduto(produto.id, password);
      } catch (error) {
        alert('Erro ao remover produto: ' + error.message);
      }
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <ProductForm
            produto={editingProduct}
            onSave={handleSaveProduct}
            onCancel={handleCancelForm}
            password={password}
            uploadImagem={uploadImagem}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-serif text-gray-900">
                Painel Administrativo
              </h1>
              <p className="text-gray-600 mt-1">
                Gerencie os produtos da Gaijin3D
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={() => window.open('/', '_blank')}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Ver Site
              </Button>
              <Button
                onClick={onLogout}
                variant="outline"
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Ações */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-serif text-gray-900">
              Produtos ({produtos.length})
            </h2>
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-amber-600 hover:bg-amber-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Novo Produto
          </Button>
        </div>

        {/* Lista de Produtos */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 text-lg">Erro ao carregar produtos: {error}</p>
          </div>
        ) : produtos.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-600 text-lg mb-4">Nenhum produto cadastrado</p>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-amber-600 hover:bg-amber-700"
            >
              Adicionar Primeiro Produto
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {produtos.map((produto) => (
              <div key={produto.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                {/* Imagem */}
                <div className="aspect-square bg-gray-100">
                  {produto.imagens && produto.imagens.length > 0 ? (
                    <img
                      src={produto.imagens[0]}
                      alt={produto.nome}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300?text=Sem+Imagem';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      Sem imagem
                    </div>
                  )}
                </div>

                {/* Informações */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {produto.nome}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {produto.descricao}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {produto.tamanho}
                    </span>
                    <span className="font-bold text-amber-600">
                      {formatPrice(produto.preco)}
                    </span>
                  </div>

                  {/* Ações */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEditProduct(produto)}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                    <Button
                      onClick={() => handleDeleteProduct(produto)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:border-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;

