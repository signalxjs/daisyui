import { component, type Define } from 'sigx';

// ============================================
// Kbd Types
// ============================================

export type KbdSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type KbdProps =
    & Define.Prop<'size', KbdSize, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

const kbdSizeClasses: Record<KbdSize, string> = {
    xs: 'kbd-xs',
    sm: 'kbd-sm',
    md: 'kbd-md',
    lg: 'kbd-lg',
    xl: 'kbd-xl'
};

// ============================================
// Kbd Component
// ============================================

/**
 * Keyboard key component for displaying keyboard shortcuts.
 * Renders styled keyboard key indicators.
 * 
 * @example
 * ```tsx
 * // Single key
 * <Kbd>K</Kbd>
 * 
 * // Key combination
 * <Kbd>⌘</Kbd> + <Kbd>K</Kbd>
 * 
 * // Different sizes
 * <Kbd size="xs">Ctrl</Kbd>
 * <Kbd size="lg">Enter</Kbd>
 * 
 * // Full shortcut display
 * <div class="flex gap-1">
 *   <Kbd>Ctrl</Kbd>
 *   <Kbd>Shift</Kbd>
 *   <Kbd>P</Kbd>
 * </div>
 * ```
 */
export const Kbd = component<KbdProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['kbd'];
        if (props.size) {
            const sizeClass = kbdSizeClasses[props.size];
            if (sizeClass) classes.push(sizeClass);
        }
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => <kbd class={getClasses()}>{slots.default?.()}</kbd>;
});
