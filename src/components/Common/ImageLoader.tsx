import React from 'react';

interface Props {
  value: { icon: string; description: string };
}

const ImageLoader: React.FunctionComponent<Props> = ({ value }) => {
  return value ? (
    <img
      src={`https://openweathermap.org/img/wn/${value.icon}@2x.png`}
      alt={value.description}
      className='weather-icon'
    />
  ) : (
    <div className='loading-icon'>
      <div className='loader' />
    </div>
  );
};

export default ImageLoader;
