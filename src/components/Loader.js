// src/components/HourglassLoader.js
import React from 'react';
import { Hourglass } from 'react-loader-spinner';

const Loader = ({ visible }) => {
  return (
    <div className='flex justify-center place-items-center  m-4  h-96'>
    <Hourglass
      visible={visible}
      height="120"
      width="120"
      ariaLabel="hourglass-loading"
      wrapperStyle={{}}
      wrapperClass=""
      colors={['#306cce', '#72a1ed']}
    />
    </div>
  );
};

export default Loader;
