import path from 'node:path'
import process from 'node:process'
import chokidar from 'chokidar'
import {type Config} from './config.js'
import build from './index.js'

export async function watch(config: Config) {
	const watcher = chokidar.watch(path.join(process.cwd(), config.template))

	watcher.on('change', async () => {
		await build({...config, watch: false})
			.then(() => {
				console.log('👀 Waiting for changes...\n')
			})
			.catch((error: unknown) => {
				console.error(error)
			})
	})
}
