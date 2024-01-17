import React from 'react';

const testimonials = [
  {
    id: 1,
    name: "Allan Collins",
    content: "The freelance developers here are top-notch. I was able to launch my app in record time with the expertise I found on this platform.",
    image: "/images/home/t1.jpg",
  },
  {
    id: 2,
    name: "Clay Washington",
    content: "Our rebranding campaign was a huge success. The graphic designers and marketing experts I hired from this site were exceptional.",
    image: "/images/home/t2.jpg",
  },
  {
    id: 3,
    name: "Tanya Garrett",
    content: "Whenever I need a technical writer to guest post on my blog, I turn to this site. The quality of work I receive is always superb.",
    image: "/images/home/t3.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-10">What our clients say about us.</h2>
        <div className="flex justify-center items-stretch space-x-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="flex-1 max-w-sm">
              <div className="testimonial-card bg-gray-100 p-6 rounded-lg shadow-md text-center flex flex-col justify-between" style={{ height: '210px' }}>
                <blockquote className="relative text-gray-600 mb-4">
                  <svg className="absolute left-0 -top-2 h-6 w-6 text-blue-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    {/* SVG path for quote mark */}
                  </svg>
                  <p className="pl-8 italic">{testimonial.content}</p>
                </blockquote>
                <div className="testimonial-author flex items-center mt-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="rounded-full w-12 h-12 mr-4"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold">{testimonial.name}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Get a Quote
          </button>
        </div>
      </div>
    </section>
  );
}
