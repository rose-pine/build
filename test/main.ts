import fs from 'node:fs'
import process from 'node:process'
import test from 'ava'
import build from '../source/index.js'
import {formatColor} from '../source/utils/format-color.js'

const mockDir = process.cwd() + '/test/mock'

const readFile = (file: string, ext: string) =>
	fs.readFileSync(`${mockDir}/dist/${file}.${ext}`, 'utf8')

test('json template', async (t) => {
	await build({
		template: mockDir + '/template.json',
		output: mockDir + '/dist',
	})

	const [main, moon, dawn] = ['', '-moon', '-dawn'].map(
		(v) =>
			JSON.parse(readFile(`rose-pine${v}`, 'json')) as Record<string, string>
	)

	if (typeof main !== 'undefined') {
		t.is(main['id'], 'rose-pine')
		t.is(main['name'], 'Rosé Pine')
		t.is(
			main['description'],
			'All natural pine, faux fur and a bit of soho vibes for the classy minimalist'
		)
		t.is(main['type'], 'dark')
		t.is(main['foreground'], '#e0def4')
		t.is(main['background'], '#191724')
	}

	if (typeof moon !== 'undefined') {
		t.is(moon['id'], 'rose-pine-moon')
		t.is(moon['name'], 'Rosé Pine Moon')
		t.is(
			moon['description'],
			'All natural pine, faux fur and a bit of soho vibes for the classy minimalist'
		)
		t.is(moon['type'], 'dark')
		t.is(moon['foreground'], '#e0def4')
		t.is(moon['background'], '#232136')
	}

	if (typeof dawn !== 'undefined') {
		t.is(dawn['id'], 'rose-pine-dawn')
		t.is(dawn['name'], 'Rosé Pine Dawn')
		t.is(
			dawn['description'],
			'All natural pine, faux fur and a bit of soho vibes for the classy minimalist'
		)
		t.is(dawn['type'], 'light')
		t.is(dawn['foreground'], '#575279')
		t.is(dawn['background'], '#faf4ed')
	}
})

test('txt template', async (t) => {
	await build({
		template: mockDir + '/template.txt',
		output: mockDir + '/dist',
	})

	const [main, moon, dawn] = ['', '-moon', '-dawn'].map((v) =>
		readFile(`rose-pine${v}`, 'txt').trim()
	)

	t.is(main, 'Rosé Pine can also be pronounced #ebbcba #31748f')
	t.is(moon, 'Rosé Pine Moon can also be pronounced #ea9a97 #3e8fb0')
	t.is(dawn, 'Rosé Pine Dawn can also be pronounced #d7827e #286983')
})

test('format color', (t) => {
	const testColor = {
		hex: '#ebbcba',
		rgb: 'rgb(235, 188, 186)',
		hsl: 'hsl(2, 55%, 83%)',
	}

	t.is(formatColor(testColor, 'hex'), '#ebbcba')
	t.is(formatColor(testColor, 'hex-ns'), 'ebbcba')
	t.is(formatColor(testColor, 'hex', true), '#ebbcba')
	t.is(formatColor(testColor, 'hex-ns', true), 'ebbcba')
	t.is(formatColor(testColor, 'rgb'), '235, 188, 186')
	t.is(formatColor(testColor, 'rgb-ns'), '235 188 186')
	t.is(formatColor(testColor, 'rgb-array'), '[235, 188, 186]')
	t.is(formatColor(testColor, 'rgb-function'), 'rgb(235, 188, 186)')
	t.is(formatColor(testColor, 'rgb', true), '235,188,186')
	t.is(formatColor(testColor, 'rgb-ns', true), '235188186')
	t.is(formatColor(testColor, 'rgb-array', true), '[235,188,186]')
	t.is(formatColor(testColor, 'rgb-function', true), 'rgb(235,188,186)')
	t.is(formatColor(testColor, 'hsl'), '2, 55%, 83%')
	t.is(formatColor(testColor, 'hsl-ns'), '2 55% 83%')
	t.is(formatColor(testColor, 'hsl-array'), '[2, 55%, 83%]')
	t.is(formatColor(testColor, 'hsl-function'), 'hsl(2, 55%, 83%)')
	t.is(formatColor(testColor, 'hsl', true), '2,55%,83%')
	t.is(formatColor(testColor, 'hsl-ns', true), '255%83%')
	t.is(formatColor(testColor, 'hsl-array', true), '[2,55%,83%]')
	t.is(formatColor(testColor, 'hsl-function', true), 'hsl(2,55%,83%)')
})
