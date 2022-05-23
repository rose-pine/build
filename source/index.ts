import {resolveConfig, type UserOptions} from './config.js'
import {watch} from './watch.js'
import {getPackageVersion} from './utils/get-package-version.js'
import {generateVariants} from './utils/generate-variants.js'
import {updateReadmeVersion} from './utils/update-readme-version.js'

export const build = async (flags?: UserOptions) => {
	const config = resolveConfig(flags)

	generateVariants(config)

	if (!config.__skipReadmeVersion) {
		const version = getPackageVersion()
		updateReadmeVersion(version)
	}

	if (config.watch) {
		console.log('👀 Waiting for changes...\n')
		await watch(config.template)
	}
}

export default build
