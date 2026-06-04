import { component, type Define } from 'sigx';
import {
    resolveBoxStyle,
    type Spacing,
    type RadiusValue,
    type BackgroundColor,
    type SizeValue,
} from '../shared/styles';

export type DrawerProps =
    & Define.Model<boolean>
    & Define.Prop<'side', 'left' | 'right', false>
    & Define.Prop<'responsive', boolean, false>
    // Styling props apply to the drawer side panel (`.drawer-side`).
    & Define.Prop<'background', BackgroundColor, false>
    & Define.Prop<'rounded', RadiusValue | boolean, false>
    & Define.Prop<'width', SizeValue, false>
    & Define.Prop<'padding', Spacing, false>
    & Define.Prop<'class', string, false>       // applied to the drawer root
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

        // Determine drawer side classes - add z-index for proper layering.
        // Styling props (background/rounded/width/padding) attach to the panel.
        // DaisyUI CSS handles visibility via :checked ~ .drawer-side
        const sidePanel = resolveBoxStyle({
            background: props.background,
            rounded: props.rounded,
            width: props.width,
            padding: props.padding,
        });
        const drawerSideClasses = ['drawer-side', 'z-[999]'];
        if (sidePanel.className) drawerSideClasses.push(sidePanel.className);

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
                <div class={drawerSideClasses.join(' ')} style={sidePanel.style}>
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
