import React from 'react'
import PropTypes from 'prop-types'

export const DATA_SCROLL_OFFSET = 'data-scroll-offset'

const ScrollLink = ({Component = 'a', children, to, ...rest}) => {
	const handleClick = e => {
		e.preventDefault()
		const el = document.querySelector(to)

		const offset = Number.parseInt(el?.getAttribute(DATA_SCROLL_OFFSET), 10)

		// TODO smooth scroll in Safari. It doesn't work well with 'window'. On the other hand, '#appWrap' has to be bind to the element with defined overflow.
		// document.querySelector('#appWrap').scrollTo({
		window.scrollTo({
			top: Number.isNaN(offset) ? el.offsetTop : el.offsetTop + offset,
			behavior: 'smooth',
		})
	}

	return (
		<Component {...{...rest, href: to, onClick: handleClick}}>
			{children}
		</Component>
	)
}
ScrollLink.propTypes = {
	Component: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
	children: PropTypes.node,
	to: PropTypes.string,
}

export default ScrollLink
