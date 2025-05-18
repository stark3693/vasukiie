
import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Dresses",
    image: "https://images.unsplash.com/photo-1596783074918-c84cb1bd5d44?q=80&w=3270&auto=format&fit=crop",
    link: "/products?category=dresses"
  },
  {
    name: "Home Decor",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=3270&auto=format&fit=crop",
    link: "/products?category=decor"
  },
  {
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=3270&auto=format&fit=crop",
    link: "/products?category=accessories"
  }
];

const CategoriesSection = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">Explore Our Collections</h2>
          <p className="text-boutique-taupe/80 max-w-2xl mx-auto">
            Browse through our thoughtfully curated categories of handcrafted pieces
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link 
              key={index} 
              to={category.link}
              className="group relative overflow-hidden rounded-sm h-80"
            >
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300 z-10"></div>
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center">
                  <h3 className="text-white font-serif text-3xl">{category.name}</h3>
                  <span className="inline-block mt-4 text-white border-b border-white pb-1 uppercase text-sm tracking-wider">
                    Shop Now
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
