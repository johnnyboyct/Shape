/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import Shapes from '../../components/Shapes';
import GlobalStyle from '../../global-styles';
export default function HomePage() {
  return (
    <>
      <div>
        <GlobalStyle />
        <h1>Some test...</h1>
        <h6>
          Create a web page using React to display a draggable shape in the
          middle of the screen. The shape should change color as it moves from
          the center to the edge of the screen. Allow user to choose the type of
          shape from a dropdown list. The list should be populated on page load
          via API call.
        </h6>
        <Shapes position={{ x: 20, y: 20 }} radius={20} />
      </div>
    </>
  );
}
