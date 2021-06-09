import React, { useState } from 'react';
const xyToRGB = (x, y) => {
  const rgb = [
    Math.round((x / screen.width) * 200),
    Math.round((y / screen.height) * 200),
    0,
  ];
  return `rgb(${rgb.join(',')})`;
};
const Ellipse = () => {
  const [position, setPosition] = useState({
    x: screen.width / 2,
    y: screen.height / 2 - 100,
    active: false,
    offset: {},

    rgb: xyToRGB(screen.width / 2, screen.height / 2 - 100),
    isDragging: false,
  });


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
      width={screen.width - 100}
      height={screen.height - 200}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onMouseMove={handlePointerMove}
    >
      <ellipse
        cx={position.x}
        cy={position.y}
        r={50}
        rx="100"
        ry="50"
        fill={position.rgb}
      />
    </svg>
  );
};
export default Ellipse;
