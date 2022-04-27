# @rose-pine/build

> Theme generator for Rosé Pine

## Usage

Start by creating a template file. This will look similar to your desired theme file, replacing colour values with Rosé Pine variables. For example, `#ebbcba` would now be `$rose`.

```sh
$ npx @rose-pine/build --help

	Usage
		$ npx @rose-pine/build [options]

	Options
		-t, --template      Path to template file
		-o, --output        Directory for generated files
		-p, --prefix        Variable prefix
		-f, --format        Color output format
		-s, --strip-spaces  Strip spaces in output

	Examples
		$ npx @rose-pine/build -s -f rgb
		$ npx @rose-pine/build -t ./template.yml -o ./
```

## Formats

**hex**\
`#ebbcba`

**hex-ns**\
`ebbcba`

**rgb**\
`235, 188, 186`

**rgb-ns**\
`235 188 186`

**rgb-array**\
`[235, 188, 186]`

**rgb-function**\
`rgb(235, 188, 186)`

**hsl**\
`2, 55%, 83%`

**hsl-ns**\
`2 55% 83%`

**hsl-array**\
`[2, 55%, 83%]`

**hsl-function**\
`rgb(2, 55%, 83%)`

## Variables

> By default, variables are prefixed with `$`

All values from [@rose-pine/palette](https://github.com/rose-pine/palette) are available as well as the following:

**id**\
rose-pine | rose-pine-moon | rose-pine-dawn

**name**\
Rosé Pine | Rosé Pine Moon | Rosé Pine Dawn

**description**\
All natural pine, faux fur and a bit of soho vibes for the classy minimalist

**type**\
dark | dark | light
