import fs from 'node:fs'
import process from 'node:process'
import test from 'ava'
import build from '../source/index.js'

const mockDir = process.cwd() + '/test/mock'

const readFile = (file: string, ext: string) =>
	fs.readFileSync(`${mockDir}/dist/${file}.${ext}`, 'utf8')

test('json template with default format', async (t) => {
	await build({
		__skipReadmeVersion: true,
		template: mockDir + '/template.json',
		output: mockDir + '/dist',
	})

	const [main, moon, dawn] = ['', '-moon', '-dawn'].map(
		(v) =>
			JSON.parse(readFile(`rose-pine${v}`, 'json')) as Record<string, string>
	)

	t.like(main, {
		id: 'rose-pine',
		name: 'Rosé Pine',
		description:
			'All natural pine, faux fur and a bit of soho vibes for the classy minimalist',
		colors: {
			foreground: '#e0def4',
			background: '#191724',
		},
	})

	t.like(moon, {
		id: 'rose-pine-moon',
		name: 'Rosé Pine Moon',
		description:
			'All natural pine, faux fur and a bit of soho vibes for the classy minimalist',
		colors: {
			foreground: '#e0def4',
			background: '#232136',
		},
	})

	t.like(dawn, {
		id: 'rose-pine-dawn',
		name: 'Rosé Pine Dawn',
		description:
			'All natural pine, faux fur and a bit of soho vibes for the classy minimalist',
		colors: {
			foreground: '#575279',
			background: '#faf4ed',
		},
	})
})

test('txt template with hex values', async (t) => {
	await build({
		__skipReadmeVersion: true,
		template: mockDir + '/template.txt',
		output: mockDir + '/dist',
		format: 'hex',
	})

	const [main, moon, dawn] = ['', '-moon', '-dawn'].map((v) =>
		readFile(`rose-pine${v}`, 'txt').trim()
	)

	t.is(main, 'Rosé Pine can also be pronounced #ebbcba #31748f')
	t.is(moon, 'Rosé Pine Moon can also be pronounced #ea9a97 #3e8fb0')
	t.is(dawn, 'Rosé Pine Dawn can also be pronounced #d7827e #286983')
})
