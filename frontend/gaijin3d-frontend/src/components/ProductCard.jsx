import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductCard = ({ produto }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === produto.imagens.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? produto.imagens.length - 1 : prev - 1
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  // ALTERAÇÃO: Função para lidar com o clique na imagem do produto
  const handleImageClick = () => {
    if (produto.link && produto.link.trim()) {
      // Se o link começar com http:// ou https://, abre diretamente
      if (
        produto.link.startsWith("http://") ||
        produto.link.startsWith("https://")
      ) {
        window.open(produto.link, "_blank");
      } else {
        // Se não tiver protocolo, adiciona https://
        window.open(`https://${produto.link}`, "_blank");
      }
    }
  };

  return (
    <div className="product-card bg-white group fade-in">
      {/* Galeria de Imagens */}
      <div className="relative aspect-4-3 bg-gray-50 overflow-hidden">
        {produto.imagens && produto.imagens.length > 0 ? (
          <>
            <img
              src={produto.imagens[currentImageIndex]}
              alt={produto.nome}
              className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                produto.link && produto.link.trim() ? "cursor-pointer" : ""
              }`}
              onClick={handleImageClick} // ALTERAÇÃO: Adicionado onClick para redirecionamento
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/400x300?text=Imagem+Indisponível";
              }}
            />
          </>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Sem imagem</span>
          </div>
        )}

        <div className="image-overlay absolute inset-0"></div>

        {/* Controles do Carrossel */}
        {produto.imagens.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ChevronLeft className="w-4 h-4 text-gray-800" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ChevronRight className="w-4 h-4 text-gray-800" />
            </button>
          </>
        )}

        {/* Indicadores de imagem */}
        {produto.imagens.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {produto.imagens.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentImageIndex
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Informações do Produto */}
      <div className="p-6">
        <h3 className="product-title text-xl font-serif text-gray-900 mb-3 leading-tight">
          {produto.nome}
        </h3>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
          {produto.descricao}
        </p>

        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Tamanho
            </p>
            <p className="text-sm text-gray-700 font-medium">
              {produto.tamanho}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Preço
            </p>
            <p className="text-lg font-semibold text-gray-900">
              {formatPrice(produto.preco)}
            </p>
          </div>
        </div>

        {/* ALTERAÇÃO: Botão de ação baseado na existência do link */}
        {produto.link && produto.link.trim() ? (
          <Button
            onClick={handleImageClick}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 text-sm font-medium transition-colors duration-200"
          >
            Ver Produto
          </Button>
        ) : (
          <Button
            disabled
            className="w-full bg-gray-300 text-gray-500 py-2 px-4 text-sm font-medium cursor-not-allowed"
          >
            Produto Indisponível
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
