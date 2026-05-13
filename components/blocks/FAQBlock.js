'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function FAQBlock({ data }) {
  const [openIndex, setOpenIndex] = useState(0);

  const totalFaqs = Number(data.faqs || 0);

  const faqs = Array.from({ length: totalFaqs }, (_, index) => ({
    question: data[`faqs_${index}_question`],
    answer: data[`faqs_${index}_answer`],
  }));

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[linear-gradient(90deg,#ffffff_0%,#f8fbf9_45%,#edf8f3_100%)] py-28">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-teal-200/20 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          {data.eyebrow && (
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              <p className="text-xs uppercase tracking-[0.35em] text-gray-500">
                {data.eyebrow}
              </p>
            </div>
          )}

          {data.heading && (
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-[#10231d] via-teal-700 to-lime-600 bg-clip-text text-transparent">
                {data.heading}
              </span>
            </h2>
          )}

          {data.description && (
            <p className="text-lg text-gray-600 mt-8 leading-relaxed">
              {data.description}
            </p>
          )}
        </div>

        <div className="space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="rounded-3xl border border-white/70 bg-white/80 backdrop-blur-xl shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between px-8 py-6 text-left"
                >
                  <h3 className="text-xl font-semibold text-[#10231d]">
                    {faq.question}
                  </h3>

                  <div className="text-teal-600">
                    {isOpen ? <Minus size={24} /> : <Plus size={24} />}
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-8 pb-8 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}