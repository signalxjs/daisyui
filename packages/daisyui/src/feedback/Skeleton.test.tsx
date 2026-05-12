import { describe, it, expect } from 'vitest';
import { render } from 'sigx';
import { Skeleton } from './Skeleton';

function renderToDiv(jsx: any): HTMLElement {
    const container = document.createElement('div');
    render(jsx, container);
    return container;
}

describe('Skeleton', () => {
    it('renders with base skeleton class', () => {
        const el = renderToDiv(<Skeleton />);
        const skeleton = el.querySelector('.skeleton')!;
        expect(skeleton).toBeTruthy();
        expect(skeleton.tagName).toBe('DIV');
    });

    it('renders as div by default', () => {
        const el = renderToDiv(<Skeleton class="h-4 w-full" />);
        const skeleton = el.querySelector('.skeleton')!;
        expect(skeleton.tagName).toBe('DIV');
    });

    it('applies custom class', () => {
        const el = renderToDiv(<Skeleton class="h-32 w-32" />);
        const skeleton = el.querySelector('.skeleton')!;
        expect(skeleton.classList.contains('h-32')).toBe(true);
        expect(skeleton.classList.contains('w-32')).toBe(true);
    });

    it('applies rounded-full via class for circle shape', () => {
        const el = renderToDiv(<Skeleton class="h-16 w-16 rounded-full" />);
        const skeleton = el.querySelector('.skeleton')!;
        expect(skeleton.classList.contains('rounded-full')).toBe(true);
    });

    it('applies skeleton-text class when text prop is true', () => {
        const el = renderToDiv(<Skeleton text>Loading...</Skeleton>);
        const skeleton = el.querySelector('.skeleton')!;
        expect(skeleton.classList.contains('skeleton-text')).toBe(true);
    });

    it('renders as span when text prop is true', () => {
        const el = renderToDiv(<Skeleton text>Loading...</Skeleton>);
        const skeleton = el.querySelector('.skeleton')!;
        expect(skeleton.tagName).toBe('SPAN');
    });

    it('renders children for text skeleton', () => {
        const el = renderToDiv(<Skeleton text>AI is thinking...</Skeleton>);
        const skeleton = el.querySelector('.skeleton')!;
        expect(skeleton.textContent).toBe('AI is thinking...');
    });

    it('does not apply skeleton-text class when text is false', () => {
        const el = renderToDiv(<Skeleton class="h-4 w-full" />);
        const skeleton = el.querySelector('.skeleton')!;
        expect(skeleton.classList.contains('skeleton-text')).toBe(false);
    });

    it('combines skeleton-text with custom classes', () => {
        const el = renderToDiv(<Skeleton text class="text-xl">Loading...</Skeleton>);
        const skeleton = el.querySelector('.skeleton')!;
        expect(skeleton.classList.contains('skeleton')).toBe(true);
        expect(skeleton.classList.contains('skeleton-text')).toBe(true);
        expect(skeleton.classList.contains('text-xl')).toBe(true);
    });

    it('applies multiple utility classes', () => {
        const el = renderToDiv(<Skeleton class="h-4 w-20 shrink-0" />);
        const skeleton = el.querySelector('.skeleton')!;
        expect(skeleton.classList.contains('h-4')).toBe(true);
        expect(skeleton.classList.contains('w-20')).toBe(true);
        expect(skeleton.classList.contains('shrink-0')).toBe(true);
    });
});
