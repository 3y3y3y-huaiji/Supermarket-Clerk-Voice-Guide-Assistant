import React from 'react';
import { Link } from 'react-router-dom';
import { steps, stepColors } from '../data/guideData';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            超市补货流程指南
          </h1>
          <p className="text-xl text-gray-600">
            为轻度心智障碍者设计的简单步骤指南
          </p>
        </div>

        {/* 步骤卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Link
              key={step.id}
              to={`/step/${step.id}`}
              className={`${stepColors[index % stepColors.length]} rounded-2xl shadow-lg p-8 text-white transition-transform duration-300 hover:scale-105 hover:shadow-xl`}
            >
              <div className="text-6xl font-bold mb-4">
                {step.id}
              </div>
              <div className="text-2xl font-bold">
                {step.title}
              </div>
            </Link>
          ))}
        </div>

        {/* 常见问题链接 */}
        <div className="mt-16 text-center">
          <Link
            to="/faq"
            className="inline-block bg-orange-500 text-white font-bold text-xl py-4 px-8 rounded-full shadow-lg hover:bg-orange-600 transition-colors duration-300"
          >
            常见问题
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;