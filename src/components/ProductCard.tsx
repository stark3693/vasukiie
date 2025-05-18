
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  featured?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, category, featured = false }) => {
  return (
    <div 
      className={cn(
        "group relative overflow-hidden transition-all duration-300 rounded-sm bg-white",
        featured ? "shadow-lg" : "hover:shadow-md"
      )}
    >
      <Link to={`/products/${id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-white px-2 py-1 text-xs uppercase text-boutique-taupe">{category}</span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-serif text-lg truncate">{name}</h3>
          <p className="mt-1 font-medium">${price.toFixed(2)}</p>
        </div>
      </Link>
      <div className="absolute bottom-0 left-0 right-0 bg-boutique-taupe py-3 text-white text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        View Product
      </div>
    </div>
  );
};

export default ProductCard;
