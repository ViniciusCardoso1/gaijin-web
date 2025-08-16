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

  return (
    <div className="product-card bg-white group fade-in">
      {/* Galeria de Imagens */}
      <div className="relative aspect-4-3 bg-gray-50 overflow-hidden">
        {produto.imagens && produto.imagens.length > 0 ? (
          <>
            <img
              src={produto.imagens[currentImageIndex]}
              alt={produto.nome}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/400x300?text=Imagem+Indisponível";
              }}
            />

            <div className="image-overlay absolute inset-0"></div>

            {/* Controles do Carousel */}
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

                {/* Indicadores */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {produto.imagens.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? "bg-white scale-110"
                          : "bg-white/50 hover:bg-white/75"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
            <span className="text-sm">Imagem indisponível</span>
          </div>
        )}
      </div>

      {/* Informações do Produto */}
      <div className="p-6">
        <h3 className="text-xl font-serif font-medium text-gray-900 mb-3 leading-tight">
          {produto.nome}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {produto.descricao}
        </p>

        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Tamanho
            </p>
            <p className="text-sm text-gray-700">{produto.tamanho}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Preço
            </p>
            <p className="text-lg font-medium text-gray-900">
              {formatPrice(produto.preco)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
