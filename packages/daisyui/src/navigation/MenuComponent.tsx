import { component, compound, type Define } from 'sigx';

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
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>
    & Define.Event<'update:modelValue', string>;

export type MenuItemProps =
    & Define.Prop<'value', string, false>
    & Define.Prop<'active', boolean, false>
    & Define.Prop<'disabled', boolean, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

export type MenuTitleProps =
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

/**
 * Menu item sub-component for use inside Menu.
 * 
 * @example
 * ```tsx
 * <Menu.Item value="home"><a>Home</a></Menu.Item>
 * <Menu.Item disabled><a>Disabled</a></Menu.Item>
 * ```
 */
const MenuItem = component<MenuItemProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes: string[] = [];
        if (props.disabled) classes.push('disabled');
        if (props.class) classes.push(props.class);
        return classes.join(' ') || undefined;
    };

    return () => (
        <li class={getClasses()} data-value={props.value}>
            {slots.default?.()}
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
 * <Menu model={() => activeItem} size="lg" class="bg-base-200 rounded-box w-56">
 *     <Menu.Title>Navigation</Menu.Title>
 *     <Menu.Item value="home"><a>Home</a></Menu.Item>
 *     <Menu.Item value="about"><a>About</a></Menu.Item>
 *     <Menu.Item disabled><a>Disabled</a></Menu.Item>
 * </Menu>
 * ```
 */
const _Menu = component<MenuProps>(({ props, slots, emit }) => {
    const getClasses = () => {
        const classes = ['menu'];
        
        if (props.size) {
            const sizeClass = menuSizeClasses[props.size];
            if (sizeClass) classes.push(sizeClass);
        }

        if (props.horizontal) classes.push('menu-horizontal');
        if (props.class) classes.push(props.class);
        
        return classes.join(' ');
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

    return () => (
        <ul class={getClasses()} onClick={handleClick}>
            {slots.default?.()}
        </ul>
    );
});

/**
 * Menu compound component with Item and Title sub-components.
 */
export const Menu = compound(_Menu, {
    Item: MenuItem,
    Title: MenuTitle,
});
