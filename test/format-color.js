import test from "ava";
import { formatColor } from "../dist/utils/format-color.js";

test("color formats", (t) => {
	const testColor = {
		hex: "ebbcba",
		rgb: [235, 188, 186],
		hsl: [2, 55, 83],
	};

	t.is(formatColor(testColor, "hex"), "#ebbcba");
	t.is(formatColor(testColor, "hex-ns"), "ebbcba");
	t.is(formatColor(testColor, "hex", true), "#ebbcba");
	t.is(formatColor(testColor, "hex-ns", true), "ebbcba");
	t.is(formatColor(testColor, "rgb"), "235, 188, 186");
	t.is(formatColor(testColor, "rgb-ns"), "235 188 186");
	t.is(formatColor(testColor, "rgb-ansi"), "235;188;186");
	t.is(formatColor(testColor, "rgb-array"), "[235, 188, 186]");
	t.is(formatColor(testColor, "rgb-function"), "rgb(235, 188, 186)");
	t.is(formatColor(testColor, "rgb", true), "235,188,186");
	t.is(formatColor(testColor, "rgb-ns", true), "235188186");
	t.is(formatColor(testColor, "rgb-ansi", true), "235;188;186");
	t.is(formatColor(testColor, "rgb-array", true), "[235,188,186]");
	t.is(formatColor(testColor, "rgb-function", true), "rgb(235,188,186)");
	t.is(formatColor(testColor, "hsl"), "2, 55%, 83%");
	t.is(formatColor(testColor, "hsl-ns"), "2 55% 83%");
	t.is(formatColor(testColor, "hsl-array"), "[2, 55%, 83%]");
	t.is(formatColor(testColor, "hsl-function"), "hsl(2, 55%, 83%)");
	t.is(formatColor(testColor, "hsl", true), "2,55%,83%");
	t.is(formatColor(testColor, "hsl-ns", true), "255%83%");
	t.is(formatColor(testColor, "hsl-array", true), "[2,55%,83%]");
	t.is(formatColor(testColor, "hsl-function", true), "hsl(2,55%,83%)");
});

test("alpha color formats", (t) => {
	const testColor = {
		hex: "6e6a8614",
		rgb: [110, 106, 134, 0.08],
		hsl: [249, 12, 47, 0.08],
	};

	t.is(formatColor(testColor, "hex"), "#6e6a8614");
	t.is(formatColor(testColor, "hex-ns"), "6e6a8614");
	t.is(formatColor(testColor, "hex", true), "#6e6a8614");
	t.is(formatColor(testColor, "hex-ns", true), "6e6a8614");
	t.is(formatColor(testColor, "rgb"), "110, 106, 134, 0.08");
	t.is(formatColor(testColor, "rgb-ns"), "110 106 134 0.08");
	t.is(formatColor(testColor, "rgb-ansi"), "110;106;134;0.08");
	t.is(formatColor(testColor, "rgb-array"), "[110, 106, 134, 0.08]");
	t.is(formatColor(testColor, "rgb-function"), "rgba(110, 106, 134, 0.08)");
	t.is(formatColor(testColor, "rgb", true), "110,106,134,0.08");
	t.is(formatColor(testColor, "rgb-ns", true), "1101061340.08");
	t.is(formatColor(testColor, "rgb-ansi", true), "110;106;134;0.08");
	t.is(formatColor(testColor, "rgb-array", true), "[110,106,134,0.08]");
	t.is(formatColor(testColor, "rgb-function", true), "rgba(110,106,134,0.08)");
	t.is(formatColor(testColor, "hsl"), "249, 12%, 47%, 0.08");
	t.is(formatColor(testColor, "hsl-ns"), "249 12% 47% 0.08");
	t.is(formatColor(testColor, "hsl-array"), "[249, 12%, 47%, 0.08]");
	t.is(formatColor(testColor, "hsl-function"), "hsla(249, 12%, 47%, 0.08)");
	t.is(formatColor(testColor, "hsl", true), "249,12%,47%,0.08");
	t.is(formatColor(testColor, "hsl-ns", true), "24912%47%0.08");
	t.is(formatColor(testColor, "hsl-array", true), "[249,12%,47%,0.08]");
	t.is(formatColor(testColor, "hsl-function", true), "hsla(249,12%,47%,0.08)");
});
