import { component, type Define } from 'sigx';

// ============================================
// Icon Component
// ============================================

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type IconProps =
    & Define.Prop<'icon', string>
    & Define.Prop<'size', IconSize, false>
    & Define.Prop<'class', string, false>;

const sizeClasses: Record<IconSize, string> = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl'
};

/**
 * Generic icon component that renders an `<i>` tag with the given icon classes.
 * 
 * @example
 * ```tsx
 * import { Icon } from '@sigx/daisyui';
 * 
 * <Icon icon="fa-solid fa-check" />
 * <Icon icon="fa-solid fa-gear" size="lg" />
 * <Icon icon="fa-solid fa-bolt" size="xl" class="text-yellow-400" />
 * ```
 */
export const Icon = component<IconProps>(({ props }) => {
    return () => (
        <i
            class={`${props.icon} ${props.size ? sizeClasses[props.size] : ''} ${props.class ?? ''}`.trim()}
        />
    );
});
