import { component, type Define } from 'sigx';

export type NavbarProps = 
    & Define.Prop<'class', string, false>
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
        const classes = ['navbar', 'bg-base-100'];
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => (
        <div class={getClasses()}>
            {slots.start && <div class="navbar-start">{slots.start()}</div>}
            {slots.center && <div class="navbar-center">{slots.center()}</div>}
            {slots.end && <div class="navbar-end">{slots.end()}</div>}
        </div>
    );
});
