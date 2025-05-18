
import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center">
      <div 
        className="absolute inset-0 z-0" 
        style={{ 
          backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.6)), url('https://images.unsplash.com/photo-1601924638867-3a6de6b7a500?q=80&w=3270&auto=format&fit=crop')", 
          backgroundSize: "cover", 
          backgroundPosition: "center" 
        }}
      ></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-2xl">
          <h1 className="heading-xl mb-6 animate-fade-in font-serif leading-tight">
            Handcrafted Elegance<br />
            <span className="text-boutique-taupe">For Your Unique Style</span>
          </h1>
          <p className="text-lg mb-8 opacity-80 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Discover our collection of artisanal dresses and decor items at Vasukii E-com, each piece thoughtfully designed and meticulously crafted with love.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Link to="/products" className="btn-primary">
              Shop Collection
            </Link>
            <Link to="/about" className="btn-outline">
              Our Story
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <div className="animate-float">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5L12 19" stroke="#A67F78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 12L12 19L5 12" stroke="#A67F78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
