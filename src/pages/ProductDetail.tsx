import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { productsData, Product } from "@/data/products";
import { Star } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/contexts/CartContext";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // Find the product by ID
  const product = productsData.find(p => p.id === Number(id));
  
  // Get related products (same category, excluding current product)
  const relatedProducts = product
    ? productsData
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
    : [];
  
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || "");
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  
  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container-custom pt-32 pb-16 text-center">
          <h1 className="heading-lg mb-6">Product Not Found</h1>
          <p className="mb-8">The product you are looking for doesn't exist or has been removed.</p>
          <Link to="/products" className="btn-primary">
            Back to Products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container-custom pt-32 pb-16">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm mb-8">
          <Link to="/" className="text-gray-500 hover:text-boutique-taupe">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="text-gray-500 hover:text-boutique-taupe">Products</Link>
          <span className="mx-2">/</span>
          <Link to={`/products?category=${product.category}`} className="text-gray-500 hover:text-boutique-taupe capitalize">
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-boutique-taupe font-medium">{product.name}</span>
        </div>
        
        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white p-8 rounded-sm">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover rounded-sm"
            />
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="heading-lg mb-2">{product.name}</h1>
            
            {/* Price */}
            <p className="text-2xl font-medium text-boutique-taupe mb-4">
              ${product.price.toFixed(2)}
            </p>
            
            {/* Rating */}
            <div className="flex items-center mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
            
            {/* Description */}
            <p className="text-gray-700 mb-8">{product.description}</p>
            
            {/* Color Options */}
            {product.colors && (
              <div className="mb-6">
                <h3 className="font-medium mb-2">Color</h3>
                <div className="flex space-x-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      className={`px-3 py-1 border rounded-sm ${
                        selectedColor === color
                          ? "border-boutique-taupe bg-boutique-taupe/5"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Size Options */}
            {product.sizes && (
              <div className="mb-6">
                <h3 className="font-medium mb-2">Size</h3>
                <div className="flex space-x-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`w-10 h-10 flex items-center justify-center border rounded-sm ${
                        selectedSize === size
                          ? "border-boutique-taupe bg-boutique-taupe/5"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity */}
            <div className="mb-8">
              <h3 className="font-medium mb-2">Quantity</h3>
              <div className="flex items-center border border-gray-300 rounded-sm inline-block">
                <button
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <div className="flex flex-wrap gap-4">
              <button 
                className="btn-primary flex-grow"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <button className="btn-outline flex-grow">
                Add to Wishlist
              </button>
            </div>
            
            {/* Tags */}
            <div className="mt-8">
              <h3 className="font-medium mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map(tag => (
                  <span 
                    key={tag}
                    className="bg-boutique-cream px-3 py-1 rounded-sm text-boutique-taupe text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="heading-md mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  category={product.category}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
