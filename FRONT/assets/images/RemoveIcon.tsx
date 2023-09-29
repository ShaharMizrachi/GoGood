import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const RemoveIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={11}
    fill="none"
    {...props}>
    <Path
      fill="#000"
      fillRule="evenodd"
      d="M5.768 5.5 9.84 1.427a.543.543 0 1 0-.768-.768L5 4.732.927.66a.543.543 0 1 0-.768.768L4.232 5.5.16 9.573a.543.543 0 1 0 .768.768L5 6.268l4.073 4.073a.542.542 0 0 0 .768 0 .543.543 0 0 0 0-.768L5.768 5.5"
      clipRule="evenodd"
    />
  </Svg>
);
export default RemoveIcon;
