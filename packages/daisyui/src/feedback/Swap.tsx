import { component, compound, type Define } from 'sigx';

// ============================================
// Swap Sub-Components
// ============================================

export type SwapOnProps =
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

const SwapOn = component<SwapOnProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['swap-on'];
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => (
        <div class={getClasses()}>
            {slots.default?.()}
        </div>
    );
});

export type SwapOffProps =
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

const SwapOff = component<SwapOffProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['swap-off'];
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => (
        <div class={getClasses()}>
            {slots.default?.()}
        </div>
    );
});

export type SwapIndeterminateProps =
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

const SwapIndeterminate = component<SwapIndeterminateProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['swap-indeterminate'];
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => (
        <div class={getClasses()}>
            {slots.default?.()}
        </div>
    );
});

// ============================================
// Swap Container Component
// ============================================

export type SwapProps =
    & Define.Model<boolean>
    & Define.Prop<'rotate', boolean, false>
    & Define.Prop<'flip', boolean, false>
    & Define.Prop<'active', boolean, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>
    & Define.Event<'change', boolean>;

/**
 * Swap component to toggle between two states/elements with animation.
 * Uses compound sub-components: Swap.On, Swap.Off, Swap.Indeterminate.
 *
 * @example
 * ```tsx
 * <Swap rotate>
 *   <Swap.On>ON</Swap.On>
 *   <Swap.Off>OFF</Swap.Off>
 * </Swap>
 * ```
 */
const _Swap = component<SwapProps>(({ props, slots, emit }) => {
    const getClasses = () => {
        const classes = ['swap'];
        if (props.rotate) classes.push('swap-rotate');
        if (props.flip) classes.push('swap-flip');
        if (props.active || props.model?.value) classes.push('swap-active');
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    const handleChange = (e: Event) => {
        const checked = (e.target as HTMLInputElement).checked;
        if (props.model) props.model.value = checked;
        emit('change', checked);
    };

    return () => (
        <label class={getClasses()}>
            <input
                type="checkbox"
                checked={props.model?.value ?? props.active ?? false}
                onChange={handleChange}
            />
            {slots.default?.()}
        </label>
    );
});

export const Swap = compound(_Swap, {
    On: SwapOn,
    Off: SwapOff,
    Indeterminate: SwapIndeterminate,
});
