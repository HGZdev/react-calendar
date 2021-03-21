import React from 'react'
import {Link as LinkOrg} from 'react-router-dom'
import {LINK, Text} from './Text'

const Link = ({noRoute, to, ...p}) => (
	<Text
		// sets={[LINK]}
		underlineOnHover
		cursor
		{...p}
		as={noRoute ? 'a' : LinkOrg}
		href={noRoute && to}
		to={noRoute ? 'null' : to}
	/>
)

export default Link
