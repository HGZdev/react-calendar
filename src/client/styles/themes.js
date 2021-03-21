/* eslint-disable complexity */
import {css} from 'styled-components'
import {ACCENT, BLUE4, WHITE, ANTI, MAIN, VIOLET1, BLUE1} from './colors'

import {
	BOLD,
	NORMAL,
	THIN,
	ITALIC,
	MAIN_COL,
	ANTI_COL,
	BLUE4_COL,
	BLUE1_COL,
	VIOLET1_COL,
	XXXL,
	XXL,
	XL,
	L,
	M,
	S,
	XS,
	UL,
	OL,
	LINK,
} from '../Components/Text'

export const defaultTheme = {contentWidth: '64rem', gap: '1rem'}

const defaultColorsTheme = {
	colorsCss: css`
		${p =>
			css`
				color: ${p.fg || p.theme.fg};
				background-color: ${p.bg || p.theme.bg};

				transition: 0.5s;
				:hover {
					color: ${p.hoverFg || p.theme.hoverFg};
					background-color: ${p.hoverBg || p.theme.hoverBg};
				}
			`}
	`,
}

const defaultTextTheme = {
	text: {
		css: css`
			${p => p.theme.text?.font};
			font-size: ${p => p.theme.text?.size?.m}rem;
		`,
		size: {
			xxxl: 2.5, // rem
			xxl: 2,
			xl: 1.5,
			l: 1.2,
			m: 1,
			s: 0.9,
			xs: 0.7,
		},
		font: css`
			font-family: 'Quicksand', sans-serif;
		`,

		[XXXL]: css`
			font-size: ${p => p.theme.text.size.xxxl}rem;
			line-height: 1.1;
		`,
		[XXL]: css`
			font-size: ${p => p.theme.text.size.xxl}rem;
			line-height: 1.1;
		`,
		[XL]: css`
			font-size: ${p => p.theme.text.size.xl}rem;
			line-height: 1.1;
		`,
		[L]: css`
			font-size: ${p => p.theme.text.size.l}rem;
			line-height: 1.1;
		`,
		[M]: css`
			font-size: ${p => p.theme.text.size.m}rem;
			line-height: 1.8;
		`,
		[S]: css`
			font-size: ${p => p.theme.text.size.s}rem;
			line-height: 1.8;
		`,
		[XS]: css`
			font-size: ${p => p.theme.text.size.xs}rem;
		`,

		[BOLD]: css`
			font-weight: 600;
		`,
		[NORMAL]: css`
			font-weight: 400;
		`,
		[THIN]: css`
			font-weight: 300;
		`,
		[ITALIC]: css`
			font-style: italic;
		`,

		[MAIN_COL]: css`
			color: ${MAIN};
		`,
		[ANTI_COL]: css`
			color: ${ANTI};
		`,
		[BLUE1_COL]: css`
			color: ${BLUE1};
		`,
		[BLUE4_COL]: css`
			color: ${BLUE4};
		`,
		[VIOLET1_COL]: css`
			color: ${VIOLET1};
		`,

		[UL]: css`
			list-style: square outside;
			line-height: 1.4;
		`,
		[OL]: css`
			list-style: decimal outside;
		`,

		[LINK]: css`
			:hover {
				text-decoration: underline;
				color: ${ACCENT};
			}
		`,
	},
}

export const headerTextTheme = {
	text: {
		link: css`
			font-weight: normal;
			color: ${WHITE};
			:hover {
				text-decoration: underline;
				color: ${ACCENT};
			}
		`,
	},
}

export const defaultRadiusTheme = {
	radius: 5 /* px */,

	radiusRound: css`
		border-radius: 500px;
	`,

	radius1111: css`
		border-radius: ${p => p.theme.radius}px;
	`,

	radius1100: css`
		border-radius: ${p => p.theme.radius}px ${p => p.theme.radius}px 0 0;
	`,

	radius1001: css`
		border-radius: ${p => p.theme.radius}px 0 0 ${p => p.theme.radius}px;
	`,

	radius0110: css`
		border-radius: 0 ${p => p.theme.radius}px ${p => p.theme.radius}px 0;
	`,

	radiusCss: css`
		${p => {
			let radius
			switch (p.radius) {
				case 'round':
					radius = p.theme.radiusRound
					break
				case '1111':
					radius = p.theme.radius1111
					break
				case '1100':
					radius = p.theme.radius1100
					break
				case '1001':
					radius = p.theme.radius1001
					break
				case '0110':
					radius = p.theme.radius0110
					break
				default:
					break
			}
			return radius
		}}
	`,
}

export const defaultShadowTheme = {
	shadow1: css`
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
		transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
	`,

	shadow11: css`
		box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.12), 0 -1px 2px rgba(0, 0, 0, 0.24);
		transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
	`,

	shadow2: css`
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
	`,

	shadow22: css`
		box-shadow: 0 -3px 6px rgba(0, 0, 0, 0.16), 0 -3px 6px rgba(0, 0, 0, 0.23);
	`,

	shadowCss: css`
		${p => {
			let shadow
			switch (p.shadow) {
				case 1:
					shadow = p.theme.shadow1
					break
				case 11:
					shadow = p.theme.shadow11
					break
				case 2:
					shadow = p.theme.shadow2
					break
				case 22:
					shadow = p.theme.shadow22
					break
				default:
					break
			}
			return shadow
		}}
	`,
}

export const defaultAppBoxTheme = {
	boxCss: css`
		${p => p.theme.colorsCss};
		${p => p.theme.radiusCss};
		${p => p.theme.shadowCss};
		${p => p.cursor && `cursor: pointer;`};
		${p => p.zIndex && `z-index: ${p.zIndex};`};
	`,
}



export const defaultThemesSet = [
	defaultTheme,
	defaultColorsTheme,
	defaultTextTheme,
	defaultRadiusTheme,
	defaultShadowTheme,
	defaultAppBoxTheme,
	// defaultAppButtonTheme,
]
