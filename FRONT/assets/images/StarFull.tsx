import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const StarFull = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={15}

    viewBox="0 0 22 22"
    fill="none"
    {...props}>
    <Path
      fill="#69D7C7"
      d="M11.02 1.17a.4.4 0 0 1 .76 0l2.225 6.845a.4.4 0 0 0 .38.277h7.197a.4.4 0 0 1 .235.723l-5.822 4.23a.4.4 0 0 0-.145.448l2.223 6.844a.4.4 0 0 1-.615.448l-5.822-4.23a.4.4 0 0 0-.47 0l-5.823 4.23a.4.4 0 0 1-.616-.448l2.224-6.844a.4.4 0 0 0-.145-.447L.984 9.016a.4.4 0 0 1 .235-.724h7.197a.4.4 0 0 0 .38-.277l2.224-6.844Z"
    />
  </Svg>
);
export default StarFull;
