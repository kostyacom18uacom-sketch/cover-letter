import React from 'react'

export const MinimizeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none" {...props}>
    <mask id="path-1-outside-1_105_2425" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="28" fill="black">
      <rect fill="white" width="28" height="28"/>
      <path d="M0 0H25.9989V26H0V0Z"/>
    </mask>
    <path d="M0 0H25.9989V26H0V0Z" fill="#BDC4FF"/>
    <path d="M25.9989 26V28H27.9989V26H25.9989ZM25.9989 0H23.9989V26H25.9989H27.9989V0H25.9989ZM25.9989 26V24H0V26V28H25.9989V26Z" fill="#5761BC" mask="url(#path-1-outside-1_105_2425)"/>
    <rect x="2.56104" y="2.55737" width="22.439" height="22.44" fill="#ECDFFF" fillOpacity="0.3" stroke="url(#paint0_linear_105_2425)" strokeWidth="2"/>
    <g transform="translate(5.72, 19.9)">
      <path d="M0 0H9.35961V2.6H0V0Z" fill="#2a2d65" />
    </g>
    <defs>
      <linearGradient id="paint0_linear_105_2425" x1="10.6896" y1="13.7774" x2="26" y2="14.0374" gradientUnits="userSpaceOnUse">
        <stop stopColor="#AAB3FF"/>
        <stop offset="1" stopColor="#96A2FF"/>
      </linearGradient>
    </defs>
  </svg>
)

export const MaximizeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none" {...props}>
    <mask id="path-1-outside-1_105_2429" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="28" fill="black">
      <rect fill="white" width="28" height="28"/>
      <path d="M0 0H25.9989V26H0V0Z"/>
    </mask>
    <path d="M0 0H25.9989V26H0V0Z" fill="#BDC4FF"/>
    <path d="M25.9989 26V28H27.9989V26H25.9989ZM25.9989 0H23.9989V26H25.9989H27.9989V0H25.9989ZM25.9989 26V24H0V26V28H25.9989V26Z" fill="#5761BC" mask="url(#path-1-outside-1_105_2429)"/>
    <rect x="2.56104" y="2.55737" width="22.439" height="22.44" fill="#ECDFFF" fillOpacity="0.3" stroke="url(#paint0_linear_105_2429)" strokeWidth="2"/>
    <g transform="translate(6.68, 6.4)">
      <path d="M0 0H14.0639V2.6H0V0Z" fill="#2a2d65" />
      <path d="M0 2.60156H2.00781V14.791H0V2.60156Z" fill="#2a2d65" />
      <path d="M2.00781 14.791V12.7832H12.1895V14.791H2.00781Z" fill="#2a2d65" />
      <path d="M2.00781 4.60742V2.59961H14.1973V4.60742H2.00781Z" fill="#2a2d65" />
      <path d="M12.1895 4.60742H14.1973V14.7891H12.1895V4.60742Z" fill="#2a2d65" />
    </g>
    <defs>
      <linearGradient id="paint0_linear_105_2429" x1="10.6896" y1="13.7774" x2="26" y2="14.0374" gradientUnits="userSpaceOnUse">
        <stop stopColor="#AAB3FF"/>
        <stop offset="1" stopColor="#96A2FF"/>
      </linearGradient>
    </defs>
  </svg>
)

