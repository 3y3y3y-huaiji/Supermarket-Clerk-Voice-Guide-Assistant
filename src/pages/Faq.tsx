import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { faqs } from '../data/guideData';

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="mb-4">
      <button
        onClick={onClick}
        className="w-full bg-white text-left rounded-xl shadow-lg p-6 flex justify-between items-center hover:bg-gray-50 transition-colors duration-300"
      >
        <span className="text-xl font-bold text-gray-800">{question}</span>
        <span className="text-2xl font-bold text-blue-500">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <div className="bg-white rounded-b-xl shadow-lg p-6 mt-1">
          <p className="text-xl text-gray-700">{answer}</p>
        </div>
      )}
    </div>
  );
};

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            常见问题
          </h1>
          <p className="text-xl text-gray-600">
            补货过程中可能遇到的问题及解决方案
          </p>
        </div>

        {/* 返回首页 */}
        <Link
          to="/"
          className="inline-block mb-8 bg-blue-500 text-white font-bold text-lg py-2 px-6 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300"
        >
          ← 返回首页
        </Link>

        {/* 常见问题列表 */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FaqItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => toggleFaq(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;