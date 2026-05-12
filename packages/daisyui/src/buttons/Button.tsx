import { component, type Define } from 'sigx';

export type ButtonVariant = 
    | 'primary' 
    | 'secondary' 
    | 'accent' 
    | 'info' 
    | 'success' 
    | 'warning' 
    | 'error' 
    | 'ghost' 
    | 'link'
    | 'neutral';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ButtonProps =
    & Define.Prop<'variant', ButtonVariant, false>
    & Define.Prop<'size', ButtonSize, false>
    & Define.Prop<'outline', boolean, false>
    & Define.Prop<'soft', boolean, false>
    & Define.Prop<'dash', boolean, false>
    & Define.Prop<'wide', boolean, false>
    & Define.Prop<'disabled', boolean, false>
    & Define.Prop<'loading', boolean, false>
    & Define.Prop<'block', boolean, false>
    & Define.Prop<'circle', boolean, false>
    & Define.Prop<'square', boolean, false>
    & Define.Prop<'active', boolean, false>
    & Define.Prop<'class', string, false>
    & Define.Prop<'type', 'button' | 'submit' | 'reset', false>
    & Define.Prop<'title', string, false>
    & Define.Slot<'default'>
    & Define.Event<'click', MouseEvent>;

const variantClasses: Record<ButtonVariant, string> = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    info: 'btn-info',
    success: 'btn-success',
    warning: 'btn-warning',
    error: 'btn-error',
    ghost: 'btn-ghost',
    link: 'btn-link',
    neutral: 'btn-neutral',
};

const sizeClasses: Record<ButtonSize, string> = {
    xs: 'btn-xs',
    sm: 'btn-sm',
    md: '', // md is default, no class needed
    lg: 'btn-lg',
    xl: 'btn-xl',
};

/**
 * Button component with DaisyUI styling.
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="lg" onClick={() => console.log('clicked')}>
 *   Click Me
 * </Button>
 * ```
 */
export const Button = component<ButtonProps>(({ props, slots, emit }) => {
    const getClasses = () => {
        const classes = ['btn'];
        
        if (props.variant) {
            classes.push(variantClasses[props.variant]);
        }
        
        if (props.size) {
            const sizeClass = sizeClasses[props.size];
            if (sizeClass) classes.push(sizeClass);
        }
        
        if (props.outline) classes.push('btn-outline');
        if (props.soft) classes.push('btn-soft');
        if (props.dash) classes.push('btn-dash');
        if (props.wide) classes.push('btn-wide');
        if (props.loading) classes.push('loading');
        if (props.block) classes.push('btn-block');
        if (props.circle) classes.push('btn-circle');
        if (props.square) classes.push('btn-square');
        if (props.active) classes.push('btn-active');
        if (props.class) classes.push(props.class);
        
        return classes.join(' ');
    };

    return () => (
        <button
            type={props.type ?? 'button'}
            class={getClasses()}
            disabled={props.disabled || props.loading}
            title={props.title}
            onClick={(e) => emit('click', e)}
        >
            {props.loading && <span class="loading loading-spinner"></span>}
            {slots.default?.()}
        </button>
    );
});
