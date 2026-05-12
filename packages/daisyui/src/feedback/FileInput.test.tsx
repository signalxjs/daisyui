import { describe, it, expect } from 'vitest';
import { render } from 'sigx';
import { FileInput } from './FileInput';

function renderToDiv(jsx: any): HTMLElement {
    const container = document.createElement('div');
    render(jsx, container);
    return container;
}

describe('FileInput', () => {
    it('renders with base file-input class', () => {
        const el = renderToDiv(<FileInput />);
        const input = el.querySelector('.file-input')!;
        expect(input).toBeTruthy();
        expect(input.tagName).toBe('INPUT');
        expect((input as HTMLInputElement).type).toBe('file');
    });

    it('renders file-input-md class by default', () => {
        const el = renderToDiv(<FileInput />);
        const input = el.querySelector('.file-input')!;
        expect(input.classList.contains('file-input-md')).toBe(true);
    });

    // Size tests
    it('applies file-input-xs class', () => {
        const el = renderToDiv(<FileInput size="xs" />);
        expect(el.querySelector('.file-input')!.classList.contains('file-input-xs')).toBe(true);
    });

    it('applies file-input-sm class', () => {
        const el = renderToDiv(<FileInput size="sm" />);
        expect(el.querySelector('.file-input')!.classList.contains('file-input-sm')).toBe(true);
    });

    it('applies file-input-md class', () => {
        const el = renderToDiv(<FileInput size="md" />);
        expect(el.querySelector('.file-input')!.classList.contains('file-input-md')).toBe(true);
    });

    it('applies file-input-lg class', () => {
        const el = renderToDiv(<FileInput size="lg" />);
        expect(el.querySelector('.file-input')!.classList.contains('file-input-lg')).toBe(true);
    });

    it('applies file-input-xl class', () => {
        const el = renderToDiv(<FileInput size="xl" />);
        expect(el.querySelector('.file-input')!.classList.contains('file-input-xl')).toBe(true);
    });

    // Color tests
    it('applies file-input-primary class', () => {
        const el = renderToDiv(<FileInput color="primary" />);
        expect(el.querySelector('.file-input')!.classList.contains('file-input-primary')).toBe(true);
    });

    it('applies file-input-secondary class', () => {
        const el = renderToDiv(<FileInput color="secondary" />);
        expect(el.querySelector('.file-input')!.classList.contains('file-input-secondary')).toBe(true);
    });

    it('applies file-input-accent class', () => {
        const el = renderToDiv(<FileInput color="accent" />);
        expect(el.querySelector('.file-input')!.classList.contains('file-input-accent')).toBe(true);
    });

    it('applies file-input-neutral class', () => {
        const el = renderToDiv(<FileInput color="neutral" />);
        expect(el.querySelector('.file-input')!.classList.contains('file-input-neutral')).toBe(true);
    });

    it('applies file-input-info class', () => {
        const el = renderToDiv(<FileInput color="info" />);
        expect(el.querySelector('.file-input')!.classList.contains('file-input-info')).toBe(true);
    });

    it('applies file-input-success class', () => {
        const el = renderToDiv(<FileInput color="success" />);
        expect(el.querySelector('.file-input')!.classList.contains('file-input-success')).toBe(true);
    });

    it('applies file-input-warning class', () => {
        const el = renderToDiv(<FileInput color="warning" />);
        expect(el.querySelector('.file-input')!.classList.contains('file-input-warning')).toBe(true);
    });

    it('applies file-input-error class', () => {
        const el = renderToDiv(<FileInput color="error" />);
        expect(el.querySelector('.file-input')!.classList.contains('file-input-error')).toBe(true);
    });

    // Ghost variant
    it('applies file-input-ghost class', () => {
        const el = renderToDiv(<FileInput ghost />);
        expect(el.querySelector('.file-input')!.classList.contains('file-input-ghost')).toBe(true);
    });

    // Disabled state
    it('sets disabled attribute', () => {
        const el = renderToDiv(<FileInput disabled />);
        const input = el.querySelector('.file-input') as HTMLInputElement;
        expect(input.disabled).toBe(true);
    });

    // Accept attribute
    it('sets accept attribute', () => {
        const el = renderToDiv(<FileInput accept="image/*" />);
        const input = el.querySelector('.file-input') as HTMLInputElement;
        expect(input.accept).toBe('image/*');
    });

    // Multiple attribute
    it('sets multiple attribute', () => {
        const el = renderToDiv(<FileInput multiple />);
        const input = el.querySelector('.file-input') as HTMLInputElement;
        expect(input.multiple).toBe(true);
    });

    // Custom class
    it('applies custom class', () => {
        const el = renderToDiv(<FileInput class="w-full max-w-xs" />);
        const input = el.querySelector('.file-input')!;
        expect(input.classList.contains('w-full')).toBe(true);
        expect(input.classList.contains('max-w-xs')).toBe(true);
    });

    // Combined props
    it('combines size, color, and ghost classes', () => {
        const el = renderToDiv(<FileInput size="lg" color="primary" ghost />);
        const input = el.querySelector('.file-input')!;
        expect(input.classList.contains('file-input-lg')).toBe(true);
        expect(input.classList.contains('file-input-primary')).toBe(true);
        expect(input.classList.contains('file-input-ghost')).toBe(true);
    });

    // No w-full by default
    it('does not add w-full by default', () => {
        const el = renderToDiv(<FileInput />);
        const input = el.querySelector('.file-input')!;
        expect(input.classList.contains('w-full')).toBe(false);
    });
});
