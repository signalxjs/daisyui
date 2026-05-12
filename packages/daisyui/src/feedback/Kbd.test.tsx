import { describe, it, expect } from 'vitest';
import { render } from 'sigx';
import { Kbd } from './Kbd';

function renderToDiv(jsx: any): HTMLElement {
    const container = document.createElement('div');
    render(jsx, container);
    return container;
}

describe('Kbd', () => {
    it('renders with base kbd class', () => {
        const el = renderToDiv(<Kbd>K</Kbd>);
        const kbd = el.querySelector('.kbd')!;
        expect(kbd).toBeTruthy();
        expect(kbd.tagName).toBe('KBD');
    });

    it('renders children', () => {
        const el = renderToDiv(<Kbd>Enter</Kbd>);
        const kbd = el.querySelector('.kbd')!;
        expect(kbd.textContent).toBe('Enter');
    });

    it('applies kbd-xs class for size="xs"', () => {
        const el = renderToDiv(<Kbd size="xs">A</Kbd>);
        const kbd = el.querySelector('.kbd')!;
        expect(kbd.classList.contains('kbd-xs')).toBe(true);
    });

    it('applies kbd-sm class for size="sm"', () => {
        const el = renderToDiv(<Kbd size="sm">A</Kbd>);
        const kbd = el.querySelector('.kbd')!;
        expect(kbd.classList.contains('kbd-sm')).toBe(true);
    });

    it('applies kbd-md class for size="md"', () => {
        const el = renderToDiv(<Kbd size="md">A</Kbd>);
        const kbd = el.querySelector('.kbd')!;
        expect(kbd.classList.contains('kbd-md')).toBe(true);
    });

    it('applies kbd-lg class for size="lg"', () => {
        const el = renderToDiv(<Kbd size="lg">A</Kbd>);
        const kbd = el.querySelector('.kbd')!;
        expect(kbd.classList.contains('kbd-lg')).toBe(true);
    });

    it('applies kbd-xl class for size="xl"', () => {
        const el = renderToDiv(<Kbd size="xl">A</Kbd>);
        const kbd = el.querySelector('.kbd')!;
        expect(kbd.classList.contains('kbd-xl')).toBe(true);
    });

    it('does not apply size class when no size prop', () => {
        const el = renderToDiv(<Kbd>A</Kbd>);
        const kbd = el.querySelector('.kbd')!;
        expect(kbd.classList.contains('kbd-xs')).toBe(false);
        expect(kbd.classList.contains('kbd-sm')).toBe(false);
        expect(kbd.classList.contains('kbd-md')).toBe(false);
        expect(kbd.classList.contains('kbd-lg')).toBe(false);
        expect(kbd.classList.contains('kbd-xl')).toBe(false);
    });

    it('applies custom class', () => {
        const el = renderToDiv(<Kbd class="custom-class">A</Kbd>);
        const kbd = el.querySelector('.kbd')!;
        expect(kbd.classList.contains('custom-class')).toBe(true);
    });

    it('combines size and custom class', () => {
        const el = renderToDiv(<Kbd size="lg" class="font-bold">A</Kbd>);
        const kbd = el.querySelector('.kbd')!;
        expect(kbd.classList.contains('kbd')).toBe(true);
        expect(kbd.classList.contains('kbd-lg')).toBe(true);
        expect(kbd.classList.contains('font-bold')).toBe(true);
    });
});
