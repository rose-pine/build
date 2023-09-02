#!/usr/bin/env node
import meow from "meow";
import build from "./index.js";

const cli = meow(
	`
	Usage
		$ build [options]

	Options
		-t, --template      Path to template file
		-o, --output        Directory for generated files
		-p, --prefix        Variable prefix
		-f, --format        Color output format
		-s, --strip-spaces  Strip spaces in output
		-w, --watch         Rebuild when template changes

	Examples
		$ build -w
		$ build -s -f rgb
		$ build -t ./template.yml -o ./
	`,
	{
		booleanDefault: undefined,
		importMeta: import.meta,
		flags: {
			template: {
				shortFlag: "t",
				type: "string",
			},
			output: {
				shortFlag: "o",
				type: "string",
			},
			prefix: {
				shortFlag: "p",
				type: "string",
			},
			format: {
				shortFlag: "f",
				type: "string",
			},
			stripSpaces: {
				shortFlag: "s",
				type: "boolean",
			},
			watch: {
				shortFlag: "w",
				type: "boolean",
			},
		},
	},
);

// @ts-expect-error We need to account for format
await build(cli.flags);
