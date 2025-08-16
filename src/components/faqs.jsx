import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is OccupiX?",
    answer: "OccupiX is a smart classroom and event management system built by college students to optimize campus workflows and space usage.",
  },
  {
    question: "Who can use OccupiX?",
    answer: "Students, teachers, and admins can all use OccupiX to check classroom occupancy, manage events, and streamline campus activities.",
  },
  {
    question: "Do I need to pay to use OccupiX?",
    answer: "No! OccupiX is a free student project designed for learning and campus productivity.",
  },
  {
    question: "Can I book classrooms or halls for events?",
    answer: "Yes! OccupiX allows you to efficiently manage bookings for classrooms, staffrooms, canteens, and event halls.",
  },
  {
    question: "Is my data secure?",
    answer: "OccupiX implements basic security measures like authentication, role-based access, and secure data handling to protect sensitive information.",
  },
  {
    question: "Can I contribute to OccupiX?",
    answer: "Absolutely! You can reach out to the team via the contact section or check out our GitHub repository to suggest improvements.",
  }
];

export const Faqs = () => {
    const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-[#0a7a1e] rounded-lg shadow-sm transition-all duration-200"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center text-left px-4 py-3 font-medium text-lg hover:cursor-pointer"
            >
              <span>{faq.question}</span>
              <ChevronDown
                className={`transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""}`}
              />
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-gray-700 text-base">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}