import { type Define } from 'sigx';

// ============================================================================
// Spacing System
// ============================================================================

/** Spacing scale values (matches Tailwind spacing) */
export type SpacingValue = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12';

/** Directional spacing object */
export type SpacingObject = {
    /** All sides */
    all?: SpacingValue;
    /** Horizontal (left + right) */
    x?: SpacingValue;
    /** Vertical (top + bottom) */
    y?: SpacingValue;
    /** Top only */
    top?: SpacingValue;
    /** Right only */
    right?: SpacingValue;
    /** Bottom only */
    bottom?: SpacingValue;
    /** Left only */
    left?: SpacingValue;
};

/** Flexible spacing - can be a single value or directional object */
export type Spacing = SpacingValue | SpacingObject;

/** Resolves spacing to Tailwind classes */
export function resolveSpacing(
    value: Spacing | undefined, 
    prefix: 'p' | 'm' | 'gap'
): string[] {
    if (!value) return [];
    
    // Simple value
    if (typeof value === 'string') {
        return [`${prefix}-${value}`];
    }
    
    const classes: string[] = [];
    
    // Process object form with precedence: individual > x/y > all
    if (value.all) {
        classes.push(`${prefix}-${value.all}`);
    }
    
    if (value.x) {
        classes.push(`${prefix}x-${value.x}`);
    }
    if (value.y) {
        classes.push(`${prefix}y-${value.y}`);
    }
    
    if (value.top) {
        classes.push(`${prefix}t-${value.top}`);
    }
    if (value.right) {
        classes.push(`${prefix}r-${value.right}`);
    }
    if (value.bottom) {
        classes.push(`${prefix}b-${value.bottom}`);
    }
    if (value.left) {
        classes.push(`${prefix}l-${value.left}`);
    }
    
    return classes;
}

// ============================================================================
// Border Radius
// ============================================================================

/**
 * Border radius values. `box` / `field` / `selector` are the theme-derived
 * daisyUI radii (`--radius-box` for cards/modals/panels, `--radius-field` for
 * buttons/inputs/tabs/menu-items, `--radius-selector` for checkboxes/toggles/
 * badges) — they track the active theme. The `sm`..`3xl`/`full` scale is fixed.
 */
export type RadiusValue =
    | 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
    | 'box' | 'field' | 'selector';

/** Resolves radius to Tailwind class. Boolean `true` → the theme box radius. */
export function resolveRadius(value: RadiusValue | boolean | undefined): string | undefined {
    if (value === undefined) return undefined;
    if (value === true) return 'rounded-box';
    if (value === false) return undefined;

    const radiusMap: Record<RadiusValue, string> = {
        'none': 'rounded-none',
        'sm': 'rounded-sm',
        'md': 'rounded-md',
        'lg': 'rounded-lg',
        'xl': 'rounded-xl',
        '2xl': 'rounded-2xl',
        '3xl': 'rounded-3xl',
        'full': 'rounded-full',
        'box': 'rounded-box',
        'field': 'rounded-field',
        'selector': 'rounded-selector',
    };

    return radiusMap[value];
}

// ============================================================================
// Size (Width / Height)
// ============================================================================

/** Predefined Tailwind size values */
export type TailwindSizeValue = 
    | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16' | '20' | '24' | '32' | '40' | '48' | '56' | '64' | '72' | '80' | '96'
    | 'auto' | 'full' | 'screen' | 'min' | 'max' | 'fit'
    | '1/2' | '1/3' | '2/3' | '1/4' | '2/4' | '3/4' | '1/5' | '2/5' | '3/5' | '4/5' | '1/6' | '5/6';

/**
 * Explicit CSS size values that carry a unit, plus `calc()`/`var()`.
 * Requiring a unit here is what makes a bare non-preset number (e.g. `"560"`)
 * a type error — guiding callers to a preset or a unitful value.
 */
export type CssSize =
    | `${number}px` | `${number}rem` | `${number}em` | `${number}ch`
    | `${number}%` | `${number}vh` | `${number}vw` | `${number}vmin` | `${number}vmax`
    | `${number}dvh` | `${number}dvw` | `${number}svh` | `${number}lvh`
    | `calc(${string})` | `var(${string})`;

