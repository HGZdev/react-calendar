import React from "react";
import Box from "../Components/Box/Box";
import {BOLD, Text, XL, XXL} from "../Components/Text";
import {MAIN, ANTI, styled, VIOLET2} from "Styles";
import {useMediaQuery} from "plugins/MediaQuery";

const TextUnderlined = styled(Text)`
  position: relative;

  ::after {
    content: "";
    position: absolute;
    top: calc(100% + 0.2rem);
    left: 0;
    height: 3px;
    width: 100%;
    background-color: ${VIOLET2};
    ${(p) => p.theme.shadow1};
  }
`;

export const SectionBox = ({children, id, ...props}) => (
  <Box {...{id, as: "section", padding: "0 1rem", ...props}}>{children}</Box>
);

export const SecTitle = ({label}) => {
  const {isPhone} = useMediaQuery();
  return (
    <TextUnderlined
      {...{
        sets: [isPhone ? XL : XXL, BOLD],
        upperCase: true,
        as: Box,
        inline: true,
      }}
    >
      {label}
    </TextUnderlined>
  );
};

const MainPanel = () => {
  return (
    <Box column top {...{bg: ANTI, fg: MAIN}}>
      text
    </Box>
  );
};

export default MainPanel;
