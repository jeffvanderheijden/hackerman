import React from 'react';

const ParallaxLayer = ({ image, speed, opacity, zIndex, offset = 0 }) => {
  const layerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundImage: `url(${image})`,
    backgroundRepeat: 'repeat-x',
    backgroundSize: 'auto 100%',
    backgroundPosition: `${-offset * speed}px center`, // will be adjusted in parent
    opacity: opacity || 1,
    zIndex: zIndex || 0,
    pointerEvents: 'none'
  };

  return <div style={layerStyle} />;
};

export default ParallaxLayer;
