import { describe, it, expect } from 'vitest';
import { render } from 'sigx';
import { Toast } from './Toast';

function renderToDiv(jsx: any): HTMLElement {
    const container = document.createElement('div');
    render(jsx, container);
    return container;
}

describe('Toast', () => {
    it('renders with base toast class', () => {
        const el = renderToDiv(<Toast>Hello</Toast>);
        const toast = el.querySelector('.toast')!;
        expect(toast).toBeTruthy();
        expect(toast.tagName).toBe('DIV');
    });

    it('renders children', () => {
        const el = renderToDiv(<Toast>Test content</Toast>);
        const toast = el.querySelector('.toast')!;
        expect(toast.textContent).toBe('Test content');
    });

    it('defaults to bottom-end position', () => {
        const el = renderToDiv(<Toast>Hello</Toast>);
        const toast = el.querySelector('.toast')!;
        expect(toast.classList.contains('toast-bottom')).toBe(true);
        expect(toast.classList.contains('toast-end')).toBe(true);
    });

    it('applies toast-top toast-start for position="top-start"', () => {
        const el = renderToDiv(<Toast position="top-start">Hello</Toast>);
        const toast = el.querySelector('.toast')!;
        expect(toast.classList.contains('toast-top')).toBe(true);
        expect(toast.classList.contains('toast-start')).toBe(true);
    });

    it('applies toast-top toast-center for position="top-center"', () => {
        const el = renderToDiv(<Toast position="top-center">Hello</Toast>);
        const toast = el.querySelector('.toast')!;
        expect(toast.classList.contains('toast-top')).toBe(true);
        expect(toast.classList.contains('toast-center')).toBe(true);
    });

    it('applies toast-top toast-end for position="top-end"', () => {
        const el = renderToDiv(<Toast position="top-end">Hello</Toast>);
        const toast = el.querySelector('.toast')!;
        expect(toast.classList.contains('toast-top')).toBe(true);
        expect(toast.classList.contains('toast-end')).toBe(true);
    });

    it('applies toast-middle toast-start for position="middle-start"', () => {
        const el = renderToDiv(<Toast position="middle-start">Hello</Toast>);
        const toast = el.querySelector('.toast')!;
        expect(toast.classList.contains('toast-middle')).toBe(true);
        expect(toast.classList.contains('toast-start')).toBe(true);
    });

    it('applies toast-middle toast-center for position="middle-center"', () => {
        const el = renderToDiv(<Toast position="middle-center">Hello</Toast>);
        const toast = el.querySelector('.toast')!;
        expect(toast.classList.contains('toast-middle')).toBe(true);
        expect(toast.classList.contains('toast-center')).toBe(true);
    });

    it('applies toast-middle toast-end for position="middle-end"', () => {
        const el = renderToDiv(<Toast position="middle-end">Hello</Toast>);
        const toast = el.querySelector('.toast')!;
        expect(toast.classList.contains('toast-middle')).toBe(true);
        expect(toast.classList.contains('toast-end')).toBe(true);
    });

    it('applies toast-bottom toast-start for position="bottom-start"', () => {
        const el = renderToDiv(<Toast position="bottom-start">Hello</Toast>);
        const toast = el.querySelector('.toast')!;
        expect(toast.classList.contains('toast-bottom')).toBe(true);
        expect(toast.classList.contains('toast-start')).toBe(true);
    });

    it('applies toast-bottom toast-center for position="bottom-center"', () => {
        const el = renderToDiv(<Toast position="bottom-center">Hello</Toast>);
        const toast = el.querySelector('.toast')!;
        expect(toast.classList.contains('toast-bottom')).toBe(true);
        expect(toast.classList.contains('toast-center')).toBe(true);
    });

    it('applies toast-bottom toast-end for position="bottom-end"', () => {
        const el = renderToDiv(<Toast position="bottom-end">Hello</Toast>);
        const toast = el.querySelector('.toast')!;
        expect(toast.classList.contains('toast-bottom')).toBe(true);
        expect(toast.classList.contains('toast-end')).toBe(true);
    });

    it('applies custom class', () => {
        const el = renderToDiv(<Toast class="custom-class">Hello</Toast>);
        const toast = el.querySelector('.toast')!;
        expect(toast.classList.contains('custom-class')).toBe(true);
    });

    it('combines position and custom class', () => {
        const el = renderToDiv(<Toast position="top-center" class="z-50">Hello</Toast>);
        const toast = el.querySelector('.toast')!;
        expect(toast.classList.contains('toast')).toBe(true);
        expect(toast.classList.contains('toast-top')).toBe(true);
        expect(toast.classList.contains('toast-center')).toBe(true);
        expect(toast.classList.contains('z-50')).toBe(true);
    });
});
