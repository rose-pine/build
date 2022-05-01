import {type Color} from '@rose-pine/palette'
import {type Config} from '../config.js'

export const formatColor = (
	color: Color,
	format: Config['format'] = 'hex',
	stripSpaces: Config['stripSpaces'] = false
) => {
	const workingColor = {...color}

	const formats = {
		hex: workingColor.hex,
		'hex-ns': workingColor.hex.replace('#', ''),
		rgb: workingColor.rgb
			.replace('rgb(', '')
			.replace('rgba(', '')
			.replace(')', ''),
		'rgb-ns': workingColor.rgb
			.replace('rgb(', '')
			.replace('rgba(', '')
			.replace(')', '')
			.replaceAll(',', ''),
		'rgb-array': workingColor.rgb
			.replace('rgb(', '[')
			.replace('rgba(', '[')
			.replace(')', ']'),
		'rgb-function': workingColor.rgb,
		hsl: workingColor.hsl
			.replace('hsl(', '')
			.replace('hsla(', '')
			.replace(')', ''),
		'hsl-ns': workingColor.hsl
			.replace('hsl(', '')
			.replace('hsla(', '')
			.replace(')', '')
			.replaceAll(',', ''),
		'hsl-array': workingColor.hsl
			.replace('hsl(', '[')
			.replace('hsla(', '[')
			.replace(')', ']'),
		'hsl-function': workingColor.hsl,
	}

	if (stripSpaces) return formats[format].replaceAll(' ', '')
	return formats[format]
}
