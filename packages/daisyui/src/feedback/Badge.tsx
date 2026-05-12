import { component, type Define } from 'sigx';

// ============================================
// Badge Component
// ============================================

export type BadgeVariant = 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'ghost' | 'neutral';
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type BadgeStyle = 'outline' | 'soft' | 'dash' | 'ghost';

export type BadgeProps =
    & Define.Prop<'variant', BadgeVariant, false>
    & Define.Prop<'size', BadgeSize, false>
    & Define.Prop<'outline', boolean, false>
    & Define.Prop<'badgeStyle', BadgeStyle, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

const badgeVariantClasses: Record<BadgeVariant, string> = {
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    accent: 'badge-accent',
    info: 'badge-info',
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
    ghost: 'badge-ghost',
    neutral: 'badge-neutral'
};

const badgeSizeClasses: Record<BadgeSize, string> = {
    xs: 'badge-xs',
    sm: 'badge-sm',
    md: 'badge-md',
    lg: 'badge-lg',
    xl: 'badge-xl'
};

const badgeStyleClasses: Record<BadgeStyle, string> = {
    outline: 'badge-outline',
    soft: 'badge-soft',
    dash: 'badge-dash',
    ghost: 'badge-ghost'
};

/**
 * Badge component with DaisyUI styling.
 * 
 * @example
 * ```tsx
 * <Badge variant="success">Active</Badge>
 * <Badge variant="error" size="lg" outline>Error</Badge>
 * ```
 */
export const Badge = component<BadgeProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['badge'];

        if (props.variant) classes.push(badgeVariantClasses[props.variant]);
        if (props.size) classes.push(badgeSizeClasses[props.size]);
        if (props.badgeStyle) classes.push(badgeStyleClasses[props.badgeStyle]);
        else if (props.outline) classes.push('badge-outline');
        if (props.class) classes.push(props.class);

        return classes.join(' ');
    };

    return () => (
        <span class={getClasses()}>
            {slots.default?.()}
        </span>
    );
});

// ============================================
// Loading Component
// ============================================

export type LoadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type LoadingType = 'spinner' | 'dots' | 'ring' | 'ball' | 'bars' | 'infinity';
export type LoadingColor = 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error';

export type LoadingProps =
    & Define.Prop<'type', LoadingType, false>
    & Define.Prop<'size', LoadingSize, false>
    & Define.Prop<'color', LoadingColor, false>
    & Define.Prop<'class', string, false>;

const loadingTypeClasses: Record<LoadingType, string> = {
    spinner: 'loading-spinner',
    dots: 'loading-dots',
    ring: 'loading-ring',
    ball: 'loading-ball',
    bars: 'loading-bars',
    infinity: 'loading-infinity'
};

const loadingSizeClasses: Record<LoadingSize, string> = {
    xs: 'loading-xs',
    sm: 'loading-sm',
    md: 'loading-md',
    lg: 'loading-lg',
    xl: 'loading-xl'
};

const loadingColorClasses: Record<LoadingColor, string> = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    neutral: 'text-neutral',
    info: 'text-info',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error'
};

/**
 * Loading indicator component with DaisyUI styling.
 * 
 * @example
 * ```tsx
 * <Loading type="spinner" size="lg" />
 * <Loading type="dots" />
 * ```
 */
export const Loading = component<LoadingProps>(({ props }) => {
    const getClasses = () => {
        const classes = ['loading'];

        classes.push(loadingTypeClasses[props.type ?? 'spinner']);
        classes.push(loadingSizeClasses[props.size ?? 'md']);
        if (props.color) classes.push(loadingColorClasses[props.color]);
        if (props.class) classes.push(props.class);

        return classes.join(' ');
    };

    return () => <span class={getClasses()}></span>;
});

// ============================================
// Alert Component
// ============================================

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';
export type AlertStyle = 'outline' | 'dash' | 'soft';
export type AlertLayout = 'vertical' | 'horizontal';

export type AlertProps =
    & Define.Prop<'variant', AlertVariant, false>
    & Define.Prop<'alertStyle', AlertStyle, false>
    & Define.Prop<'layout', AlertLayout, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>
    & Define.Slot<'icon'>;

const alertVariantClasses: Record<AlertVariant, string> = {
    info: 'alert-info',
    success: 'alert-success',
    warning: 'alert-warning',
    error: 'alert-error'
};

const alertStyleClasses: Record<AlertStyle, string> = {
    outline: 'alert-outline',
    dash: 'alert-dash',
    soft: 'alert-soft'
};

