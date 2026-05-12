import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@sigx/runtime-dom';
import { jsx } from '@sigx/runtime-core';
import { Button } from '../src/buttons/Button';

describe('Button', () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    const get = () => container.querySelector('button')!;

    it('renders <button> with base `btn` class', () => {
        render(jsx(Button, { children: 'Click me' }), container);
        expect(get().classList.contains('btn')).toBe(true);
        expect(get().textContent).toBe('Click me');
    });

    const variants = ['neutral', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error', 'ghost', 'link'] as const;
    for (const v of variants) {
        it(`variant="${v}" emits btn-${v}`, () => {
            render(jsx(Button, { variant: v, children: v }), container);
            expect(get().classList.contains(`btn-${v}`)).toBe(true);
        });
    }

    const sizes = ['xs', 'sm', 'lg', 'xl'] as const;
    for (const s of sizes) {
        it(`size="${s}" emits btn-${s}`, () => {
            render(jsx(Button, { size: s, children: s }), container);
            expect(get().classList.contains(`btn-${s}`)).toBe(true);
        });
    }

    const mods = ['outline', 'soft', 'dash', 'wide', 'block', 'circle', 'square', 'active'] as const;
    for (const m of mods) {
        it(`${m} prop emits btn-${m}`, () => {
            render(jsx(Button, { [m]: true, children: m }), container);
            expect(get().classList.contains(`btn-${m}`)).toBe(true);
        });
    }

    it('disabled prop disables the button', () => {
        render(jsx(Button, { disabled: true, children: 'x' }), container);
        expect(get().disabled).toBe(true);
    });

    it('loading prop renders spinner and disables', () => {
        render(jsx(Button, { loading: true, children: 'x' }), container);
        expect(get().disabled).toBe(true);
        expect(container.querySelector('.loading-spinner')).not.toBeNull();
    });

    it('type prop sets the html type', () => {
        render(jsx(Button, { type: 'submit', children: 'x' }), container);
        expect(get().getAttribute('type')).toBe('submit');
    });
});
