import { component, type Define } from 'sigx';

// ============================================
// Link Types
// ============================================

export type LinkColor = 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error';

export type LinkProps = 
    & Define.Prop<'href', string, false>
    & Define.Prop<'color', LinkColor, false>
    & Define.Prop<'hover', boolean, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>
    & Define.Event<'click', MouseEvent>;

const linkColorClasses: Record<LinkColor, string> = {
    primary: 'link-primary',
    secondary: 'link-secondary',
    accent: 'link-accent',
    neutral: 'link-neutral',
    info: 'link-info',
    success: 'link-success',
    warning: 'link-warning',
    error: 'link-error'
};

// ============================================
// Link Component
// ============================================

/**
 * Link component with DaisyUI styling.
 * Provides styled anchor elements with color variants and hover effects.
 * 
 * @example
 * ```tsx
 * <Link href="/about" color="primary" hover>About Us</Link>
 * 
 * <Link href="/docs" color="secondary">Documentation</Link>
 * 
 * <Link onClick={(e) => handleClick(e)}>Clickable Link</Link>
 * ```
 */
export const Link = component<LinkProps>(({ props, slots, emit }) => {
    const getClasses = () => {
        const classes = ['link'];
        if (props.color) classes.push(linkColorClasses[props.color]);
        if (props.hover) classes.push('link-hover');
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => (
        <a 
            href={props.href}
            class={getClasses()}
            onClick={(e) => emit('click', e)}
        >
            {slots.default?.()}
        </a>
    );
});
