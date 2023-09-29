import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
const EditPenIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}>
    <Rect width={35.1} height={35.1} fill="#69D7C7" rx={17.55} />
    <Path
      fill="#fff"
      d="M10 25.1h1.4l8.625-8.625-1.4-1.4L10 23.7v1.4Zm14.3-10.075-4.25-4.2L22.875 8l4.225 4.225-2.8 2.8ZM8 27.1v-4.25l10.6-10.6 4.25 4.25-10.6 10.6H8Zm11.325-11.325-.7-.7 1.4 1.4-.7-.7Z"
    />
  </Svg>
);
export default EditPenIcon;