const alertLayoutClasses: Record<AlertLayout, string> = {
    vertical: 'alert-vertical',
    horizontal: 'alert-horizontal'
};

const defaultIcons: Record<AlertVariant, string> = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌'
};

/**
 * Alert component with DaisyUI styling.
 *
 * @example
 * ```tsx
 * <Alert variant="success">Operation completed successfully!</Alert>
 * <Alert variant="error" alertStyle="soft">An error occurred.</Alert>
 * ```
 */
export const Alert = component<AlertProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['alert'];

        if (props.variant) classes.push(alertVariantClasses[props.variant]);
        if (props.alertStyle) classes.push(alertStyleClasses[props.alertStyle]);
        if (props.layout) classes.push(alertLayoutClasses[props.layout]);
        if (props.class) classes.push(props.class);

        return classes.join(' ');
    };

    return () => (
        <div role="alert" class={getClasses()}>
            {slots.icon?.() ?? (props.variant && <span>{defaultIcons[props.variant]}</span>)}
            <span>{slots.default?.()}</span>
        </div>
    );
});

// ============================================
// Progress Component
// ============================================

export type ProgressColor = 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error';

export type ProgressProps =
    & Define.Prop<'value', number, false>
    & Define.Prop<'max', number, false>
    & Define.Prop<'color', ProgressColor, false>
    & Define.Prop<'class', string, false>;

const progressColorClasses: Record<ProgressColor, string> = {
    primary: 'progress-primary',
    secondary: 'progress-secondary',
    accent: 'progress-accent',
    neutral: 'progress-neutral',
    info: 'progress-info',
    success: 'progress-success',
    warning: 'progress-warning',
    error: 'progress-error'
};

/**
 * Progress bar component with DaisyUI styling.
 *
 * @example
 * ```tsx
 * <Progress value={75} max={100} color="primary" />
 * ```
 */
export const Progress = component<ProgressProps>(({ props }) => {
    const getClasses = () => {
        const classes = ['progress'];

        if (props.color) classes.push(progressColorClasses[props.color]);
        if (props.class) classes.push(props.class);

        return classes.join(' ');
    };

    return () => (
        <progress
            class={getClasses()}
            value={props.value}
            max={props.max ?? 100}
        ></progress>
    );
});

// ============================================
// Tooltip Component
// ============================================

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
export type TooltipColor = 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';

export type TooltipProps =
    & Define.Prop<'tip', string, false>
    & Define.Prop<'position', TooltipPosition, false>
    & Define.Prop<'color', TooltipColor, false>
    & Define.Prop<'open', boolean, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

export type TooltipContentProps =
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

const tooltipPositionClasses: Record<TooltipPosition, string> = {
    top: 'tooltip-top',
    bottom: 'tooltip-bottom',
    left: 'tooltip-left',
    right: 'tooltip-right'
};

const tooltipColorClasses: Record<TooltipColor, string> = {
    neutral: 'tooltip-neutral',
    primary: 'tooltip-primary',
    secondary: 'tooltip-secondary',
    accent: 'tooltip-accent',
    info: 'tooltip-info',
    success: 'tooltip-success',
    warning: 'tooltip-warning',
    error: 'tooltip-error'
};

/**
 * Tooltip component with DaisyUI styling.
 * Supports text tooltips via `tip` prop or custom content via `Tooltip.Content` sub-component.
 *
 * @example
 * ```tsx
 * <Tooltip tip="This is a tooltip" position="top">
 *   <Button>Hover me</Button>
 * </Tooltip>
 * ```
 */
export const Tooltip = Object.assign(
    component<TooltipProps>(({ props, slots }) => {
        const getClasses = () => {
            const classes = ['tooltip'];

            if (props.position) classes.push(tooltipPositionClasses[props.position]);
            if (props.color) classes.push(tooltipColorClasses[props.color]);
            if (props.open) classes.push('tooltip-open');
            if (props.class) classes.push(props.class);

            return classes.join(' ');
        };

        return () => (
            <div class={getClasses()} data-tip={props.tip}>
                {slots.default?.()}
            </div>
        );
    }),
    {
        Content: component<TooltipContentProps>(({ props, slots }) => {
            const getClasses = () => {
                const classes = ['tooltip-content'];
                if (props.class) classes.push(props.class);
                return classes.join(' ');
            };

            return () => (
                <div class={getClasses()}>
                    {slots.default?.()}
                </div>
            );
        })
    }
);
