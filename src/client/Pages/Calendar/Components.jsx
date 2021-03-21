import React from "react";
import Box from "../../Components/Box/Box";
import {Text} from "../../Components/Text";
import {styled} from "Styles";

const SqrtBoxSc = styled(Box)`
  height: ${(p) => `${p.height || p.size}`};
  width: ${(p) => `${p.width || p.size}`};
`;

export const SqrtBox = ({label, size = "4rem", ...p}) => (
  <SqrtBoxSc {...p} {...{size}}>
    <Text>{label}</Text>
  </SqrtBoxSc>
);
