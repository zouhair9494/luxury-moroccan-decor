import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const { products } = useProducts();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Notre Collection
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">
          Aucun produit disponible pour le moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}