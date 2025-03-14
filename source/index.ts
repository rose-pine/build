import { resolveConfig, type UserOptions } from "./config.js";
import { watch } from "./watch.js";
import { getPackageVersion } from "./utils/get-package-version.js";
import { generateVariants } from "./utils/generate-variants.js";
import { updateReadmeVersion } from "./utils/update-readme-version.js";

export const build = async (flags?: UserOptions) => {
	const config = resolveConfig(flags);

	if (config.accents) {
		(["love", "gold", "rose", "pine", "foam", "iris"] as const).map(
			(accent) => {
				generateVariants(config, accent);
			},
		);
	} else {
		generateVariants(config);
	}

	if (!config.__skipReadmeVersion) {
		const version = getPackageVersion();
		updateReadmeVersion(version, flags);
	}

	if (config.watch) {
		console.log("👀 Waiting for changes...\n");
		await watch(config);
	}
};

export default build;
