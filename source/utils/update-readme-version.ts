import fs from 'node:fs'
import process from 'node:process'

export const updateReadmeVersion = (version: string) => {
	const readme = fs
		.readFileSync(process.cwd() + '/readme.md', 'utf8')
		.toString()

	const searchFor = /^.*_Generated by @rose-pine\/build(@.*?)?_.*$/gm
	const replaceWith = `_Generated by @rose-pine/build${
		version ? `@${version}` : ''
	}_`
	const hasMatch = (readme.match(searchFor) ?? []).length > 0

	const readmeWithVersion = hasMatch
		? readme.replace(searchFor, replaceWith)
		: readme + `\n${replaceWith}`

	fs.writeFileSync(process.cwd() + '/readme.md', readmeWithVersion, 'utf8')
}
