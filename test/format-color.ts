import test from 'ava'
import {formatColor} from '../source/utils/format-color.js'

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
