import React from 'react';

const Tile = ({ size }) => (
    <div
        style={{
            width: size,
            height: size,
            // backgroundColor: '#222',
            // border: '1px solid #444',
            flexShrink: 0,
        }}
    />
);

export default Tile;
