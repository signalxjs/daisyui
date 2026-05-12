import { component, type Define } from 'sigx';

// ============================================
// Skeleton Types
// ============================================

export type SkeletonProps =
    & Define.Prop<'text', boolean, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

// ============================================
// Skeleton Component
// ============================================

/**
 * Skeleton loading placeholder component.
 * Displays animated loading placeholders for content.
 *
 * Use Tailwind utility classes via the `class` prop for sizing and shape:
 * - Width: `w-full`, `w-32`, `w-52`, etc.
 * - Height: `h-4`, `h-16`, `h-32`, etc.
 * - Circle: `rounded-full`
 *
 * Use the `text` prop for animated text placeholders (skeleton-text).
 *
 * @example
 * ```tsx
 * // Basic skeleton
 * <Skeleton class="h-32 w-32" />
 *
 * // Circle skeleton for avatar
 * <Skeleton class="h-16 w-16 rounded-full" />
 *
 * // Animated text
 * <Skeleton text>Loading text...</Skeleton>
 * ```
 */
export const Skeleton = component<SkeletonProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['skeleton'];
        if (props.text) classes.push('skeleton-text');
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => {
        if (props.text) {
            return <span class={getClasses()}>{slots.default?.()}</span>;
        }
        return <div class={getClasses()}></div>;
    };
});
