import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X, Plus, Upload, Link } from 'lucide-react';

const ProductForm = ({ produto, onSave, onCancel, password, uploadImagem }) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    tamanho: '',
    preco: '',
    imagens: []
  });
  const [novaImagem, setNovaImagem] = useState('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (produto) {
      setFormData({
        nome: produto.nome || '',
        descricao: produto.descricao || '',
        tamanho: produto.tamanho || '',
        preco: produto.preco?.toString() || '',
        imagens: produto.imagens || []
      });
    }
  }, [produto]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const imageUrl = await uploadImagem(file);
      setFormData(prev => ({
        ...prev,
        imagens: [...prev.imagens, imageUrl]
      }));
    } catch (error) {
      alert('Erro no upload da imagem: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const adicionarImagemUrl = () => {
    if (novaImagem.trim()) {
      setFormData(prev => ({
        ...prev,
        imagens: [...prev.imagens, novaImagem.trim()]
      }));
      setNovaImagem('');
    }
  };

  const removerImagem = (index) => {
    setFormData(prev => ({
      ...prev,
      imagens: prev.imagens.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const produtoData = {
        ...formData,
        preco: parseFloat(formData.preco)
      };

      await onSave(produtoData);
    } catch (error) {
      alert('Erro ao salvar produto: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-serif text-gray-900 mb-6">
        {produto ? 'Editar Produto' : 'Novo Produto'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome do Produto
            </label>
            <Input
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              placeholder="Ex: Vaso Geométrico Moderno"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tamanho
            </label>
            <Input
              name="tamanho"
              value={formData.tamanho}
              onChange={handleInputChange}
              placeholder="Ex: Pequeno (10cm x 10cm x 12cm)"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descrição
          </label>
          <Textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleInputChange}
            placeholder="Descreva o produto..."
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preço (R$)
          </label>
          <Input
            name="preco"
            type="number"
            step="0.01"
            value={formData.preco}
            onChange={handleInputChange}
            placeholder="0.00"
            required
          />
        </div>

        {/* Seção de Imagens */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Imagens do Produto
          </label>

          {/* Upload de arquivo */}
          <div className="mb-4">
            <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-amber-400 transition-colors">
              <div className="text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <span className="text-sm text-gray-600">
                  {uploading ? 'Enviando...' : 'Clique para fazer upload'}
                </span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>

          {/* Adicionar URL */}
          <div className="flex gap-2 mb-4">
            <Input
              value={novaImagem}
              onChange={(e) => setNovaImagem(e.target.value)}
              placeholder="Ou cole a URL de uma imagem..."
            />
            <Button
              type="button"
              onClick={adicionarImagemUrl}
              variant="outline"
              disabled={!novaImagem.trim()}
            >
              <Link className="w-4 h-4" />
            </Button>
          </div>

          {/* Lista de imagens */}
          {formData.imagens.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.imagens.map((imagem, index) => (
                <div key={index} className="relative group">
                  <img
                    src={imagem}
                    alt={`Imagem ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100x100?text=Erro';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removerImagem(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-4 pt-6">
          <Button
            type="submit"
            disabled={loading}
            className="bg-amber-600 hover:bg-amber-700"
          >
            {loading ? 'Salvando...' : 'Salvar Produto'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

