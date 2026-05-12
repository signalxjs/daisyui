import { component, type Define } from 'sigx';

// ============================================
// Status Component
// ============================================

export type StatusColor = 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error';
export type StatusSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type StatusProps =
    & Define.Prop<'color', StatusColor, false>
    & Define.Prop<'size', StatusSize, false>
    & Define.Prop<'class', string, false>;

const statusColorClasses: Record<StatusColor, string> = {
    primary: 'status-primary',
    secondary: 'status-secondary',
    accent: 'status-accent',
    neutral: 'status-neutral',
    info: 'status-info',
    success: 'status-success',
    warning: 'status-warning',
    error: 'status-error'
};

const statusSizeClasses: Record<StatusSize, string> = {
    xs: 'status-xs',
    sm: 'status-sm',
    md: 'status-md',
    lg: 'status-lg',
    xl: 'status-xl'
};

/**
 * Status indicator component with DaisyUI styling.
 * A small icon to visually show the current status of an element.
 *
 * @example
 * ```tsx
 * <Status color="success" />
 * <Status color="error" size="lg" />
 * ```
 */
export const Status = component<StatusProps>(({ props }) => {
    const getClasses = () => {
        const classes = ['status'];

        if (props.color) classes.push(statusColorClasses[props.color]);
        if (props.size) classes.push(statusSizeClasses[props.size]);
        if (props.class) classes.push(props.class);

        return classes.join(' ');
    };

    return () => (
        <div aria-label="status" class={getClasses()}></div>
    );
});
