import process from "node:process";

export type CustomValues = Record<
	string,
	{
		main?: string;
		moon?: string;
		dawn?: string;
	}
>;

export type Config = {
	__skipReadmeVersion: boolean;
	template: string;
	output: string;
	prefix: string;
	format:
		| "hex"
		| "hex-ns"
		| "rgb"
		| "rgb-ns"
		| "rgb-array"
		| "rgb-function"
		| "hsl"
		| "hsl-ns"
		| "hsl-array"
		| "hsl-function";
	stripSpaces: boolean;
	watch: boolean;
};

export type UserOptions = Partial<Config>;

export const resolveConfig = (flags?: UserOptions) => {
	const defaultConfig: Config = {
		__skipReadmeVersion: false,
		template: process.cwd() + "/source/template.json",
		output: process.cwd() + "/dist",
		prefix: "$",
		format: "hex",
		stripSpaces: false,
		watch: false,
	};

	return Object.assign(defaultConfig, flags);
};
