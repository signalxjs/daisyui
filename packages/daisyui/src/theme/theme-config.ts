/**
 * Theme configuration types, utilities, and preset values for DaisyUI v5.
 * 
 * DaisyUI v5 uses oklch color space and CSS custom properties for theming.
 * This module provides the data model, color conversion, CSS generation,
 * and built-in theme presets for the ThemeConfigurator component.
 */

// ============================================
// Theme Config Data Types
// ============================================

/** All configurable theme colors (oklch format strings) */
export interface ThemeColors {
    base100: string;
    base200: string;
    base300: string;
    baseContent: string;
    primary: string;
    primaryContent: string;
    secondary: string;
    secondaryContent: string;
    accent: string;
    accentContent: string;
    neutral: string;
    neutralContent: string;
    info: string;
    infoContent: string;
    success: string;
    successContent: string;
    warning: string;
    warningContent: string;
    error: string;
    errorContent: string;
}

/** Full theme configuration data */
export interface ThemeConfigData {
    /** Theme name */
    name: string;
    /** Color scheme: light or dark */
    colorScheme: 'light' | 'dark';
    /** All theme colors in oklch format */
    colors: ThemeColors;
    /** Border radius for cards, modals, alerts (rem) */
    radiusBox: number;
    /** Border radius for buttons, inputs, selects, tabs (rem) */
    radiusField: number;
    /** Border radius for checkboxes, toggles, badges (rem) */
    radiusSelector: number;
    /** 3D depth effect on fields & selectors (0 or 1) */
    depth: number;
    /** Noise pattern effect on fields & selectors (0 or 1) */
    noise: number;
    /** Base size for buttons, inputs, selects, tabs (rem) */
    sizeField: number;
    /** Base size for checkboxes, toggles, badges (rem) */
    sizeSelector: number;
    /** Border width for all components (px) */
    border: number;
}

/** Color group definition for the configurator UI */
export interface ColorGroup {
    id: string;
    label: string;
    mainKey: keyof ThemeColors;
    contentKey: keyof ThemeColors;
}

/** The 9 configurable color groups */
export const COLOR_GROUPS: ColorGroup[] = [
    { id: 'base', label: 'Base', mainKey: 'base100', contentKey: 'baseContent' },
    { id: 'primary', label: 'Primary', mainKey: 'primary', contentKey: 'primaryContent' },
    { id: 'secondary', label: 'Secondary', mainKey: 'secondary', contentKey: 'secondaryContent' },
    { id: 'accent', label: 'Accent', mainKey: 'accent', contentKey: 'accentContent' },
    { id: 'neutral', label: 'Neutral', mainKey: 'neutral', contentKey: 'neutralContent' },
    { id: 'info', label: 'Info', mainKey: 'info', contentKey: 'infoContent' },
    { id: 'success', label: 'Success', mainKey: 'success', contentKey: 'successContent' },
    { id: 'warning', label: 'Warning', mainKey: 'warning', contentKey: 'warningContent' },
    { id: 'error', label: 'Error', mainKey: 'error', contentKey: 'errorContent' },
];

/** Additional base color keys (base-200, base-300) */
export const BASE_EXTRA_KEYS: { key: keyof ThemeColors; label: string }[] = [
    { key: 'base200', label: 'Base 200' },
    { key: 'base300', label: 'Base 300' },
];

// ============================================
// Color Conversion Utilities
// ============================================

/**
 * Convert hex color to oklch string.
 * Goes hex -> sRGB -> linear sRGB -> XYZ D65 -> oklab -> oklch.
 */
export function hexToOklch(hex: string): string {
    const rgb = hexToRgb(hex);
    if (!rgb) return 'oklch(0% 0 0)';

    const [r, g, b] = rgb.map(c => c / 255);

    // sRGB to linear sRGB
    const toLinear = (c: number) => c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    const lr = toLinear(r);
    const lg = toLinear(g);
    const lb = toLinear(b);

    // Linear sRGB to XYZ D65
    const x = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
    const y = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
    const z = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;

    // XYZ to oklab
    const l_ = Math.cbrt(0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z);
    const m_ = Math.cbrt(0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z);
    const s_ = Math.cbrt(0.0482003018 * x + 0.2643662691 * y + 0.6338517070 * z);

    const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
    const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
    const bVal = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;

    // oklab to oklch
    const C = Math.sqrt(a * a + bVal * bVal);
    let H = Math.atan2(bVal, a) * 180 / Math.PI;
    if (H < 0) H += 360;

    const lPct = Math.round(L * 10000) / 100;
    const cRound = Math.round(C * 1000) / 1000;
    const hRound = Math.round(H * 100) / 100;

    return `oklch(${lPct}% ${cRound} ${hRound})`;
}

