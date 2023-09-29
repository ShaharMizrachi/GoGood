import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const StarEmpty = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={15}

    viewBox="0 0 22 22"
    fill="none"
    {...props}>
    <Path
      fill="#69D7C7"
      fillOpacity={0.05}
      stroke="#30BDA9"
      strokeWidth={0.8}
      d="m11.4 1.294 2.224 6.845a.8.8 0 0 0 .761.553h7.197l-5.822 4.23a.8.8 0 0 0-.291.894l2.224 6.845-5.822-4.23a.8.8 0 0 0-.94 0l-5.823 4.23 2.224-6.845a.8.8 0 0 0-.29-.894l-5.823-4.23h7.197a.8.8 0 0 0 .76-.553L11.4 1.294Z"
    />
  </Svg>
);
export default StarEmpty;
