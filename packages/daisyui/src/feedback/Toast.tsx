import { component, type Define } from 'sigx';

// ============================================
// Toast Types
// ============================================

export type ToastPosition = 
    | 'top-start' 
    | 'top-center' 
    | 'top-end' 
    | 'middle-start' 
    | 'middle-center' 
    | 'middle-end' 
    | 'bottom-start' 
    | 'bottom-center' 
    | 'bottom-end';

export type ToastProps = 
    & Define.Prop<'position', ToastPosition, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

const toastPositionClasses: Record<ToastPosition, string> = {
    'top-start': 'toast-top toast-start',
    'top-center': 'toast-top toast-center',
    'top-end': 'toast-top toast-end',
    'middle-start': 'toast-middle toast-start',
    'middle-center': 'toast-middle toast-center',
    'middle-end': 'toast-middle toast-end',
    'bottom-start': 'toast-bottom toast-start',
    'bottom-center': 'toast-bottom toast-center',
    'bottom-end': 'toast-bottom toast-end'
};

// ============================================
// Toast Component
// ============================================

/**
 * Toast container component for positioning notifications.
 * Use with Alert components for styled notifications.
 * 
 * @example
 * ```tsx
 * <Toast position="bottom-end">
 *   <Alert variant="success">Message sent!</Alert>
 * </Toast>
 * 
 * <Toast position="top-center">
 *   <Alert variant="info">New notification</Alert>
 *   <Alert variant="success">Action completed</Alert>
 * </Toast>
 * 
 * // Multiple toasts
 * <Toast position="bottom-start">
 *   {notifications.map(n => (
 *     <Alert variant={n.type}>{n.message}</Alert>
 *   ))}
 * </Toast>
 * ```
 */
export const Toast = component<ToastProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['toast'];
        const position: ToastPosition = props.position ?? 'bottom-end';
        classes.push(toastPositionClasses[position]);
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => (
        <div class={getClasses()}>
            {slots.default?.()}
        </div>
    );
});
