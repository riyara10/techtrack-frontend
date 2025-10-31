// components/Wishlist.jsx
import React, { useState, useEffect } from 'react';
import { Button, Card, Badge, Alert, Spinner } from 'flowbite-react';
import { HiHeart, HiTrash, HiExclamation } from 'react-icons/hi';
import { getWishlistAPI, removeFromWishlistAPI } from '../services/allAPI';
import Header from '../components/Header';
import MobileFooter from '../components/MobileFooter';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      setLoading(true);
      const response = await getWishlistAPI();
      setWishlist(response.data || []);
    } catch (err) {
      setError('Failed to load wishlist.');
      console.error('Load wishlist error:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (wishlistItemId) => {
    try {
      await removeFromWishlistAPI(wishlistItemId);
      await loadWishlist();
    } catch (err) {
      setError('Failed to remove item from wishlist.');
      console.error('Remove from wishlist error:', err);
    }
  };

  const clearWishlist = async () => {
    try {
      for (const item of wishlist) {
        await removeFromWishlistAPI(item.id);
      }
      await loadWishlist();
    } catch (err) {
      setError('Failed to clear wishlist.');
      console.error('Clear wishlist error:', err);
    }
  };

  const formatPrice = (price) => {
    if (!price) return 'Price not set';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <Spinner size="xl" className="mx-auto mb-4" />
        <p className="text-gray-600">Loading your wishlist...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
        <Header />
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Wishlist</h2>
          <p className="text-gray-600">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} in wishlist
          </p>
        </div>
        {wishlist.length > 0 && (
          <Button 
            color="failure" 
            onClick={clearWishlist}
            className="flex items-center gap-2"
          >
            <HiTrash className="w-4 h-4" />
            Clear All
          </Button>
        )}
      </div>

      {error && (
        <Alert color="failure" icon={HiExclamation}>
          {error}
        </Alert>
      )}

      {wishlist.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
          <HiHeart className="mx-auto text-6xl text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Your wishlist is empty</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Start adding phones to your wishlist by clicking the heart icon on any device in your collection.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <Badge color="pink" className="flex items-center gap-1">
                  <HiHeart className="w-3 h-3" />
                  Wishlist
                </Badge>
                <Button
                  size="xs"
                  color="failure"
                  onClick={() => removeFromWishlist(item.id)}
                  className="ml-2"
                >
                  <HiTrash className="w-3 h-3" />
                </Button>
              </div>
              
              {item.image && (
                <div className="h-40 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{item.brand}</p>
              
              {item.price && (
                <p className="text-xl font-bold text-green-600">
                  {formatPrice(item.price)}
                </p>
              )}
              
              <p className="text-xs text-gray-500 mt-2">
                Added: {new Date(item.addedAt).toLocaleDateString()}
              </p>
            </Card>
          ))}
        </div>
      )}
      <MobileFooter/>
    </div>
  );
}

export default Wishlist;