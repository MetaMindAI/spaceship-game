import React, { useEffect } from 'react';

interface MessageBoxProps {
  title: string;
  text: string;
  buttonText: string;
  secondaryButtonText?: string;
  onClose: () => void;
  onSecondaryClick?: () => void;
  onShow?: () => void;
}

export const MessageBox: React.FC<MessageBoxProps> = ({
  title,
  text,
  buttonText,
  secondaryButtonText,
  onClose,
  onSecondaryClick,
  onShow,
}) => {
  useEffect(() => {
    onShow?.();
  }, [onShow]);

  return (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        bg-black/90 text-white p-12 rounded-3xl text-center z-10 min-w-[500px] shadow-2xl
        animate-fade-scale"
    >
      <h2 
        className="text-5xl font-bold mb-8 animate-slide-down"
      >
        {title}
      </h2>
      <p 
        className="mb-10 text-2xl animate-slide-up"
      >
        {text}
      </p>
      <div className="flex gap-4 justify-center">
        <button
          className="bg-[#4CAF50] text-white px-10 py-4 text-3xl font-bold rounded-xl 
            hover:bg-[#45a049] transition-all duration-200 shadow-lg
            hover:scale-105 active:scale-95 transform"
          onClick={onClose}
        >
          {buttonText}
        </button>
        {secondaryButtonText && onSecondaryClick && (
          <button
            className="bg-[#f44336] text-white px-10 py-4 text-3xl font-bold rounded-xl 
              hover:bg-[#d32f2f] transition-all duration-200 shadow-lg
              hover:scale-105 active:scale-95 transform"
            onClick={onSecondaryClick}
          >
            {secondaryButtonText}
          </button>
        )}
      </div>
    </div>
  );
}