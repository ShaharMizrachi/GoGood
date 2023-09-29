import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';
const ArchiveIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={21}
    fill="none"
    {...props}>
    <G
      stroke="#69D7C7"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      clipPath="url(#a)">
      <Path d="M18.875 7v11.375H3.125V7M20.625 2.625H1.375V7h19.25V2.625ZM9.25 10.5h3.5" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.5 0h21v21H.5z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default ArchiveIcon;
