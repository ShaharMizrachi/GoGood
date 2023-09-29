import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const GoTo = () => (
  <Svg width={24} height={24} fill="none">
    <Path
      fill="#313131"
      d="M8 8.4V16c0 .283-.096.52-.287.712A.968.968 0 0 1 7 17a.968.968 0 0 1-.713-.288A.967.967 0 0 1 6 16V6a.97.97 0 0 1 .287-.713A.97.97 0 0 1 7 5h10c.283 0 .52.096.712.287.192.192.288.43.288.713a.968.968 0 0 1-.288.713A.967.967 0 0 1 17 7H9.4l8.9 8.9a.948.948 0 0 1 .275.7.948.948 0 0 1-.275.7.948.948 0 0 1-.7.275.948.948 0 0 1-.7-.275L8 8.4Z"
    />
  </Svg>
);
export default GoTo;
