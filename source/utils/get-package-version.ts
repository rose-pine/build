import fs from "node:fs";

export const getPackageVersion = () => {
	const { version = "latest" } = JSON.parse(
		fs.readFileSync(new URL("../../package.json", import.meta.url), "utf8"),
	) as Record<string, string>;

	return version;
};
