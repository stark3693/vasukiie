
import React from "react";

const testimonials = [
  {
    quote: "The quality of my dress exceeds all expectations. It's become my favorite piece and I receive compliments whenever I wear it.",
    author: "Sarah J.",
    location: "New York"
  },
  {
    quote: "The attention to detail in these handcrafted pieces is simply remarkable. My home feels so much warmer with these beautiful decorations.",
    author: "Michael T.",
    location: "California"
  },
  {
    quote: "I'm amazed by how unique each item is. These aren't mass-produced pieces - they truly feel special and one-of-a-kind.",
    author: "Emily R.",
    location: "London"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-boutique-navy text-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">What Our Customers Say</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Hear from our community of satisfied customers who love their handcrafted pieces
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white/10 backdrop-blur-sm p-8 rounded-sm border border-white/20"
            >
              <svg className="w-10 h-10 text-boutique-rose mb-4" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p className="italic mb-6 leading-relaxed">{testimonial.quote}</p>
              <div className="font-medium">{testimonial.author}</div>
              <div className="text-sm text-white/70">{testimonial.location}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
