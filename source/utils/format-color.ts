import {type Color} from '@rose-pine/palette'
import {type Config} from '../config.js'

export const formatColor = (
	color: Color,
	format: Config['format'] = 'hex',
	stripSpaces: Config['stripSpaces'] = false
) => {
	const {hex, rgb, hsl} = {...color}
	const [h, s, l] = hsl

	const formattedRgb = rgb.join(', ')
	const formattedHsl = `${h!}, ${s!}%, ${l!}%${hsl[3] ? `, ${hsl[3]}` : ''}`

	const formats = {
		hex: `#${hex}`,
		'hex-ns': hex,
		rgb: formattedRgb,
		'rgb-ns': formattedRgb.replaceAll(',', ''),
		'rgb-array': `[${formattedRgb}]`,
		'rgb-function': `rgb${rgb[3] ? 'a' : ''}(${formattedRgb})`,
		hsl: formattedHsl,
		'hsl-ns': formattedHsl.replaceAll(',', ''),
		'hsl-array': `[${formattedHsl}]`,
		'hsl-function': `hsl${rgb[3] ? 'a' : ''}(${formattedHsl})`,
	}

	if (stripSpaces) return formats[format].replaceAll(' ', '')
	return formats[format]
}
