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

/** Border radius values */
export type RadiusValue = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full' | 'box';

/** Resolves radius to Tailwind class */
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
 * Size value - can be a Tailwind preset or arbitrary CSS value.
 * 
 * @example
 * // Tailwind presets
 * width="48"      // w-48 (12rem)
 * width="full"    // w-full (100%)
 * width="1/2"     // w-1/2 (50%)
 * 
 * // Arbitrary CSS values (applied as inline styles)
 * width="400px"   // style="width: 400px"
 * width="70%"     // style="width: 70%"
 * width="calc(100% - 2rem)"  // style="width: calc(100% - 2rem)"
 */
export type SizeValue = TailwindSizeValue | (string & {});

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
    
    // Otherwise, treat as arbitrary CSS value - use inline style
    return { 
        style: { 
            property: sizeCssProps[prefix], 
            value 
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
