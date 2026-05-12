import { component, type Define } from 'sigx';

export interface BreadcrumbItem {
    id: string;
    label: string;
    href?: string;
}

export type BreadcrumbsProps = 
    & Define.Prop<'items', BreadcrumbItem[]>
    & Define.Prop<'class', string, false>
    & Define.Event<'navigate', string>;

/**
 * Breadcrumbs component with DaisyUI styling.
 * 
 * @example
 * ```tsx
 * const items = [
 *   { id: 'home', label: 'Home', href: '/' },
 *   { id: 'docs', label: 'Docs', href: '/docs' },
 *   { id: 'current', label: 'Current Page' }
 * ];
 * <Breadcrumbs items={items} onNavigate={(id) => navigate(id)} />
 * ```
 */
export const Breadcrumbs = component<BreadcrumbsProps>(({ props, emit }) => {
    const getClasses = () => {
        const classes = ['breadcrumbs', 'text-sm'];
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => (
        <div class={getClasses()}>
            <ul>
                {props.items?.map(item => (
                    <li>
                        <a onClick={() => emit('navigate', item.id)}>
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
});
