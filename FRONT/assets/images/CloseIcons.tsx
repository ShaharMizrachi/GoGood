import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const CloseIcons = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={17}
    fill="none"
    {...props}>
    <Path
      fill="#313131"
      fillRule="evenodd"
      d="m9.805 8.5 6.925-6.924A.922.922 0 1 0 15.424.27L8.5 7.195 1.576.27A.923.923 0 1 0 .27 1.576L7.195 8.5.27 15.425a.923.923 0 1 0 1.306 1.305L8.5 9.805l6.924 6.925a.92.92 0 0 0 1.306 0 .922.922 0 0 0 0-1.305L9.805 8.5Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default CloseIcons;
