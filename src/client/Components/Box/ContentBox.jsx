import {styled} from 'Styles'
import {Box} from 'Components/Box'

export const ContentBox = styled(Box)`
	max-width: ${p => p.maxWidth || p.theme.contentWidth};
`

export const NarrowContentBox = styled(Box)`
	max-width: ${p => `calc(${p.maxWidth || p.theme.contentWidth} - 14rem)`};
`
