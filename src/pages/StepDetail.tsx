import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { steps, stepColors } from '../data/guideData';
import { useSpeech } from '../hooks/useSpeech';

const StepDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const stepId = parseInt(id || '1', 10);
  const [currentStep, setCurrentStep] = useState(steps[0]);
  const { speak, isSpeaking, stop } = useSpeech();

  // 加载当前步骤数据
  useEffect(() => {
    const step = steps.find(s => s.id === stepId);
    if (step) {
      setCurrentStep(step);
    } else {
      navigate('/');
    }
  }, [stepId, navigate]);

  // 导航到上一步
  const goToPreviousStep = () => {
    const previousId = stepId > 1 ? stepId - 1 : steps.length;
    navigate(`/step/${previousId}`);
  };

  // 导航到下一步
  const goToNextStep = () => {
    const nextId = stepId < steps.length ? stepId + 1 : 1;
    navigate(`/step/${nextId}`);
  };

  // 播放语音
  const handlePlay = () => {
    speak(currentStep.description);
  };

  // 停止语音
  const handleStop = () => {
    stop();
  };

  const stepIndex = stepId - 1;
  const bgColor = stepColors[stepIndex % stepColors.length];

  return (
    <div className={`min-h-screen ${bgColor} py-12 px-4 sm:px-6 lg:px-8 text-white`}>
      <div className="max-w-4xl mx-auto">
        {/* 返回首页 */}
        <Link
          to="/"
          className="inline-block mb-8 bg-white text-gray-800 font-bold text-lg py-2 px-6 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300"
        >
          ← 返回首页
        </Link>

        {/* 步骤编号 */}
        <div className="text-center mb-8">
          <div className="text-8xl font-bold mb-4">
            {currentStep.id}
          </div>
          <div className="text-4xl font-bold">
            {currentStep.title}
          </div>
        </div>

        {/* 步骤说明 */}
        <div className="bg-white text-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <p className="text-2xl md:text-3xl font-bold text-center">
            {currentStep.description}
          </p>
        </div>

        {/* 语音播报按钮 */}
        <div className="text-center mb-12">
          <button
            onClick={isSpeaking ? handleStop : handlePlay}
            className="bg-orange-500 text-white font-bold text-2xl py-4 px-8 rounded-full shadow-lg hover:bg-orange-600 transition-colors duration-300"
          >
            {isSpeaking ? '停止播放' : '播放语音'}
          </button>
        </div>

        {/* 导航按钮 */}
        <div className="flex justify-between">
          <button
            onClick={goToPreviousStep}
            className="bg-white text-gray-800 font-bold text-xl py-3 px-6 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300"
          >
            上一步
          </button>
          <button
            onClick={goToNextStep}
            className="bg-white text-gray-800 font-bold text-xl py-3 px-6 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300"
          >
            下一步
          </button>
        </div>

        {/* 常见问题链接 */}
        <div className="mt-12 text-center">
          <Link
            to="/faq"
            className="inline-block bg-white text-gray-800 font-bold text-xl py-3 px-6 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300"
          >
            查看常见问题
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StepDetail;