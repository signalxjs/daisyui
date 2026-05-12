import { component, type Define } from 'sigx';

export type DropdownPosition = 'end' | 'top' | 'bottom' | 'left' | 'right';

export type DropdownProps = 
    & Define.Prop<'position', DropdownPosition, false>
    & Define.Prop<'hover', boolean, false>
    & Define.Prop<'class', string, false>
    & Define.Prop<'menuClass', string, false>
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

    const getMenuClasses = () => {
        const classes = ['dropdown-content', 'z-[1]', 'menu', 'p-2', 'shadow', 'bg-base-100', 'rounded-box'];
        if (props.menuClass) classes.push(props.menuClass);
        return classes.join(' ');
    };

    return () => (
        <div class={getClasses()}>
            {slots.trigger && (
                <div tabIndex={0} role="button">
                    {slots.trigger()}
                </div>
            )}
            <ul tabIndex={0} class={getMenuClasses()}>
                {slots.default?.()}
            </ul>
        </div>
    );
});
