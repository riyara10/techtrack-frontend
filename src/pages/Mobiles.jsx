// pages/Mobiles.jsx
import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import MobileFooter from '../components/MobileFooter'
import MobileForm from '../components/MobileForm'
import MobileView from '../components/MobileView'
import { TabItem, Tabs, Button, Alert, Spinner } from "flowbite-react";
import { HiPlus, HiViewGrid, HiExclamation, HiHeart, HiRefresh } from "react-icons/hi";
import { 
  addMobileAPI, 
  getAllMobilesAPI, 
  updateMobileAPI, 
  deleteMobileAPI,
  addToWishlistAPI,
  getWishlistAPI,
  removeFromWishlistAPI,
  checkServerStatusAPI
} from '../services/allAPI';

function Mobiles() {
  const [mobiles, setMobiles] = useState([]);
  const [editingMobile, setEditingMobile] = useState(null);
  const [activeTab, setActiveTab] = useState('add');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [serverStatus, setServerStatus] = useState('checking');
  const [deletingId, setDeletingId] = useState(null);

  // Check server status and load data
  useEffect(() => {
    checkServerAndLoadData();
  }, []);

  const checkServerAndLoadData = async () => {
    try {
      setServerStatus('checking');
      const status = await checkServerStatusAPI();
      
      if (status.success) {
        setServerStatus('connected');
        await loadMobiles();
        await loadWishlist();
      } else {
        setServerStatus('disconnected');
        setError('JSON Server is not running. Please start the server with: json-server --watch db.json --port 3001');
      }
    } catch (err) {
      setServerStatus('disconnected');
      setError('Unable to connect to JSON Server. Please make sure it\'s running on port 3001.');
    }
  };

  // Load all mobiles from API
  const loadMobiles = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getAllMobilesAPI();
      setMobiles(response.data || []);
    } catch (err) {
      setError('Failed to load mobiles: ' + err.message);
      console.error('Load mobiles error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load wishlist from API
  const loadWishlist = async () => {
    try {
      const response = await getWishlistAPI();
      setWishlist(response.data || []);
    } catch (err) {
      console.error('Load wishlist error:', err);
    }
  };

  // Add new mobile
  const handleAddMobile = async (mobileData) => {
    try {
      setError('');
      // Ensure we have all required fields
      const mobileToAdd = {
        ...mobileData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      await addMobileAPI(mobileToAdd);
      await loadMobiles();
      setActiveTab('view');
    } catch (err) {
      setError('Failed to add mobile: ' + err.message);
      console.error('Add mobile error:', err);
      throw err;
    }
  };

  // Update existing mobile
  const handleUpdateMobile = async (updatedMobile) => {
    try {
      setError('');
      const mobileToUpdate = {
        ...updatedMobile,
        updatedAt: new Date().toISOString()
      };
      
      await updateMobileAPI(updatedMobile.id, mobileToUpdate);
      await loadMobiles();
      setEditingMobile(null);
      setActiveTab('view');
    } catch (err) {
      setError('Failed to update mobile: ' + err.message);
      console.error('Update mobile error:', err);
      throw err;
    }
  };

  // Delete mobile - FIXED VERSION
  const handleDeleteMobile = async (mobileId) => {
    if (!mobileId) {
      setError('Invalid mobile ID');
      return;
    }

    try {
      setDeletingId(mobileId);
      setError('');
      console.log('Deleting mobile with ID:', mobileId);
      
      // Remove from wishlist first if it exists there
      const wishlistItem = wishlist.find(item => item.mobileId === mobileId);
      if (wishlistItem) {
        console.log('Also removing from wishlist:', wishlistItem.id);
        await removeFromWishlistAPI(wishlistItem.id);
      }
      
      // Then delete the mobile
      await deleteMobileAPI(mobileId);
      
      // Update local state
      setMobiles(prev => prev.filter(mobile => mobile.id !== mobileId));
      
      // Reload wishlist to ensure consistency
      await loadWishlist();
      
      console.log('Mobile deleted successfully');
    } catch (err) {
      console.error('Delete mobile error:', err);
      setError('Failed to delete mobile: ' + err.message);
      // Reload data to ensure consistency
      await loadMobiles();
      await loadWishlist();
    } finally {
      setDeletingId(null);
    }
  };

  // Edit mobile
  const handleEditMobile = (mobile) => {
    setEditingMobile(mobile);
    setActiveTab('add');
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingMobile(null);
    setError('');
  };

  // Toggle wishlist - FIXED VERSION
  const handleToggleWishlist = async (mobileId) => {
    try {
      // Check if already in wishlist
      const existingItem = wishlist.find(item => item.mobileId === mobileId);
      
      if (existingItem) {
        // Remove from wishlist
        await removeFromWishlistAPI(existingItem.id);
        await loadWishlist();
      } else {
        // Add to wishlist
        const mobile = mobiles.find(m => m.id === mobileId);
        if (mobile) {
          const wishlistItem = {
            mobileId: mobile.id,
            name: mobile.name,
            brand: mobile.brand,
            price: mobile.price,
            image: mobile.image,
            addedAt: new Date().toISOString()
          };
          await addToWishlistAPI(wishlistItem);
          await loadWishlist();
        }
      }
    } catch (err) {
      console.error('Toggle wishlist error:', err);
      setError('Failed to update wishlist: ' + err.message);
    }
  };

  // Clear all wishlist items
  const handleClearWishlist = async () => {
    try {
      // Remove all wishlist items from API one by one
      const deletePromises = wishlist.map(item => 
        removeFromWishlistAPI(item.id)
      );
      await Promise.all(deletePromises);
      await loadWishlist();
    } catch (err) {
      console.error('Clear wishlist error:', err);
      setError('Failed to clear wishlist: ' + err.message);
    }
  };

  // Retry connection
  const handleRetryConnection = () => {
    checkServerAndLoadData();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <div className="flex-1 bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-12">
          {/* Server Status Alert */}
          {serverStatus === 'disconnected' && (
            <Alert color="failure" className="mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <HiExclamation className="w-5 h-5 mr-2" />
                  <span>
                    JSON Server is not running. Please start it with: 
                    <code className="ml-2 bg-gray-800 text-white px-2 py-1 rounded text-sm">
                      json-server --watch db.json --port 3001
                    </code>
                  </span>
                </div>
                <Button size="xs" onClick={handleRetryConnection}>
                  <HiRefresh className="w-4 h-4 mr-1" />
                  Retry
                </Button>
              </div>
            </Alert>
          )}

          {/* Error Alert */}
          {error && serverStatus !== 'disconnected' && (
            <Alert color="failure" className="mb-6">
              <div className="flex items-center">
                <HiExclamation className="w-5 h-5 mr-2" />
                {error}
              </div>
            </Alert>
          )}

          {/* Wishlist Indicator */}
          {wishlist.length > 0 && activeTab === 'view' && (
            <div className="mb-6 bg-gradient-to-r from-pink-50 to-red-50 border border-pink-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <HiHeart className="w-5 h-5 text-pink-600 mr-2" />
                  <span className="text-pink-600 font-semibold">
                    {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} in wishlist
                  </span>
                </div>
                <Button 
                  size="xs" 
                  color="light" 
                  onClick={handleClearWishlist}
                  className="text-pink-600 hover:text-pink-700"
                >
                  Clear All
                </Button>
              </div>
            </div>
          )}

          <Tabs 
            aria-label="Mobile phones tabs" 
            variant="fullWidth"
            onActiveTabChange={(tab) => {
              setActiveTab(tab === 0 ? 'add' : 'view');
              setError('');
            }}
            className="mb-6 [&>button]:bg-black [&>button]:text-[#ff914d] [&>button]:border-gray-600 hover:[&>button]:bg-black hover:[&>button]:text-white [&>button[aria-selected='true']]:bg-[#ff914d] [&>button[aria-selected='true']]:text-black [&>button[aria-selected='true']]:border-[#ff914d] rounded-lg overflow-hidden"
          >
            <TabItem 
              active={activeTab === 'add'}
              title={editingMobile ? "Edit Phone" : "Add Phone"} 
              icon={HiPlus}
              className="rounded-l-lg"
              disabled={serverStatus === 'disconnected'}
            >
              <div className="mt-6">
                <MobileForm 
                  onAddMobile={handleAddMobile}
                  editingMobile={editingMobile}
                  onUpdateMobile={handleUpdateMobile}
                  onCancelEdit={handleCancelEdit}
                  serverConnected={serverStatus === 'connected'}
                />
              </div>
            </TabItem>
            <TabItem 
              active={activeTab === 'view'}
              title="View Collection" 
              icon={HiViewGrid}
              className="rounded-r-lg"
              disabled={serverStatus === 'disconnected'}
            >
              <div className="mt-6">
                {loading ? (
                  <div className="text-center py-12">
                    <Spinner size="xl" className="mx-auto mb-4" />
                    <p className="text-gray-600">Loading your collection...</p>
                  </div>
                ) : mobiles.length === 0 ? (
                  <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
                    <div className="text-6xl mb-4">📱</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Your Collection is Empty</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Start building your phone collection by adding your first device. Track specifications, prices, and create your personal catalog.
                    </p>
                   
                  </div>
                ) : (
                  <MobileView
                    mobiles={mobiles}
                    onEditMobile={handleEditMobile}
                    onDeleteMobile={handleDeleteMobile}
                    onToggleWishlist={handleToggleWishlist}
                    wishlist={wishlist.map(item => item.mobileId)}
                    deletingId={deletingId}
                  />
                )}
              </div>
            </TabItem>
          </Tabs>
        </div>
      </div>
      <MobileFooter/>
    </div>
  )
}

export default Mobiles;