'use client';

import { useState, useEffect } from 'react';

interface WishlistItem {
  id: string;
  url: string;
  title: string | null;
  createdAt: number;
}

export default function Home() {
  const [url, setUrl] = useState('');
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchItems() {
    const res = await fetch('/api/items');
    const data = await res.json();
    setItems(data);
  }

  useEffect(() => {
    fetchItems();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    const res = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: url.trim() }),
    });

    if (res.ok) {
      setUrl('');
      fetchItems();
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    await fetch(`/api/items/${id}`, { method: 'DELETE' });
    fetchItems();
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-2xl font-bold text-gray-900">Universal Wishlist</h1>

        <form onSubmit={handleSubmit} className="mb-8 flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste product URL..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </form>

        <div className="space-y-3">
          {items.length === 0 ? (
            <p className="text-center text-gray-500">No items yet. Paste a URL to get started!</p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4"
              >
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 truncate text-blue-600 hover:underline"
                >
                  {item.title || item.url}
                </a>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="ml-4 rounded px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}