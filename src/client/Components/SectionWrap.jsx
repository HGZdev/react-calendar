import React from 'react'
import {Box, ContentBox} from 'Components/Box'
import {styled, css, WHITE} from 'Styles'

const WideBox = styled(Box)`
	${p =>
		p.imgUrl &&
		css`
			background-image: url(${p => p.imgUrl});
			background-position: center;
			background-size: cover;
			background-blend-mode: normal;
		`}
`

/**
 * Componment wrapping each app page
 * @param {{children: Node, bg: string, fg: string, imgUrl: string, top: boolean, gap: string|boolean, padding: string}} props
 */
const SectionWrap = ({
	children,
	bg = WHITE,
	fg,
	imgUrl,
	top = true,
	gap,
	padding = '1rem 1rem',
}) => (
	<WideBox {...{bg, fg, imgUrl, top}} stretch>
		<ContentBox {...{padding, top, gap}} column>
			{children}
		</ContentBox>
	</WideBox>
)

export default SectionWrap
