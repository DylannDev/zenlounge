import React from "react";

interface LoaderProps {
  text?: string;
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ text, fullScreen = false }) => {
  return fullScreen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 border-4 border-brown-dark border-b-transparent rounded-full animate-spin"></div>
        {text && <p className="text-brown-dark font-bold text-base">{text}</p>}
      </div>
    </div>
  ) : (
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 border-4 border-brown-dark border-b-transparent rounded-full animate-spin"></div>
      {text && <p className="text-brown-dark font-bold text-base">{text}</p>}
    </div>
  );
};

export default Loader;
