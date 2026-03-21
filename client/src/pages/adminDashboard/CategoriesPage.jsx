import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pencil, Plus, Trash2, X } from 'lucide-react';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data?.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    const intervalId = setInterval(fetchCategories, 15000);
    return () => clearInterval(intervalId);
  }, []);

  const openModal = () => {
    setError('');
    setName('');
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (category) => {
    setError('');
    setEditingId(category.id);
    setName(category.name || '');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isSubmitting) return;
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Category name is required');
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingId) {
        const response = await axios.put(`http://localhost:5000/api/categories/${editingId}`, { name });
        const updatedCategory = response.data?.data;
        if (updatedCategory) {
          setCategories((prev) => prev.map((item) => (item.id === updatedCategory.id ? updatedCategory : item)));
        }
      } else {
        const response = await axios.post('http://localhost:5000/api/categories', { name });
        const createdCategory = response.data?.data;
        if (createdCategory) {
          setCategories((prev) => [createdCategory, ...prev]);
        }
      }
      setIsModalOpen(false);
      setName('');
      setEditingId(null);
    } catch (err) {
      setError(err.response?.data?.message || `Failed to ${editingId ? 'update' : 'create'} category`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm('Delete this category?');
    if (!shouldDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      setCategories((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete category');
    }
  };

  return (
    <main className="flex-1 p-4 sm:p-7">
      <div className="mb-6">
        <button
          type="button"
          onClick={openModal}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-[10px] bg-[#5B5FEF] text-white text-sm font-semibold hover:opacity-90 transition mb-3"
        >
          <Plus size={16} /> Add Category
        </button>
        <h1 className="text-[1.6rem] font-bold tracking-tight">Categories</h1>
        <p className="text-gray-500 text-sm mt-1">Create and manage categories from the categories table.</p>
      </div>

      <div className="bg-white rounded-[14px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-sm text-gray-400">Loading categories...</div>
        ) : categories.length === 0 ? (
          <div className="py-16 text-center text-sm text-gray-400">No categories found. Use Add Category to create your first record.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-[#F9FAFC]">
                  <th className="text-left text-[0.78rem] font-semibold text-gray-500 uppercase tracking-wider py-3 px-4">ID</th>
                  <th className="text-left text-[0.78rem] font-semibold text-gray-500 uppercase tracking-wider py-3 px-4">Name</th>
                  <th className="text-left text-[0.78rem] font-semibold text-gray-500 uppercase tracking-wider py-3 px-4">Created</th>
                  <th className="text-left text-[0.78rem] font-semibold text-gray-500 uppercase tracking-wider py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="border-b border-gray-50 last:border-b-0">
                    <td className="py-3.5 px-4 text-sm text-gray-700">{category.id}</td>
                    <td className="py-3.5 px-4 text-sm font-semibold text-gray-800">{category.name}</td>
                    <td className="py-3.5 px-4 text-sm text-gray-500">{new Date(category.created_at).toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(category)}
                          className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                        >
                          <Pencil size={12} /> Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(category.id)}
                          className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/45 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.22)] border border-gray-100">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold">{editingId ? 'Edit Category' : 'Add Category'}</h2>
              <button
                type="button"
                onClick={closeModal}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-[#F5F6FA] hover:text-gray-600 transition"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#5B5FEF]"
                  placeholder="Enter category name"
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2.5 text-sm font-semibold rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2.5 text-sm font-semibold rounded-lg bg-[#5B5FEF] text-white hover:opacity-90 transition disabled:opacity-60"
                >
                  {isSubmitting ? (editingId ? 'Saving...' : 'Creating...') : (editingId ? 'Save Changes' : 'Create Category')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default CategoriesPage;
