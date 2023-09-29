import * as React from 'react';
import Svg, {SvgProps, Path, Mask, G} from 'react-native-svg';
const MonsterSad = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={76}
    height={103}
    fill="none"
    {...props}>
    <Path
      fill="#313131"
      fillRule="evenodd"
      d="M71.642 98.21c0 2.406-15.113 4.361-33.757 4.361-18.645 0-33.76-1.955-33.76-4.362 0-2.41 15.115-4.362 33.76-4.362 18.644 0 33.757 1.953 33.757 4.362Z"
      clipRule="evenodd"
      opacity={0.08}
    />
    <Path
      fill="#69D7C7"
      fillRule="evenodd"
      d="M62.678 76.948c-.675-.088-1.4.996-1.493 1.949-.065.671.15 1.614.664 1.741.501.124 1.055-.587 1.243-.829.206-.264.564-.723.54-1.368-.025-.638-.422-1.423-.954-1.493Z"
      clipRule="evenodd"
    />
    <Mask
      id="a"
      width={4}
      height={4}
      x={64}
      y={78}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}>
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M64.826 78.176h2.358v3.784h-2.358v-3.784Z"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill="#69D7C7"
        fillRule="evenodd"
        d="M65.86 78.179c-.678.066-1.138 1.286-1.013 2.235.088.67.51 1.539 1.04 1.546.516.007.895-.81 1.024-1.089.14-.304.385-.832.215-1.454-.168-.616-.732-1.29-1.266-1.238Z"
        clipRule="evenodd"
      />
    </G>
    <Path
      fill="#69D7C7"
      fillRule="evenodd"
      d="M68.548 78.095c-.474.488-.038 1.717.67 2.361.5.454 1.384.845 1.792.51.4-.329.16-1.198.08-1.494-.09-.323-.244-.884-.775-1.25-.526-.361-1.393-.512-1.767-.127ZM71.263 76.118c-.263.628.591 1.613 1.486 1.954.63.24 1.597.281 1.855-.18.251-.451-.288-1.173-.472-1.42-.2-.267-.55-.734-1.178-.88-.62-.145-1.483.03-1.69.526Z"
      clipRule="evenodd"
    />
    <Path
      fill="#30BDA9"
      fillRule="evenodd"
      d="M57.91 50.748c.503-.284 1.599-.03 7.836 6.591 5.762 6.117 6.933 8.137 7.711 10.323 1.111 3.12.881 5.06.747 5.846-.106.616-.737 4.039-3.732 5.845-.426.258-1.542.913-3.109.995-2.891.151-4.898-1.778-5.348-2.238a6.725 6.725 0 0 1-1.12-1.493c-1.738-3.29-1.548-7.994-2.238-13.06-.248-1.817-.786-4.975-1.12-9.7-.132-1.88-.148-2.815.374-3.11Z"
      clipRule="evenodd"
    />
    <Path
      fill="#69D7C7"
      fillRule="evenodd"
      d="M11.992 76.948c.675-.088 1.4.996 1.493 1.949.065.671-.15 1.614-.664 1.741-.501.124-1.055-.587-1.243-.829-.206-.264-.564-.723-.54-1.368.025-.638.422-1.423.954-1.493Z"
      clipRule="evenodd"
    />
    <Mask
      id="b"
      width={3}
      height={4}
      x={7}
      y={78}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}>
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M9.844 78.176H7.486v3.784h2.358v-3.784Z"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#b)">
      <Path
        fill="#69D7C7"
        fillRule="evenodd"
        d="M8.81 78.179c.678.066 1.138 1.286 1.013 2.235-.088.67-.51 1.539-1.04 1.546-.516.007-.895-.81-1.024-1.089-.14-.304-.385-.832-.215-1.454.168-.616.732-1.29 1.266-1.238Z"
        clipRule="evenodd"
      />
    </G>
    <Path
      fill="#69D7C7"
      fillRule="evenodd"
      d="M6.122 78.095c.474.488.038 1.717-.67 2.361-.5.454-1.384.845-1.793.51-.398-.329-.16-1.198-.078-1.494.088-.323.243-.884.774-1.25.526-.361 1.393-.512 1.767-.127ZM3.407 76.118c.263.628-.591 1.613-1.486 1.954-.63.24-1.597.281-1.855-.18-.251-.451.288-1.173.472-1.42.2-.267.55-.734 1.177-.88.622-.145 1.484.03 1.692.526Z"
      clipRule="evenodd"
    />
    <Path
      fill="#30BDA9"
      fillRule="evenodd"
      d="M16.76 50.748c-.503-.284-1.599-.03-7.836 6.591-5.762 6.117-6.933 8.137-7.711 10.323-1.111 3.12-.881 5.06-.747 5.846.106.616.737 4.039 3.732 5.845.426.258 1.542.913 3.109.995 2.891.151 4.898-1.778 5.348-2.238.58-.595.94-1.155 1.12-1.493 1.738-3.29 1.548-7.994 2.238-13.06.248-1.817.785-4.975 1.12-9.7.132-1.88.148-2.815-.374-3.11ZM52.947 95.217c-1.088-2.033-4.922-2.42-7.054-2.632-.396-.04-.848-.065-1-.078V76.133c-.151-.092-.503-.477-1.105-.526-.76-.062-1.283.461-1.343.527-.113 6.051-.24 12.103-.353 18.154-.006.108-.014.21-.012.304-.002.106-.008.212-.01.318l.03.077.012.098c.042.282.111.754.438 1.185.742.978 2.157.89 2.325.877 3.253.197 5.394.046 6.58-.088.549-.061 1.426-.184 1.668-.745.18-.418-.07-.898-.176-1.097ZM33.593 76.25a14063.708 14063.708 0 0 1 .058 16.722l-.002.015c.013.27.032.682.053 1.191.032.772.039 1.092-.058 1.521 0 0-.066.29-.161.527-.587 1.458-6.6 1.067-9.213.658-.425-.067-1.27-.214-1.594-.834-.141-.407-.141-.739-.073-1.009.42-1.678 3.843-2.589 8.467-2.457l.088-16.364c.423-.484 1.047-.703 1.608-.555.466.123.734.457.827.585Z"
      clipRule="evenodd"
    />
    <Mask
      id="c"
      width={12}
      height={23}
      x={21}
      y={75}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}>
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M21.79 75.62h11.164v21.638H21.789V75.62Z"
        clipRule="evenodd"
      />
    </Mask>
    <Path
      fill="#69D7C7"
      fillRule="evenodd"
      d="M67.11 49.604c1.22-14.945-5.315-28.017-14.714-34.823l-2.067-1.363c-3.864-2.322-8.115-3.628-12.457-3.628-5.4 0-10.627 2.008-15.15 5.485l-1.724 1.42C12.941 23.875 7.62 35.957 8.636 49.604c.296 3.979 2.555 11.467 2.555 11.467l2.804 6.249c3.088 5.825 11.108 14.632 11.108 14.632l1.781 1.613c4.317 3.707 8.405 5.854 10.988 5.854 3.043 0 7.661-2.29 12.341-6.405l1.439-1.327s8.408-9.602 11.37-16.257l1.925-5.021s1.85-6.995 2.162-10.805Z"
      clipRule="evenodd"
    />
    <Mask
      id="d"
      width={60}
      height={81}
      x={8}
      y={9}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}>
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M67.11 49.604c1.22-14.945-5.315-28.017-14.714-34.823l-2.067-1.363c-3.864-2.322-8.115-3.628-12.457-3.628-5.4 0-10.627 2.008-15.15 5.485l-1.724 1.42C12.941 23.875 7.62 35.957 8.636 49.604c.296 3.979 2.555 11.467 2.555 11.467l2.804 6.249c3.088 5.825 11.108 14.632 11.108 14.632l1.781 1.613c4.317 3.707 8.405 5.854 10.988 5.854 3.043 0 7.661-2.29 12.341-6.405l1.439-1.327s8.408-9.602 11.37-16.257l1.925-5.021s1.85-6.995 2.162-10.805Z"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#d)">
      <Path
        fill="#313131"
        fillRule="evenodd"
        d="M29.733 77.36a13.438 13.438 0 0 1 8.199-2.875c2.96-.04 5.542 1.236 7.789 3.079.253.207.617-.153.362-.363-2.352-1.93-5.05-3.27-8.151-3.229-3.162.042-6.074 1.084-8.561 3.026-.26.203.105.563.362.363Z"
        clipRule="evenodd"
      />
      <Mask
        id="e"
        width={2}
        height={2}
        x={29}
        y={76}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'luminance',
        }}>
        <Path
          fill="#fff"
          fillRule="evenodd"
          d="M30.674 77.643h-1.462v-1.36h1.462v1.36Z"
          clipRule="evenodd"
        />
      </Mask>
      <G mask="url(#e)">
        <Path
          fill="#313131"
          fillRule="evenodd"
          d="M29.253 76.746c.077.157.261.223.403.308.277.167.581.328.813.557.067.067.216.023.204-.085a1.426 1.426 0 0 0-.41-.833c-.209-.217-.627-.562-.933-.335-.13.096-.147.248-.077.388Z"
          clipRule="evenodd"
        />
      </G>
      <Mask
        id="f"
        width={3}
        height={2}
        x={44}
        y={76}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'luminance',
        }}>
        <Path
          fill="#fff"
          fillRule="evenodd"
          d="M46.033 77.93h-1.462v-1.36h1.462v1.36Z"
          clipRule="evenodd"
        />
      </Mask>
      <G mask="url(#f)">
        <Path
          fill="#313131"
          fillRule="evenodd"
          d="M45.993 77.033c-.078.157-.262.223-.404.308-.277.167-.581.329-.812.557-.068.067-.217.023-.205-.085.037-.32.186-.602.41-.833.21-.217.627-.562.933-.335.13.096.147.248.078.388Z"
          clipRule="evenodd"
        />
      </G>
    </G>
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M48.741 30.786c3.872.377 8.346 3.918 8.894 10.706v2.261c-.508 6.5-5.414 14.512-19.753 24.566C23.55 58.265 18.643 50.252 18.135 43.753v-2.26c.542-6.789 5.021-10.33 8.89-10.707.632-.063 1.23-.095 1.786-.095 4.47 0 6.616 3.447 9.07 6.372 2.456-2.925 4.604-6.372 9.072-6.372.556 0 1.154.033 1.788.095Z"
      clipRule="evenodd"
    />
    <Path
      fill="#69D7C7"
      fillRule="evenodd"
      d="M31.464 59.286c.863 2.232 3.01 4.086 5.703 4.212 2.255.105 4.607-1.015 5.791-3.16 1.377-2.492.691-5.494-.965-7.282-2.503-2.702-7.334-2.751-9.652-.087-1.55 1.78-1.628 4.375-.877 6.317Z"
      clipRule="evenodd"
    />
    <Path
      fill="#313131"
      fillRule="evenodd"
      d="M36.335 55.47c.836-.326 1.635.09 1.798.175.955.496 1.885 1.787 1.404 2.939-.494 1.183-2.146 1.43-3.202 1.009-.146-.058-.9-.359-1.229-1.14-.455-1.084.133-2.558 1.229-2.984Z"
      clipRule="evenodd"
    />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M42.087 44.295a1.534 1.534 0 1 1-3.068 0 1.534 1.534 0 0 1 3.068 0Z"
      clipRule="evenodd"
    />
    <Path
      fill="#69D7C7"
      fillRule="evenodd"
      d="M38.035 12.267a10.823 10.823 0 0 0-2.68-2.459c-2.4-1.54-4.543-1.506-4.521-1.947.021-.415 1.95-1.022 3.672-.398 1.899.688 2.625 2.539 2.753 2.882.07.19-.344-1.164-.48-2.721-.029-.337-.275-3.505 1.116-4.153.496-.232 1.196-.141 1.44.213.289.417-.107 1.12-.362 1.655-.444.93-.917 2.307-1.034 4.263a4.704 4.704 0 0 1 1.317-1.729c.171-.14 1.483-1.174 3.312-1.02 1.116.093 2.396.625 2.373 1.078-.017.339-.762.56-1.366.74-1.496.444-2.22.194-2.985.401-.748.203-1.73.893-2.555 3.195ZM29.157 13.106c-2.588-1.614-6.242-3.374-10.84-4.129a28.6 28.6 0 0 0-4.407-.376c-.075-.387-.477 2.357-.289 1.907 2.05-.083 5.31.042 9.017 1.346a24.118 24.118 0 0 1 5.629 2.857l.89-1.605Z"
      clipRule="evenodd"
    />
    <Path
      fill="#69D7C7"
      fillRule="evenodd"
      d="M4.595 6.636c.121-1.054 1.108-2.256 2.96-2.373l.617.01c1.769.17 3.93 1.546 6.601 5.503-2.81 3.858-5.017 5.157-6.79 5.264l-.617-.01c-1.847-.181-2.791-1.419-2.875-2.475a4.957 4.957 0 0 1-.018-.487c.022-1.219.971-1.787 1.78-2.442C5.469 8.942 4.54 8.34 4.56 7.122c.003-.151.015-.314.035-.486ZM46.332 13.106c2.587-1.614 6.241-3.374 10.839-4.129a28.6 28.6 0 0 1 4.408-.376c.075-.387.476 2.357.288 1.907-2.05-.083-5.31.042-9.016 1.346a24.117 24.117 0 0 0-5.629 2.857l-.89-1.605Z"
      clipRule="evenodd"
    />
    <Path
      fill="#69D7C7"
      fillRule="evenodd"
      d="M70.894 6.636c-.121-1.054-1.108-2.256-2.961-2.373l-.616.01c-1.77.17-3.93 1.546-6.601 5.503 2.81 3.858 5.017 5.157 6.79 5.264l.617-.01c1.847-.181 2.791-1.419 2.875-2.475a4.94 4.94 0 0 0 .017-.487c-.021-1.219-.97-1.787-1.78-2.442.786-.684 1.715-1.285 1.693-2.504a4.998 4.998 0 0 0-.034-.486Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default MonsterSad;
