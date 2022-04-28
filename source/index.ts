import {resolveConfig, type UserOptions} from './config.js'
import {getPackageVersion} from './utils/get-package-version.js'
import {generateVariants} from './utils/generate-variants.js'
import {updateReadmeVersion} from './utils/update-readme-version.js'

export const build = async (flags?: UserOptions) => {
	const config = resolveConfig(flags)

	generateVariants(config)

	const version = getPackageVersion()
	updateReadmeVersion(version)
}

export default build
