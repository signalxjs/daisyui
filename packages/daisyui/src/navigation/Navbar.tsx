import { component, type Define } from 'sigx';
import { resolveBoxStyle, type BoxStyleProps } from '../shared/styles';

export type NavbarProps =
    & BoxStyleProps
    & Define.Slot<'start'>
    & Define.Slot<'center'>
    & Define.Slot<'end'>;

/**
 * Navbar component with DaisyUI styling.
 * 
 * @example
 * ```tsx
 * <Navbar
 *   slots={{
 *     start: () => <a class="btn btn-ghost text-xl">Logo</a>,
 *     end: () => <Button>Login</Button>
 *   }}
 * />
 * ```
 */
export const Navbar = component<NavbarProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['navbar'];
        // daisyUI default background, overridable via the `background` prop.
        if (!props.background) classes.push('bg-base-100');
        const box = resolveBoxStyle(props);
        if (box.className) classes.push(box.className);
        return { className: classes.join(' '), style: box.style };
    };

    return () => {
        const { className, style } = getClasses();
        return (
            <div class={className} style={style}>
                {slots.start && <div class="navbar-start">{slots.start()}</div>}
                {slots.center && <div class="navbar-center">{slots.center()}</div>}
                {slots.end && <div class="navbar-end">{slots.end()}</div>}
            </div>
        );
    };
});
