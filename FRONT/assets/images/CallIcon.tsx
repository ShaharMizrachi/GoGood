import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const CallIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={19}
    fill="none"
    {...props}>
    <Path
      fill="#fff"
      d="M18.525 14.388a5.072 5.072 0 0 1-5.025 4.425C6.16 18.813.187 12.84.187 5.5A5.072 5.072 0 0 1 4.612.475a1.312 1.312 0 0 1 1.36.788L7.856 5.66a1.322 1.322 0 0 1-.103 1.237L6.187 9.278a.197.197 0 0 0-.009.178 7.33 7.33 0 0 0 3.394 3.385.178.178 0 0 0 .178-.019l2.353-1.565a1.294 1.294 0 0 1 1.238-.113l4.397 1.884a1.313 1.313 0 0 1 .787 1.36Zm-1.116-.14a.188.188 0 0 0-.112-.188L12.9 12.175a.196.196 0 0 0-.178.019l-2.344 1.566a1.331 1.331 0 0 1-1.294.093 8.512 8.512 0 0 1-3.918-3.909A1.312 1.312 0 0 1 5.25 8.66l1.556-2.382a.178.178 0 0 0 .019-.178L4.941 1.703a.188.188 0 0 0-.17-.112h-.018a3.956 3.956 0 0 0-3.44 3.91A12.197 12.197 0 0 0 13.5 17.687a3.956 3.956 0 0 0 3.91-3.44Z"
    />
  </Svg>
);
export default CallIcon;
