import React from 'react';
import house from '../../image/house.png';

function ImageComponent({ src, alt }) {
  return <img src={house} alt={alt}  style={{ width: '70px', height: '65px' }} />;
}

export default ImageComponent;
