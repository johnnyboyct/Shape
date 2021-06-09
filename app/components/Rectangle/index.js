import React, { useState } from 'react';

const Rectangle = props => {
  const [position, setPosition] = useState({
    x: 100,
    y: 100,
    active: false,
    offset: {},
    rgb: { r: 255, g: 255, b: 255 },
    isDragging: false,
  });

  const xyToRGB = (x, y) => {
    const t = (x & 0xfff) | ((y << 12) & 0xfff);

    const rgb = [
      Math.round((x / screen.width) * 200),
      Math.round((y / screen.height) * 200),
      0,
    ];
    return `rgb(${rgb.join(',')})`;
  };
  const handlePointerDown = e => {
    const el = e.target;
    const bbox = e.target.getBoundingClientRect();
    const x = e.clientX - bbox.left;
    const y = e.clientY - bbox.top;
    el.setPointerCapture(e.pointerId);
    setPosition({
      ...position,
      active: true,
      offset: {
        x,
        y,
      },
    });
  };
  const handlePointerMove = e => {
    const bbox = e.target.getBoundingClientRect();
    const x = e.clientX - bbox.left;
    const y = e.clientY - bbox.top;
    if (position.active) {
      setPosition({
        ...position,
        x: position.x - (position.offset.x - x),
        y: position.y - (position.offset.y - y),
        rgb: xyToRGB(position.x, position.y),
        isDragging: true,
      });
    }
  };
  const handlePointerUp = e => {
    setPosition({
      ...position,
      active: false,
    });
  };

  return (
    <svg
      width="1000"
      height="1000"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onMouseMove={handlePointerMove}
    >
      <rect x={position.x} y={position.y} r={50} fill={position.rgb} width="100" height="100" />
    </svg>
  );
};
export default Rectangle;
