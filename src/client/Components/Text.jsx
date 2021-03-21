import {styled, css} from 'Styles'

export const XXXL = 'XXXL'
export const XXL = 'XXL'
export const XL = 'XL'
export const L = 'L'
export const M = 'M'
export const S = 'S'
export const XS = 'XS'
export const BOLD = 'BOLD'
export const NORMAL = 'NORMAL'
export const THIN = 'THIN'
export const ITALIC = 'ITALIC'
export const MAIN_COL = 'MAIN_COL'
export const ANTI_COL = 'ANTI_COL'
export const BLUE4_COL = 'BLUE4_COL'
export const BLUE1_COL = 'BLUE1_COL'
export const VIOLET1_COL = 'VIOLET1_COL'
export const UL = 'UL'
export const OL = 'OL'
export const LINK = 'LINK'

export const Text = styled.span`
	${p => p.theme.text?.css};
	${p => p.sets?.map(set => p.theme.text?.[set])}

	${p => p.left && `text-align: left`};
	${p => p.center && `text-align: center`};
	${p => p.right && `text-align: right`};

	${p => p.upperCase && `text-transform: uppercase`};

	${p => p.cursor && `cursor: pointer`};

	transition: 0.5s;
	${p =>
		p.underlineOnHover &&
		css`
			:hover {
				text-decoration: underline;
			}
		`};
`
