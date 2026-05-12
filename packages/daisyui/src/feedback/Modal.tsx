import { component, compound, Portal, onMounted, effect, type Define } from 'sigx';

// ============================================
// Types
// ============================================

export type ModalPosition = 'top' | 'middle' | 'bottom';
export type ModalAlign = 'start' | 'end';

// ============================================
// Modal Component
// ============================================

export type ModalProps =
    & Define.Model<boolean>
    & Define.Prop<'class', string, false>
    & Define.Prop<'position', ModalPosition, false>
    & Define.Prop<'align', ModalAlign, false>
    & Define.Prop<'backdrop', boolean, false>
    & Define.Slot<'default'>;

/**
 * Modal dialog component with DaisyUI styling.
 * Uses Portal to render at document.body level for proper backdrop display.
 * Uses native HTML dialog element with showModal() for proper ESC key support.
 * Uses two-way model binding for open/close state.
 *
 * @example
 * ```tsx
 * <Modal model={isOpen}>
 *   <Modal.Header>Modal Title</Modal.Header>
 *   <Modal.Body>Modal content goes here</Modal.Body>
 *   <Modal.Actions>
 *     <Button variant="primary">Confirm</Button>
 *   </Modal.Actions>
 * </Modal>
 * ```
 */
const _Modal = component<ModalProps>(({ props, slots }) => {
    let dialogRef: HTMLDialogElement | null = null;

    const close = () => {
        if (props.model) props.model.value = false;
    };

    const handleClose = () => {
        close();
    };

    const handleClick = (e: MouseEvent) => {
        if (e.target === dialogRef) {
            close();
        }
    };

    onMounted(() => {
        effect(() => {
            if (!dialogRef) return;

            const isOpen = props.model?.value;
            const isDialogOpen = dialogRef.open;

            if (isOpen && !isDialogOpen) {
                dialogRef.showModal();
            } else if (!isOpen && isDialogOpen) {
                dialogRef.close();
            }
        });
    });

    return () => {
        const classes = ['modal'];
        if (props.position === 'top') classes.push('modal-top');
        if (props.position === 'middle') classes.push('modal-middle');
        if (props.position === 'bottom') classes.push('modal-bottom');
        if (props.align === 'start') classes.push('modal-start');
        if (props.align === 'end') classes.push('modal-end');

        return (
            <Portal>
                <dialog
                    ref={(el: HTMLDialogElement) => dialogRef = el}
                    class={classes.join(' ')}
                    onClose={handleClose}
                    onClick={handleClick}
                >
                    <div class={`modal-box ${props.class ?? ''}`}>
                        {slots.default?.()}
                    </div>
                    {props.backdrop !== false && (
                        <form method="dialog" class="modal-backdrop">
                            <button>close</button>
                        </form>
                    )}
                </dialog>
            </Portal>
        );
    };
});

// ============================================
// ModalHeader Component
// ============================================

export type ModalHeaderProps =
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

/**
 * Modal.Header component for modal title area with close button.
 * The close button uses form method="dialog" to close the parent dialog.
 */
const ModalHeader = component<ModalHeaderProps>(({ props, slots }) => {
    return () => (
        <div class={`flex items-center justify-between ${props.class ?? ''}`}>
            <h3 class="text-lg font-bold">{slots.default?.()}</h3>
            <form method="dialog">
                <button
                    class="btn btn-sm btn-circle btn-ghost"
                >
                    ✕
                </button>
            </form>
        </div>
    );
});

// ============================================
// ModalBody Component
// ============================================

export type ModalBodyProps =
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

/**
 * Modal.Body component for modal content area.
 */
const ModalBody = component<ModalBodyProps>(({ props, slots }) => {
    return () => (
        <div class={`py-4 ${props.class ?? ''}`}>
            {slots.default?.()}
        </div>
    );
});

// ============================================
// ModalActions Component
// ============================================

export type ModalActionsProps =
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

/**
 * Modal.Actions component for modal action buttons.
 */
const ModalActions = component<ModalActionsProps>(({ props, slots }) => {
    return () => (
        <div class={`modal-action ${props.class ?? ''}`}>
            {slots.default?.()}
        </div>
    );
});

/**
 * Modal compound component with Header, Body, and Actions sub-components.
 */
export const Modal = compound(_Modal, {
    Header: ModalHeader,
    Body: ModalBody,
    Actions: ModalActions,
});
