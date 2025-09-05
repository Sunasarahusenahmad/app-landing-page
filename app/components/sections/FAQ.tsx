"use client";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Is Gadiyo free to use?",
    answer:
      "Yes! Gadiyo offers a comprehensive free tier with all essential features. Premium features are available through our affordable subscription plans.",
  },
  {
    question: "Which platforms does Gadiyo support?",
    answer:
      "Gadiyo is available on iOS and Android. We also provide web support in the future.",
  },
  {
    question: "How secure is my data?",
    answer:
      "Your data security is our top priority. We use end-to-end encryption, secure cloud storage, and follow industry-standard security practices.",
  },
  {
    question: "Can I use Gadiyo offline?",
    answer:
      "Absolutely! Gadiyo is designed with offline-first architecture, allowing you to access and modify your data even without an internet connection.",
  },
  {
    question: "How do I get support?",
    answer:
      "We offer 24/7 customer support through in-app chat, email, and our comprehensive help center. Premium users get priority support.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative z-10 bg-[#F8FAFB] py-[110px] dark:bg-[#15182B]"
    >
      <div className="container">
        <div className="mx-auto mb-14 max-w-[690px] text-center lg:mb-[70px]">
          <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-body">
            Find answers to the most common questions about booking cars,
            managing your reservations, payments, and using Gadiyo. We’ve
            covered everything to make your journey simple and hassle-free.
          </p>
        </div>

        <div className="faqs mx-auto w-full max-w-[785px] rounded-lg bg-white px-6 py-[6px] shadow-card dark:bg-black dark:shadow-card-dark">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`faq border-b border-stroke last-of-type:border-none dark:border-stroke-dark ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="faq-btn relative flex w-full justify-between py-6 px-[18px] text-left text-base font-medium text-black dark:text-white sm:px-[26px] sm:text-lg"
              >
                {faq.question}
                {/* <span>{activeIndex === index ? "−" : "+"}</span> */}
              </button>
              {activeIndex === index && (
                <div className="faq-content h-auto overflow-hidden border-t border-stroke px-[18px] dark:border-stroke-dark sm:px-[26px]">
                  <p className="text-base text-body">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
