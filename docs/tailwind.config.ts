import { type Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import svgToDataUri from "mini-svg-data-uri";

export default {
	theme: {
		extend: {
			keyframes: {
				shine: {
					"0%": { backgroundPosition: "200% 0" },
					"25%": { backgroundPosition: "-200% 0" },
					"100%": { backgroundPosition: "-200% 0" },
				},
			},
			animation: {
				shine: "shine 3s ease-out infinite",
			},
		},
	},
	plugins: [
		plugin(function ({ matchUtilities, theme }: any) {
			matchUtilities(
				{
					"bg-grid": (value: any) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
						)}")`,
					}),
					"bg-grid-small": (value: any) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
						)}")`,
					}),
					"bg-dot": (value: any) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`,
						)}")`,
					}),
				},
				{
					values: theme("colors"),
					type: "color",
				},
			);
		}),
	],
} satisfies Config;
