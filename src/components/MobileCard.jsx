// components/MobileCard.jsx
import React, { useState } from 'react';
import { Button, Badge, Tooltip, Spinner } from 'flowbite-react';
import { 
  HiPencil, 
  HiTrash, 
  HiHeart, 
  HiOutlineHeart, 
  HiDownload
} from 'react-icons/hi';
import { jsPDF } from 'jspdf';

// Custom Modal Component since Flowbite Modal is causing issues
const CustomModal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto">
        {children}
      </div>
    </div>
  );
};

function MobileCard({ mobile, onEdit, onDelete, onToggleWishlist, isInWishlist, isDeleting = false }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getRatingStars = (rating) => {
    const stars = [];
    const numericRating = parseInt(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span 
          key={i} 
          className={i < numericRating ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const formatPrice = (price) => {
    if (!price) return null;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = (e) => {
    console.error('Image failed to load:', mobile.image);
    setImageError(true);
    setImageLoading(false);
  };

  const renderImageSection = () => {
    if (imageError || !mobile.image) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700">
          <div className="text-center text-gray-300">
            <div className="text-4xl mb-2">📱</div>
            <p className="text-sm font-medium">No Image Available</p>
          </div>
        </div>
      );
    }

    return (
      <>
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
        <img 
          src={mobile.image} 
          alt={mobile.name}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </>
    );
  };

  const exportAsPDF = () => {
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      
      // Add professional header with background
      pdf.setFillColor(59, 130, 246);
      pdf.rect(0, 0, pageWidth, 60, 'F');
      
      // Device name
      pdf.setFontSize(22);
      pdf.setTextColor(255, 255, 255);
      pdf.text(mobile.name.substring(0, 40), 20, 30);
      
      // Brand and model
      pdf.setFontSize(12);
      pdf.setTextColor(255, 255, 255, 0.9);
      pdf.text(`${mobile.brand} • ${mobile.model || 'No Model'}`, 20, 42);
      
      // Rating in header
      if (mobile.rating) {
        pdf.setFontSize(10);
        pdf.setTextColor(255, 255, 255);
        pdf.text(`Rating: ${mobile.rating}/5`, pageWidth - 50, 35);
      }
      
      let yPosition = 80;
      
      // Price section
      if (mobile.price) {
        pdf.setFontSize(16);
        pdf.setTextColor(59, 130, 246);
        pdf.text('PRICE', 20, yPosition);
        
        pdf.setFontSize(24);
        pdf.setTextColor(34, 197, 94);
        const priceText = formatPrice(mobile.price);
        pdf.text(priceText, pageWidth - pdf.getTextWidth(priceText) - 20, yPosition);
        yPosition += 25;
      }
      
      // Specifications section
      pdf.setFontSize(16);
      pdf.setTextColor(31, 41, 55);
      pdf.text('SPECIFICATIONS', 20, yPosition);
      yPosition += 15;
      
      const specs = [
        { label: 'STORAGE', value: mobile.storage, color: [59, 130, 246] },
        { label: 'RAM', value: mobile.ram, color: [34, 197, 94] },
        { label: 'DISPLAY', value: mobile.screenSize, color: [168, 85, 247] },
        { label: 'BATTERY', value: mobile.battery, color: [249, 115, 22] },
      ];
      
      specs.forEach((spec, index) => {
        if (spec.value) {
          const x = 20 + (index % 2) * 90;
          const y = yPosition + Math.floor(index / 2) * 20;
          
          pdf.setFontSize(9);
          pdf.setTextColor(107, 114, 128);
          pdf.text(spec.label, x, y);
          
          pdf.setFontSize(11);
          pdf.setTextColor(31, 41, 55);
          pdf.text(String(spec.value).substring(0, 20), x, y + 6);
        }
      });
      
      yPosition += 50;
      
      // Camera section
      if (mobile.camera) {
        pdf.setFontSize(16);
        pdf.setTextColor(31, 41, 55);
        pdf.text('CAMERA SYSTEM', 20, yPosition);
        yPosition += 10;
        
        pdf.setFontSize(10);
        pdf.setTextColor(75, 85, 99);
        const cameraLines = pdf.splitTextToSize(mobile.camera, pageWidth - 40);
        pdf.text(cameraLines, 20, yPosition);
        yPosition += cameraLines.length * 5 + 15;
      }
      
      // Description section
      if (mobile.description) {
        pdf.setFontSize(16);
        pdf.setTextColor(31, 41, 55);
        pdf.text('DESCRIPTION', 20, yPosition);
        yPosition += 10;
        
        const splitText = pdf.splitTextToSize(mobile.description, pageWidth - 40);
        pdf.setFontSize(10);
        pdf.setTextColor(75, 85, 99);
        pdf.text(splitText, 20, yPosition);
        yPosition += splitText.length * 5 + 15;
      }
      
      // Additional info section
      pdf.setFontSize(16);
      pdf.setTextColor(31, 41, 55);
      pdf.text('ADDITIONAL INFORMATION', 20, yPosition);
      yPosition += 10;
      
      const additionalInfo = [
        { 
          label: 'Added Date', 
          value: mobile.createdAt ? new Date(mobile.createdAt).toLocaleDateString() : 'Not specified' 
        },
        { 
          label: 'Wishlist Status', 
          value: isInWishlist ? 'In Wishlist' : 'Not in Wishlist' 
        },
      ];
      
      additionalInfo.forEach((info, index) => {
        const y = yPosition + (index * 8);
        pdf.setFontSize(9);
        pdf.setTextColor(107, 114, 128);
        pdf.text(info.label, 20, y);
        
        pdf.setFontSize(10);
        pdf.setTextColor(31, 41, 55);
        pdf.text(String(info.value).substring(0, 30), 80, y);
      });
      
      // Footer
      pdf.setFontSize(8);
      pdf.setTextColor(156, 163, 175);
      pdf.text(
        `Generated on ${new Date().toLocaleDateString()} • Mobile Collection Catalog`, 
        pageWidth / 2, 
        280, 
        { align: 'center' }
      );
      
      pdf.save(`${mobile.name.replace(/\s+/g, '_').substring(0, 30)}_specsheet.pdf`);
    } catch (error) {
      console.error('PDF export error:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const handleDelete = () => {
    console.log('Deleting mobile with ID:', mobile.id);
    if (onDelete && mobile.id) {
      onDelete(mobile.id);
    } else {
      console.error('Delete function or mobile ID not available');
    }
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group relative ${
        isDeleting ? 'opacity-50 pointer-events-none' : ''
      }`}>
        {/* Loading Overlay for Delete */}
        {isDeleting && (
          <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-20 rounded-2xl">
            <div className="text-white text-center">
              <Spinner size="lg" className="mx-auto mb-2" />
              <p className="text-sm">Deleting...</p>
            </div>
          </div>
        )}

        {/* Image Section */}
        <div className="h-48 bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center overflow-hidden relative">
          {renderImageSection()}
          
          {/* Action Buttons - Always Visible */}
          <div className="absolute top-3 right-3 flex space-x-2 z-10">
            <Tooltip content="Edit device">
              <Button 
                size="xs"
                onClick={() => onEdit && onEdit(mobile)}
                className="bg-white/95 hover:bg-white text-blue-600 shadow-lg border-0 backdrop-blur-sm"
                pill
                disabled={isDeleting}
              >
                <HiPencil className="w-3 h-3" />
              </Button>
            </Tooltip>
            <Tooltip content="Delete device">
              <Button 
                size="xs"
                onClick={() => setShowDeleteConfirm(true)}
                className="bg-white/95 hover:bg-white text-red-600 shadow-lg border-0 backdrop-blur-sm"
                pill
                disabled={isDeleting}
              >
                <HiTrash className="w-3 h-3" />
              </Button>
            </Tooltip>
            <Tooltip content="Export as PDF">
              <Button 
                size="xs"
                onClick={exportAsPDF}
                className="bg-white/95 hover:bg-white text-green-600 shadow-lg border-0 backdrop-blur-sm"
                pill
                disabled={isDeleting}
              >
                <HiDownload className="w-3 h-3" />
              </Button>
            </Tooltip>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => onToggleWishlist && onToggleWishlist(mobile.id)}
            className={`absolute top-3 left-3 p-2 rounded-full shadow-lg transition-all duration-200 z-10 backdrop-blur-sm ${
              isInWishlist 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-white/95 text-gray-600 hover:bg-white hover:text-red-500'
            } ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            disabled={isDeleting}
          >
            {isInWishlist ? (
              <HiHeart className="w-4 h-4" />
            ) : (
              <HiOutlineHeart className="w-4 h-4" />
            )}
          </button>

          {/* Rating Badge */}
          {mobile.rating && (
            <div className="absolute bottom-3 left-3 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">★</span>
                <span>{mobile.rating}/5</span>
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Brand and Name */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <Badge color="blue" className="text-xs font-bold bg-blue-500 text-white">
                {mobile.brand}
              </Badge>
              {mobile.model && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {mobile.model}
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight mb-2">
              {mobile.name}
            </h3>
            
            {/* Rating Stars */}
            {mobile.rating && (
              <div className="flex items-center gap-2">
                <div className="flex text-sm">
                  {getRatingStars(mobile.rating)}
                </div>
                <span className="text-xs text-gray-500">({mobile.rating}/5)</span>
              </div>
            )}
          </div>

          {/* Specifications Grid */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {mobile.storage && (
              <div className="text-center p-2 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-xs text-blue-600 font-semibold mb-1">Storage</p>
                <p className="text-sm font-bold text-gray-900">{mobile.storage}</p>
              </div>
            )}
            {mobile.ram && (
              <div className="text-center p-2 bg-green-50 rounded-lg border border-green-100">
                <p className="text-xs text-green-600 font-semibold mb-1">RAM</p>
                <p className="text-sm font-bold text-gray-900">{mobile.ram}</p>
              </div>
            )}
            {mobile.screenSize && (
              <div className="text-center p-2 bg-purple-50 rounded-lg border border-purple-100">
                <p className="text-xs text-purple-600 font-semibold mb-1">Display</p>
                <p className="text-sm font-bold text-gray-900">{mobile.screenSize}</p>
              </div>
            )}
            {mobile.battery && (
              <div className="text-center p-2 bg-orange-50 rounded-lg border border-orange-100">
                <p className="text-xs text-orange-600 font-semibold mb-1">Battery</p>
                <p className="text-sm font-bold text-gray-900">{mobile.battery}</p>
              </div>
            )}
          </div>

          {/* Camera */}
          {mobile.camera && (
            <div className="mb-3 p-2 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-xs text-gray-500 font-semibold mb-1">Camera</p>
              <p className="text-sm text-gray-900 line-clamp-1">{mobile.camera}</p>
            </div>
          )}

          {/* Description */}
          {mobile.description && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{mobile.description}</p>
            </div>
          )}

          {/* Price Section */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <div>
              {mobile.price ? (
                <div>
                  <p className="text-2xl font-bold text-gray-900">{formatPrice(mobile.price)}</p>
                  <p className="text-xs text-gray-500">INR</p>
                </div>
              ) : (
                <div className="text-gray-400 text-sm">Price not set</div>
              )}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Added: {mobile.createdAt ? new Date(mobile.createdAt).toLocaleDateString() : 'Recently'}</span>
              <span className={isInWishlist ? 'text-red-500 font-semibold' : ''}>
                {isInWishlist ? 'In Wishlist' : ''}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal - Custom Implementation */}
      <CustomModal
        show={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
      >
        <div className="p-6">
          <div className="text-center py-4">
            <HiTrash className="mx-auto mb-4 h-12 w-12 text-red-500" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete {mobile.name}?</h3>
            <p className="text-gray-600 mb-6">
              This action cannot be undone. All device information will be permanently removed.
            </p>
          </div>
          <div className="flex justify-center space-x-4">
            <Button
              color="gray"
              onClick={() => setShowDeleteConfirm(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              color="failure"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <div className="flex items-center">
                  <Spinner size="sm" className="mr-2" />
                  Deleting...
                </div>
              ) : (
                'Delete Device'
              )}
            </Button>
          </div>
        </div>
      </CustomModal>
    </>
  );
}

export default MobileCard;