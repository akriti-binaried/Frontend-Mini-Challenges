import React, { useState } from "react";

const faqs = [
  {
    question: "Do I have to allow the use of cookies?",
    answer: "Yes, cookies help us improve your experience on the site."
  },
  {
    question: "How do I change my My Page password?",
    answer: "You can change your password by going to Settings > Account."
  },
  {
    question: "What is BankID?",
    answer: "BankID is a secure way to identify yourself online."
  },
  {
    question: "Whose birth number can I use?",
    answer: "Use your own personal birth number for registration."
  },
  {
    question: "When do I receive a password ordered by letter?",
    answer: "The password will be delivered within 5–7 business days."
  }
];

const Accordion = () => {
  const [multipleOpen, setMultipleOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null); 
  const [openIndexes, setOpenIndexes] = useState([]); 

  const toggleAccordion = (idx) => {
    if (multipleOpen) {
     
      if (openIndexes.includes(idx)) {
        setOpenIndexes(openIndexes.filter(i => i !== idx));
      } else {
        setOpenIndexes([...openIndexes, idx]);
      }
    } else {
      
      setOpenIndex(openIndex === idx ? null : idx);
    }
  };

  const isOpen = (idx) => {
    return multipleOpen ? openIndexes.includes(idx) : openIndex === idx;
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="flex items-center mb-4">
        
        <label htmlFor="multipleOpen" className="font-bold">
          Is multiple open accordion allowed?
        </label>
        <input
          type="checkbox"
          id="multipleOpen"
          className="mr-2"
          checked={multipleOpen}
          onChange={() => {
            setMultipleOpen(!multipleOpen);
            setOpenIndexes([]);
            setOpenIndex(null);
          }}
        />
      </div>

      <div className="space-y-2">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border border-gray-300  overflow-hidden">
            <button
              onClick={() => toggleAccordion(idx)}
              className="w-full flex justify-between items-center p-4"
            >
              <span className="text-black font-bold">{faq.question}</span>
              <span className="text-xl white  w-8 h-8 rounded-full bg-gray-200 ">
                {isOpen(idx) ? "-" : "+"}
              </span>
            </button>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen(idx) ? "max-h-96 p-4" : "max-h-0 p-0"
              } bg-white text-black`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
