import React from 'react';
import { SkewLoader } from 'react-spinners';

const GlobalLoader = () => {
  return (
    <div className="h-screen w-screen bg-blue-50 flex items-center justify-center fixed top-0 left-0">
      <SkewLoader color="#0C53B7" size={36} />
    </div>
  );
};

export default GlobalLoader;
