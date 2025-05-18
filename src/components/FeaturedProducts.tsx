
import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { productsData } from "@/data/products";

const FeaturedProducts = () => {
  // Get 4 random featured products
  const featuredProducts = productsData
    .filter(product => product.featured)
    .slice(0, 4);

  return (
    <section className="section-padding bg-boutique-cream">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">Our Signature Collection</h2>
          <p className="text-boutique-taupe/80 max-w-2xl mx-auto">
            Discover our handcrafted pieces, thoughtfully designed and meticulously crafted to bring unique elegance to your wardrobe and home.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard 
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              category={product.category}
              featured={true}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/products" className="btn-outline">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
