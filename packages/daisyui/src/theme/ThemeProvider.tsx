import { component, signal, type Define } from 'sigx';

/**
 * Built-in DaisyUI themes
 */
export type DaisyTheme = 
    // Light themes
    | 'light'
    | 'cupcake'
    | 'bumblebee'
    | 'emerald'
    | 'corporate'
    | 'retro'
    | 'cyberpunk'
    | 'valentine'
    | 'garden'
    | 'lofi'
    | 'pastel'
    | 'fantasy'
    | 'wireframe'
    | 'cmyk'
    | 'autumn'
    | 'acid'
    | 'lemonade'
    | 'winter'
    | 'nord'
    // Dark themes
    | 'dark'
    | 'synthwave'
    | 'halloween'
    | 'forest'
    | 'aqua'
    | 'black'
    | 'luxury'
    | 'dracula'
    | 'business'
    | 'night'
    | 'coffee'
    | 'dim'
    | 'sunset';

/**
 * Theme configuration options
 */
export interface ThemeConfig {
    /** Default theme to use */
    defaultTheme?: DaisyTheme | string;
    /** List of themes to include (for custom CSS generation) */
    themes?: (DaisyTheme | string)[];
    /** Whether to enable dark mode detection */
    darkMode?: boolean;
    /** Custom theme definitions */
    customThemes?: Record<string, Record<string, string>>;
}

/**
 * Get the current theme from the document
 */
export function getCurrentTheme(): string | null {
    if (typeof document === 'undefined') return null;
    return document.documentElement.getAttribute('data-theme');
}

/**
 * Set the theme on the document
 */
export function setTheme(theme: DaisyTheme | string): void {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('data-theme', theme);
    
    // Persist to localStorage
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('daisy-theme', theme);
    }
}

/**
 * Get the preferred theme from localStorage or system preference
 */
export function getPreferredTheme(defaultTheme: DaisyTheme | string = 'light'): DaisyTheme | string {
    if (typeof window === 'undefined') return defaultTheme;
    
    // Check localStorage first
    const stored = localStorage.getItem('daisy-theme');
    if (stored) return stored;
    
    // Check system preference
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    
    return defaultTheme;
}

/**
 * Initialize theme based on user preference or default
 */
export function initializeTheme(config?: ThemeConfig): void {
    const theme = getPreferredTheme(config?.defaultTheme);
    setTheme(theme);
    
    // Listen for system theme changes if darkMode is enabled
    if (config?.darkMode && typeof window !== 'undefined') {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            // Only auto-switch if user hasn't manually selected a theme
            const stored = localStorage.getItem('daisy-theme');
            if (!stored) {
                setTheme(e.matches ? 'dark' : (config.defaultTheme ?? 'light'));
            }
        });
    }
}

/**
 * Toggle between light and dark themes
 */
export function toggleDarkMode(lightTheme: DaisyTheme = 'light', darkTheme: DaisyTheme = 'dark'): void {
    const current = getCurrentTheme();
    setTheme(current === darkTheme ? lightTheme : darkTheme);
}

/**
 * Returns an inline `<script>` string that prevents theme flicker (FOUC).
 * Place this in your HTML `<head>` — it runs synchronously before first paint,
 * reading the user's saved theme from localStorage and applying it immediately.
 *
 * @param defaultTheme - Fallback theme when nothing is stored (default: 'light')
 * @param respectSystemPref - Whether to check prefers-color-scheme (default: true)
 * @example
 * ```html
 * <!-- In index.html <head> -->
 * <script>...getThemeInitScript()...</script>
 * ```
 * @example
 * ```ts
 * // In SSR server, inject into <head>
 * html = html.replace('</head>', getThemeInitScript() + '</head>');
 * ```
 */
export function getThemeInitScript(defaultTheme: string = 'light', respectSystemPref: boolean = true): string {
    return `<script>(function(){try{var t=localStorage.getItem('daisy-theme');${
        respectSystemPref
            ? `if(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)t='dark';`
            : ''
    }if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}})()</script>`;
}

// ============================================
// ThemeProvider Component
// ============================================

