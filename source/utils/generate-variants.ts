import fs from 'node:fs'
import path from 'node:path'
import {roles, variants, type Color, type AlphaColor} from '@rose-pine/palette'
import {type Config} from '../config.js'
import {formatColor} from './format-color.js'

export const generateVariants = (config: Config) => {
	const template = fs.readFileSync(config.template, 'utf8').toString()
	const extension = path.extname(config.template)

	for (const [i, variant] of Object.keys(variants).entries()) {
		const id = `rose-pine${variant === 'main' ? '' : `-${variant}`}`
		const name = `Rosé Pine${
			variant === 'main'
				? ''
				: ' ' + variant.charAt(0).toUpperCase() + variant.slice(1)
		}`
		const description =
			'All natural pine, faux fur and a bit of soho vibes for the classy minimalist'
		const type = variant === 'dawn' ? 'light' : 'dark'

		let result = template

		for (const role of Object.keys(roles)) {
			// @ts-expect-error role cannot be used to index
			const currentColor = roles[role][variant] as Color | AlphaColor

			if ('alpha' in currentColor) {
				// Replace alpha colors
				result = result.replaceAll(
					`${config.prefix}${role}Alpha`,
					formatColor(currentColor.alpha, config.format, config.stripSpaces)
				)
			}

			// Replace colors
			result = result.replaceAll(
				`${config.prefix}${role}`,
				formatColor(currentColor, config.format, config.stripSpaces)
			)
		}

		// Replace built-in values
		result = result.replaceAll(`${config.prefix}id`, id)
		result = result.replaceAll(`${config.prefix}name`, name)
		result = result.replaceAll(`${config.prefix}description`, description)
		result = result.replaceAll(`${config.prefix}type`, type)

		// Replace custom values
		result = result.replaceAll(/\$\((.*?)\|(.*?)\|(.*?)\)/gm, `$${i + 1}`)

		fs.mkdirSync(config.output, {recursive: true})
		fs.writeFileSync(`${config.output}/${id}${extension}`, result, 'utf8')
	}
}