/**
 * Convert oklch string to hex color.
 * Goes oklch -> oklab -> XYZ D65 -> linear sRGB -> sRGB -> hex.
 */
export function oklchToHex(oklch: string): string {
    const parsed = parseOklch(oklch);
    if (!parsed) return '#000000';

    const { l, c, h } = parsed;

    // oklch to oklab
    const hRad = h * Math.PI / 180;
    const a = c * Math.cos(hRad);
    const b = c * Math.sin(hRad);

    // oklab to XYZ D65 (inverse of forward transform)
    const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = l - 0.0894841775 * a - 1.2914855480 * b;

    const l3 = l_ * l_ * l_;
    const m3 = m_ * m_ * m_;
    const s3 = s_ * s_ * s_;

    const x = 1.2270138511 * l3 - 0.5577999807 * m3 + 0.2812561490 * s3;
    const y = -0.0405801784 * l3 + 1.1122568696 * m3 - 0.0716766787 * s3;
    const z = -0.0763812845 * l3 - 0.4214819784 * m3 + 1.5861632204 * s3;

    // XYZ to linear sRGB
    const lr = 3.2404541621 * x - 1.5371385940 * y - 0.4985314096 * z;
    const lg = -0.9692660305 * x + 1.8760108454 * y + 0.0415560175 * z;
    const lb = 0.0556434309 * x - 0.2040259135 * y + 1.0572251882 * z;

    // Linear sRGB to sRGB
    const toSrgb = (c: number) => {
        c = Math.max(0, Math.min(1, c));
        return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
    };

    const rv = Math.round(toSrgb(lr) * 255);
    const gv = Math.round(toSrgb(lg) * 255);
    const bv = Math.round(toSrgb(lb) * 255);

    return `#${rv.toString(16).padStart(2, '0')}${gv.toString(16).padStart(2, '0')}${bv.toString(16).padStart(2, '0')}`;
}

/** Parse oklch string into numeric components */
export function parseOklch(str: string): { l: number; c: number; h: number } | null {
    const match = str.match(/oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)\s*\)/);
    if (!match) return null;

    let l = parseFloat(match[1]);
    if (match[2] === '%') l = l / 100;
    const c = parseFloat(match[3]);
    const h = parseFloat(match[4]);

    return { l, c, h };
}

/** Parse hex string to [r, g, b] array */
function hexToRgb(hex: string): [number, number, number] | null {
    const clean = hex.replace('#', '');
    if (clean.length === 3) {
        return [
            parseInt(clean[0] + clean[0], 16),
            parseInt(clean[1] + clean[1], 16),
            parseInt(clean[2] + clean[2], 16),
        ];
    }
    if (clean.length === 6) {
        return [
            parseInt(clean.substring(0, 2), 16),
            parseInt(clean.substring(2, 4), 16),
            parseInt(clean.substring(4, 6), 16),
        ];
    }
    return null;
}

// ============================================
// CSS Variable Mapping
// ============================================

/** Map from ThemeColors keys to DaisyUI CSS variable names */
const COLOR_VAR_MAP: Record<keyof ThemeColors, string> = {
    base100: '--color-base-100',
    base200: '--color-base-200',
    base300: '--color-base-300',
    baseContent: '--color-base-content',
    primary: '--color-primary',
    primaryContent: '--color-primary-content',
    secondary: '--color-secondary',
    secondaryContent: '--color-secondary-content',
    accent: '--color-accent',
    accentContent: '--color-accent-content',
    neutral: '--color-neutral',
    neutralContent: '--color-neutral-content',
    info: '--color-info',
    infoContent: '--color-info-content',
    success: '--color-success',
    successContent: '--color-success-content',
    warning: '--color-warning',
    warningContent: '--color-warning-content',
    error: '--color-error',
    errorContent: '--color-error-content',
};

// ============================================
// Apply Theme to DOM Element
// ============================================

/**
 * Apply theme config as CSS custom properties on a DOM element.
 * This enables live preview by scoping variables to a container.
 */
