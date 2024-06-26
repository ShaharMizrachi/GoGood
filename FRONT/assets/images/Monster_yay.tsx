import * as React from 'react';
import Svg, {Path, Mask, G} from 'react-native-svg';
const Monster_yay = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={97}
    height={117}
    fill="none"
    {...props}>
    <Path
      fill="#313131"
      fillRule="evenodd"
      d="M81.29 112.266c0 2.354-14.781 4.266-33.017 4.266-18.236 0-33.02-1.912-33.02-4.266 0-2.357 14.784-4.267 33.02-4.267 18.236 0 33.017 1.91 33.017 4.267Z"
      clipRule="evenodd"
      opacity={0.08}
    />
    <Path
      fill="#69D7C7"
      fillRule="evenodd"
      d="M83.621 62.387c-.61-.266-.671-1.54-.27-2.386.284-.596.94-1.278 1.434-1.125.483.148.589 1.024.625 1.321.04.326.108.89-.237 1.419-.342.522-1.07.98-1.552.77Z"
      clipRule="evenodd"
    />
    <Mask id="a" width={4} height={5} x={86} y={59} maskUnits="userSpaceOnUse">
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="m86.04 62.44 1.977 1.188 1.906-3.173-1.977-1.188-1.906 3.173Z"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill="#69D7C7"
        fillRule="evenodd"
        d="M86.908 62.959c-.534-.398-.306-1.652.277-2.385.41-.516 1.203-1.033 1.65-.772.437.254.343 1.13.31 1.429-.035.326-.096.891-.552 1.328-.45.431-1.264.713-1.685.4Z"
        clipRule="evenodd"
      />
    </G>
    <Path
      fill="#69D7C7"
      fillRule="evenodd"
      d="M89.119 64.383c-.152-.648.833-1.459 1.751-1.642.647-.13 1.586-.011 1.76.476.168.476-.47 1.084-.687 1.291-.237.226-.649.619-1.279.658-.623.038-1.425-.272-1.545-.783ZM90.4 67.409c.096-.66 1.308-1.055 2.23-.89.65.116 1.48.568 1.464 1.085-.016.505-.832.839-1.11.952-.303.124-.83.34-1.43.145-.594-.191-1.229-.773-1.153-1.292Z"
      clipRule="evenodd"
    />
    <Path
      fill="#30BDA9"
      fillRule="evenodd"
      d="M66.425 81.952c.279.49 1.325.83 9.89-1.58 7.912-2.225 9.911-3.329 11.665-4.77 2.503-2.056 3.287-3.798 3.57-4.525.222-.57 1.417-3.757-.183-6.78-.228-.43-.833-1.542-2.106-2.4-2.347-1.583-5.002-.977-5.611-.818a6.585 6.585 0 0 0-1.69.688c-3.115 1.882-5.325 5.922-8.456 9.82-1.123 1.4-3.165 3.776-5.825 7.57-1.059 1.51-1.543 2.284-1.254 2.795Z"
      clipRule="evenodd"
    />
    <Path
      fill="#69D7C7"
      fillRule="evenodd"
      d="M13.436 62.295c.619-.245.725-1.516.353-2.375-.263-.605-.894-1.31-1.394-1.175-.487.132-.624 1.003-.67 1.3-.051.323-.14.885.187 1.425.323.534 1.035 1.018 1.524.825Z"
      clipRule="evenodd"
    />
    <Mask id="b" width={5} height={5} x={7} y={59} maskUnits="userSpaceOnUse">
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M11.017 62.264 9 63.382l-1.795-3.238 2.017-1.118 1.795 3.238Z"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#b)">
      <Path
        fill="#69D7C7"
        fillRule="evenodd"
        d="M10.131 62.751c.548-.378.364-1.64-.193-2.392-.393-.531-1.167-1.075-1.623-.83-.445.239-.381 1.118-.36 1.417.024.327.065.895.506 1.347.435.447 1.238.757 1.67.458Z"
        clipRule="evenodd"
      />
    </G>
    <Path
      fill="#69D7C7"
      fillRule="evenodd"
      d="M7.872 64.098c.174-.643-.782-1.487-1.693-1.702-.642-.152-1.585-.067-1.775.414-.186.47.43 1.1.64 1.314.23.235.628.642 1.256.702.621.06 1.434-.221 1.572-.728ZM6.485 67.077c-.072-.662-1.27-1.1-2.197-.967-.653.093-1.5.516-1.501 1.034-.001.505.803.867 1.076.99.299.134.818.367 1.425.195.6-.171 1.254-.73 1.197-1.252Z"
      clipRule="evenodd"
    />
    <Path
      fill="#30BDA9"
      fillRule="evenodd"
      d="M29.938 82.448c-.295.48-1.353.783-9.828-1.924-7.83-2.5-9.79-3.672-11.492-5.174-2.43-2.142-3.153-3.91-3.41-4.647-.202-.577-1.285-3.804.42-6.77.243-.422.887-1.512 2.188-2.325 2.401-1.5 5.034-.801 5.636-.62a6.584 6.584 0 0 1 1.666.745c3.047 1.99 5.115 6.105 8.107 10.11 1.074 1.438 3.031 3.884 5.558 7.768 1.005 1.546 1.462 2.337 1.155 2.837ZM63.007 109.34c-1.064-1.989-4.814-2.367-6.9-2.575-.387-.039-.829-.063-.977-.076V90.674c-.148-.09-.493-.467-1.082-.515-.742-.06-1.254.452-1.313.516-.11 5.919-.235 11.837-.345 17.756-.006.105-.014.205-.012.297-.002.104-.007.208-.01.312l.03.075.011.096c.041.276.11.737.429 1.158.725.957 2.11.871 2.274.858 3.181.193 5.275.045 6.436-.085.536-.061 1.394-.181 1.63-.73.177-.408-.067-.878-.171-1.072ZM44.076 90.789a14297.452 14297.452 0 0 1 .057 16.355l-.002.015c.013.263.032.667.053 1.165.03.755.037 1.068-.058 1.488 0 0-.064.283-.157.514-.574 1.427-6.456 1.044-9.01.644-.417-.065-1.243-.209-1.56-.815-.138-.399-.138-.723-.072-.987.412-1.642 3.76-2.532 8.282-2.403l.086-16.005c.414-.474 1.024-.688 1.573-.543.456.12.718.447.808.572Z"
      clipRule="evenodd"
    />
    <Mask
      id="c"
      width={12}
      height={22}
      x={32}
      y={90}
      maskUnits="userSpaceOnUse">
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M32.531 90.172h10.92v21.165h-10.92V90.172Z"
        clipRule="evenodd"
      />
    </Mask>
    <Path
      fill="#69D7C7"
      fillRule="evenodd"
      d="M76.857 64.727c1.193-14.618-5.198-27.403-14.391-34.06l-2.022-1.333c-3.779-2.271-7.937-3.548-12.183-3.548-5.281 0-10.395 1.964-14.82 5.364l-1.684 1.39c-7.88 7.022-13.085 18.838-12.092 32.187.29 3.891 2.5 11.215 2.5 11.215l2.742 6.112c3.02 5.697 10.865 14.311 10.865 14.311l1.742 1.578c4.222 3.626 8.22 5.725 10.747 5.725 2.976 0 7.493-2.24 12.07-6.264l1.407-1.298s8.224-9.392 11.12-15.9l1.884-4.912s1.81-6.841 2.115-10.567Z"
      clipRule="evenodd"
    />
    <Mask
      id="d"
      width={58}
      height={79}
      x={19}
      y={25}
      maskUnits="userSpaceOnUse">
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M76.857 64.727c1.193-14.618-5.198-27.403-14.391-34.06l-2.022-1.333c-3.779-2.271-7.937-3.548-12.183-3.548-5.281 0-10.395 1.964-14.82 5.364l-1.684 1.39c-7.88 7.022-13.085 18.838-12.092 32.187.29 3.891 2.5 11.215 2.5 11.215l2.742 6.112c3.02 5.697 10.865 14.311 10.865 14.311l1.742 1.578c4.222 3.626 8.22 5.725 10.747 5.725 2.976 0 7.493-2.24 12.07-6.264l1.407-1.298s8.224-9.392 11.12-15.9l1.884-4.912s1.81-6.841 2.115-10.567Z"
        clipRule="evenodd"
      />
    </Mask>
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M58.89 46.322c3.788.368 8.163 3.832 8.699 10.471v2.211c-.497 6.357-5.295 14.194-19.32 24.027-14.017-9.833-18.817-17.67-19.314-24.027v-2.21c.53-6.64 4.911-10.104 8.695-10.472a17.78 17.78 0 0 1 1.747-.093c4.373 0 6.47 3.37 8.872 6.232 2.402-2.861 4.502-6.232 8.873-6.232.543 0 1.128.031 1.748.093Z"
      clipRule="evenodd"
    />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M52.383 59.534a1.5 1.5 0 1 1-3.002 0 1.5 1.5 0 0 1 3.002 0Z"
      clipRule="evenodd"
    />
    <Path
      fill="#69D7C7"
      fillRule="evenodd"
      d="M48.42 28.208a10.582 10.582 0 0 0-2.62-2.405c-2.347-1.505-4.444-1.473-4.422-1.904.02-.406 1.907-1 3.591-.39 1.858.674 2.568 2.484 2.693 2.82.07.185-.337-1.14-.469-2.663-.029-.329-.27-3.427 1.091-4.061.485-.227 1.17-.138 1.41.209.281.407-.106 1.094-.356 1.618-.434.91-.896 2.257-1.01 4.17a4.6 4.6 0 0 1 1.287-1.692c.168-.136 1.45-1.147 3.24-.998 1.091.091 2.343.612 2.32 1.055-.016.332-.744.548-1.335.724-1.463.434-2.17.19-2.92.392-.732.198-1.692.874-2.5 3.125ZM40.98 35.247c-.316-2.965-1.16-6.841-3.347-10.84a27.977 27.977 0 0 0-2.365-3.623c.253-.29-2.104 1.053-1.644.927a23.687 23.687 0 0 1 4.394 7.758 23.588 23.588 0 0 1 1.188 6.06l1.773-.282Z"
      clipRule="evenodd"
    />
    <Path
      fill="#69D7C7"
      fillRule="evenodd"
      d="M31.171 12.421c.885-.54 2.406-.504 3.612.853l.363.482c.934 1.465 1.175 3.959-.265 8.4-4.665.159-6.995-.76-8.146-2.062l-.363-.482c-.974-1.532-.588-3.005.175-3.706.125-.115.247-.217.365-.307.952-.717 1.962-.327 2.954-.098.054-1.017-.042-2.096.91-2.813.118-.089.25-.178.395-.267ZM65.681 11.6c-.92-.478-2.434-.335-3.543 1.103l-.328.505c-.83 1.527-.897 4.031.85 8.361 4.664-.167 6.925-1.246 7.982-2.625l.328-.505c.865-1.597.377-3.04-.433-3.685a4.858 4.858 0 0 0-.385-.28c-1-.65-1.98-.19-2.954.107-.124-1.01-.104-2.093-1.103-2.742a4.866 4.866 0 0 0-.413-.239Z"
      clipRule="evenodd"
    />
    <Path
      fill="#69D7C7"
      fillRule="evenodd"
      d="M62.766 19.413a27.975 27.975 0 0 0-2.106 3.78c-2.093 4.555-2.576 8.85-2.601 11.912l1.83.16a23.61 23.61 0 0 1 .74-6.996 23.683 23.683 0 0 1 3.842-8.046"
      clipRule="evenodd"
    />
    <Path
      fill="#313131"
      fillRule="evenodd"
      d="M43.429 65.07a.84.84 0 0 1-.717-1.278c.092-.152 2.307-3.725 5.687-3.867 2.103-.07 4.1 1.145 5.944 3.668a.84.84 0 1 1-1.357.993c-1.491-2.038-3.014-3.039-4.51-2.98-2.48.1-4.31 3.034-4.329 3.063a.842.842 0 0 1-.718.401Z"
      clipRule="evenodd"
    />
    <Path
      stroke="#fff"
      d="M43.429 65.07a.84.84 0 0 1-.717-1.278c.092-.152 2.307-3.725 5.687-3.867 2.103-.07 4.1 1.145 5.944 3.668a.84.84 0 1 1-1.357.993c-1.491-2.038-3.014-3.039-4.51-2.98-2.48.1-4.31 3.034-4.329 3.063a.842.842 0 0 1-.718.401"
    />
  </Svg>
);
export default Monster_yay;
