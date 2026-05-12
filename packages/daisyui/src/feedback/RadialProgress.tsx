import { component, type Define } from 'sigx';

// ============================================
// RadialProgress Types
// ============================================

export type RadialProgressColor = 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error';

export type RadialProgressProps =
    & Define.Prop<'value', number>
    & Define.Prop<'size', string, false>
    & Define.Prop<'thickness', string, false>
    & Define.Prop<'color', RadialProgressColor, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

// ============================================
// RadialProgress Component
// ============================================

/**
 * Radial/circular progress indicator component.
 * Displays progress as a circular arc with customizable size and color.
 * Uses CSS custom properties --value, --size, --thickness.
 */
export const RadialProgress = component<RadialProgressProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['radial-progress'];
        if (props.color) classes.push(`text-${props.color}`);
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    const getStyle = () => {
        const style: Record<string, string> = {
            '--value': String(props.value ?? 0)
        };
        if (props.size) style['--size'] = props.size;
        if (props.thickness) style['--thickness'] = props.thickness;
        return style;
    };

    return () => (
        <div
            class={getClasses()}
            style={getStyle()}
            role="progressbar"
            aria-valuenow={props.value ?? 0}
            aria-valuemin={0}
            aria-valuemax={100}
        >
            {slots.default?.() ?? `${props.value ?? 0}%`}
        </div>
    );
});