export function applyThemeToElement(el: HTMLElement, config: ThemeConfigData): void {
    // Colors
    for (const [key, varName] of Object.entries(COLOR_VAR_MAP)) {
        el.style.setProperty(varName, config.colors[key as keyof ThemeColors]);
    }

    // Radius
    el.style.setProperty('--radius-box', `${config.radiusBox}rem`);
    el.style.setProperty('--radius-field', `${config.radiusField}rem`);
    el.style.setProperty('--radius-selector', `${config.radiusSelector}rem`);

    // Effects
    el.style.setProperty('--depth', String(config.depth));
    el.style.setProperty('--noise', String(config.noise));

    // Sizes
    el.style.setProperty('--size-field', `${config.sizeField}rem`);
    el.style.setProperty('--size-selector', `${config.sizeSelector}rem`);

    // Border
    el.style.setProperty('--border', `${config.border}px`);

    // Color scheme
    el.style.setProperty('color-scheme', config.colorScheme);
}

/**
 * Apply theme config to the document root (for global application).
 */
export function applyThemeToDocument(config: ThemeConfigData): void {
    if (typeof document === 'undefined') return;
    applyThemeToElement(document.documentElement, config);
}

// ============================================
// CSS / JSON Generation
// ============================================

/**
 * Generate DaisyUI v5 CSS plugin code from config.
 * Output is ready to paste into an app.css file.
 */
export function generateThemeCSS(config: ThemeConfigData): string {
    const lines: string[] = [];
    lines.push(`@plugin "daisyui/theme" {`);
    lines.push(`  name: "${config.name}";`);
    lines.push(`  color-scheme: ${config.colorScheme};`);
    lines.push('');

    // Colors
    for (const [key, varName] of Object.entries(COLOR_VAR_MAP)) {
        lines.push(`  ${varName}: ${config.colors[key as keyof ThemeColors]};`);
    }
    lines.push('');

    // Radius
    lines.push(`  --radius-box: ${config.radiusBox}rem;`);
    lines.push(`  --radius-field: ${config.radiusField}rem;`);
    lines.push(`  --radius-selector: ${config.radiusSelector}rem;`);
    lines.push('');

    // Sizes
    lines.push(`  --size-field: ${config.sizeField}rem;`);
    lines.push(`  --size-selector: ${config.sizeSelector}rem;`);
    lines.push('');

    // Border
    lines.push(`  --border: ${config.border}px;`);
    lines.push('');

    // Effects
    lines.push(`  --depth: ${config.depth};`);
    lines.push(`  --noise: ${config.noise};`);

    lines.push('}');

    return lines.join('\n');
}

/**
 * Generate JSON representation of theme config.
 */
export function generateThemeJSON(config: ThemeConfigData): string {
    return JSON.stringify(config, null, 2);
}

/**
 * Parse JSON string back to ThemeConfigData.
 */
export function parseThemeJSON(json: string): ThemeConfigData | null {
    try {
        const data = JSON.parse(json);
        if (data && data.colors && data.name) {
            return data as ThemeConfigData;
        }
        return null;
    } catch {
        return null;
    }
}

// ============================================
// Persistence
// ============================================

/**
 * Save theme config to localStorage.
 */
export function saveThemeConfig(key: string, config: ThemeConfigData): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(config));
}

/**
 * Load theme config from localStorage.
 */
export function loadThemeConfig(key: string): ThemeConfigData | null {
    if (typeof localStorage === 'undefined') return null;
    const stored = localStorage.getItem(key);
    if (!stored) return null;
    return parseThemeJSON(stored);
}

// ============================================
// Default Config & Presets
// ============================================

/** Default theme config based on DaisyUI "light" theme */
export const DEFAULT_THEME_CONFIG: ThemeConfigData = {
    name: 'mytheme',
    colorScheme: 'light',
    colors: {
        base100: 'oklch(100% 0 0)',
        base200: 'oklch(96.1% 0 0)',
        base300: 'oklch(92.4% 0 0)',
        baseContent: 'oklch(21% 0.006 285.88)',
        primary: 'oklch(49.12% 0.3096 275.75)',
        primaryContent: 'oklch(89.824% 0.06192 275.75)',
        secondary: 'oklch(69.71% 0.329 342.55)',
        secondaryContent: 'oklch(93.942% 0.0658 342.55)',
        accent: 'oklch(76.76% 0.184 183.61)',
        accentContent: 'oklch(15.352% 0.0368 183.61)',
        neutral: 'oklch(32.17% 0.02 277.58)',
        neutralContent: 'oklch(89.434% 0.004 277.58)',
        info: 'oklch(72.06% 0.191 231.6)',
        infoContent: 'oklch(14.412% 0.0382 231.6)',
        success: 'oklch(64.8% 0.15 160)',
        successContent: 'oklch(12.96% 0.03 160)',
        warning: 'oklch(84.71% 0.199 83.87)',
        warningContent: 'oklch(16.942% 0.0398 83.87)',
        error: 'oklch(63.72% 0.237 25.33)',
        errorContent: 'oklch(12.744% 0.0474 25.33)',
    },
    radiusBox: 1,
    radiusField: 0.5,
    radiusSelector: 1.5,
    depth: 1,
    noise: 0,
    sizeField: 0.25,
    sizeSelector: 0.25,
    border: 1,
};

