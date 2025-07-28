"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "Do you take reservations?",
    answer:
      "Yes, we accept reservations for parties up to 12 people. Larger groups should contact us directly for special arrangements.",
  },
  {
    question: "What are your opening hours?",
    answer:
      "We're open Monday-Friday 7:30am-4:00pm for dine-in and 7:00am-4:00pm for takeaway. Weekend hours are 7:30am-4:00pm for both dine-in and takeaway.",
  },
  {
    question: "Do you offer catering services?",
    answer:
      "Yes, we provide catering for corporate events, private parties, and special occasions. Contact us for custom menu options and pricing.",
  },
  {
    question: "Is there parking available?",
    answer:
      "Street parking is available around our location. We also have partnerships with nearby parking facilities for extended stays.",
  },
  {
    question: "Do you accommodate dietary restrictions?",
    answer:
      "We offer vegan, gluten-free, and dairy-free options. Please inform our staff of any allergies or dietary requirements.",
  },
];

export default function FAQsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faqs" className="bg-white py-12 lg:py-20">
      <div className="max-w-[800px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-[32px] font-bold tracking-[1.5px] text-black mb-6 animate-fade-in-up">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p
            className="text-[14px] text-gray-600 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Everything you need to know about visiting Foreigner Cafe
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-[14px] font-medium text-black tracking-[0.5px]">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-[#1a3d2e]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#1a3d2e]" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-[12px] text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
