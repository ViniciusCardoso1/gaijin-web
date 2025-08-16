import ProductCard from './ProductCard';

const ProductGrid = ({ produtos, loading, error }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="aspect-4-3 bg-gray-200 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              <div className="flex justify-between">
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <p className="text-gray-500 mb-4">Unable to load products at the moment.</p>
          <p className="text-sm text-gray-400">Please try again later.</p>
        </div>
      </div>
    );
  }

  if (!produtos || produtos.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <p className="text-gray-500 mb-4">No products found.</p>
          <p className="text-sm text-gray-400">Try adjusting your search criteria.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {produtos.map((produto) => (
        <ProductCard key={produto.id} produto={produto} />
      ))}
    </div>
  );
};

export default ProductGrid;

