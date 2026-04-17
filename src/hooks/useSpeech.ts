import { useState } from 'react';

interface UseSpeechReturn {
  speak: (text: string) => void;
  isSpeaking: boolean;
  stop: () => void;
}

export const useSpeech = (): UseSpeechReturn => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  let speechInstance: SpeechSynthesisUtterance | null = null;

  const speak = (text: string) => {
    // 停止之前的语音
    window.speechSynthesis.cancel();
    
    // 创建新的语音实例
    speechInstance = new SpeechSynthesisUtterance(text);
    speechInstance.lang = 'zh-CN';
    speechInstance.rate = 0.9; // 语速稍慢，更清晰
    speechInstance.pitch = 1.1; // 音调稍高，更友好
    speechInstance.volume = 1; // 音量最大

    // 开始播放
    setIsSpeaking(true);
    window.speechSynthesis.speak(speechInstance);

    // 播放结束时更新状态
    speechInstance.onend = () => {
      setIsSpeaking(false);
    };

    // 播放出错时更新状态
    speechInstance.onerror = () => {
      setIsSpeaking(false);
    };
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return {
    speak,
    isSpeaking,
    stop
  };
};