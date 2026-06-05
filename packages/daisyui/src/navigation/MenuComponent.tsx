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
    // Render the item as a real link (`<a href>`), with `menu-active` applied
    // automatically. Use this for plain navigation.
    & Define.Prop<'href', string, false>
    // Don't wrap the slot in an `<a>` — render it directly under the `<li>` so
    // the caller can supply their own interactive element (a router `<Link>`,
    // `<button>`, etc.) without nesting interactive elements. With `asChild` the
    // caller owns the active styling (add `menu-active` to their element).
    & Define.Prop<'asChild', boolean, false>
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
 * By default a leaf item wraps its content in an `<a>` — the <li>'s direct
 * child — so it receives daisyUI's menu-item styling (padding, hover) and can
 * carry the `menu-active` class. Active state comes from the `active` prop, or
 * from the parent Menu's `model` matching this item's `value`.
 *
 * To render a real link, pass `href` (the item becomes `<a href>` and still
 * auto-applies `menu-active`). To supply your own interactive element (a router
 * `<Link>`, a `<button>`, …) without nesting interactive elements, pass
 * `asChild` so the slot renders directly under the `<li>`. For nested menus,
 * pass `submenu` and provide a `<details>`.
 *
 * @example
 * ```tsx
 * <Menu.Item value="home">Home</Menu.Item>                  // wrapped <a>
 * <Menu.Item value="docs" href="/docs">Docs</Menu.Item>    // real link
 * <Menu.Item asChild><RouterLink to="/about">About</RouterLink></Menu.Item>
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

    const renderContent = () => {
        // `submenu`/`asChild`: caller owns the child element — render it directly
        // under the <li> so we never nest interactive elements.
        if (props.submenu || props.asChild) return slots.default?.();
        const activeClass = isActive() ? 'menu-active' : undefined;
        // `href`: render a real navigable link; otherwise a plain <a> for styling.
        return props.href != null
            ? <a href={props.href} class={activeClass}>{slots.default?.()}</a>
            : <a class={activeClass}>{slots.default?.()}</a>;
    };

    return () => (
        <li class={getClasses()} data-value={props.value}>
            {renderContent()}
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
 *     <Menu.Item value="home">Home</Menu.Item>
 *     <Menu.Item value="about" href="/about">About</Menu.Item>
 *     <Menu.Item disabled>Disabled</Menu.Item>
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