/**
 * Size value — a Tailwind step preset (autocompleted) or an explicit CSS value.
 *
 * Presets follow Tailwind's spacing scale where the number is the ×0.25rem step,
 * NOT pixels: `width="56"` → `w-56` = 14rem (224px). For an absolute size, pass a
 * unit: `width="560px"`, `width="50%"`, `width="calc(100% - 2rem)"`. A bare
 * non-preset number like `"560"` is rejected by the type — add a unit or use a
 * preset. For anything exotic, use the `class` escape hatch.
 *
 * @example
 * width="48"                 // w-48 (12rem) — Tailwind step
 * width="full"               // w-full (100%)
 * width="1/2"                // w-1/2 (50%)
 * width="560px"              // style="width: 560px"
 * width="70%"                // style="width: 70%"
 * width="calc(100% - 2rem)"  // style="width: calc(100% - 2rem)"
 */
export type SizeValue = TailwindSizeValue | CssSize;

/** Set of valid Tailwind size presets for quick lookup */
const tailwindSizes = new Set<string>([
    '0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24', '32', '40', '48', '56', '64', '72', '80', '96',
    'auto', 'full', 'screen', 'min', 'max', 'fit',
    '1/2', '1/3', '2/3', '1/4', '2/4', '3/4', '1/5', '2/5', '3/5', '4/5', '1/6', '5/6'
]);

/** CSS property names for size prefixes */
const sizeCssProps: Record<string, string> = {
    'w': 'width',
    'h': 'height',
    'min-w': 'minWidth',
    'min-h': 'minHeight',
    'max-w': 'maxWidth',
    'max-h': 'maxHeight',
};

/** Result of resolving a size - either a class or inline style */
export type SizeResult = {
    class?: string;
    style?: { property: string; value: string };
};

/** 
 * Resolves size to Tailwind class OR inline style for arbitrary values.
 * Tailwind presets become classes, arbitrary CSS values become inline styles.
 */
export function resolveSize(value: SizeValue | undefined, prefix: 'w' | 'h' | 'min-w' | 'min-h' | 'max-w' | 'max-h'): SizeResult {
    if (!value) return {};

    // Check if it's a predefined Tailwind value
    if (tailwindSizes.has(value)) {
        return { class: `${prefix}-${value}` };
    }

    // Safety net for untyped (JS) callers: a bare number isn't valid CSS without
    // a unit, so coerce to px rather than emitting an ignored `width: 560`.
    const cssValue = /^-?\d+(\.\d+)?$/.test(value) ? `${value}px` : value;

    // Otherwise, treat as an explicit CSS value - use inline style
    return {
        style: {
            property: sizeCssProps[prefix],
            value: cssValue
        }
    };
}

// ============================================================================
// Colors / Background
// ============================================================================

/** DaisyUI semantic background colors */
export type BackgroundColor = 
    | 'base-100' | 'base-200' | 'base-300'
    | 'primary' | 'secondary' | 'accent' | 'neutral'
    | 'info' | 'success' | 'warning' | 'error';

/** Resolves background to Tailwind classes (bg + text color) */
export function resolveBackground(value: BackgroundColor | undefined): string[] {
    if (!value) return [];
    
    const bgMap: Record<BackgroundColor, string[]> = {
        'base-100': ['bg-base-100'],
        'base-200': ['bg-base-200'],
        'base-300': ['bg-base-300'],
        'primary': ['bg-primary', 'text-primary-content'],
        'secondary': ['bg-secondary', 'text-secondary-content'],
        'accent': ['bg-accent', 'text-accent-content'],
        'neutral': ['bg-neutral', 'text-neutral-content'],
        'info': ['bg-info', 'text-info-content'],
        'success': ['bg-success', 'text-success-content'],
        'warning': ['bg-warning', 'text-warning-content'],
        'error': ['bg-error', 'text-error-content'],
    };
    
    return bgMap[value];
}

// ============================================================================
// Common Style Props (reusable across components)
// ============================================================================

