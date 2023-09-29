import * as React from 'react';
import Svg, {Path, Mask, G} from 'react-native-svg';
const MonsterThinking = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={77}
    height={109}
    fill="none"
    {...props}>
    <Path
      fill="#000"
      fillRule="evenodd"
      d="M73.686 104.013c0 2.38-14.942 4.313-33.375 4.313-18.432 0-33.375-1.933-33.375-4.313 0-2.382 14.943-4.312 33.376-4.312 18.432 0 33.374 1.93 33.374 4.312Z"
      clipRule="evenodd"
      opacity={0.08}
    />
    <Path
      fill="#69D7C7"
      fillRule="evenodd"
      d="M3.87 82.452c-.526-.42-1.693.127-2.26.886-.398.535-.698 1.443-.328 1.813.361.36 1.194.042 1.477-.066.31-.119.846-.324 1.155-.882.305-.552.37-1.42-.044-1.75Z"
      clipRule="evenodd"
    />
    <Mask id="a" width={5} height={5} x={3} y={84} maskUnits="userSpaceOnUse">
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="m5.06 84.588 1.996 1.205-1.934 3.203-1.996-1.205 1.935-3.203Z"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill="#69D7C7"
        fillRule="evenodd"
        d="M5.934 85.118c-.608-.29-1.62.508-2 1.375-.268.61-.354 1.563.09 1.84.433.27 1.172-.229 1.423-.399.275-.185.751-.507.926-1.12.172-.607.04-1.467-.44-1.695Z"
        clipRule="evenodd"
      />
    </G>
    <Path
      fill="#69D7C7"
      fillRule="evenodd"
      d="M8.25 86.421c-.65.171-.91 1.434-.639 2.341.19.64.74 1.422 1.257 1.347.505-.074.747-.931.83-1.223.09-.32.246-.873-.017-1.454-.26-.574-.917-1.145-1.43-1.01ZM11.56 86.137c-.543.396-.324 1.666.259 2.412.41.526 1.207 1.055 1.661.796.444-.253.356-1.14.326-1.442-.032-.33-.089-.902-.546-1.347-.452-.44-1.271-.732-1.7-.42Z"
      clipRule="evenodd"
    />
    <Path
      fill="#30BDA9"
      fillRule="evenodd"
      d="M13.226 57.842c.57.017 1.368.791 3.262 9.583 1.75 8.121 1.709 10.429 1.25 12.677-.655 3.209-1.84 4.732-2.356 5.328-.404.468-2.688 3.042-6.145 3.04-.493 0-1.772-.015-3.14-.746-2.524-1.35-3.237-4.01-3.382-4.628a6.651 6.651 0 0 1-.184-1.836c.209-3.672 2.775-7.556 4.78-12.196.719-1.665 1.877-4.612 4.01-8.781.849-1.66 1.312-2.459 1.905-2.441ZM55.204 101.056c-1.075-2.01-4.866-2.393-6.973-2.603-.392-.039-.839-.064-.989-.076V82.189c-.15-.091-.498-.472-1.093-.52-.75-.062-1.268.455-1.328.52-.111 5.983-.237 11.966-.348 17.948-.006.107-.014.208-.012.3-.003.105-.008.21-.01.315.01.026.019.051.03.076l.011.097c.041.279.11.745.434 1.171.733.968 2.132.881 2.298.868 3.216.195 5.332.045 6.506-.087.542-.061 1.409-.182 1.648-.737.178-.413-.068-.888-.174-1.084ZM36.07 82.304a13746.096 13746.096 0 0 1 .057 16.532l-.002.015c.013.266.032.674.053 1.178.03.763.038 1.079-.058 1.503 0 0-.065.287-.16.521-.58 1.442-6.525 1.055-9.107.651-.421-.066-1.256-.212-1.576-.825-.14-.402-.14-.73-.073-.997.417-1.66 3.8-2.56 8.371-2.429l.087-16.178c.419-.48 1.035-.696 1.59-.55.461.122.726.453.817.58Z"
      clipRule="evenodd"
    />
    <Mask
      id="b"
      width={12}
      height={23}
      x={24}
      y={81}
      maskUnits="userSpaceOnUse">
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M24.4 81.68h11.038v21.394H24.4V81.681Z"
        clipRule="evenodd"
      />
    </Mask>
    <Path
      fill="#69D7C7"
      fillRule="evenodd"
      d="M69.204 55.96c1.206-14.774-5.254-27.698-14.546-34.427l-2.043-1.347c-3.82-2.296-8.023-3.587-12.316-3.587-5.338 0-10.506 1.985-14.979 5.422l-1.703 1.405c-7.965 7.099-13.226 19.042-12.222 32.535.293 3.934 2.526 11.336 2.526 11.336l2.772 6.178c3.053 5.759 10.982 14.466 10.982 14.466l1.761 1.595c4.268 3.665 8.31 5.787 10.864 5.787 3.008 0 7.574-2.264 12.2-6.332l1.422-1.312s8.313-9.493 11.241-16.072l1.903-4.965s1.83-6.915 2.138-10.681Z"
      clipRule="evenodd"
    />
    <Mask
      id="c"
      width={59}
      height={80}
      x={11}
      y={16}
      maskUnits="userSpaceOnUse">
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M69.204 55.96c1.206-14.774-5.254-27.698-14.546-34.427l-2.043-1.347c-3.82-2.296-8.023-3.587-12.316-3.587-5.338 0-10.506 1.985-14.979 5.422l-1.703 1.405c-7.965 7.099-13.226 19.042-12.222 32.535.293 3.934 2.526 11.336 2.526 11.336l2.772 6.178c3.053 5.759 10.982 14.466 10.982 14.466l1.761 1.595c4.268 3.665 8.31 5.787 10.864 5.787 3.008 0 7.574-2.264 12.2-6.332l1.422-1.312s8.313-9.493 11.241-16.072l1.903-4.965s1.83-6.915 2.138-10.681Z"
        clipRule="evenodd"
      />
    </Mask>
    <G fill="#171F20" fillRule="evenodd" clipRule="evenodd" mask="url(#c)">
      <Path d="M41.588 35.993c2.912-.358 5.125-2.803 8.106-2.843 2.926-.039 5.48 1.222 7.7 3.044.25.205.61-.151.359-.358-2.326-1.908-4.993-3.233-8.06-3.193-3.125.042-5.693 2.358-8.463 2.992-.257.2.104.557.358.358ZM40.905 36.886c-.076-.155-.259-.22-.4-.305-.272-.164-.574-.324-.802-.55-.067-.066-.214-.023-.202.084.036.316.183.595.405.824.207.214.62.556.923.331.128-.095.145-.245.076-.384Z" />
    </G>
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M51.044 37.357c3.828.372 8.25 3.874 8.792 10.584v2.235c-.502 6.426-5.352 14.347-19.528 24.287-14.168-9.94-19.02-17.861-19.523-24.287v-2.235c.537-6.71 4.964-10.212 8.789-10.584a17.99 17.99 0 0 1 1.766-.094c4.42 0 6.54 3.407 8.968 6.3 2.428-2.893 4.55-6.3 8.968-6.3.55 0 1.14.032 1.768.094Z"
      clipRule="evenodd"
    />
    <Path
      fill="#69D7C7"
      fillRule="evenodd"
      d="M34.393 57.455c.854 2.207 2.976 4.04 5.639 4.164 2.23.104 4.554-1.003 5.725-3.123 1.361-2.465.683-5.432-.954-7.2-2.475-2.671-7.251-2.72-9.542-.086-1.532 1.76-1.61 4.325-.868 6.245Z"
      clipRule="evenodd"
    />
    <Path
      fill="#000100"
      fillRule="evenodd"
      d="M39.208 53.682c.827-.322 1.617.09 1.778.173.943.491 1.863 1.767 1.388 2.906-.489 1.17-2.122 1.413-3.166.998-.144-.058-.89-.355-1.215-1.128-.45-1.071.13-2.528 1.215-2.95Z"
      clipRule="evenodd"
    />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M44.466 50.712a1.517 1.517 0 1 1-3.034 0 1.517 1.517 0 0 1 3.034 0Z"
      clipRule="evenodd"
    />
    <Path
      fill="#69D7C7"
      fillRule="evenodd"
      d="M40.46 19.047a10.699 10.699 0 0 0-2.648-2.43c-2.373-1.522-4.492-1.49-4.47-1.925.02-.41 1.928-1.01 3.63-.394 1.877.68 2.596 2.51 2.722 2.85.07.187-.34-1.152-.474-2.691-.03-.333-.272-3.464 1.103-4.106.49-.229 1.182-.139 1.424.211.285.412-.106 1.107-.359 1.636-.439.92-.906 2.281-1.022 4.215.18-.403.56-1.106 1.302-1.71.17-.137 1.466-1.16 3.275-1.009 1.103.093 2.368.619 2.346 1.066-.017.336-.753.554-1.351.732-1.479.44-2.194.192-2.951.397-.74.2-1.71.883-2.526 3.158Z"
      clipRule="evenodd"
    />
    <Path
      fill="#3DAE9E"
      fillRule="evenodd"
      d="M47.37 80.776c.455-.496-.011-1.698-.73-2.313-.507-.434-1.392-.795-1.786-.451-.385.335-.124 1.187-.035 1.477.098.317.266.867.802 1.213.53.342 1.391.466 1.75.074Z"
      clipRule="evenodd"
    />
    <Mask id="d" width={6} height={5} x={40} y={79} maskUnits="userSpaceOnUse">
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="m45.16 81.82-1.338 1.908-3.065-2.147 1.338-1.909 3.064 2.147Z"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#d)">
      <Path
        fill="#3DAE9E"
        fillRule="evenodd"
        d="M44.57 82.654c.33-.586-.395-1.65-1.235-2.088-.591-.308-1.536-.46-1.842-.035-.298.414.149 1.185.301 1.447.167.286.455.784 1.056 1 .593.213 1.46.139 1.72-.324Z"
        clipRule="evenodd"
      />
    </G>
    <Path
      fill="#3DAE9E"
      fillRule="evenodd"
      d="M43.113 84.878c-.126-.66-1.368-1.005-2.292-.797-.65.147-1.469.641-1.428 1.163.039.509.878.808 1.163.91.313.112.854.305 1.452.082.59-.22 1.205-.836 1.105-1.358ZM43.173 88.2c-.359-.57-1.64-.437-2.425.094-.552.374-1.134 1.133-.906 1.604.223.46 1.113.432 1.416.423.331-.01.906-.028 1.381-.454.47-.421.817-1.219.534-1.668Z"
      clipRule="evenodd"
    />
    <Path
      fill="#30BDA9"
      fillRule="evenodd"
      d="M68.513 79.617c-.055.567 0 12.187-7.503 14.864-8.22 1.195-10.52.997-12.732.387-3.157-.87-4.597-2.157-5.157-2.712-.439-.435-2.852-2.888-2.616-6.337.034-.492.136-1.767.959-3.082 1.517-2.427 4.219-2.957 4.846-3.06a6.65 6.65 0 0 1 1.844-.06c3.65.458 7.35 3.282 11.843 5.596 2.117 1.09 4.516-18.91 7.016-17.41 1.598.96 1.558 11.224 1.5 11.814Z"
      clipRule="evenodd"
    />
    <Path
      fill="#69D7C7"
      fillRule="evenodd"
      d="M32.939 26.163c-.318-2.997-1.172-6.915-3.383-10.957a28.272 28.272 0 0 0-2.39-3.662c.256-.294-2.126 1.064-1.662.936a23.941 23.941 0 0 1 4.442 7.843 23.84 23.84 0 0 1 1.2 6.124l1.793-.284Z"
      clipRule="evenodd"
    />
    <Path
      fill="#69D7C7"
      fillRule="evenodd"
      d="M23.025 3.09c.895-.546 2.432-.51 3.65.863l.367.486c.945 1.482 1.189 4.002-.267 8.492-4.715.16-7.071-.768-8.235-2.085l-.366-.486c-.984-1.55-.595-3.038.177-3.747.126-.116.25-.22.369-.31.962-.725 1.983-.331 2.986-.1.054-1.028-.043-2.118.919-2.843.12-.09.253-.18.4-.27ZM57.908 2.26c-.93-.483-2.462-.339-3.582 1.115l-.331.511c-.84 1.544-.907 4.074.858 8.451 4.715-.169 7-1.26 8.069-2.654l.332-.51c.873-1.614.38-3.072-.438-3.725a4.907 4.907 0 0 0-.39-.283c-1.01-.657-2.001-.193-2.985.108-.126-1.021-.105-2.115-1.115-2.771a4.922 4.922 0 0 0-.418-.241Z"
      clipRule="evenodd"
    />
    <Path
      fill="#69D7C7"
      fillRule="evenodd"
      d="M54.961 10.158a28.288 28.288 0 0 0-2.129 3.82c-2.116 4.605-2.604 8.946-2.63 12.041l1.85.162a23.864 23.864 0 0 1 .749-7.072 23.94 23.94 0 0 1 3.883-8.132"
      clipRule="evenodd"
    />
    <Path stroke="#000" strokeLinecap="round" d="M38.5 79h4" />
  </Svg>
);
export default MonsterThinking;