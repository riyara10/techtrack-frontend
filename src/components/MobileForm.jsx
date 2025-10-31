// components/MobileForm.jsx
import React, { useState, useEffect } from 'react';
import { Button, Label, TextInput, Select, Textarea, Alert, Tooltip } from 'flowbite-react';
import { HiCloudUpload, HiExclamation, HiX, HiInformationCircle } from 'react-icons/hi';

function MobileForm({ onAddMobile, editingMobile, onUpdateMobile, onCancelEdit, serverConnected = true }) {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    storage: '',
    ram: '',
    screenSize: '',
    camera: '',
    battery: '',
    price: '',
    rating: '',
    description: '',
    image: ''
  });

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [submitError, setSubmitError] = useState('');

  // Populate form when editing
  useEffect(() => {
    if (editingMobile) {
      setFormData(editingMobile);
      if (editingMobile.image) {
        setImagePreview(editingMobile.image);
      }
    } else {
      // Reset form when not editing
      setFormData({
        name: '',
        brand: '',
        model: '',
        storage: '',
        ram: '',
        screenSize: '',
        camera: '',
        battery: '',
        price: '',
        rating: '',
        description: '',
        image: ''
      });
      setImagePreview('');
    }
  }, [editingMobile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setSubmitError('');
  };

  // Handle file upload - UPDATED VERSION
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Please select a valid image file (JPEG, PNG, WebP)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size should be less than 5MB');
      return;
    }

    setUploading(true);
    setUploadError('');

    try {
      // Use FileReader to create a data URL that persists
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const imageDataUrl = event.target.result;
        
        setFormData(prev => ({
          ...prev,
          image: imageDataUrl
        }));
        setImagePreview(imageDataUrl);
        setUploading(false);
      };
      
      reader.onerror = () => {
        setUploadError('Failed to read image file. Please try again.');
        setUploading(false);
      };
      
      reader.onabort = () => {
        setUploadError('Image upload was cancelled.');
        setUploading(false);
      };
      
      reader.readAsDataURL(file);
      
    } catch (error) {
      setUploadError('Failed to process image. Please try again.');
      console.error('Upload error:', error);
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadError('');
    setSubmitError('');

    // Basic validation
    if (!formData.name.trim() || !formData.brand.trim()) {
      setSubmitError('Name and Brand are required fields');
      return;
    }

    // Server connection check
    if (!serverConnected) {
      setSubmitError('Cannot save mobile. Server is not connected. Please check if JSON server is running.');
      return;
    }

    try {
      const mobileData = {
        ...formData,
        // Ensure price is stored as number
        price: formData.price ? parseFloat(formData.price) : '',
        // Ensure rating is stored as number
        rating: formData.rating ? parseInt(formData.rating) : '',
        // Add timestamps
        updatedAt: new Date().toISOString()
      };

      if (editingMobile) {
        // Update existing mobile
        await onUpdateMobile(mobileData);
      } else {
        // Add new mobile
        await onAddMobile({
          ...mobileData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString()
        });
      }
      
      // Reset form only if successful and not editing
      if (!editingMobile) {
        setFormData({
          name: '',
          brand: '',
          model: '',
          storage: '',
          ram: '',
          screenSize: '',
          camera: '',
          battery: '',
          price: '',
          rating: '',
          description: '',
          image: ''
        });
        setImagePreview('');
      }
      
    } catch (error) {
      setSubmitError('Failed to save mobile. Please try again.');
      console.error('Submit error:', error);
    }
  };

  const handleCancel = () => {
    onCancelEdit();
    setFormData({
      name: '',
      brand: '',
      model: '',
      storage: '',
      ram: '',
      screenSize: '',
      camera: '',
      battery: '',
      price: '',
      rating: '',
      description: '',
      image: ''
    });
    setImagePreview('');
    setUploadError('');
    setSubmitError('');
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: '' }));
    setImagePreview('');
    setUploadError('');
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const event = { target: { files: [file] } };
      handleFileUpload(event);
    }
  };

  // Server disconnected warning
  if (!serverConnected) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center">
        <div className="text-6xl mb-4">🔌</div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">Server Disconnected</h3>
        <p className="text-gray-600 mb-6">
          JSON Server is not running. Please start the server to add or edit mobiles.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-sm text-left">
          <p className="font-semibold mb-2">To start the server, run:</p>
          <code className="bg-gray-800 text-white px-3 py-2 rounded block">
            json-server --watch db.json --port 3001
          </code>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        {editingMobile ? 'Edit Phone Details' : 'Add New Phone to Your Collection'}
      </h3>
      
      {/* Submit Error */}
      {submitError && (
        <Alert color="failure" icon={HiExclamation}>
          {submitError}
        </Alert>
      )}

      {/* Image Upload Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Label value="Phone Image" className="text-sm font-semibold text-gray-700" />
          <Tooltip content="Upload a high-quality image of the phone. Supported formats: JPEG, PNG, WebP. Max size: 5MB">
            <HiInformationCircle className="w-4 h-4 text-gray-400 cursor-help" />
          </Tooltip>
        </div>
        
        {/* Image Preview */}
        {imagePreview ? (
          <div className="relative">
            <div className="w-48 h-48 mx-auto border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error('Image failed to load:', imagePreview);
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `
                    <div class="w-full h-full flex items-center justify-center bg-gray-100">
                      <div class="text-center text-gray-400">
                        <div class="text-2xl mb-1">📱</div>
                        <p class="text-xs">Image not available</p>
                      </div>
                    </div>
                  `;
                }}
              />
            </div>
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              title="Remove image"
            >
              <HiX className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* File Upload Area */
          <div>
            <div 
              className="flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                <div className="flex flex-col items-center justify-center">
                  <HiCloudUpload className="w-12 h-12 text-gray-400 mb-3" />
                  <p className="text-sm text-gray-500 text-center">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, WebP (MAX. 5MB)</p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleFileUpload}
                  disabled={uploading}
                />
              </label>
            </div>
          </div>
        )}

        {/* Upload Status */}
        {uploading && (
          <div className="text-center">
            <div className="inline-flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#ff914d] mr-2"></div>
              Processing image...
            </div>
          </div>
        )}

        {/* Upload Error */}
        {uploadError && (
          <Alert color="failure" icon={HiExclamation}>
            {uploadError}
          </Alert>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="name" value="Device Name *" className="text-sm font-semibold text-gray-700" />
            <Tooltip content="Enter the commercial name of the device (e.g., iPhone 15 Pro, Galaxy S24 Ultra)">
              <HiInformationCircle className="w-4 h-4 text-gray-400 cursor-help" />
            </Tooltip>
          </div>
          <TextInput
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., iPhone 15 Pro Max"
            required
            disabled={uploading}
          />
        </div>

        {/* Brand */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="brand" value="Manufacturer *" className="text-sm font-semibold text-gray-700" />
            <Tooltip content="Select the manufacturer brand of the device">
              <HiInformationCircle className="w-4 h-4 text-gray-400 cursor-help" />
            </Tooltip>
          </div>
          <Select
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
            disabled={uploading}
          >
            <option value="">Select Manufacturer</option>
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="Google">Google</option>
            <option value="OnePlus">OnePlus</option>
            <option value="Xiaomi">Xiaomi</option>
            <option value="Huawei">Huawei</option>
            <option value="Oppo">Oppo</option>
            <option value="Vivo">Vivo</option>
            <option value="Realme">Realme</option>
            <option value="Motorola">Motorola</option>
            <option value="Nokia">Nokia</option>
            <option value="Sony">Sony</option>
            <option value="LG">LG</option>
            <option value="Other">Other</option>
          </Select>
        </div>

        {/* Model */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="model" value="Model Number" className="text-sm font-semibold text-gray-700" />
            <Tooltip content="Enter the specific model number (e.g., A2846, SM-S928B)">
              <HiInformationCircle className="w-4 h-4 text-gray-400 cursor-help" />
            </Tooltip>
          </div>
          <TextInput
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="e.g., A2846, SM-S928B"
            disabled={uploading}
          />
        </div>

        {/* Storage */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="storage" value="Internal Storage" className="text-sm font-semibold text-gray-700" />
            <Tooltip content="Select the internal storage capacity">
              <HiInformationCircle className="w-4 h-4 text-gray-400 cursor-help" />
            </Tooltip>
          </div>
          <Select
            id="storage"
            name="storage"
            value={formData.storage}
            onChange={handleChange}
            disabled={uploading}
          >
            <option value="">Select Storage Capacity</option>
            <option value="64GB">64GB</option>
            <option value="128GB">128GB</option>
            <option value="256GB">256GB</option>
            <option value="512GB">512GB</option>
            <option value="1TB">1TB</option>
            <option value="2TB">2TB</option>
          </Select>
        </div>

        {/* RAM */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="ram" value="Memory (RAM)" className="text-sm font-semibold text-gray-700" />
            <Tooltip content="Select the RAM capacity">
              <HiInformationCircle className="w-4 h-4 text-gray-400 cursor-help" />
            </Tooltip>
          </div>
          <Select
            id="ram"
            name="ram"
            value={formData.ram}
            onChange={handleChange}
            disabled={uploading}
          >
            <option value="">Select RAM Size</option>
            <option value="4GB">4GB</option>
            <option value="6GB">6GB</option>
            <option value="8GB">8GB</option>
            <option value="12GB">12GB</option>
            <option value="16GB">16GB</option>
            <option value="18GB">18GB</option>
            <option value="24GB">24GB</option>
          </Select>
        </div>

        {/* Screen Size */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="screenSize" value="Display Size" className="text-sm font-semibold text-gray-700" />
            <Tooltip content="Enter the screen diagonal size in inches">
              <HiInformationCircle className="w-4 h-4 text-gray-400 cursor-help" />
            </Tooltip>
          </div>
          <TextInput
            id="screenSize"
            name="screenSize"
            value={formData.screenSize}
            onChange={handleChange}
            placeholder="e.g., 6.7 inches"
            disabled={uploading}
          />
        </div>

        {/* Camera */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="camera" value="Camera System" className="text-sm font-semibold text-gray-700" />
            <Tooltip content="Describe the camera specifications">
              <HiInformationCircle className="w-4 h-4 text-gray-400 cursor-help" />
            </Tooltip>
          </div>
          <TextInput
            id="camera"
            name="camera"
            value={formData.camera}
            onChange={handleChange}
            placeholder="e.g., 48MP Main + 12MP Ultra Wide"
            disabled={uploading}
          />
        </div>

        {/* Battery */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="battery" value="Battery Capacity" className="text-sm font-semibold text-gray-700" />
            <Tooltip content="Enter the battery capacity in mAh">
              <HiInformationCircle className="w-4 h-4 text-gray-400 cursor-help" />
            </Tooltip>
          </div>
          <TextInput
            id="battery"
            name="battery"
            value={formData.battery}
            onChange={handleChange}
            placeholder="e.g., 5000mAh"
            disabled={uploading}
          />
        </div>

        {/* Price */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="price" value="Price (USD)" className="text-sm font-semibold text-gray-700" />
            <Tooltip content="Enter the price in US dollars">
              <HiInformationCircle className="w-4 h-4 text-gray-400 cursor-help" />
            </Tooltip>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <TextInput
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="999.00"
              disabled={uploading}
              min="0"
              step="0.01"
              className="pl-8"
            />
          </div>
        </div>

        {/* Rating */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="rating" value="User Rating" className="text-sm font-semibold text-gray-700" />
            <Tooltip content="Select your personal rating for this device">
              <HiInformationCircle className="w-4 h-4 text-gray-400 cursor-help" />
            </Tooltip>
          </div>
          <Select
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            disabled={uploading}
          >
            <option value="">Select Rating</option>
            <option value="1">⭐ (1) - Poor</option>
            <option value="2">⭐⭐ (2) - Fair</option>
            <option value="3">⭐⭐⭐ (3) - Good</option>
            <option value="4">⭐⭐⭐⭐ (4) - Very Good</option>
            <option value="5">⭐⭐⭐⭐⭐ (5) - Excellent</option>
          </Select>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="description" value="Product Description" className="text-sm font-semibold text-gray-700" />
          <Tooltip content="Provide detailed description about features, condition, and specifications">
            <HiInformationCircle className="w-4 h-4 text-gray-400 cursor-help" />
          </Tooltip>
        </div>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the phone's features, condition, performance, and any notable specifications..."
          rows={4}
          disabled={uploading}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
        {(editingMobile || formData.name || formData.brand) && (
          <Button 
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold px-6 py-2"
            disabled={uploading}
          >
            {editingMobile ? 'Cancel Editing' : 'Clear Form'}
          </Button>
        )}
        <Button 
          type="submit" 
          className="bg-[#ff914d] hover:bg-[#ff7a35] text-black font-bold px-8 py-2"
          disabled={uploading || !formData.name || !formData.brand}
        >
          {uploading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
              Processing...
            </div>
          ) : (
            editingMobile ? 'Update Device' : 'Add to Collection'
          )}
        </Button>
      </div>
    </form>
  );
}

export default MobileForm;