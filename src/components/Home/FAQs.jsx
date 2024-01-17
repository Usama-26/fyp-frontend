import React, { useState } from "react";

const faqs = [
  {
    question: "How do I create an account?",
    answer: "You can create an account by clicking the 'Sign Up' button on the top right corner of the website. Follow the steps to complete the registration process.",
  },
  {
    question: "How can I post a project or gig?",
    answer: "After logging in, go to your dashboard and click on 'Post a Project' or 'Create a Gig.' Fill in the required details, and your project or gig will be live on our platform.",
  },
  {
    question: "What payment methods are supported?",
    answer: "We support various payment methods, including credit cards, PayPal, and more. You can choose your preferred payment option during the transaction process.",
  },
  {
    question: "How does the rating system work?",
    answer: "Both clients and freelancers can rate each other after completing a project. Ratings help build trust within our community. Higher ratings reflect a positive experience.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we take data security seriously. We use industry-standard encryption and security measures to protect your information. You can learn more in our Privacy Policy.",
  },
];

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium">{question}</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={`w-6 h-6 transform ${
            isOpen ? "rotate-180" : "rotate-0"
          } transition-transform ease-in-out duration-500`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      <div
        className={`mt-2 text-neutral-600 overflow-hidden transition-max-h ${
          isOpen ? "max-h-48" : "max-h-0"
        } ease-in-out duration-500`}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default function FAQs() {
  return (
    <section className="bg-neutral-50 py-16">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-medium mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
