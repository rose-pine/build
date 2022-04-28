import fs from 'node:fs'
import path from 'node:path'
import {roles, variants, type Color} from '@rose-pine/palette'
import {type Config} from '../config.js'
import {formatColor} from './format-color.js'

export const generateVariants = (config: Config) => {
	const template = fs.readFileSync(config.template, 'utf8').toString()
	const extension = path.extname(config.template)

	for (const variant of Object.keys(variants)) {
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
			const currentColor = roles[role][variant] as Color
			const color = formatColor(currentColor, config.format, config.stripSpaces)

			result = result.replaceAll(`${config.prefix}${role}`, color)
		}

		result = result.replaceAll(`${config.prefix}id`, id)
		result = result.replaceAll(`${config.prefix}name`, name)
		result = result.replaceAll(`${config.prefix}description`, description)
		result = result.replaceAll(`${config.prefix}type`, type)

		fs.mkdirSync(config.output, {recursive: true})
		fs.writeFileSync(`${config.output}/${id}${extension}`, result, 'utf8')
	}
}
