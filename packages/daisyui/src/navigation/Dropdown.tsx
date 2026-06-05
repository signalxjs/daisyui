import { component, type Define } from 'sigx';
import {
    resolveBoxStyle,
    type Spacing,
    type RadiusValue,
    type BackgroundColor,
    type SizeValue,
} from '../shared/styles';

export type DropdownPosition = 'end' | 'top' | 'bottom' | 'left' | 'right';

export type DropdownProps =
    & Define.Prop<'position', DropdownPosition, false>
    & Define.Prop<'hover', boolean, false>
    // Styling props below apply to the dropdown content panel (theme-aware,
    // override the daisyUI defaults p-2 / bg-base-100 / rounded-box).
    & Define.Prop<'background', BackgroundColor, false>
    & Define.Prop<'rounded', RadiusValue | boolean, false>
    & Define.Prop<'width', SizeValue, false>
    & Define.Prop<'padding', Spacing, false>
    & Define.Prop<'class', string, false>       // applied to the dropdown root
    & Define.Prop<'menuClass', string, false>   // extra classes on the content panel
    & Define.Slot<'trigger'>
    & Define.Slot<'default'>;

/**
 * Dropdown component with DaisyUI styling.
 * Uses slots for maximum flexibility - any component can be the trigger.
 * 
 * @example
 * ```tsx
 * <Dropdown
 *   slots={{
 *     trigger: () => <Button>Open Menu</Button>
 *   }}
 * >
 *   <a>Item 1</a>
 *   <a>Item 2</a>
 * </Dropdown>
 * ```
 * 
 * @example With Menu component
 * ```tsx
 * <Dropdown
 *   position="end"
 *   slots={{
 *     trigger: () => <Button variant="primary">Actions</Button>
 *   }}
 * >
 *   <Menu class="w-52">
 *     <Menu.Item><a>Edit</a></Menu.Item>
 *     <Menu.Item><a>Delete</a></Menu.Item>
 *   </Menu>
 * </Dropdown>
 * ```
 */
export const Dropdown = component<DropdownProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['dropdown'];
        
        if (props.position === 'end') classes.push('dropdown-end');
        if (props.position === 'top') classes.push('dropdown-top');
        if (props.position === 'left') classes.push('dropdown-left');
        if (props.position === 'right') classes.push('dropdown-right');
        if (props.hover) classes.push('dropdown-hover');
        if (props.class) classes.push(props.class);
        
        return classes.join(' ');
    };

    const getMenuClassesAndStyle = () => {
        const classes = ['dropdown-content', 'z-[1]', 'menu', 'shadow'];
        // daisyUI content defaults, each overridable via the matching prop.
        if (!props.padding) classes.push('p-2');
        if (!props.background) classes.push('bg-base-100');
        if (props.rounded === undefined) classes.push('rounded-box');

        const box = resolveBoxStyle({
            background: props.background,
            rounded: props.rounded,
            width: props.width,
            padding: props.padding,
            class: props.menuClass,
        });
        if (box.className) classes.push(box.className);

        return { className: classes.join(' '), style: box.style };
    };

    return () => {
        const menu = getMenuClassesAndStyle();
        return (
            <div class={getClasses()}>
                {slots.trigger && (
                    <div tabIndex={0} role="button">
                        {slots.trigger()}
                    </div>
                )}
                <ul tabIndex={0} class={menu.className} style={menu.style}>
                    {slots.default?.()}
                </ul>
            </div>
        );
    };
});
