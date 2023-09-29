import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const AlertBox = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={16}
    fill="none"
    {...props}>
    <Path
      stroke="red"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.5 14.667a6.667 6.667 0 1 0 0-13.333 6.667 6.667 0 0 0 0 13.333ZM8.5 5.333V8M8.5 10.666h.007"
    />
  </Svg>
);
export default AlertBox;