/** Common styling props that can be mixed into any component */
export type StyleProps = 
    & Define.Prop<'padding', Spacing, false>
    & Define.Prop<'margin', Spacing, false>
    & Define.Prop<'rounded', RadiusValue | boolean, false>
    & Define.Prop<'background', BackgroundColor, false>
    & Define.Prop<'class', string, false>;

/** Resolves all style props to class array */
export function resolveStyleProps(props: {
    padding?: Spacing;
    margin?: Spacing;
    rounded?: RadiusValue | boolean;
    background?: BackgroundColor;
    class?: string;
}): string[] {
    const classes: string[] = [];
    
    classes.push(...resolveSpacing(props.padding, 'p'));
    classes.push(...resolveSpacing(props.margin, 'm'));
    
    const radiusClass = resolveRadius(props.rounded);
    if (radiusClass) classes.push(radiusClass);
    
    classes.push(...resolveBackground(props.background));

    if (props.class) classes.push(props.class);

    return classes;
}

/**
 * Container styling props (theme-aware) to mix into panel/container components
 * so consumers set chrome via props instead of hand-written utility classes.
 * Adds `width` to `StyleProps` and resolves to a className + optional inline
 * style (width can be a class or, for unitful values, an inline style).
 */
export type BoxStyleProps =
    & Define.Prop<'padding', Spacing, false>
    & Define.Prop<'margin', Spacing, false>
    & Define.Prop<'rounded', RadiusValue | boolean, false>
    & Define.Prop<'background', BackgroundColor, false>
    & Define.Prop<'width', SizeValue, false>
    & Define.Prop<'height', SizeValue, false>
    & Define.Prop<'class', string, false>;

/** Result of resolving container styling props. */
export type BoxStyleResult = { className: string; style?: Record<string, string> };

/**
 * Resolves the common container styling props to a className + optional inline
 * style. The returned className contains only the resolved prop classes; compose
 * it with the component's own base classes (e.g. `['card', box.className]`).
 */
export function resolveBoxStyle(props: {
    padding?: Spacing;
    margin?: Spacing;
    rounded?: RadiusValue | boolean;
    background?: BackgroundColor;
    width?: SizeValue;
    height?: SizeValue;
    minWidth?: SizeValue;
    minHeight?: SizeValue;
    maxWidth?: SizeValue;
    maxHeight?: SizeValue;
    class?: string;
}): BoxStyleResult {
    const classes: string[] = [];
    const style: Record<string, string> = {};

    classes.push(...resolveSpacing(props.padding, 'p'));
    classes.push(...resolveSpacing(props.margin, 'm'));

    const radiusClass = resolveRadius(props.rounded);
    if (radiusClass) classes.push(radiusClass);

    classes.push(...resolveBackground(props.background));

    const sizeProps: Array<[SizeValue | undefined, 'w' | 'h' | 'min-w' | 'min-h' | 'max-w' | 'max-h']> = [
        [props.width, 'w'],
        [props.height, 'h'],
        [props.minWidth, 'min-w'],
        [props.minHeight, 'min-h'],
        [props.maxWidth, 'max-w'],
        [props.maxHeight, 'max-h'],
    ];
    for (const [value, prefix] of sizeProps) {
        const result = resolveSize(value, prefix);
        if (result.class) classes.push(result.class);
        if (result.style) style[result.style.property] = result.style.value;
    }

    if (props.class) classes.push(props.class);

    return {
        className: classes.join(' '),
        style: Object.keys(style).length > 0 ? style : undefined,
    };
}

// ============================================================================
// Flex-specific utilities
// ============================================================================

export type FlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type FlexDirection = 'row' | 'col' | 'row-reverse' | 'col-reverse';

export const alignClasses: Record<FlexAlign, string> = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline',
};

export const justifyClasses: Record<FlexJustify, string> = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
};

export const directionClasses: Record<FlexDirection, string> = {
    'row': 'flex-row',
    'col': 'flex-col',
    'row-reverse': 'flex-row-reverse',
    'col-reverse': 'flex-col-reverse',
};
