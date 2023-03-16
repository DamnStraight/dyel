import { createInterFont } from "@tamagui/font-inter";
import { createMedia } from "@tamagui/react-native-media-driver";
import { shorthands } from "@tamagui/shorthands";
import { themes, tokens as baseTokens } from "@tamagui/themes";
import { createTamagui, createTokens } from "tamagui";
import { createAnimations } from "@tamagui/animations-react-native";

const animations = createAnimations({
	bouncy: {
		type: "spring",
		damping: 10,
		mass: 0.9,
		stiffness: 100,
	},
	lazy: {
		type: "spring",
		damping: 20,
		stiffness: 60,
	},
	quick: {
		type: "spring",
		damping: 20,
		mass: 1.2,
		stiffness: 250,
	},
});

const headingFont = createInterFont({
	size: {
		6: 15
	},
	transform: {
		6: "uppercase",
		7: "none"
	},
	weight: {
		6: "400",
		7: "700"
	},
	color: {
		6: "$colorFocus",
		7: "$color"
	},
	letterSpacing: {
		5: 2,
		6: 1,
		7: 0,
		8: -1,
		9: -2,
		10: -3,
		12: -4,
		14: -5,
		15: -6
	},
	face: {
		700: { normal: "InterBold" }
	}
});

const bodyFont = createInterFont();

const tokens: any = createTokens({
	...baseTokens,
	color: {
		// Zinc
		zinc50: '#fafafa',
		zinc100: '#f4f4f5',
		zinc200: '#e4e4e7',
		zinc300: '#d4d4d8',
		zinc400: '#a1a1aa',
		zinc500: '#71717a',
		zinc600: '#52525b',
		zinc700: '#3f3f46',
		zinc800: '#27272a',
		zinc900: '#18181b',
		// Slate
		slate50: '#f8fafc',
		slate100: '#f1f5f9',
		slate200: '#e2e8f0',
		slate300: '#cbd5e1',
		slate400: '#94a3b8',
		slate500: '#64748b',
		slate600: '#475569',
		slate700: '#334155',
		slate800: '#1e293b',
		slate900: '#0f172a',
		// Indigo
		indigo50:  '#eef2ff',
		indigo100: '#e0e7ff',
		indigo200: '#c7d2fe',
		indigo300: '#a5b4fc',
		indigo400: '#818cf8',
		indigo500: '#6366f1',
		indigo600: '#4f46e5',
		indigo700: '#4338ca',
		indigo800: '#3730a3',
		indigo900: '#312e81',
	}
})

const config = createTamagui({
	animations,
	defaultTheme: "dark",
	shouldAddPrefersColorThemes: false,
	themeClassNameOnRoot: false,
	shorthands,
	fonts: {
		heading: headingFont,
		body: bodyFont,
	},
	themes,
	tokens,
	media: createMedia({
		xs: { maxWidth: 660 },
		sm: { maxWidth: 800 },
		md: { maxWidth: 1020 },
		lg: { maxWidth: 1280 },
		xl: { maxWidth: 1420 },
		xxl: { maxWidth: 1600 },
		gtXs: { minWidth: 660 + 1 },
		gtSm: { minWidth: 800 + 1 },
		gtMd: { minWidth: 1020 + 1 },
		gtLg: { minWidth: 1280 + 1 },
		short: { maxHeight: 820 },
		tall: { minHeight: 820 },
		hoverNone: { hover: "none" },
		pointerCoarse: { pointer: "coarse" },
	}),
});

export type AppConfig = typeof config;

declare module "tamagui" {
	// overrides TamaguiCustomConfig so your custom types
	// work everywhere you import `tamagui`
	interface TamaguiCustomConfig extends AppConfig {}
}

export default config;