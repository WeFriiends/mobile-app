import { SvgXml } from 'react-native-svg';

const BackArrowSVG = (props) => {
  const svgXml = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g id="arrow_back">
  <path id="Vector" d="M12 20L4 12L12 4L13.05 5.05L6.85 11.25H20V12.75H6.85L13.05 18.95L12 20Z" fill="#444444"/>
  </g>
  </svg>`;

  return <SvgXml xml={svgXml} />;
}

export default BackArrowSVG;