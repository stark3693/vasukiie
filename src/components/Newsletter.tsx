
import React from "react";

const Newsletter = () => {
  return (
    <section className="py-16 bg-boutique-cream">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="heading-md mb-4">Join Our Community</h2>
          <p className="mb-6 text-boutique-taupe/80">
            Subscribe to our newsletter for early access to new collections, special offers, and artisanal stories.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 flex-grow border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-boutique-taupe"
              required
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </form>
          
          <p className="mt-4 text-xs text-gray-500">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
