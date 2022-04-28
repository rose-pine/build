import {resolveConfig, type UserOptions} from './config.js'
import {generateVariants} from './utils/generate-variants.js'

export const build = async (flags?: UserOptions) => {
	const config = resolveConfig(flags)

	generateVariants(config)

}

export default build
