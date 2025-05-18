
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-boutique-cream">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-6">Our Story</h1>
            <p className="text-xl text-boutique-taupe/80">
              Crafting dreams into reality, one stitch at a time
            </p>
          </div>
        </div>
      </section>
      
      {/* Founder's Story */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=3024&auto=format&fit=crop" 
                alt="Founder working on a dress design" 
                className="rounded-sm w-full h-auto shadow-lg"
              />
            </div>
            <div>
              <h2 className="heading-md mb-6">The Founder's Journey</h2>
              <p className="mb-4 text-gray-700">
                Whimsical Threads began in Emma's small apartment in 2018. With a passion for creating unique pieces and a background in textile design, she decided to create garments that would stand out from mass-produced fashion.
              </p>
              <p className="mb-4 text-gray-700">
                Drawing inspiration from vintage designs and natural elements, Emma developed a distinctive aesthetic that combines timeless elegance with contemporary sensibilities.
              </p>
              <p className="text-gray-700">
                What started as a small operation quickly grew as customers fell in love with the attention to detail and quality craftsmanship in each piece. Today, Whimsical Threads remains true to its founding principles: creating beautiful, thoughtfully designed pieces that are meant to be treasured.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Process */}
      <section className="py-16 bg-boutique-cream">
        <div className="container-custom">
          <h2 className="heading-md mb-12 text-center">Our Process</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-sm shadow-sm">
              <div className="w-12 h-12 flex items-center justify-center bg-boutique-taupe text-white rounded-full mb-4">
                1
              </div>
              <h3 className="font-serif text-xl mb-3">Thoughtful Design</h3>
              <p className="text-gray-700">
                Every creation begins with a sketch. We draw inspiration from nature, art, and vintage aesthetics to create pieces that feel both timeless and unique.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-sm shadow-sm">
              <div className="w-12 h-12 flex items-center justify-center bg-boutique-taupe text-white rounded-full mb-4">
                2
              </div>
              <h3 className="font-serif text-xl mb-3">Sustainable Materials</h3>
              <p className="text-gray-700">
                We carefully source high-quality, sustainable materials. From organic cotton to natural dyes, we prioritize materials that are kind to both people and planet.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-sm shadow-sm">
              <div className="w-12 h-12 flex items-center justify-center bg-boutique-taupe text-white rounded-full mb-4">
                3
              </div>
              <h3 className="font-serif text-xl mb-3">Artisanal Crafting</h3>
              <p className="text-gray-700">
                Each piece is crafted by hand with meticulous attention to detail. Our skilled artisans take pride in their work, ensuring exceptional quality in every stitch.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-md mb-6">Our Values</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl mb-2">Sustainable Practices</h3>
                  <p className="text-gray-700">
                    We're committed to minimizing our environmental footprint through thoughtful material choices, zero-waste pattern cutting, and plastic-free packaging.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-serif text-xl mb-2">Ethical Production</h3>
                  <p className="text-gray-700">
                    We ensure fair wages and safe working conditions for all artisans involved in creating our pieces. We believe beautiful things should come from beautiful practices.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-serif text-xl mb-2">Timeless Design</h3>
                  <p className="text-gray-700">
                    We create pieces meant to be loved for years, not seasons. Our designs transcend fast fashion trends in favor of enduring style and quality.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1593642532781-03e79bf5bec2?q=80&w=3087&auto=format&fit=crop" 
                alt="Sustainable materials" 
                className="rounded-sm w-full h-64 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1594641333943-a7877a82f892?q=80&w=3087&auto=format&fit=crop" 
                alt="Artisan craftsmanship" 
                className="rounded-sm w-full h-64 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=3006&auto=format&fit=crop" 
                alt="Ethical production" 
                className="rounded-sm w-full h-64 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=3087&auto=format&fit=crop" 
                alt="Timeless design" 
                className="rounded-sm w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Join Our Community */}
      <Newsletter />
      
      <Footer />
    </div>
  );
};

export default About;
