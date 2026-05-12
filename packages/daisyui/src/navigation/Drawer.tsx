import { component, type Define } from 'sigx';

export type DrawerProps = 
    & Define.Model<boolean>
    & Define.Prop<'side', 'left' | 'right', false>
    & Define.Prop<'responsive', boolean, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>
    & Define.Slot<'side'>;

/**
 * Drawer component with DaisyUI styling.
 * Slide-out side panel for navigation, filters, and mobile menus.
 * 
 * @example
 * ```tsx
 * const open = signal(false);
 * <Drawer 
 *   model={open} 
 *   slots={{
 *     side: () => <Menu items={navItems} />
 *   }}
 * >
 *   <main>Main content</main>
 * </Drawer>
 * ```
 */
export const Drawer = component<DrawerProps>(({ props, slots }) => {
    const drawerId = `drawer-${Math.random().toString(36).slice(2)}`;

    const handleCheckboxChange = (e: Event) => {
        const checked = (e.target as HTMLInputElement).checked;
        if (props.model) props.model.value = checked;
    };

    return () => {
        const classes = ['drawer'];
        if (props.side === 'right') classes.push('drawer-end');
        if (props.responsive) classes.push('lg:drawer-open');
        if (props.class) classes.push(props.class);

        // Determine drawer side classes - add z-index for proper layering
        const drawerSideClasses = ['drawer-side', 'z-[999]'];
        // If not responsive, we need the drawer-side to respect the toggle
        // The DaisyUI CSS handles visibility via :checked ~ .drawer-side

        return (
            <div class={classes.join(' ')}>
                <input 
                    id={drawerId} 
                    type="checkbox" 
                    class="drawer-toggle" 
                    checked={props.model?.value ?? false}
                    onChange={handleCheckboxChange}
                />
                <div class="drawer-content">
                    {slots.default?.()}
                </div>
                <div class={drawerSideClasses.join(' ')}>
                    <label 
                        htmlFor={drawerId} 
                        aria-label="close sidebar" 
                        class="drawer-overlay"
                    ></label>
                    {slots.side?.()}
                </div>
            </div>
        );
    };
});
