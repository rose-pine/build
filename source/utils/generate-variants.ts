import fs from "node:fs";
import path from "node:path";
import {
	roleKeys,
	roleColors,
	variants,
	variantKeys,
} from "@rose-pine/palette";
import { type Config } from "../config.js";
import { formatColor } from "./format-color.js";

function generateVariant(
	variant: (typeof variants)[keyof typeof variants],
	template: string,
	filename: string,
	config: Config,
	accent?: "love" | "gold" | "rose" | "pine" | "foam" | "iris",
) {
	const description =
		"All natural pine, faux fur and a bit of soho vibes for the classy minimalist";
	const type = variant.key === "dawn" ? "light" : "dark";

	let result = template;

	for (const role of roleKeys) {
		const currentColor = roleColors[role][variant.key as keyof typeof variants];

		if ("alpha" in currentColor) {
			// Replace alpha colors
			result = result.replaceAll(
				`${config.prefix}${role}Alpha`,
				formatColor(currentColor.alpha, config.format, config.stripSpaces),
			);
		}

		// Replace colors
		result = result.replaceAll(
			`${config.prefix}${role}`,
			formatColor(currentColor, config.format, config.stripSpaces),
		);
	}

	// Replace built-in values
	result = result.replaceAll(`${config.prefix}id`, variant.id);
	result = result.replaceAll(`${config.prefix}name`, variant.name);
	result = result.replaceAll(`${config.prefix}description`, description);
	result = result.replaceAll(`${config.prefix}type`, type);

	// Replace custom values
	result = result.replaceAll(
		/\$\((.*?)\|(.*?)\|(.*?)\)/gm,
		`$${variantKeys.indexOf(variant.key as keyof typeof variants) + 1}`,
	);

	if (accent !== undefined) {
		result = result.replaceAll(`${config.prefix}accent`, accent);
	}

	fs.mkdirSync(config.output, { recursive: true });
	fs.writeFileSync(path.join(config.output, filename), result, "utf8");
}

export const generateVariants = (
	config: Config,
	accent?: "love" | "gold" | "rose" | "pine" | "foam" | "iris",
) => {
	const isDir = fs.lstatSync(config.template).isDirectory();
	const extension = path.extname(config.template);

	for (const variant of variantKeys) {
		const currentVariant = variants[variant];

		if (isDir) {
			fs.mkdirSync(path.join(config.output, currentVariant.key), {
				recursive: true,
			});

			const templateFiles = fs.readdirSync(config.template);
			for (const file of templateFiles) {
				const template = fs.readFileSync(
					path.join(config.template, file),
					"utf8",
				);

				generateVariant(
					currentVariant,
					template,
					accent
						? path.join(`${currentVariant.key}-${accent}`, file)
						: path.join(currentVariant.key, file),
					config,
					accent,
				);
			}
		} else {
			generateVariant(
				currentVariant,
				fs.readFileSync(config.template, "utf8").toString(),
				accent
					? `${currentVariant.id}-${accent}${extension}`
					: currentVariant.id + extension,
				config,
				accent,
			);
		}
	}
};