export type ThemeProviderProps = 
    & Define.Prop<'theme', DaisyTheme | string, false>
    & Define.Prop<'defaultTheme', DaisyTheme | string, false>
    & Define.Prop<'darkMode', boolean, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

/**
 * ThemeProvider component that wraps your app and manages theme state.
 * 
 * @example
 * ```tsx
 * <ThemeProvider defaultTheme="cupcake" darkMode>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export const ThemeProvider = component<ThemeProviderProps>(({ props, slots }) => {
    // Initialize theme on mount — skip if inline script already set the correct theme
    if (typeof document !== 'undefined') {
        const theme = props.theme ?? getPreferredTheme(props.defaultTheme);
        if (getCurrentTheme() !== theme) {
            setTheme(theme);
        }
        
        // Set up dark mode listener if enabled
        if (props.darkMode && typeof window !== 'undefined') {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                const stored = localStorage.getItem('daisy-theme');
                if (!stored) {
                    setTheme(e.matches ? 'dark' : (props.defaultTheme ?? 'light'));
                }
            });
        }
    }

    return () => (
        <div class={props.class}>
            {slots.default?.()}
        </div>
    );
});

// ============================================
// ThemeSelector Component
// ============================================

export type ThemeSelectorProps = 
    & Define.Prop<'themes', (DaisyTheme | string)[], false>
    & Define.Prop<'class', string, false>;

const defaultThemes: DaisyTheme[] = [
    'light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 
    'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween', 
    'garden', 'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 
    'wireframe', 'black', 'luxury', 'dracula', 'cmyk', 'autumn',
    'business', 'acid', 'lemonade', 'night', 'coffee', 'winter',
    'dim', 'nord', 'sunset'
];

/**
 * A dropdown selector for switching themes.
 * 
 * @example
 * ```tsx
 * <ThemeSelector themes={['light', 'dark', 'cupcake', 'cyberpunk']} />
 * ```
 */
export const ThemeSelector = component<ThemeSelectorProps>(({ props }) => {
    const themes = () => props.themes ?? defaultThemes;
    
    const handleChange = (e: Event) => {
        const select = e.target as HTMLSelectElement;
        setTheme(select.value);
    };

    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    return () => (
        <select 
            class={`select select-bordered ${props.class ?? ''}`}
            onChange={handleChange}
            value={getCurrentTheme() ?? 'light'}
        >
            {themes().map(theme => (
                <option value={theme}>{capitalize(theme)}</option>
            ))}
        </select>
    );
});

// ============================================
// ThemeToggle Component (Light/Dark toggle)
// ============================================

export type ThemeToggleProps = 
    & Define.Prop<'lightTheme', DaisyTheme | string, false>
    & Define.Prop<'darkTheme', DaisyTheme | string, false>
    & Define.Prop<'class', string, false>;

/**
 * A toggle button for switching between light and dark themes.
 * 
 * @example
 * ```tsx
 * <ThemeToggle lightTheme="light" darkTheme="dark" />
 * ```
 */
export const ThemeToggle = component<ThemeToggleProps>(({ props }) => {
    const lightTheme = () => props.lightTheme ?? 'light';
    const darkTheme = () => props.darkTheme ?? 'dark';
    
    // Use a signal to track theme state for reactivity
    const isDark = signal(getCurrentTheme() === (props.darkTheme ?? 'dark'));
    
    const handleToggle = () => {
        toggleDarkMode(lightTheme() as DaisyTheme, darkTheme() as DaisyTheme);
        // Update the signal to trigger re-render
        isDark.value = getCurrentTheme() === darkTheme();
    };

    return () => (
        <button 
            class={props.class ?? 'btn btn-ghost btn-circle text-base-content'}
            onClick={handleToggle}
            aria-label="Toggle theme"
        >
            {isDark.value ? (
                /* Sun icon - show in dark mode to switch to light */
                <svg 
                    class="w-6 h-6" 
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
                </svg>
            ) : (
                /* Moon icon - show in light mode to switch to dark */
                <svg 
                    class="w-6 h-6" 
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/>
                </svg>
            )}
        </button>
    );
});
