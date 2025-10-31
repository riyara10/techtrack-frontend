// components/MobileView.jsx
import React, { useState } from 'react';
import MobileCard from './MobileCard';
import { TextInput } from 'flowbite-react';
import { HiSearch, HiX } from 'react-icons/hi';

function MobileView({ mobiles, onEditMobile, onDeleteMobile, onToggleWishlist, wishlist }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter mobiles based on search term
  const filteredMobiles = mobiles.filter(mobile => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      mobile.name.toLowerCase().includes(searchLower) ||
      mobile.brand.toLowerCase().includes(searchLower) ||
      mobile.model?.toLowerCase().includes(searchLower) ||
      mobile.description?.toLowerCase().includes(searchLower) ||
      mobile.storage?.toLowerCase().includes(searchLower) ||
      mobile.ram?.toLowerCase().includes(searchLower) ||
      mobile.screenSize?.toLowerCase().includes(searchLower) ||
      mobile.battery?.toLowerCase().includes(searchLower) ||
      mobile.camera?.toLowerCase().includes(searchLower)
    );
  });

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Phone Collection</h2>
          <p className="text-gray-600">
            {filteredMobiles.length} {filteredMobiles.length === 1 ? 'device' : 'devices'} in collection
          </p>
        </div>

        {/* Professional Search Bar */}
        <div className="relative w-full lg:w-96">
          <div className="relative group">
            <TextInput
              type="text"
              placeholder="Search by name, brand, model, specs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 pr-10 py-2.5 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 rounded-xl bg-white shadow-sm hover:shadow-md"
            />
            
            {/* Search Icon */}
            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors duration-200 group-focus-within:text-blue-500" />
            
            {/* Clear Button */}
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
              >
                <HiX className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {/* Search Hint */}
          {searchTerm && (
            <p className="text-xs text-gray-500 mt-2 ml-1">
              Found {filteredMobiles.length} {filteredMobiles.length === 1 ? 'result' : 'results'}
            </p>
          )}
        </div>
      </div>

      {/* Mobile Grid */}
      {filteredMobiles.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="text-6xl mb-4">📱</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            {searchTerm ? 'No matching devices found' : 'Your collection is empty'}
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            {searchTerm 
              ? 'Try searching with different keywords or check for typos'
              : 'Get started by adding your first mobile device to build your collection'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMobiles.map(mobile => (
            <MobileCard
              key={mobile.id}
              mobile={mobile}
              onEdit={onEditMobile}
              onDelete={onDeleteMobile}
              onToggleWishlist={onToggleWishlist}
              isInWishlist={wishlist.includes(mobile.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MobileView;