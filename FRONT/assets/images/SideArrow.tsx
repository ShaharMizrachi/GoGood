import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SideArrow = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    {...props}>
    <Path
      fill="#1A1919"
      fillRule="evenodd"
      d="M15.822 3c.172 0 .344.07.476.209.267.28.27.74.007 1.027L9.63 11.5l6.676 7.265a.763.763 0 0 1-.007 1.026.647.647 0 0 1-.958-.007l-7.145-7.775a.764.764 0 0 1 0-1.018l7.145-7.774A.654.654 0 0 1 15.822 3Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SideArrow;
