import fs from 'node:fs'
import process from 'node:process'
import {variants} from '@rose-pine/palette'
import test from 'ava'
import build from '../source/index.js'

const mockDir = process.cwd() + '/test/mock'

const readFile = (file: string, ext: string) =>
	fs.readFileSync(`${mockDir}/dist/${file}.${ext}`, 'utf8')

test('json template with hex values', async (t) => {
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
			base: variants.main.base.hex,
			surface: variants.main.surface.hex,
			overlay: variants.main.overlay.hex,
			muted: variants.main.muted.hex,
			subtle: variants.main.subtle.hex,
			love: variants.main.love.hex,
			gold: variants.main.gold.hex,
			rose: variants.main.rose.hex,
			pine: variants.main.pine.hex,
			foam: variants.main.foam.hex,
			iris: variants.main.iris.hex,
			highlightLow: variants.main.highlightLow.hex,
			highlightLowAlpha: variants.main.highlightLow.alpha.hex,
			highlightMed: variants.main.highlightMed.hex,
			highlightMedAlpha: variants.main.highlightMed.alpha.hex,
			highlightHigh: variants.main.highlightHigh.hex,
			highlightHighAlpha: variants.main.highlightHigh.alpha.hex,
		},
	})

	t.like(moon, {
		id: 'rose-pine-moon',
		name: 'Rosé Pine Moon',
		description:
			'All natural pine, faux fur and a bit of soho vibes for the classy minimalist',
		colors: {
			base: variants.moon.base.hex,
			surface: variants.moon.surface.hex,
			overlay: variants.moon.overlay.hex,
			muted: variants.moon.muted.hex,
			subtle: variants.moon.subtle.hex,
			love: variants.moon.love.hex,
			gold: variants.moon.gold.hex,
			rose: variants.moon.rose.hex,
			pine: variants.moon.pine.hex,
			foam: variants.moon.foam.hex,
			iris: variants.moon.iris.hex,
			highlightLow: variants.moon.highlightLow.hex,
			highlightLowAlpha: variants.moon.highlightLow.alpha.hex,
			highlightMed: variants.moon.highlightMed.hex,
			highlightMedAlpha: variants.moon.highlightMed.alpha.hex,
			highlightHigh: variants.moon.highlightHigh.hex,
			highlightHighAlpha: variants.moon.highlightHigh.alpha.hex,
		},
	})

	t.like(dawn, {
		id: 'rose-pine-dawn',
		name: 'Rosé Pine Dawn',
		description:
			'All natural pine, faux fur and a bit of soho vibes for the classy minimalist',
		colors: {
			base: variants.dawn.base.hex,
			surface: variants.dawn.surface.hex,
			overlay: variants.dawn.overlay.hex,
			muted: variants.dawn.muted.hex,
			subtle: variants.dawn.subtle.hex,
			love: variants.dawn.love.hex,
			gold: variants.dawn.gold.hex,
			rose: variants.dawn.rose.hex,
			pine: variants.dawn.pine.hex,
			foam: variants.dawn.foam.hex,
			iris: variants.dawn.iris.hex,
			highlightLow: variants.dawn.highlightLow.hex,
			highlightLowAlpha: variants.dawn.highlightLow.alpha.hex,
			highlightMed: variants.dawn.highlightMed.hex,
			highlightMedAlpha: variants.dawn.highlightMed.alpha.hex,
			highlightHigh: variants.dawn.highlightHigh.hex,
			highlightHighAlpha: variants.dawn.highlightHigh.alpha.hex,
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
