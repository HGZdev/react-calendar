import React from 'react'
import {Box} from './Box'
import Link from './Link'
import {Text, XXL} from './Text'
// import {Route, BrowserRouter} from 'react-router-dom'

const errors = {
	404: {
		msg: 'Page not found',
	},
}

const ErrorPage = ({error = 404}) => {
	if (!error) throw new Error('error type is undefined.')
	return (
		<Box column top gap padding="7rem 1rem">
			<Text sets={[XXL]}>{`Error: ${error} - ${errors[error]?.msg}`}</Text>

			<Link to="/">Go Home</Link>
		</Box>
	)
}

export default ErrorPage
