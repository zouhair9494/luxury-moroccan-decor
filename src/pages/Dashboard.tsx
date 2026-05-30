import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import type { Product } from '../context/ProductContext';

export default function Dashboard() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();

  const [form, setForm] = useState({
    name: '',
    price: '',
    image: '',
    category: '',
    description: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const [password, setPassword] = useState('');
  const ADMIN_PASS = 'admin123';

  // Catégories uniques pour le filtre
  const categories = Array.from(new Set(products.map((p) => p.category)));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.image) return;

    const productData = {
      name: form.name,
      price: Number(form.price),
      image: form.image,
      category: form.category,
      description: form.description,
      subcategory: form.category,
      images: [form.image],
      features: [],
      rating: 0,
    };

    if (editingId) {
      updateProduct({ ...productData, id: editingId });
      setEditingId(null);
    } else {
      addProduct(productData);
    }

    setForm({ name: '', price: '', image: '', category: '', description: '' });
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: String(product.price),
      image: product.image,
      category: product.category,
      description: product.description || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({ name: '', price: '', image: '', category: '', description: '' });
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? p.category === filterCategory : true;
    return matchesSearch && matchesCategory;
  });

  if (password !== ADMIN_PASS) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Accès Dashboard</h2>
          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full border border-gray-300 bg-white text-gray-800 placeholder-gray-400 p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-xs text-gray-500">Tape le mot de passe pour entrer</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Gestion des produits</h1>
          <Link to="/" className="text-blue-600 hover:underline font-medium">
            ← Retour au site
          </Link>
        </div>

        {/* Formulaire Ajouter / Modifier */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-10 grid gap-4"
        >
          <h2 className="text-lg font-semibold text-gray-700">
            {editingId ? 'Modifier le produit' : 'Ajouter un produit'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              required
              placeholder="Nom du produit"
              className="border border-gray-300 bg-white text-gray-800 placeholder-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              required
              type="number"
              placeholder="Prix (MAD)"
              className="border border-gray-300 bg-white text-gray-800 placeholder-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            <input
              required
              placeholder="URL de l'image"
              className="border border-gray-300 bg-white text-gray-800 placeholder-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
            <input
              required
              placeholder="Catégorie"
              className="border border-gray-300 bg-white text-gray-800 placeholder-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </div>
          <textarea
            placeholder="Description (optionnel)"
            className="border border-gray-300 bg-white text-gray-800 placeholder-gray-400 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <div className="flex gap-3">
            <button
              type="submit"
              className={`px-6 py-2 rounded text-white transition w-fit font-medium ${
                editingId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {editingId ? '💾 Enregistrer les modifications' : '+ Ajouter le produit'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-6 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400 transition w-fit font-medium"
              >
                Annuler
              </button>
            )}
          </div>
        </form>

        {/* Filtres et recherche */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="🔍 Rechercher un produit..."
            className="flex-1 border border-gray-300 bg-white text-gray-800 placeholder-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border border-gray-300 bg-white text-gray-800 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-64"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">Toutes les catégories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {filterCategory && (
            <button
              onClick={() => setFilterCategory('')}
              className="text-sm text-red-600 hover:text-red-800 font-medium self-center"
            >
              Réinitialiser
            </button>
          )}
        </div>

        {/* Liste des produits */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Nom</th>
                <th className="p-4">Prix</th>
                <th className="p-4">Catégorie</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded"
                    />
                  </td>
                  <td className="p-4 font-medium text-gray-800">{product.name}</td>
                  <td className="p-4 text-gray-700">{product.price} MAD</td>
                  <td className="p-4">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-3">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400">
                    Aucun produit trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          {products.length} produit{products.length > 1 ? 's' : ''} au total
          {filterCategory || searchTerm ? ` • ${filteredProducts.length} affiché(s)` : ''}
        </p>
      </div>
    </div>
  );
}