/** DaisyUI "dark" theme preset */
export const DARK_THEME_PRESET: ThemeConfigData = {
    name: 'mytheme-dark',
    colorScheme: 'dark',
    colors: {
        base100: 'oklch(25.33% 0.016 252.42)',
        base200: 'oklch(23.26% 0.014 253.1)',
        base300: 'oklch(21.15% 0.012 254.09)',
        baseContent: 'oklch(97.807% 0.003 252.42)',
        primary: 'oklch(65.69% 0.196 275.75)',
        primaryContent: 'oklch(13.138% 0.0392 275.75)',
        secondary: 'oklch(74.8% 0.26 342.55)',
        secondaryContent: 'oklch(14.96% 0.052 342.55)',
        accent: 'oklch(74.51% 0.167 183.61)',
        accentContent: 'oklch(14.902% 0.0334 183.61)',
        neutral: 'oklch(31.3% 0.021 264.53)',
        neutralContent: 'oklch(90.26% 0.0042 264.53)',
        info: 'oklch(72.06% 0.191 231.6)',
        infoContent: 'oklch(14.412% 0.0382 231.6)',
        success: 'oklch(64.8% 0.15 160)',
        successContent: 'oklch(12.96% 0.03 160)',
        warning: 'oklch(84.71% 0.199 83.87)',
        warningContent: 'oklch(16.942% 0.0398 83.87)',
        error: 'oklch(63.72% 0.237 25.33)',
        errorContent: 'oklch(12.744% 0.0474 25.33)',
    },
    radiusBox: 1,
    radiusField: 0.5,
    radiusSelector: 1.5,
    depth: 1,
    noise: 0,
    sizeField: 0.25,
    sizeSelector: 0.25,
    border: 1,
};

/** DaisyUI "cupcake" theme preset */
export const CUPCAKE_THEME_PRESET: ThemeConfigData = {
    name: 'cupcake',
    colorScheme: 'light',
    colors: {
        base100: 'oklch(97.78% 0.004 56.38)',
        base200: 'oklch(95.42% 0.007 58.31)',
        base300: 'oklch(91.7% 0.013 59.1)',
        baseContent: 'oklch(39.56% 0.025 56.38)',
        primary: 'oklch(65.69% 0.196 275.75)',
        primaryContent: 'oklch(93.138% 0.0392 275.75)',
        secondary: 'oklch(74.8% 0.26 342.55)',
        secondaryContent: 'oklch(94.96% 0.052 342.55)',
        accent: 'oklch(74.51% 0.167 183.61)',
        accentContent: 'oklch(14.902% 0.0334 183.61)',
        neutral: 'oklch(37.41% 0.028 276.04)',
        neutralContent: 'oklch(87.482% 0.0056 276.04)',
        info: 'oklch(72.06% 0.191 231.6)',
        infoContent: 'oklch(14.412% 0.0382 231.6)',
        success: 'oklch(64.8% 0.15 160)',
        successContent: 'oklch(12.96% 0.03 160)',
        warning: 'oklch(84.71% 0.199 83.87)',
        warningContent: 'oklch(16.942% 0.0398 83.87)',
        error: 'oklch(63.72% 0.237 25.33)',
        errorContent: 'oklch(12.744% 0.0474 25.33)',
    },
    radiusBox: 1,
    radiusField: 1,
    radiusSelector: 1.5,
    depth: 1,
    noise: 0,
    sizeField: 0.25,
    sizeSelector: 0.25,
    border: 2,
};

