import path from 'node:path'
import process from 'node:process'
import chokidar from 'chokidar'
import build from './index.js'

export async function watch(templatePath: string) {
	const watcher = chokidar.watch(path.join(process.cwd(), templatePath))

	watcher.on('change', async () => {
		await build()
			.then(() => {
				console.log('👀 Waiting for changes...\n')
			})
			.catch((error: unknown) => {
				console.error(error)
			})
	})
}
