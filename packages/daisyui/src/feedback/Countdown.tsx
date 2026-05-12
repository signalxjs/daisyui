import { component, type Define } from 'sigx';

// ============================================
// Countdown Types
// ============================================

export type CountdownDigits = 2 | 3;

export type CountdownProps =
    & Define.Prop<'value', number>
    & Define.Prop<'digits', CountdownDigits, false>
    & Define.Prop<'class', string, false>;

// ============================================
// Countdown Component
// ============================================

/**
 * Countdown component with animated number transitions.
 * Uses the daisyUI `countdown` class with `--value` CSS variable.
 * Value should be between 0 and 999.
 *
 * @example
 * ```tsx
 * <Countdown value={42} />
 * <Countdown value={5} digits={2} />
 * ```
 */
export const Countdown = component<CountdownProps>(({ props }) => {
    const getClasses = () => {
        const classes = ['countdown'];
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    const getStyle = () => {
        const style: Record<string, string> = { '--value': String(props.value ?? 0) };
        if (props.digits) style['--digits'] = String(props.digits);
        return style;
    };

    return () => (
        <span class={getClasses()}>
            <span style={getStyle()} aria-live="polite" aria-label={String(props.value ?? 0)}>{props.value ?? 0}</span>
        </span>
    );
});
