import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Plus = ({ fillColor }) => (
  <Svg viewBox="0 0 32 32" fill={fillColor ? fillColor : 'gray'}>
    <Path
      id="plus"
      d="M27,14v4a1,1,0,0,1-1,1H19v7a1,1,0,0,1-1,1H14a1,1,0,0,1-1-1V19H6a1,1,0,0,1-1-1V14a1,1,0,0,1,1-1h7V6a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v7h7A1,1,0,0,1,27,14Z"
    />
  </Svg>
);

export default Plus;
