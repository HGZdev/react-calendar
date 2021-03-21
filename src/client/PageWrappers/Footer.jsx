import React, {useState} from "react";
import {MAIN, ANTI, WHITE, VIOLET1} from "Styles";
import {Box, ContentBox} from "Components/Box";
import {useMediaQuery} from "plugins/MediaQuery";
import {S, Text} from "../Components/Text";
import styled from "styled-components";
import {EMAIL, GITHUB, LINKEDIN, TEL} from "config/personal";
import {glyphs} from "../Components/Icon";

const SvgImg = styled.img`
  height: ${(p) => `${p.height || p.size}`};
  width: ${(p) => `${p.width || p.size}`};
`;

const LinkBoxWrap = styled(Box)`
  position: relative;
  height: ${(p) => `${p.height || p.size}`};
  width: ${(p) => `${p.width || p.size}`};
`;

const BannerBox = styled(Box)`
  position: absolute;
  bottom: calc(100% + 1.5rem);
  left: 0;
  padding: 0.4rem;
  width: 8rem;
`;

const LinkBox = ({src, size = "2rem", href, showBanner}) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <LinkBoxWrap
      {...{
        bg: WHITE,
        inline: true,
        radius: "round",
        size,
        as: href && "a",
        href,
        target: href && "_blank",
        rel: href && "noopener noreferrer",
        onClick: showBanner && handleClick,
        cursor: true,
      }}
    >
      {show && (
        <BannerBox {...{bg: VIOLET1, fg: WHITE, radius: "1111", shadow: 1}}>
          <Text sets={[S]}>{TEL}</Text>
        </BannerBox>
      )}
      <SvgImg {...{src, size: `calc(${size} * 0.6)`}} />
    </LinkBoxWrap>
  );
};

const Footer = () => {
  const {isPhone} = useMediaQuery();
  const {github, phone, linkedin, email} = glyphs;
  return (
    <Box {...{id: "footer", bg: MAIN, fg: ANTI, shadow: 22}}>
      <ContentBox {...{padding: "1rem", column: isPhone, gap: true}}>
        <Box gap left={!isPhone}>
          <LinkBox
            {...{
              src: phone,
              href: isPhone && `tel:${TEL}`,
              showBanner: !isPhone,
            }}
          />
          <LinkBox {...{src: email, href: `mailto: ${EMAIL}`}} />
          <LinkBox {...{src: github, href: GITHUB}} />
          <LinkBox
            {...{
              src: linkedin,
              href: LINKEDIN,
            }}
          />
        </Box>
        <Box fg={ANTI} right={!isPhone}>
          <Text as="a" href={`mailto: ${EMAIL}`}>
            HGZ &copy; {new Date().getFullYear()}
          </Text>
        </Box>
      </ContentBox>
    </Box>
  );
};

export default Footer;
