import React, {useRef, useState} from "react";
import {Box} from "Components/Box";
import {ANTI_COL, M, Text} from "Components/Text";
import {styled, css, MAIN, ANTI} from "Styles";
import {useMediaQuery} from "plugins/MediaQuery";
import ScrollLink from "./ScrollLink";

const MenuInput = styled(Box)``;

const MenuLabel = styled(Box)``;

const MenuIcon = styled(Box).attrs({
  size: 2, // px,
})`
  position: absolute;
  height: ${(p) => p.size}px;
  width: 100%;

  background-color: ${ANTI};
  border-radius: 5px;

  ::before,
  ::after {
    content: "";
    position: absolute;
    left: 0;
    height: ${(p) => p.size}px;
    width: 100%;

    background: ${ANTI};
    border-radius: 5px;

    transition: 0.3s ease-in-out;
  }
  ::before {
    top: -${(p) => p.size * 3}px;
  }
  ::after {
    bottom: -${(p) => p.size * 3}px;
  }
`;

const ListWrap = styled(Box)`
  ${(p) =>
    p.isPhone &&
    css`
      padding: 0.5rem;
      display: none;

      position: fixed;
      top: 2.5rem;
      left: 0;
      width: 100vw;
      max-height: calc(100vh - 2.5rem);
      height: 0;

      background-color: ${MAIN};

      /* overflow stuff */
      overflow-x: hidden;
      overflow-y: scroll;
      /* IE 10+ */
      -ms-overflow-style: none;
      /* Firefox */
      scrollbar-width: none;

      /* Safari and Chrome */
      ::-webkit-scrollbar {
        display: none;
      }
    `}
`;

const ListItem = ({id, label, sections, onClose}) => {
  const [open, setOpen] = useState();
  const {isPhone} = useMediaQuery();
  return (
    <Box
      {...{
        as: "li",
        column: true,
        left: true,
        inline: !isPhone,
      }}
    >
      <Box gap="3rem" spaceBetween>
        <Box {...{inline: true, padding: "0.5rem"}}>
          <ScrollLink to={`#${id}`} padding="2rem">
            <Text sets={[M, ANTI_COL]} onClick={(e) => onClose(e)}>
              {label
                ?.split("")
                .map((n, i) => (i ? n : n.toUpperCase()))
                .join("")}
            </Text>
          </ScrollLink>
        </Box>
        {isPhone && sections && (
          <Box
            {...{
              right: true,
              inline: true,
              padding: "0.5rem",
              as: "a",
              onClick: () => setOpen(!open),
            }}
          >
            {open ? "-" : "+"}
          </Box>
        )}
      </Box>
      {open && (
        <Box as="ul" top column left>
          {sections?.map((item, i) => (
            <ListItem key={i} {...{...item, onClose}} />
          ))}
        </Box>
      )}
    </Box>
  );
};

const List = ({items, onClose}) => {
  const {isPhone} = useMediaQuery();
  if (!items) return false;
  return (
    <ListWrap
      {...{
        as: "ul",
        gap: "0.5rem",
        column: isPhone,
        isPhone,
      }}
      top
    >
      {items
        .filter(({noLink}) => !noLink)
        .map((item, i) => (
          <ListItem key={i} {...{...item, onClose}} />
        ))}
    </ListWrap>
  );
};

const MenuWrap = styled(Box)`
  ${MenuLabel} {
    z-index: 1;
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
  }

  ${MenuInput} {
    opacity: 0;

    &:checked ~ {
      ${MenuLabel} ${MenuIcon} {
        background: transparent;
        ::before {
          top: 0;
          transform: rotate(45deg);
        }
        ::after {
          bottom: 0;
          transform: rotate(-45deg);
        }
      }

      ${List} {
        transition: all 0.3s ease-in;
        ${ListWrap} {
          display: flex;
          height: auto;
          /* height: 100%; // well defined height guarantees proper animation */
        }
      }
    }
  }
`;

const MenuWithHamburger = ({items}) => {
  const {isPhone} = useMediaQuery();
  const menuCheckBox = useRef();

  const handleClose = () => {
    if (menuCheckBox?.current) menuCheckBox.current.checked = false;
  };

  if (!items) return false;
  return (
    <MenuWrap right>
      {isPhone && (
        <>
          <MenuInput
            as="input"
            type="checkbox"
            id="menu-input"
            ref={menuCheckBox}
          />
          <MenuLabel as="label" htmlFor="menu-input" inline cursor>
            <MenuIcon />
          </MenuLabel>
        </>
      )}
      <List {...{items, onClose: handleClose}} />
    </MenuWrap>
  );
};

export default MenuWithHamburger;
