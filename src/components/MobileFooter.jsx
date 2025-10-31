import React from 'react';
import { Link } from 'react-router-dom';

function MobileFooter() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <div className="w-9 h-9 bg-[#ff914d] rounded-lg flex items-center justify-center shadow-sm">
                <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">TechTrack</h1>
                <p className="text-sm text-gray-600 mt-1 max-w-md">
                  Your trusted source for comprehensive mobile phone reviews and the latest tech insights.
                </p>
              </div>
            </Link>
          </div>

          <div>
            <h3 className="text-gray-900 font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-yellow-400 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/mobiles" className="text-gray-600 hover:text-yellow-400 transition-colors duration-200">
                  Mobiles
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-gray-600 hover:text-yellow-400 transition-colors duration-200">
                  Reviews
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-gray-600 hover:text-yellow-400 transition-colors duration-200">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:support@techtrack.com" className="text-gray-600 hover:text-yellow-400 transition-colors duration-200">
                  support@techtrack.com
                </a>
              </li>
              <li>
                <a href="tel:+11234567890" className="text-gray-600 hover:text-yellow-400 transition-colors duration-200">
                  +1 (123) 456-7890
                </a>
              </li>
              <li>
                <span className="text-gray-600">Mon - Fri: 9AM - 6PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2025 TechTrack. All rights reserved.
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-orange-400 transition-colors duration-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-orange-400 transition-colors duration-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-orange-400 transition-colors duration-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.017z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default MobileFooter;