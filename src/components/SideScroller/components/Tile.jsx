import React from 'react';

const Tile = ({ size }) => (
    <div
        style={{
            width: size,
            height: size,
            flexShrink: 0,
        }}
    />
);

export default Tile;
