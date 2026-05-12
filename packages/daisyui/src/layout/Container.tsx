import { component, type Define } from 'sigx';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export type ContainerProps = 
    & Define.Prop<'size', ContainerSize, false>
    & Define.Prop<'center', boolean, false>
    & Define.Prop<'padding', boolean, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

const sizeClasses: Record<ContainerSize, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full',
};

/**
 * Container component for constraining content width.
 * 
 * @example
 * ```tsx
 * <Container size="lg" center padding>
 *   <p>Content goes here</p>
 * </Container>
 * ```
 */
export const Container = component<ContainerProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes: string[] = [];
        
        // Size - default to 2xl if not specified
        classes.push(sizeClasses[props.size ?? '2xl']);
        
        // Center by default
        if (props.center !== false) {
            classes.push('mx-auto');
        }
        
        // Padding - enabled by default
        if (props.padding !== false) {
            classes.push('px-4 py-6');
        }
        
        if (props.class) classes.push(props.class);
        
        return classes.join(' ');
    };

    return () => (
        <div class={getClasses()}>
            {slots.default?.()}
        </div>
    );
});
