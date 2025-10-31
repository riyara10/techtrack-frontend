import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-20">
     
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 bg-[#ff914d] rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-200">
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">TechTrack</h1>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className="text-black bg-[#ff914d] px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center space-x-2 hover:bg-[#e5671c]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Home</span>
            </Link>
            <Link
              to="/mobiles"
              className="text-black bg-[#ff914d] px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center space-x-2 hover:bg-[#e5671c]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span>Mobiles</span>
            </Link>
       
            <Link
              to="/wishlist"
              className="text-black bg-[#ff914d] px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center space-x-2 hover:bg-[#e5671c]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>Wishlist</span>
            </Link>
          </nav>

          <button className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-white hover:bg-[#ff751f] transition-colors duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;