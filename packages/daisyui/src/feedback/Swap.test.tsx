import { describe, it, expect } from 'vitest';
import { render } from 'sigx';
import { Swap } from './Swap';

function renderToDiv(jsx: any): HTMLElement {
    const container = document.createElement('div');
    render(jsx, container);
    return container;
}

describe('Swap', () => {
    it('renders with base swap class', () => {
        const el = renderToDiv(
            <Swap>
                <Swap.On>ON</Swap.On>
                <Swap.Off>OFF</Swap.Off>
            </Swap>
        );
        const swap = el.querySelector('.swap')!;
        expect(swap).toBeTruthy();
        expect(swap.tagName).toBe('LABEL');
    });

    it('renders a hidden checkbox input', () => {
        const el = renderToDiv(
            <Swap>
                <Swap.On>ON</Swap.On>
                <Swap.Off>OFF</Swap.Off>
            </Swap>
        );
        const input = el.querySelector('input[type="checkbox"]')!;
        expect(input).toBeTruthy();
    });

    it('applies swap-rotate class when rotate prop is set', () => {
        const el = renderToDiv(
            <Swap rotate>
                <Swap.On>ON</Swap.On>
                <Swap.Off>OFF</Swap.Off>
            </Swap>
        );
        const swap = el.querySelector('.swap')!;
        expect(swap.classList.contains('swap-rotate')).toBe(true);
    });

    it('applies swap-flip class when flip prop is set', () => {
        const el = renderToDiv(
            <Swap flip>
                <Swap.On>ON</Swap.On>
                <Swap.Off>OFF</Swap.Off>
            </Swap>
        );
        const swap = el.querySelector('.swap')!;
        expect(swap.classList.contains('swap-flip')).toBe(true);
    });

    it('applies swap-active class when active prop is set', () => {
        const el = renderToDiv(
            <Swap active>
                <Swap.On>ON</Swap.On>
                <Swap.Off>OFF</Swap.Off>
            </Swap>
        );
        const swap = el.querySelector('.swap')!;
        expect(swap.classList.contains('swap-active')).toBe(true);
    });

    it('does not apply swap-active when active is not set', () => {
        const el = renderToDiv(
            <Swap>
                <Swap.On>ON</Swap.On>
                <Swap.Off>OFF</Swap.Off>
            </Swap>
        );
        const swap = el.querySelector('.swap')!;
        expect(swap.classList.contains('swap-active')).toBe(false);
    });

    it('applies custom class', () => {
        const el = renderToDiv(
            <Swap class="btn btn-circle">
                <Swap.On>ON</Swap.On>
                <Swap.Off>OFF</Swap.Off>
            </Swap>
        );
        const swap = el.querySelector('.swap')!;
        expect(swap.classList.contains('btn')).toBe(true);
        expect(swap.classList.contains('btn-circle')).toBe(true);
    });

    it('combines rotate and custom classes', () => {
        const el = renderToDiv(
            <Swap rotate class="text-6xl">
                <Swap.On>ON</Swap.On>
                <Swap.Off>OFF</Swap.Off>
            </Swap>
        );
        const swap = el.querySelector('.swap')!;
        expect(swap.classList.contains('swap')).toBe(true);
        expect(swap.classList.contains('swap-rotate')).toBe(true);
        expect(swap.classList.contains('text-6xl')).toBe(true);
    });
});

describe('Swap.On', () => {
    it('renders with swap-on class', () => {
        const el = renderToDiv(
            <Swap>
                <Swap.On>Visible when on</Swap.On>
                <Swap.Off>Visible when off</Swap.Off>
            </Swap>
        );
        const on = el.querySelector('.swap-on')!;
        expect(on).toBeTruthy();
    });

    it('renders children', () => {
        const el = renderToDiv(
            <Swap>
                <Swap.On>Hello On</Swap.On>
                <Swap.Off>Hello Off</Swap.Off>
            </Swap>
        );
        const on = el.querySelector('.swap-on')!;
        expect(on.textContent).toBe('Hello On');
    });

    it('applies custom class', () => {
        const el = renderToDiv(
            <Swap>
                <Swap.On class="fill-current">ON</Swap.On>
                <Swap.Off>OFF</Swap.Off>
            </Swap>
        );
        const on = el.querySelector('.swap-on')!;
        expect(on.classList.contains('fill-current')).toBe(true);
    });
});

