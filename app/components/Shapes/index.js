import React, { useCallback, useEffect, useState } from 'react';
import Circle from '../Circle';
import Ellipse from '../Ellipse';
import Rectangle from '../Rectangle';
import { useFetch } from '../../hooks/useFetch';
const url = '/api/shapes';
const xyToRGB = (x, y) => {
  const t = (x & 0xfff) | ((y << 12) & 0xfff);

  return {
    r: t & 0xff,
    g: (t >> 8) & 0xff,
    b: (t >> 16) & 0xff,
  };
};
function Shapes({ position, radius }) {
  const [showCircle, setShowCircle] = useState(false);
  const [showRectangle, setShowRectangle] = useState(false);
  const [showEllipse, setShowEllipse] = useState(false);
  const [data, loading] = useFetch(url);
  const [state, setState] = useState({
    isDragging: false,
    translateX: position.x,
    translateY: position.y,
    rgb: xyToRGB(position.x, position.y),
  });
  const handleChange = event => {
    let cir;
    cir = event.target.value;
    if (cir === 'Circle') {
      setShowCircle(true);
      setShowRectangle(false);
      setShowEllipse(false);
    } else if (cir === 'Rectangle') {
      setShowRectangle(true);
      setShowCircle(false);
      setShowEllipse(false);
    } else if (cir === 'Ellipse') {
      setShowEllipse(true);
      setShowCircle(false);
      setShowRectangle(false);
    }
  };

  // mouse move
  const handleMouseMove = useCallback(
    ({ clientX, clientY }) => {
      if (state.isDragging) {
        setState(prevState => ({
          ...prevState,
          translateX: clientX,
          translateY: clientY,
          rgb: xyToRGB(clientX, clientY),
        }));
      }
    },
    [state.isDragging],
  );



  // mouse left click release
  const handleMouseUp = useCallback(() => {
    if (state.isDragging) {
      setState(prevState => ({
        ...prevState,
        isDragging: false,
      }));
    }
  }, [state.isDragging]);

  // mouse left click hold
  const handleMouseDown = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      isDragging: true,
    }));
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div>
      {loading ? (
        <div> Loading ...</div>
      ) : (
        <select
          onChange={handleChange}
          name="shapes"
          id="shapes"
          className="select"
        >
          <option key="45678">--Please select a shape--</option>

          {data.shapes.map(d => (
            <option key={`${d}`} value={d}>
              {d}
            </option>
          ))}
        </select>
      )}
      <div className="shapes-body">
        {showCircle ? (
          <Circle
            isDragging={state.isDragging}
            onMouseDown={handleMouseDown}
            radius={radius}
            onDrag={handleMouseMove}
            fill={state.rgb}
            x={state.translateX}
            y={state.translateY}
          />
        ) : (
          ''
        )}

        {showRectangle ? (
          <Rectangle
            isDragging={state.isDragging}
            onMouseDown={handleMouseDown}
            radius={radius}
            onDrag={handleMouseMove}
            fill={state.rgb}
            onMouseMove={handleMouseMove}
            x={state.translateX}
            y={state.translateY}
          />
        ) : (
          ''
        )}

        {showEllipse ? (
          <Ellipse
            isDragging={state.isDragging}
            onMouseDown={handleMouseDown}
            radius={radius}
            onMouseMove={handleMouseMove}
            fill={state.rgb}
            onDrag={handleMouseMove}
            x={state.translateX}
            y={state.translateY}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Shapes;
