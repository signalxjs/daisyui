import { component, type Define } from 'sigx';

export type DividerProps = 
    & Define.Prop<'vertical', boolean, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

/**
 * Divider component with DaisyUI styling.
 * 
 * Note: In DaisyUI, the naming is based on the flex container direction:
 * - Default 'divider' works in vertical flex containers (flex-col)
 * - 'divider-horizontal' works in horizontal flex containers (flex-row)
 * 
 * When 'vertical' prop is true, this component uses 'divider-horizontal'
 * which renders a vertical dividing line in a horizontal flex container.
 * 
 * @example
 * ```tsx
 * <Divider>OR</Divider>
 * <Divider vertical />
 * ```
 */
export const Divider = component<DividerProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['divider'];
        
        if (props.vertical) {
            classes.push('divider-horizontal');
        }
        
        if (props.class) classes.push(props.class);
        
        return classes.join(' ');
    };

    return () => (
        <div class={getClasses()}>
            {slots.default?.()}
        </div>
    );
});