export const CloseIcon = (props) => (
  // We reconstruct the button background + the close cross so it matches the other two buttons.
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none" {...props}>
    <mask id="path-1-outside-close" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="28" fill="black">
      <rect fill="white" width="28" height="28"/>
      <path d="M0 0H25.9989V26H0V0Z"/>
    </mask>
    <path d="M0 0H25.9989V26H0V0Z" fill="#BDC4FF"/>
    <path d="M25.9989 26V28H27.9989V26H25.9989ZM25.9989 0H23.9989V26H25.9989H27.9989V0H25.9989ZM25.9989 26V24H0V26V28H25.9989V26Z" fill="#5761BC" mask="url(#path-1-outside-close)"/>
    <rect x="2.56104" y="2.55737" width="22.439" height="22.44" fill="#ECDFFF" fillOpacity="0.3" stroke="url(#paint0_close)" strokeWidth="2"/>
    <g transform="translate(6.5, 7.5)">
      <path d="M0.000201455 0.000208139H1.85726V1.85751H0.000201455V0.000208139Z" fill="#2a2d65" />
      <path d="M1.85726 0.000208139L3.7143 0V1.8573L1.85726 1.85751V0.000208139Z" fill="#2a2d65" />
      <path d="M1.85725 1.85258H3.7143V3.70988H1.85725V1.85258Z" fill="#2a2d65" />
      <path d="M3.71262 1.85258H5.56967V3.70988H3.71262V1.85258Z" fill="#2a2d65" />
      <path d="M3.71262 3.71267H5.56967V5.56998H3.71262V3.71267Z" fill="#2a2d65" />
      <path d="M5.56967 3.71267H7.42598V5.56998H5.56967V3.71267Z" fill="#2a2d65" />
      <path d="M7.42711 3.71267H9.28417V5.56998H7.42711V3.71267Z" fill="#2a2d65" />
      <path d="M9.28417 3.71267H11.1414V5.56998H9.28417V3.71267Z" fill="#2a2d65" />
      <path d="M9.28436 1.85258H11.1414V3.70988H9.28436V1.85258Z" fill="#2a2d65" />
      <path d="M11.1414 1.85258H12.9987V3.70988H11.1414V1.85258Z" fill="#2a2d65" />
      <path d="M11.1416 0H12.9987V1.8573H11.1416V0Z" fill="#2a2d65" />
      <path d="M12.9987 0H14.8559V1.8573H12.9987V0Z" fill="#2a2d65" />
      <path d="M5.56892 5.56901L7.42598 5.56998V7.42631H5.56892V5.56901Z" fill="#2a2d65" />
      <path d="M7.42711 5.56998H9.28417V7.42631H7.42711V5.56998Z" fill="#2a2d65" />
      <path d="M7.42711 7.42159H9.28417V9.27889H7.42711V7.42159Z" fill="#2a2d65" />
      <path d="M9.28417 7.42159H11.1414V9.27889H9.28417V7.42159Z" fill="#2a2d65" />
      <path d="M9.28436 9.28357H11.1414V11.1409H9.28436V9.28357Z" fill="#2a2d65" />
      <path d="M11.1414 9.28357H12.9987V11.1409H11.1414V9.28357Z" fill="#2a2d65" />
      <path d="M11.1416 11.138H12.9987V12.9953H11.1416V11.138Z" fill="#2a2d65" />
      <path d="M12.9987 11.138H14.8559V12.9953H12.9987V11.138Z" fill="#2a2d65" />
      <path d="M5.56892 7.42159H7.42598V9.27889H5.56892V7.42159Z" fill="#2a2d65" />
      <path d="M3.71262 7.42159H5.56892V9.27889H3.71262V7.42159Z" fill="#2a2d65" />
      <path d="M3.71262 9.28357H5.56967V11.1409H3.71262V9.28357Z" fill="#2a2d65" />
      <path d="M1.85725 9.28357H3.7143V11.1409H1.85725V9.28357Z" fill="#2a2d65" />
      <path d="M1.85725 11.138H3.7143V12.9953H1.85725V11.138Z" fill="#2a2d65" />
      <path d="M0 11.138H1.85725V12.9953H0V11.138Z" fill="#2a2d65" />
    </g>
    <defs>
      <linearGradient id="paint0_close" x1="10.6896" y1="13.7774" x2="26" y2="14.0374" gradientUnits="userSpaceOnUse">
        <stop stopColor="#AAB3FF"/>
        <stop offset="1" stopColor="#96A2FF"/>
      </linearGradient>
    </defs>
  </svg>
)
