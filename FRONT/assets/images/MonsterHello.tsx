import * as React from 'react';
import Svg, {Path, Mask, G} from 'react-native-svg';
const MonsterHello = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={86}
    height={110}
    fill="none"
    {...props}>
    <Path
      fill="#313131"
      fillRule="evenodd"
      d="M82.642 105.209c0 2.407-15.113 4.362-33.757 4.362-18.645 0-33.76-1.955-33.76-4.362 0-2.409 15.115-4.362 33.76-4.362 18.644 0 33.757 1.953 33.757 4.362Z"
      clipRule="evenodd"
      opacity={0.08}
    />
    <Path
      fill="#69D7C7"
      fillRule="evenodd"
      d="M73.679 83.949c-.675-.088-1.4.996-1.493 1.948-.065.672.15 1.615.664 1.742.5.123 1.055-.588 1.243-.83.206-.264.564-.723.54-1.368-.025-.637-.422-1.422-.954-1.492Z"
      clipRule="evenodd"
    />
    <Mask
      id="a"
      width={4}
      height={4}
      x={75}
      y={85}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}>
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M75.827 85.176h2.357v3.784h-2.357v-3.784Z"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill="#69D7C7"
        fillRule="evenodd"
        d="M76.86 85.179c-.677.066-1.138 1.286-1.013 2.235.088.67.511 1.539 1.04 1.546.517.007.895-.81 1.024-1.089.14-.304.385-.832.215-1.454-.167-.616-.731-1.29-1.266-1.238Z"
        clipRule="evenodd"
      />
    </G>
    <Path
      fill="#69D7C7"
      fillRule="evenodd"
      d="M79.548 85.094c-.474.489-.038 1.717.67 2.362.5.453 1.384.845 1.792.509.4-.328.16-1.198.08-1.493-.09-.323-.244-.884-.775-1.25-.526-.361-1.393-.513-1.767-.128ZM82.264 83.117c-.263.628.591 1.613 1.486 1.954.63.24 1.597.282 1.854-.18.252-.451-.287-1.173-.471-1.419-.2-.268-.55-.734-1.177-.88-.622-.145-1.484.03-1.692.525Z"
      clipRule="evenodd"
    />
    <Path
      fill="#30BDA9"
      fillRule="evenodd"
      d="M68.911 57.748c.502-.284 1.598-.03 7.836 6.591 5.761 6.117 6.932 8.137 7.71 10.323 1.112 3.12.882 5.06.747 5.846-.105.616-.737 4.039-3.731 5.845-.427.258-1.543.913-3.11.995-2.89.151-4.898-1.778-5.347-2.238a6.725 6.725 0 0 1-1.12-1.493c-1.739-3.29-1.548-7.994-2.239-13.06-.248-1.817-.785-4.975-1.119-9.7-.133-1.88-.149-2.815.373-3.11Z"
      clipRule="evenodd"
    />
    <Path
      fill="#69D7C7"
      fillRule="evenodd"
      d="M12.689 57.943c.598-.325.547-1.628.062-2.454-.341-.581-1.07-1.218-1.56-1.019-.478.195-.509 1.096-.519 1.402-.011.335-.03.917.368 1.424.395.501 1.177.903 1.649.647Z"
      clipRule="evenodd"
    />
    <Mask
      id="b"
      width={5}
      height={5}
      x={6}
      y={55}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}>
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="m10.23 58.213-1.907 1.386-2.224-3.062 1.907-1.386 2.224 3.062Z"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#b)">
      <Path
        fill="#69D7C7"
        fillRule="evenodd"
        d="M9.393 58.818c.508-.452.164-1.71-.495-2.404-.464-.49-1.318-.945-1.75-.64-.422.298-.248 1.183-.188 1.483.065.33.177.9.68 1.304.498.399 1.351.614 1.753.257Z"
        clipRule="evenodd"
      />
    </G>
    <Path
      fill="#69D7C7"
      fillRule="evenodd"
      d="M7.267 60.466c.097-.674-.978-1.412-1.93-1.517-.67-.073-1.616.13-1.749.642-.13.5.574 1.063.814 1.254.262.21.716.572 1.361.556.638-.017 1.428-.404 1.504-.935ZM6.232 63.662c-.156-.663-1.426-.957-2.35-.707-.652.176-1.458.71-1.395 1.236.062.512.922.78 1.215.87.32.1.876.271 1.47.02.588-.248 1.183-.896 1.06-1.419Z"
      clipRule="evenodd"
    />
    <Path
      fill="#30BDA9"
      fillRule="evenodd"
      d="M31.947 76.338c-.24.524-1.275.964-10.214-.727-8.256-1.562-10.39-2.508-12.306-3.82-2.733-1.87-3.687-3.575-4.04-4.29-.276-.56-1.777-3.7-.417-6.922.194-.46.711-1.646 1.93-2.633 2.251-1.821 5.01-1.44 5.643-1.332.82.14 1.44.381 1.783.55 3.34 1.638 5.952 5.557 9.488 9.248 1.268 1.326 3.56 3.564 6.607 7.191 1.213 1.443 1.775 2.19 1.526 2.735ZM63.948 102.217c-1.087-2.032-4.922-2.42-7.053-2.632-.397-.04-.848-.064-1-.077V83.134c-.152-.093-.504-.478-1.106-.527-.76-.062-1.282.462-1.343.528-.113 6.05-.24 12.102-.352 18.153-.007.108-.015.21-.013.304-.002.106-.007.213-.01.319l.03.076.012.099c.042.282.112.753.438 1.184.742.979 2.158.891 2.325.878 3.253.197 5.394.045 6.581-.088.548-.062 1.425-.184 1.667-.746.18-.417-.069-.897-.176-1.097ZM44.593 83.25a14063.725 14063.725 0 0 1 .059 16.723l-.002.015c.013.269.032.682.053 1.191.032.772.039 1.092-.058 1.521 0 0-.066.29-.161.527-.587 1.458-6.6 1.067-9.213.658-.425-.067-1.27-.214-1.594-.834-.141-.407-.141-.739-.073-1.009.42-1.678 3.843-2.589 8.467-2.457l.088-16.363c.423-.485 1.047-.704 1.608-.556.466.123.734.457.826.585Z"
      clipRule="evenodd"
    />
    <Mask
      id="c"
      width={12}
      height={23}
      x={32}
      y={82}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}>
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M32.79 82.62h11.165v21.64H32.79V82.62Z"
        clipRule="evenodd"
      />
    </Mask>
    <Path
      fill="#69D7C7"
      fillRule="evenodd"
      d="M78.11 56.604c1.22-14.945-5.315-28.017-14.714-34.823l-2.067-1.363c-3.864-2.322-8.115-3.628-12.457-3.628-5.4 0-10.627 2.008-15.15 5.485l-1.724 1.42c-8.057 7.18-13.378 19.262-12.362 32.909.296 3.979 2.555 11.467 2.555 11.467l2.804 6.249c3.088 5.825 11.108 14.632 11.108 14.632l1.781 1.613c4.317 3.707 8.405 5.854 10.988 5.854 3.043 0 7.661-2.29 12.341-6.405l1.439-1.327s8.408-9.602 11.37-16.257l1.925-5.021s1.85-6.995 2.162-10.805Z"
      clipRule="evenodd"
    />
    <Mask
      id="d"
      width={60}
      height={81}
      x={19}
      y={16}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}>
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M78.11 56.604c1.22-14.945-5.315-28.017-14.714-34.823l-2.067-1.363c-3.864-2.322-8.115-3.628-12.457-3.628-5.4 0-10.627 2.008-15.15 5.485l-1.724 1.42c-8.057 7.18-13.378 19.262-12.362 32.909.296 3.979 2.555 11.467 2.555 11.467l2.804 6.249c3.088 5.825 11.108 14.632 11.108 14.632l1.781 1.613c4.317 3.707 8.405 5.854 10.988 5.854 3.043 0 7.661-2.29 12.341-6.405l1.439-1.327s8.408-9.602 11.37-16.257l1.925-5.021s1.85-6.995 2.162-10.805Z"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#d)">
      <Path
        fill="#313131"
        fillRule="evenodd"
        d="M56.65 81.54a13.438 13.438 0 0 1-8.2 2.876c-2.96.04-5.542-1.236-7.788-3.079-.253-.207-.618.153-.363.362 2.352 1.93 5.05 3.27 8.152 3.23 3.161-.042 6.073-1.085 8.56-3.026.26-.203-.105-.563-.362-.363Z"
        clipRule="evenodd"
      />
      <Mask
        id="e"
        width={3}
        height={2}
        x={55}
        y={81}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'luminance',
        }}>
        <Path
          fill="#fff"
          fillRule="evenodd"
          d="M55.709 81.258h1.461v1.36h-1.462v-1.36Z"
          clipRule="evenodd"
        />
      </Mask>
      <G mask="url(#e)">
        <Path
          fill="#313131"
          fillRule="evenodd"
          d="M57.13 82.155c-.078-.157-.262-.223-.404-.308-.276-.167-.581-.329-.812-.557-.068-.067-.217-.023-.205.085.037.32.186.602.41.833.21.217.627.562.933.335.13-.096.147-.248.078-.388Z"
          clipRule="evenodd"
        />
      </G>
      <Mask
        id="f"
        width={2}
        height={3}
        x={40}
        y={80}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'luminance',
        }}>
        <Path
          fill="#fff"
          fillRule="evenodd"
          d="M40.35 80.97h1.46v1.36h-1.46v-1.36Z"
          clipRule="evenodd"
        />
      </Mask>
      <G mask="url(#f)">
        <Path
          fill="#313131"
          fillRule="evenodd"
          d="M40.39 81.867c.077-.157.261-.223.403-.308.277-.166.581-.328.813-.557.067-.066.216-.023.204.085-.036.32-.186.602-.41.833-.209.217-.627.563-.933.336-.13-.097-.147-.248-.078-.389Z"
          clipRule="evenodd"
        />
      </G>
    </G>
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M59.74 37.786c3.872.377 8.346 3.918 8.894 10.706v2.261c-.508 6.5-5.414 14.512-19.753 24.566C34.55 65.265 29.642 57.252 29.134 50.753v-2.26c.543-6.789 5.021-10.33 8.89-10.707.632-.063 1.23-.095 1.786-.095 4.47 0 6.616 3.447 9.07 6.372 2.456-2.925 4.604-6.372 9.073-6.372.555 0 1.153.032 1.787.095Z"
      clipRule="evenodd"
    />
    <Path
      fill="#69D7C7"
      fillRule="evenodd"
      d="M42.898 58.116c.863 2.232 3.01 4.086 5.703 4.211 2.255.106 4.607-1.014 5.791-3.158 1.377-2.494.691-5.495-.965-7.283-2.503-2.702-7.334-2.751-9.651-.088-1.55 1.781-1.629 4.376-.878 6.318Z"
      clipRule="evenodd"
    />
    <Path
      fill="#313131"
      fillRule="evenodd"
      d="M47.768 54.3c.836-.326 1.635.09 1.798.175.955.496 1.885 1.787 1.404 2.939-.494 1.183-2.146 1.43-3.202 1.009-.145-.058-.9-.358-1.229-1.14-.455-1.084.133-2.558 1.229-2.984Z"
      clipRule="evenodd"
    />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M53.087 51.295a1.534 1.534 0 1 1-3.069 0 1.534 1.534 0 0 1 3.069 0Z"
      clipRule="evenodd"
    />
    <Path
      fill="#69D7C7"
      fillRule="evenodd"
      d="M49.035 19.267a10.82 10.82 0 0 0-2.678-2.459c-2.4-1.54-4.545-1.506-4.522-1.947.021-.415 1.95-1.022 3.672-.398 1.899.688 2.625 2.539 2.753 2.883.07.19-.344-1.165-.48-2.722-.03-.337-.275-3.505 1.116-4.153.496-.232 1.196-.141 1.44.213.289.417-.107 1.12-.362 1.655-.444.93-.917 2.307-1.034 4.263a4.703 4.703 0 0 1 1.317-1.729c.17-.14 1.483-1.173 3.312-1.02 1.116.093 2.396.625 2.373 1.078-.017.339-.761.56-1.366.74-1.496.444-2.22.194-2.985.401-.748.203-1.73.893-2.556 3.195ZM41.428 26.465c-.322-3.033-1.185-6.995-3.422-11.083a28.602 28.602 0 0 0-2.417-3.705c.258-.297-2.151 1.077-1.681.948a24.218 24.218 0 0 1 4.492 7.932 24.12 24.12 0 0 1 1.215 6.195l1.813-.287Z"
      clipRule="evenodd"
    />
    <Path
      fill="#69D7C7"
      fillRule="evenodd"
      d="M31.4 3.127c.904-.554 2.46-.516 3.693.872l.37.492c.956 1.498 1.203 4.047-.27 8.589-4.77.162-7.152-.777-8.33-2.109l-.37-.492c-.996-1.567-.602-3.073.179-3.79.127-.117.252-.222.373-.313.973-.734 2.006-.335 3.02-.101.055-1.04-.043-2.142.93-2.876a4.99 4.99 0 0 1 .405-.272ZM66.683 2.287c-.94-.489-2.489-.343-3.622 1.127l-.336.517c-.848 1.561-.916 4.121.869 8.548 4.769-.17 7.08-1.274 8.161-2.684l.336-.517c.884-1.632.386-3.107-.443-3.767a4.947 4.947 0 0 0-.394-.287c-1.022-.664-2.024-.194-3.02.11-.127-1.033-.106-2.14-1.128-2.803a4.965 4.965 0 0 0-.422-.244Z"
      clipRule="evenodd"
    />
    <Path
      fill="#69D7C7"
      fillRule="evenodd"
      d="M63.703 10.275a28.59 28.59 0 0 0-2.154 3.864c-2.14 4.657-2.633 9.048-2.66 12.18l1.871.163c-.08-1.818.016-4.313.758-7.153a24.214 24.214 0 0 1 3.928-8.226"
      clipRule="evenodd"
    />
  </Svg>
);
export default MonsterHello;
