import { component, type Define } from 'sigx';
import { resolveBoxStyle, type BoxStyleProps } from '../shared/styles';

export type StackDirection = 'top' | 'bottom' | 'start' | 'end';

export type StackProps =
    & Define.Prop<'direction', StackDirection, false>
    & BoxStyleProps
    & Define.Slot<'default'>;

/**
 * DaisyUI Stack component - visually puts elements on top of each other.
 * 
 * Stack uses CSS grid to layer elements, creating a stacked paper effect.
 * Use `w-*` and `h-*` classes on the Stack to set the size of all items.
 * 
 * @example Basic stack
 * ```tsx
 * <Stack class="w-32 h-20">
 *   <div class="bg-primary text-primary-content grid place-content-center rounded-box">1</div>
 *   <div class="bg-accent text-accent-content grid place-content-center rounded-box">2</div>
 *   <div class="bg-secondary text-secondary-content grid place-content-center rounded-box">3</div>
 * </Stack>
 * ```
 * 
 * @example Stack with cards
 * ```tsx
 * <Stack class="size-28">
 *   <Card class="border border-base-content bg-base-100 text-center">
 *     <Card.Body>A</Card.Body>
 *   </Card>
 *   <Card class="border border-base-content bg-base-100 text-center">
 *     <Card.Body>B</Card.Body>
 *   </Card>
 *   <Card class="border border-base-content bg-base-100 text-center">
 *     <Card.Body>C</Card.Body>
 *   </Card>
 * </Stack>
 * ```
 * 
 * @example Stack directions
 * ```tsx
 * <Stack direction="top" class="size-28">...</Stack>
 * <Stack direction="bottom" class="size-28">...</Stack>
 * <Stack direction="start" class="size-28">...</Stack>
 * <Stack direction="end" class="size-28">...</Stack>
 * ```
 */
export const Stack = component<StackProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['stack'];
        
        // Direction modifiers
        if (props.direction === 'top') {
            classes.push('stack-top');
        } else if (props.direction === 'start') {
            classes.push('stack-start');
        } else if (props.direction === 'end') {
            classes.push('stack-end');
        }
        // 'bottom' is default, no additional class needed (or stack-bottom)

        const box = resolveBoxStyle(props);
        if (box.className) classes.push(box.className);

        return { className: classes.join(' '), style: box.style };
    };

    return () => {
        const { className, style } = getClasses();
        return (
            <div class={className} style={style}>
                {slots.default?.()}
            </div>
        );
    };
});
