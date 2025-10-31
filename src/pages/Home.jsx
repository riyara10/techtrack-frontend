import React from 'react'
import Header from '../components/Header'
import MobileFooter from '../components/MobileFooter'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      
      <div className="w-full bg-gray-900 flex justify-center">
        <img 
          src="/images/banner.png" 
          alt="Banner"
          className="w-full h-auto max-h-[900px] object-cover"
          style={{
            minHeight: '450px',
          }}
        />
      </div>
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        Why Choose <span className="text-[#ff914d]">TechTrack</span>?
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Discover the ultimate platform for mobile enthusiasts. Get detailed insights, expert opinions, and comprehensive analysis for your next smartphone purchase.
      </p>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
   
      <div className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff914d] to-[#ff751f]"></div>
        <div className="p-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#ff914d] to-[#ff751f] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Recommendations</h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            Get personalized phone suggestions based on your usage patterns, budget, and preferences with our AI-powered recommendation engine.
          </p>
        </div>
        <div className="px-8 pb-6">
          <span className="inline-flex items-center text-[#ff914d] font-semibold text-lg group-hover:translate-x-2 transition-transform duration-300">
            Discover More
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>

    
      <div className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff914d] to-[#ff751f]"></div>
        <div className="p-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#ff914d] to-[#ff751f] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Vast Phone Database</h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            Explore thousands of smartphones with detailed specifications, user reviews, and price comparisons across multiple retailers.
          </p>
        </div>
        <div className="px-8 pb-6">
          <span className="inline-flex items-center text-[#ff914d] font-semibold text-lg group-hover:translate-x-2 transition-transform duration-300">
            Explore Phones
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>


      <div className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff914d] to-[#ff751f]"></div>
        <div className="p-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#ff914d] to-[#ff751f] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Latest Tech Insights</h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            Stay updated with the newest mobile technology trends, upcoming launches, and in-depth analysis of the latest smartphone innovations.
          </p>
        </div>
        <div className="px-8 pb-6">
          <span className="inline-flex items-center text-[#ff914d] font-semibold text-lg group-hover:translate-x-2 transition-transform duration-300">
            Read Insights
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </div>

 
    <div className="text-center mt-12">
      <div className="inline-flex items-center justify-center space-x-4 bg-white rounded-2xl shadow-lg px-8 py-4 border border-gray-100">
        <span className="text-gray-700 font-semibold text-lg">Ready to explore our vast collection?</span>
        <Link 
          to="/mobiles" 
          className="bg-[#ff914d] hover:bg-[#ff751f] text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 flex items-center space-x-2"
        >
          <span>Browse All Phones</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  </div>
</section>


<div className="w-full bg-[#ff914d] flex justify-center items-center py-10">
  <div className="w-full max-w-7xl flex justify-center">
    <img 
      src="/images/banner2.png" 
      alt="Mobile Phone Features"
      className="h-auto max-h-[700px] object-contain -mr-60"
    />
  </div>
</div>

   <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#ffff] mb-2">10K+</div>
              <div className="text-[#ff914d] font-medium">Phones Reviewed</div>
            </div>
            
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#ffff] mb-2">500K+</div>
              <div className="text-[#ff914d] font-medium">Happy Users</div>
            </div>
            
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#ffff] mb-2">95%</div>
              <div className="text-[#ff914d] font-medium">Accuracy Rate</div>
            </div>
            
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#ffff] mb-2">24/7</div>
              <div className="text-[#ff914d] font-medium">Support</div>
            </div>
          </div>
        </div>
      </section>
      <MobileFooter/>
    </div>
  )
}

export default Home