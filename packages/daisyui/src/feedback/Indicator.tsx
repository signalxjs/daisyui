import { component, compound, type Define } from 'sigx';

// ============================================
// Indicator Types
// ============================================

export type IndicatorHorizontal = 'start' | 'center' | 'end';
export type IndicatorVertical = 'top' | 'middle' | 'bottom';

export type IndicatorPosition =
    | 'top-start'
    | 'top-center'
    | 'top-end'
    | 'middle-start'
    | 'middle-center'
    | 'middle-end'
    | 'bottom-start'
    | 'bottom-center'
    | 'bottom-end';

// ============================================
// Indicator.Item Sub-Component
// ============================================

export type IndicatorItemProps =
    & Define.Prop<'horizontal', IndicatorHorizontal, false>
    & Define.Prop<'vertical', IndicatorVertical, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

const IndicatorItem = component<IndicatorItemProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['indicator-item'];

        // Vertical alignment (default: top)
        const vertical = props.vertical;
        if (vertical === 'middle') classes.push('indicator-middle');
        else if (vertical === 'bottom') classes.push('indicator-bottom');
        // 'top' is default, indicator-top is optional but explicit
        else if (vertical === 'top') classes.push('indicator-top');

        // Horizontal alignment (default: end)
        const horizontal = props.horizontal;
        if (horizontal === 'start') classes.push('indicator-start');
        else if (horizontal === 'center') classes.push('indicator-center');
        // 'end' is default, indicator-end is optional but explicit
        else if (horizontal === 'end') classes.push('indicator-end');

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
// Indicator Container Component
// ============================================

export type IndicatorProps =
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

/**
 * Indicator component to place an element on the corner of another element.
 * Uses compound sub-component Indicator.Item for the positioned badge/dot.
 *
 * @example
 * ```tsx
 * <Indicator>
 *   <Indicator.Item horizontal="end" vertical="top">
 *     <Badge variant="error">99+</Badge>
 *   </Indicator.Item>
 *   <Button>Inbox</Button>
 * </Indicator>
 * ```
 */
const _Indicator = component<IndicatorProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['indicator'];
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => (
        <div class={getClasses()}>
            {slots.default?.()}
        </div>
    );
});

export const Indicator = compound(_Indicator, {
    Item: IndicatorItem,
});
