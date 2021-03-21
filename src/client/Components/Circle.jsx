import React from 'react'
import {styled} from '../styles'
import {Box} from '../Components/Box'

const CircleShape = styled(Box)`
	padding-top: 100%;
	height: 0;
	overflow: hidden;
	border-radius: 50%;
`

const CircleContent = styled(Box)`
	padding: calc(${p => p.size} * 0.146);
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	overflow: hidden;
`

const CircleBox = ({children, size, shapeProps}) => (
	<CircleShape {...shapeProps}>
		<CircleContent {...{size}}>{children}</CircleContent>
	</CircleShape>
)

export default CircleBox
