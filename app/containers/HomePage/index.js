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
        <h1>Some test... Create a page to display a draggable shape </h1>
        <Shapes position={{ x: 20, y: 20 }} radius={20} />
      </div>
    </>
  );
}
