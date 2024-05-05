import fs from "node:fs";
import process from "node:process";
import { variantColors } from "@rose-pine/palette";
import test from "ava";
import build from "../dist/index.js";

const mockDir = process.cwd() + "/test/mock";

/**
 * @param {string} filename
 * @returns {string}
 */
function readFile(filename) {
	return fs.readFileSync(`${mockDir}/dist/${filename}`, "utf8");
}

test.after(() => {
	try {
		fs.rmSync(mockDir + "/dist", { recursive: true });
	} catch {}
});

test("json template with hex values", async (t) => {
	await build({
		__skipReadmeVersion: true,
		template: mockDir + "/template.json",
		output: mockDir + "/dist",
	});

	const [main, moon, dawn] = ["", "-moon", "-dawn"].map((v) =>
		JSON.parse(readFile(`rose-pine${v}.json`)),
	);

	t.like(main, {
		id: "rose-pine",
		name: "Rosé Pine",
		description:
			"All natural pine, faux fur and a bit of soho vibes for the classy minimalist",
		colors: {
			base: `#${variantColors.main.base.hex}`,
			surface: `#${variantColors.main.surface.hex}`,
			overlay: `#${variantColors.main.overlay.hex}`,
			muted: `#${variantColors.main.muted.hex}`,
			subtle: `#${variantColors.main.subtle.hex}`,
			love: `#${variantColors.main.love.hex}`,
			gold: `#${variantColors.main.gold.hex}`,
			rose: `#${variantColors.main.rose.hex}`,
			pine: `#${variantColors.main.pine.hex}`,
			foam: `#${variantColors.main.foam.hex}`,
			iris: `#${variantColors.main.iris.hex}`,
			highlightLow: `#${variantColors.main.highlightLow.hex}`,
			highlightLowAlpha: `#${variantColors.main.highlightLow.alpha.hex}`,
			highlightMed: `#${variantColors.main.highlightMed.hex}`,
			highlightMedAlpha: `#${variantColors.main.highlightMed.alpha.hex}`,
			highlightHigh: `#${variantColors.main.highlightHigh.hex}`,
			highlightHighAlpha: `#${variantColors.main.highlightHigh.alpha.hex}`,
		},
	});

	t.like(moon, {
		id: "rose-pine-moon",
		name: "Rosé Pine Moon",
		description:
			"All natural pine, faux fur and a bit of soho vibes for the classy minimalist",
		colors: {
			base: `#${variantColors.moon.base.hex}`,
			surface: `#${variantColors.moon.surface.hex}`,
			overlay: `#${variantColors.moon.overlay.hex}`,
			muted: `#${variantColors.moon.muted.hex}`,
			subtle: `#${variantColors.moon.subtle.hex}`,
			love: `#${variantColors.moon.love.hex}`,
			gold: `#${variantColors.moon.gold.hex}`,
			rose: `#${variantColors.moon.rose.hex}`,
			pine: `#${variantColors.moon.pine.hex}`,
			foam: `#${variantColors.moon.foam.hex}`,
			iris: `#${variantColors.moon.iris.hex}`,
			highlightLow: `#${variantColors.moon.highlightLow.hex}`,
			highlightLowAlpha: `#${variantColors.moon.highlightLow.alpha.hex}`,
			highlightMed: `#${variantColors.moon.highlightMed.hex}`,
			highlightMedAlpha: `#${variantColors.moon.highlightMed.alpha.hex}`,
			highlightHigh: `#${variantColors.moon.highlightHigh.hex}`,
			highlightHighAlpha: `#${variantColors.moon.highlightHigh.alpha.hex}`,
		},
	});

	t.like(dawn, {
		id: "rose-pine-dawn",
		name: "Rosé Pine Dawn",
		description:
			"All natural pine, faux fur and a bit of soho vibes for the classy minimalist",
		colors: {
			base: `#${variantColors.dawn.base.hex}`,
			surface: `#${variantColors.dawn.surface.hex}`,
			overlay: `#${variantColors.dawn.overlay.hex}`,
			muted: `#${variantColors.dawn.muted.hex}`,
			subtle: `#${variantColors.dawn.subtle.hex}`,
			love: `#${variantColors.dawn.love.hex}`,
			gold: `#${variantColors.dawn.gold.hex}`,
			rose: `#${variantColors.dawn.rose.hex}`,
			pine: `#${variantColors.dawn.pine.hex}`,
			foam: `#${variantColors.dawn.foam.hex}`,
			iris: `#${variantColors.dawn.iris.hex}`,
			highlightLow: `#${variantColors.dawn.highlightLow.hex}`,
			highlightLowAlpha: `#${variantColors.dawn.highlightLow.alpha.hex}`,
			highlightMed: `#${variantColors.dawn.highlightMed.hex}`,
			highlightMedAlpha: `#${variantColors.dawn.highlightMed.alpha.hex}`,
			highlightHigh: `#${variantColors.dawn.highlightHigh.hex}`,
			highlightHighAlpha: `#${variantColors.dawn.highlightHigh.alpha.hex}`,
		},
	});
});

test("txt template with variant-unique values", async (t) => {
	await build({
		__skipReadmeVersion: true,
		template: mockDir + "/template.txt",
		output: mockDir + "/dist",
	});

	const [main, moon, dawn] = ["", "-moon", "-dawn"].map((v) =>
		readFile(`rose-pine${v}.txt`).trim(),
	);

	t.is(main, "Rosé Pine is our dark variant");
	t.is(moon, "Rosé Pine Moon is our not as dark variant");
	t.is(dawn, "Rosé Pine Dawn is our light variant");
});

test("template directory with multiple files", async (t) => {
	await build({
		__skipReadmeVersion: true,
		template: mockDir + "/template",
		output: mockDir + "/dist",
	});

	["main", "moon", "dawn"].forEach((variant) => {
		const [json, txt] = ["json", "txt"].map((ext) =>
			readFile(`${variant}/template.${ext}`).trim(),
		);

		const capitalizedVariant =
			variant.charAt(0).toUpperCase() + variant.slice(1);

		t.like(JSON.parse(json), {
			id: `rose-pine${variant !== "main" ? `-${variant}` : ""}`,
			name: "Rosé Pine" + (variant !== "main" ? ` ${capitalizedVariant}` : ""),
			description:
				"All natural pine, faux fur and a bit of soho vibes for the classy minimalist",
		});

		switch (variant) {
			case "main":
				t.is(txt, "Rosé Pine is our dark variant");
				break;
			case "moon":
				t.is(txt, "Rosé Pine Moon is our not as dark variant");
				break;
			case "dawn":
				t.is(txt, "Rosé Pine Dawn is our light variant");
				break;
		}
	});
});
