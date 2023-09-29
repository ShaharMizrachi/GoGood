import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
const CheckedIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    viewBox="0 0 24 24"
    {...props}>
    <Circle cx={11.693} cy={12.137} r={10} fill="#30BDA9" stroke="#fff" />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M22 4 12 14.01l-3-3"
    />
  </Svg>
);
export default CheckedIcon;