describe('Swap.Off', () => {
    it('renders with swap-off class', () => {
        const el = renderToDiv(
            <Swap>
                <Swap.On>ON</Swap.On>
                <Swap.Off>Visible when off</Swap.Off>
            </Swap>
        );
        const off = el.querySelector('.swap-off')!;
        expect(off).toBeTruthy();
    });

    it('renders children', () => {
        const el = renderToDiv(
            <Swap>
                <Swap.On>ON</Swap.On>
                <Swap.Off>Hello Off</Swap.Off>
            </Swap>
        );
        const off = el.querySelector('.swap-off')!;
        expect(off.textContent).toBe('Hello Off');
    });

    it('applies custom class', () => {
        const el = renderToDiv(
            <Swap>
                <Swap.On>ON</Swap.On>
                <Swap.Off class="fill-current">OFF</Swap.Off>
            </Swap>
        );
        const off = el.querySelector('.swap-off')!;
        expect(off.classList.contains('fill-current')).toBe(true);
    });
});

describe('Swap.Indeterminate', () => {
    it('renders with swap-indeterminate class', () => {
        const el = renderToDiv(
            <Swap>
                <Swap.On>ON</Swap.On>
                <Swap.Off>OFF</Swap.Off>
                <Swap.Indeterminate>???</Swap.Indeterminate>
            </Swap>
        );
        const indet = el.querySelector('.swap-indeterminate')!;
        expect(indet).toBeTruthy();
    });

    it('renders children', () => {
        const el = renderToDiv(
            <Swap>
                <Swap.On>ON</Swap.On>
                <Swap.Off>OFF</Swap.Off>
                <Swap.Indeterminate>Loading</Swap.Indeterminate>
            </Swap>
        );
        const indet = el.querySelector('.swap-indeterminate')!;
        expect(indet.textContent).toBe('Loading');
    });

    it('applies custom class', () => {
        const el = renderToDiv(
            <Swap>
                <Swap.On>ON</Swap.On>
                <Swap.Off>OFF</Swap.Off>
                <Swap.Indeterminate class="opacity-50">???</Swap.Indeterminate>
            </Swap>
        );
        const indet = el.querySelector('.swap-indeterminate')!;
        expect(indet.classList.contains('opacity-50')).toBe(true);
    });
});

describe('Swap composition', () => {
    it('renders all sub-components inside label', () => {
        const el = renderToDiv(
            <Swap>
                <Swap.On>ON</Swap.On>
                <Swap.Off>OFF</Swap.Off>
                <Swap.Indeterminate>???</Swap.Indeterminate>
            </Swap>
        );
        const swap = el.querySelector('.swap')!;
        expect(swap.querySelector('.swap-on')).toBeTruthy();
        expect(swap.querySelector('.swap-off')).toBeTruthy();
        expect(swap.querySelector('.swap-indeterminate')).toBeTruthy();
        expect(swap.querySelector('input[type="checkbox"]')).toBeTruthy();
    });

    it('works with rotate + flip combined', () => {
        const el = renderToDiv(
            <Swap rotate flip>
                <Swap.On>ON</Swap.On>
                <Swap.Off>OFF</Swap.Off>
            </Swap>
        );
        const swap = el.querySelector('.swap')!;
        expect(swap.classList.contains('swap-rotate')).toBe(true);
        expect(swap.classList.contains('swap-flip')).toBe(true);
    });

    it('works as hamburger button with btn classes', () => {
        const el = renderToDiv(
            <Swap rotate class="btn btn-circle">
                <Swap.On>✕</Swap.On>
                <Swap.Off>☰</Swap.Off>
            </Swap>
        );
        const swap = el.querySelector('.swap')!;
        expect(swap.classList.contains('swap')).toBe(true);
        expect(swap.classList.contains('swap-rotate')).toBe(true);
        expect(swap.classList.contains('btn')).toBe(true);
        expect(swap.classList.contains('btn-circle')).toBe(true);
    });
});
