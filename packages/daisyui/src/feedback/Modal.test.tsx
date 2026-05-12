import { describe, it, expect, afterEach } from 'vitest';
import { render } from 'sigx';
import { Modal } from './Modal';

function renderToDiv(jsx: any): HTMLElement {
    const container = document.createElement('div');
    render(jsx, container);
    return container;
}

afterEach(() => {
    // Clean up portaled content from document.body
    document.body.innerHTML = '';
});

describe('Modal', () => {
    it('renders with base modal class', () => {
        renderToDiv(<Modal>Content</Modal>);
        const dialog = document.querySelector('dialog');
        expect(dialog).toBeTruthy();
        expect(dialog!.classList.contains('modal')).toBe(true);
    });

    it('renders modal-box inside dialog', () => {
        renderToDiv(<Modal>Content</Modal>);
        const box = document.querySelector('dialog .modal-box');
        expect(box).toBeTruthy();
    });

    it('renders children inside modal-box', () => {
        renderToDiv(<Modal>Hello World</Modal>);
        const box = document.querySelector('dialog .modal-box');
        expect(box?.textContent).toContain('Hello World');
    });

    it('renders modal-backdrop by default', () => {
        renderToDiv(<Modal>Content</Modal>);
        const backdrop = document.querySelector('dialog .modal-backdrop');
        expect(backdrop).toBeTruthy();
    });

    it('hides modal-backdrop when backdrop={false}', () => {
        renderToDiv(<Modal backdrop={false}>Content</Modal>);
        const backdrop = document.querySelector('dialog .modal-backdrop');
        expect(backdrop).toBeFalsy();
    });

    // Position tests
    it('applies modal-top class', () => {
        renderToDiv(<Modal position="top">Content</Modal>);
        const dialog = document.querySelector('dialog');
        expect(dialog!.classList.contains('modal-top')).toBe(true);
    });

    it('applies modal-middle class', () => {
        renderToDiv(<Modal position="middle">Content</Modal>);
        const dialog = document.querySelector('dialog');
        expect(dialog!.classList.contains('modal-middle')).toBe(true);
    });

    it('applies modal-bottom class', () => {
        renderToDiv(<Modal position="bottom">Content</Modal>);
        const dialog = document.querySelector('dialog');
        expect(dialog!.classList.contains('modal-bottom')).toBe(true);
    });

    // Align tests
    it('applies modal-start class', () => {
        renderToDiv(<Modal align="start">Content</Modal>);
        const dialog = document.querySelector('dialog');
        expect(dialog!.classList.contains('modal-start')).toBe(true);
    });

    it('applies modal-end class', () => {
        renderToDiv(<Modal align="end">Content</Modal>);
        const dialog = document.querySelector('dialog');
        expect(dialog!.classList.contains('modal-end')).toBe(true);
    });

    it('combines position and align classes', () => {
        renderToDiv(<Modal position="bottom" align="end">Content</Modal>);
        const dialog = document.querySelector('dialog');
        expect(dialog!.classList.contains('modal-bottom')).toBe(true);
        expect(dialog!.classList.contains('modal-end')).toBe(true);
    });

    it('passes custom class to modal-box', () => {
        renderToDiv(<Modal class="max-w-5xl">Content</Modal>);
        const box = document.querySelector('dialog .modal-box');
        expect(box!.classList.contains('max-w-5xl')).toBe(true);
    });
});

describe('Modal.Header', () => {
    it('renders title text', () => {
        renderToDiv(
            <Modal>
                <Modal.Header>My Title</Modal.Header>
            </Modal>
        );
        const header = document.querySelector('dialog .modal-box h3');
        expect(header?.textContent).toBe('My Title');
    });

    it('renders close button', () => {
        renderToDiv(
            <Modal>
                <Modal.Header>Title</Modal.Header>
            </Modal>
        );
        const closeBtn = document.querySelector('dialog .modal-box .btn-circle');
        expect(closeBtn).toBeTruthy();
        expect(closeBtn?.textContent).toBe('✕');
    });

    it('applies custom class', () => {
        renderToDiv(
            <Modal>
                <Modal.Header class="border-b">Title</Modal.Header>
            </Modal>
        );
        const headerDiv = document.querySelector('dialog .modal-box .flex.border-b');
        expect(headerDiv).toBeTruthy();
    });
});

describe('Modal.Body', () => {
    it('renders children', () => {
        renderToDiv(
            <Modal>
                <Modal.Body>Body content</Modal.Body>
            </Modal>
        );
        const body = document.querySelector('dialog .modal-box .py-4');
        expect(body?.textContent).toBe('Body content');
    });

    it('applies custom class', () => {
        renderToDiv(
            <Modal>
                <Modal.Body class="extra">Content</Modal.Body>
            </Modal>
        );
        const body = document.querySelector('dialog .modal-box .py-4.extra');
        expect(body).toBeTruthy();
    });
});

describe('Modal.Actions', () => {
    it('renders with modal-action class', () => {
        renderToDiv(
            <Modal>
                <Modal.Actions>Actions</Modal.Actions>
            </Modal>
        );
        const actions = document.querySelector('dialog .modal-box .modal-action');
        expect(actions).toBeTruthy();
    });

    it('renders children', () => {
        renderToDiv(
            <Modal>
                <Modal.Actions>
                    <button>Close</button>
                </Modal.Actions>
            </Modal>
        );
        const actions = document.querySelector('dialog .modal-box .modal-action');
        expect(actions?.textContent).toContain('Close');
    });

    it('applies custom class', () => {
        renderToDiv(
            <Modal>
                <Modal.Actions class="justify-start">Actions</Modal.Actions>
            </Modal>
        );
        const actions = document.querySelector('dialog .modal-box .modal-action.justify-start');
        expect(actions).toBeTruthy();
    });
});
