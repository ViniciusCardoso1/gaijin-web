import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus, Upload, Link } from "lucide-react";

const ProductForm = ({ produto, onSave, onCancel, password, uploadImagem }) => {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    tamanho: "",
    preco: "",
    imagens: [],
    link: "", // ALTERAÇÃO: Adicionado campo 'link' ao estado do formulário
  });
  const [novaImagem, setNovaImagem] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (produto) {
      setFormData({
        nome: produto.nome || "",
        descricao: produto.descricao || "",
        tamanho: produto.tamanho || "",
        preco: produto.preco?.toString() || "",
        imagens: produto.imagens || [],
        link: produto.link || "", // ALTERAÇÃO: Incluído campo 'link' no carregamento dos dados do produto
      });
    }
  }, [produto]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const imageUrl = await uploadImagem(file);
      setFormData((prev) => ({
        ...prev,
        imagens: [...prev.imagens, imageUrl],
      }));
    } catch (error) {
      alert("Erro no upload da imagem: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const adicionarImagemUrl = () => {
    if (novaImagem.trim()) {
      setFormData((prev) => ({
        ...prev,
        imagens: [...prev.imagens, novaImagem.trim()],
      }));
      setNovaImagem("");
    }
  };

  const removerImagem = (index) => {
    setFormData((prev) => ({
      ...prev,
      imagens: prev.imagens.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.nome ||
      !formData.descricao ||
      !formData.tamanho ||
      !formData.preco
    ) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    setLoading(true);
    try {
      await onSave({
        ...formData,
        preco: parseFloat(formData.preco),
        password,
      });
    } catch (error) {
      alert("Erro ao salvar produto: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {produto ? "Editar Produto" : "Novo Produto"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nome do Produto */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome do Produto *
          </label>
          <Input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            placeholder="Ex: Vaso Geométrico Moderno"
            required
            className="w-full"
          />
        </div>

        {/* Descrição */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descrição *
          </label>
          <Textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleInputChange}
            placeholder="Descreva as características e benefícios do produto..."
            rows={4}
            required
            className="w-full"
          />
        </div>

        {/* Tamanho */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tamanho *
          </label>
          <Input
            type="text"
            name="tamanho"
            value={formData.tamanho}
            onChange={handleInputChange}
            placeholder="Ex: Pequeno (10cm x 10cm x 12cm)"
            required
            className="w-full"
          />
        </div>

        {/* Preço */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preço (R$) *
          </label>
          <Input
            type="number"
            name="preco"
            value={formData.preco}
            onChange={handleInputChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
            className="w-full"
          />
        </div>

        {/* ALTERAÇÃO: Novo campo para Link do Produto */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Link className="inline w-4 h-4 mr-1" />
            Link do Produto
          </label>
          <Input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            placeholder="https://exemplo.com/produto"
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1">
            Link para onde o usuário será redirecionado ao clicar no produto
            (opcional)
          </p>
        </div>

        {/* Imagens */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Imagens do Produto
          </label>

          {/* Upload de arquivo */}
          <div className="mb-4">
            <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <div className="flex flex-col items-center">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">
                  {uploading ? "Enviando..." : "Clique para fazer upload"}
                </span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>

          {/* Adicionar URL de imagem */}
          <div className="flex gap-2 mb-4">
            <Input
              type="url"
              value={novaImagem}
              onChange={(e) => setNovaImagem(e.target.value)}
              placeholder="Ou cole a URL de uma imagem..."
              className="flex-1"
            />
            <Button
              type="button"
              onClick={adicionarImagemUrl}
              disabled={!novaImagem.trim()}
              variant="outline"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Lista de imagens */}
          {formData.imagens.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">
                Imagens adicionadas ({formData.imagens.length}):
              </p>
              {formData.imagens.map((imagem, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 bg-gray-50 rounded"
                >
                  <img
                    src={imagem}
                    alt={`Preview ${index + 1}`}
                    className="w-12 h-12 object-cover rounded"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  <span className="flex-1 text-sm text-gray-600 truncate">
                    {imagem}
                  </span>
                  <Button
                    type="button"
                    onClick={() => removerImagem(index)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Botões de ação */}
        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            disabled={loading}
            className="flex-1 bg-amber-600 hover:bg-amber-700"
          >
            {loading ? "Salvando..." : produto ? "Atualizar" : "Criar"} Produto
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="flex-1"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
