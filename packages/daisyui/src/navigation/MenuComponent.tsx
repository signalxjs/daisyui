import { component, compound, defineProvide, defineInjectable, type Define } from 'sigx';
import {
    resolveBoxStyle,
    type Spacing,
    type RadiusValue,
    type BackgroundColor,
    type SizeValue,
} from '../shared/styles';

export type MenuSize = 'xs' | 'sm' | 'md' | 'lg';

const menuSizeClasses: Record<MenuSize, string> = {
    xs: 'menu-xs',
    sm: 'menu-sm',
    md: '',
    lg: 'menu-lg'
};

export type MenuProps =
    & Define.Model<string>
    & Define.Prop<'size', MenuSize, false>
    & Define.Prop<'horizontal', boolean, false>
    // Theme-aware styling props. `rounded` accepts the theme radii
    // `box`/`field`/`selector` (and the fixed sm..3xl/full scale).
    & Define.Prop<'background', BackgroundColor, false>
    & Define.Prop<'rounded', RadiusValue | boolean, false>
    & Define.Prop<'width', SizeValue, false>
    & Define.Prop<'padding', Spacing, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>
    & Define.Event<'update:modelValue', string>;

export type MenuItemProps =
    & Define.Prop<'value', string, false>
    & Define.Prop<'active', boolean, false>
    & Define.Prop<'submenu', boolean, false>
    & Define.Prop<'disabled', boolean, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

export type MenuTitleProps =
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

// ============================================
// Menu Context
// ============================================

// Shares the active (model) value from Menu down to its Items so the matching
// item can render daisyUI's `menu-active` styling without prop drilling.
interface MenuContext {
    activeValue: () => string | undefined;
}

const useMenuContext = defineInjectable<MenuContext | null>(() => null);

/**
 * Menu item sub-component for use inside Menu.
 *
 * Leaf items wrap their content in an `<a>` — the <li>'s direct child — so it
 * receives daisyUI's menu-item styling (padding, hover) and can carry the
 * `menu-active` class. Active state comes from the `active` prop, or from the
 * parent Menu's `model` matching this item's `value`. For nested menus, pass
 * `submenu` and provide a `<details>` so the slot renders directly under the
 * `<li>` (where daisyUI expects it) instead of being wrapped.
 *
 * @example
 * ```tsx
 * <Menu.Item value="home">Home</Menu.Item>
 * <Menu.Item active>Selected</Menu.Item>
 * <Menu.Item disabled>Disabled</Menu.Item>
 * <Menu.Item submenu>
 *   <details><summary>Parent</summary><ul>…</ul></details>
 * </Menu.Item>
 * ```
 */
const MenuItem = component<MenuItemProps>(({ props, slots }) => {
    const menu = useMenuContext();

    const getClasses = () => {
        const classes: string[] = [];
        if (props.disabled) classes.push('disabled');
        if (props.class) classes.push(props.class);
        return classes.join(' ') || undefined;
    };

    const isActive = () =>
        props.active ?? (props.value != null && menu?.activeValue() === props.value);

    return () => (
        <li class={getClasses()} data-value={props.value}>
            {props.submenu
                ? slots.default?.()
                : <a class={isActive() ? 'menu-active' : undefined}>{slots.default?.()}</a>}
        </li>
    );
});

/**
 * Menu title/header sub-component for grouping menu items.
 * 
 * @example
 * ```tsx
 * <Menu.Title>Category</Menu.Title>
 * ```
 */
const MenuTitle = component<MenuTitleProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['menu-title'];
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => (
        <li class={getClasses()}>
            {slots.default?.()}
        </li>
    );
});



/**
 * Menu component with DaisyUI styling. Supports compound sub-components.
 * 
 * @example
 * ```tsx
 * <Menu model={() => activeItem} size="lg" background="base-200" rounded width="56">
 *     <Menu.Title>Navigation</Menu.Title>
 *     <Menu.Item value="home"><a>Home</a></Menu.Item>
 *     <Menu.Item value="about"><a>About</a></Menu.Item>
 *     <Menu.Item disabled><a>Disabled</a></Menu.Item>
 * </Menu>
 * ```
 */
const _Menu = component<MenuProps>(({ props, slots, emit }) => {
    // Share the active (model) value so child Menu.Items can self-highlight.
    defineProvide(useMenuContext, () => ({
        activeValue: () => props.model?.value,
    }));

    const getClassesAndStyle = () => {
        const classes = ['menu'];

        if (props.size) {
            const sizeClass = menuSizeClasses[props.size];
            if (sizeClass) classes.push(sizeClass);
        }

        if (props.horizontal) classes.push('menu-horizontal');

        // Theme-aware styling (background/rounded/width/padding/class).
        const box = resolveBoxStyle(props);
        if (box.className) classes.push(box.className);

        return { className: classes.join(' '), style: box.style };
    };

    const handleClick = (e: Event) => {
        const target = e.target as HTMLElement;
        const li = target.closest('li[data-value]');
        if (li) {
            const value = li.getAttribute('data-value');
            if (value && !li.classList.contains('disabled')) {
                emit('update:modelValue', value);
            }
        }
    };

    return () => {
        const { className, style } = getClassesAndStyle();
        return (
            <ul class={className} style={style} onClick={handleClick}>
                {slots.default?.()}
            </ul>
        );
    };
});

/**
 * Menu compound component with Item and Title sub-components.
 */
export const Menu = compound(_Menu, {
    Item: MenuItem,
    Title: MenuTitle,
});
