import { component, type Define } from 'sigx';

export type ButtonGroupProps =
    & Define.Prop<'vertical', boolean, false>
    & Define.Prop<'horizontal', boolean, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

/**
 * ButtonGroup component for grouping buttons together.
 * 
 * @example
 * ```tsx
 * <ButtonGroup>
 *   <Button>Left</Button>
 *   <Button>Center</Button>
 *   <Button>Right</Button>
 * </ButtonGroup>
 * ```
 */
export const ButtonGroup = component<ButtonGroupProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['join'];
        
        if (props.vertical) classes.push('join-vertical');
        if (props.horizontal) classes.push('join-horizontal');
        if (props.class) classes.push(props.class);
        
        return classes.join(' ');
    };

    return () => (
        <div class={getClasses()}>
            {slots.default?.()}
        </div>
    );
});