/** DaisyUI "cyberpunk" theme preset */
export const CYBERPUNK_THEME_PRESET: ThemeConfigData = {
    name: 'cyberpunk',
    colorScheme: 'light',
    colors: {
        base100: 'oklch(94.51% 0.179 104.32)',
        base200: 'oklch(90.78% 0.172 104.9)',
        base300: 'oklch(87.07% 0.165 105.36)',
        baseContent: 'oklch(18.9% 0.0358 104.32)',
        primary: 'oklch(74.22% 0.209 6.35)',
        primaryContent: 'oklch(14.844% 0.0418 6.35)',
        secondary: 'oklch(83.33% 0.184 80.36)',
        secondaryContent: 'oklch(16.666% 0.0368 80.36)',
        accent: 'oklch(71.86% 0.217 310.43)',
        accentContent: 'oklch(14.372% 0.0434 310.43)',
        neutral: 'oklch(23.04% 0.065 269.31)',
        neutralContent: 'oklch(84.608% 0.013 269.31)',
        info: 'oklch(72.06% 0.191 231.6)',
        infoContent: 'oklch(14.412% 0.0382 231.6)',
        success: 'oklch(64.8% 0.15 160)',
        successContent: 'oklch(12.96% 0.03 160)',
        warning: 'oklch(84.71% 0.199 83.87)',
        warningContent: 'oklch(16.942% 0.0398 83.87)',
        error: 'oklch(63.72% 0.237 25.33)',
        errorContent: 'oklch(12.744% 0.0474 25.33)',
    },
    radiusBox: 0,
    radiusField: 0,
    radiusSelector: 0,
    depth: 0,
    noise: 1,
    sizeField: 0.25,
    sizeSelector: 0.25,
    border: 1,
};

/** All available theme presets */
export const THEME_PRESETS: Record<string, ThemeConfigData> = {
    light: DEFAULT_THEME_CONFIG,
    dark: DARK_THEME_PRESET,
    cupcake: CUPCAKE_THEME_PRESET,
    cyberpunk: CYBERPUNK_THEME_PRESET,
};

/**
 * Create a deep copy of a theme config.
 */
export function cloneThemeConfig(config: ThemeConfigData): ThemeConfigData {
    return {
        ...config,
        colors: { ...config.colors },
    };
}

// ============================================
// Random Theme Generation
// ============================================

/**
 * Generate a random harmonious theme config.
 * Picks a random hue and builds a full color palette around it.
 */
export function generateRandomTheme(): ThemeConfigData {
    const isDark = Math.random() > 0.5;
    const hue = Math.random() * 360;

    const makeColor = (l: number, c: number, h: number) =>
        `oklch(${Math.round(l * 100) / 100}% ${Math.round(c * 1000) / 1000} ${Math.round(h * 100) / 100})`;

    // Content color: high lightness on dark bg, low lightness on light bg
    const contentL = isDark ? 90 : 20;
    const baseL = isDark ? 25 : 98;

    // Derive semantic hues from primary hue
    const secHue = (hue + 60 + Math.random() * 40) % 360;
    const accHue = (hue + 150 + Math.random() * 60) % 360;
    const neuHue = (hue + Math.random() * 20) % 360;

    return {
        name: isDark ? 'random-dark' : 'random-light',
        colorScheme: isDark ? 'dark' : 'light',
        colors: {
            base100: makeColor(baseL, 0.01, hue),
            base200: makeColor(baseL - (isDark ? 2 : 2), 0.012, hue),
            base300: makeColor(baseL - (isDark ? 4 : 4), 0.015, hue),
            baseContent: makeColor(contentL, 0.01, hue),
            primary: makeColor(isDark ? 65 : 50, 0.2 + Math.random() * 0.1, hue),
            primaryContent: makeColor(isDark ? 15 : 95, 0.04, hue),
            secondary: makeColor(isDark ? 70 : 55, 0.2 + Math.random() * 0.1, secHue),
            secondaryContent: makeColor(isDark ? 15 : 95, 0.04, secHue),
            accent: makeColor(isDark ? 72 : 60, 0.15 + Math.random() * 0.1, accHue),
            accentContent: makeColor(isDark ? 15 : 95, 0.03, accHue),
            neutral: makeColor(isDark ? 30 : 35, 0.02, neuHue),
            neutralContent: makeColor(isDark ? 90 : 90, 0.005, neuHue),
            info: makeColor(72, 0.19, 230),
            infoContent: makeColor(15, 0.038, 230),
            success: makeColor(65, 0.15, 160),
            successContent: makeColor(13, 0.03, 160),
            warning: makeColor(85, 0.2, 84),
            warningContent: makeColor(17, 0.04, 84),
            error: makeColor(64, 0.24, 25),
            errorContent: makeColor(13, 0.047, 25),
        },
        radiusBox: [0, 0.5, 1, 1.5][Math.floor(Math.random() * 4)],
        radiusField: [0, 0.25, 0.5, 1][Math.floor(Math.random() * 4)],
        radiusSelector: [0, 0.5, 1, 1.5, 2][Math.floor(Math.random() * 5)],
        depth: Math.random() > 0.5 ? 1 : 0,
        noise: Math.random() > 0.7 ? 1 : 0,
        sizeField: 0.25,
        sizeSelector: 0.25,
        border: [0, 1, 2][Math.floor(Math.random() * 3)],
    };
}
