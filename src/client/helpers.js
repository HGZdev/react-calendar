import {format, isValid} from 'date-fns'

export const mockFunc = n => n * n

export const dateFormatter = (d, f = 'yyyy-MM-dd') => {
	if (!d) return
	const date = new Date(d)
	if (!isValid(date)) throw new Error(`Date is invalid.`)

	return format(date, f)
}

export const isNumeric = v => Number.parseInt(v, 10) && !Number.isNaN(v)

export const makeDate = dateArr =>
	dateArr?.length &&
	[dateArr[0], dateArr[1] < 10 ? ('0' + dateArr[1]).slice(-2) : dateArr[1]]
		.reverse()
		.join('.')

export const randomRange = (min, max) => Math.floor(Math.random() * max) + min

export const makeId = (length, onlyLetters, onlyNumbers) => {
	let result = ''
	const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
	const numbers = '0123456789'
	const characters = onlyLetters
		? letters
		: onlyNumbers
		? numbers
		: letters + numbers

	const charactersLength = characters.length
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength))
	}
	return result
}
