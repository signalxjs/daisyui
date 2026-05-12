import { component, type Define } from 'sigx';
import { Spacing, resolveSpacing } from '../shared/styles';

// ============================================================================
// Text Size
// ============================================================================

export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';

const sizeClasses: Record<TextSize, string> = {
    'xs': 'text-xs',
    'sm': 'text-sm',
    'base': 'text-base',
    'lg': 'text-lg',
    'xl': 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
};

// ============================================================================
// Text Weight
// ============================================================================

export type TextWeight = 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';

const weightClasses: Record<TextWeight, string> = {
    'thin': 'font-thin',
    'light': 'font-light',
    'normal': 'font-normal',
    'medium': 'font-medium',
    'semibold': 'font-semibold',
    'bold': 'font-bold',
    'extrabold': 'font-extrabold',
};

// ============================================================================
// Text Color
// ============================================================================

export type TextColor = 
    | 'base' | 'muted' | 'faint'
    | 'primary' | 'secondary' | 'accent' | 'neutral'
    | 'info' | 'success' | 'warning' | 'error'
    | 'primary-content' | 'secondary-content' | 'accent-content' | 'neutral-content'
    | 'info-content' | 'success-content' | 'warning-content' | 'error-content';

const colorClasses: Record<TextColor, string> = {
    'base': 'text-base-content',
    'muted': 'text-base-content/60',
    'faint': 'text-base-content/40',
    'primary': 'text-primary',
    'secondary': 'text-secondary',
    'accent': 'text-accent',
    'neutral': 'text-neutral',
    'info': 'text-info',
    'success': 'text-success',
    'warning': 'text-warning',
    'error': 'text-error',
    'primary-content': 'text-primary-content',
    'secondary-content': 'text-secondary-content',
    'accent-content': 'text-accent-content',
    'neutral-content': 'text-neutral-content',
    'info-content': 'text-info-content',
    'success-content': 'text-success-content',
    'warning-content': 'text-warning-content',
    'error-content': 'text-error-content',
};

// ============================================================================
// Text Align
// ============================================================================

export type TextAlign = 'left' | 'center' | 'right' | 'justify';

const alignClasses: Record<TextAlign, string> = {
    'left': 'text-left',
    'center': 'text-center',
    'right': 'text-right',
    'justify': 'text-justify',
};

// ============================================================================
// Text Element
// ============================================================================

export type TextElement = 'span' | 'p' | 'div' | 'label' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

// ============================================================================
// Text Props
// ============================================================================

export type TextProps = 
    & Define.Prop<'as', TextElement, false>
    & Define.Prop<'size', TextSize, false>
    & Define.Prop<'weight', TextWeight, false>
    & Define.Prop<'color', TextColor, false>
    & Define.Prop<'align', TextAlign, false>
    & Define.Prop<'italic', boolean, false>
    & Define.Prop<'underline', boolean, false>
    & Define.Prop<'lineThrough', boolean, false>
    & Define.Prop<'uppercase', boolean, false>
    & Define.Prop<'lowercase', boolean, false>
    & Define.Prop<'capitalize', boolean, false>
    & Define.Prop<'truncate', boolean | number, false>
    & Define.Prop<'nowrap', boolean, false>
    & Define.Prop<'margin', Spacing, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

/**
 * Text component for typography with consistent styling.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Text>Default text</Text>
 * 
 * // With size and weight
 * <Text size="lg" weight="bold">Large bold text</Text>
 * 
 * // With color
 * <Text color="muted">Muted text</Text>
 * <Text color="primary">Primary colored text</Text>
 * 
 * // As different elements
 * <Text as="h1" size="3xl" weight="bold">Heading</Text>
 * <Text as="p" margin={{ bottom: "4" }}>Paragraph with margin</Text>
 * ```
 */
export const Text = component<TextProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes: string[] = [];
        
        // Size
        if (props.size) {
            classes.push(sizeClasses[props.size]);
        }
        
        // Weight
        if (props.weight) {
            classes.push(weightClasses[props.weight]);
        }
        
        // Color
        if (props.color) {
            classes.push(colorClasses[props.color]);
        }
        
        // Align
        if (props.align) {
            classes.push(alignClasses[props.align]);
        }
        
        // Style modifiers
        if (props.italic) classes.push('italic');
        if (props.underline) classes.push('underline');
        if (props.lineThrough) classes.push('line-through');
        if (props.uppercase) classes.push('uppercase');
        if (props.lowercase) classes.push('lowercase');
        if (props.capitalize) classes.push('capitalize');
        
        // Truncation - single line or multi-line
        if (props.truncate === true || props.truncate === 1) {
            classes.push('truncate');
        } else if (typeof props.truncate === 'number' && props.truncate > 1) {
            // Use explicit class names to avoid Tailwind purging
            const lineClampClasses: Record<number, string> = {
                2: 'line-clamp-2',
                3: 'line-clamp-3',
                4: 'line-clamp-4',
                5: 'line-clamp-5',
                6: 'line-clamp-6',
            };
            const clampClass = lineClampClasses[props.truncate];
            if (clampClass) {
                classes.push(clampClass);
            }
        }
        
        if (props.nowrap) classes.push('whitespace-nowrap');
        
        // Margin
        classes.push(...resolveSpacing(props.margin, 'm'));
        
        if (props.class) classes.push(props.class);
        
        return classes.length > 0 ? classes.join(' ') : undefined;
    };

    return () => {
        const Tag = props.as ?? 'span';
        const className = getClasses();
        
        return (
            <Tag class={className}>
                {slots.default?.()}
            </Tag>
        );
    };
});

// ============================================================================
// Heading Component (convenience wrapper)
// ============================================================================

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingProps = 
    & Define.Prop<'level', HeadingLevel, false>
    & Define.Prop<'size', TextSize, false>
    & Define.Prop<'weight', TextWeight, false>
    & Define.Prop<'color', TextColor, false>
    & Define.Prop<'align', TextAlign, false>
    & Define.Prop<'margin', Spacing, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

const defaultHeadingSizes: Record<HeadingLevel, TextSize> = {
    1: '4xl',
    2: '3xl',
    3: '2xl',
    4: 'xl',
    5: 'lg',
    6: 'base',
};

/**
 * Heading component for semantic headings with default sizes.
 * 
 * @example
 * ```tsx
 * <Heading level={1}>Page Title</Heading>
 * <Heading level={2}>Section Title</Heading>
 * <Heading level={3} size="xl">Custom sized heading</Heading>
 * ```
 */
export const Heading = component<HeadingProps>(({ props, slots }) => {
    return () => {
        const level = props.level ?? 2;
        const tag = `h${level}` as TextElement;
        const size = props.size ?? defaultHeadingSizes[level];
        
        return (
            <Text 
                as={tag}
                size={size}
                weight={props.weight ?? 'bold'}
                color={props.color}
                align={props.align}
                margin={props.margin}
                class={props.class}
            >
                {slots.default?.()}
            </Text>
        );
    };
});
