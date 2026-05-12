import { describe, it, expect } from 'vitest';
import { render } from 'sigx';
import { Diff } from './Diff';

function renderToDiv(jsx: any): HTMLElement {
    const container = document.createElement('div');
    render(jsx, container);
    return container;
}

describe('Diff', () => {
    it('renders with base diff class', () => {
        const el = renderToDiv(
            <Diff>
                <Diff.Item1>First</Diff.Item1>
                <Diff.Item2>Second</Diff.Item2>
                <Diff.Resizer />
            </Diff>
        );
        const diff = el.querySelector('.diff')!;
        expect(diff).toBeTruthy();
        expect(diff.tagName).toBe('FIGURE');
    });

    it('renders as figure with tabindex for keyboard accessibility', () => {
        const el = renderToDiv(
            <Diff>
                <Diff.Item1>A</Diff.Item1>
                <Diff.Item2>B</Diff.Item2>
                <Diff.Resizer />
            </Diff>
        );
        const diff = el.querySelector('.diff')!;
        expect(diff.getAttribute('tabindex')).toBe('0');
    });

    it('applies custom class to container', () => {
        const el = renderToDiv(
            <Diff class="aspect-[16/9]">
                <Diff.Item1>A</Diff.Item1>
                <Diff.Item2>B</Diff.Item2>
                <Diff.Resizer />
            </Diff>
        );
        const diff = el.querySelector('.diff')!;
        expect(diff.classList.contains('aspect-[16/9]')).toBe(true);
    });
});

describe('Diff.Item1', () => {
    it('renders with diff-item-1 class', () => {
        const el = renderToDiv(
            <Diff>
                <Diff.Item1>First content</Diff.Item1>
                <Diff.Item2>Second</Diff.Item2>
                <Diff.Resizer />
            </Diff>
        );
        const item1 = el.querySelector('.diff-item-1')!;
        expect(item1).toBeTruthy();
    });

    it('has role="img" attribute', () => {
        const el = renderToDiv(
            <Diff>
                <Diff.Item1>First</Diff.Item1>
                <Diff.Item2>Second</Diff.Item2>
                <Diff.Resizer />
            </Diff>
        );
        const item1 = el.querySelector('.diff-item-1')!;
        expect(item1.getAttribute('role')).toBe('img');
    });

    it('renders children', () => {
        const el = renderToDiv(
            <Diff>
                <Diff.Item1><span>Hello</span></Diff.Item1>
                <Diff.Item2>B</Diff.Item2>
                <Diff.Resizer />
            </Diff>
        );
        const item1 = el.querySelector('.diff-item-1')!;
        expect(item1.querySelector('span')!.textContent).toBe('Hello');
    });

    it('applies custom class', () => {
        const el = renderToDiv(
            <Diff>
                <Diff.Item1 class="custom-class">First</Diff.Item1>
                <Diff.Item2>Second</Diff.Item2>
                <Diff.Resizer />
            </Diff>
        );
        const item1 = el.querySelector('.diff-item-1')!;
        expect(item1.classList.contains('custom-class')).toBe(true);
    });
});

describe('Diff.Item2', () => {
    it('renders with diff-item-2 class', () => {
        const el = renderToDiv(
            <Diff>
                <Diff.Item1>First</Diff.Item1>
                <Diff.Item2>Second content</Diff.Item2>
                <Diff.Resizer />
            </Diff>
        );
        const item2 = el.querySelector('.diff-item-2')!;
        expect(item2).toBeTruthy();
    });

    it('has role="img" attribute', () => {
        const el = renderToDiv(
            <Diff>
                <Diff.Item1>First</Diff.Item1>
                <Diff.Item2>Second</Diff.Item2>
                <Diff.Resizer />
            </Diff>
        );
        const item2 = el.querySelector('.diff-item-2')!;
        expect(item2.getAttribute('role')).toBe('img');
    });

    it('renders children', () => {
        const el = renderToDiv(
            <Diff>
                <Diff.Item1>A</Diff.Item1>
                <Diff.Item2><span>World</span></Diff.Item2>
                <Diff.Resizer />
            </Diff>
        );
        const item2 = el.querySelector('.diff-item-2')!;
        expect(item2.querySelector('span')!.textContent).toBe('World');
    });

    it('applies custom class', () => {
        const el = renderToDiv(
            <Diff>
                <Diff.Item1>First</Diff.Item1>
                <Diff.Item2 class="my-class">Second</Diff.Item2>
                <Diff.Resizer />
            </Diff>
        );
        const item2 = el.querySelector('.diff-item-2')!;
        expect(item2.classList.contains('my-class')).toBe(true);
    });
});

describe('Diff.Resizer', () => {
    it('renders with diff-resizer class', () => {
        const el = renderToDiv(
            <Diff>
                <Diff.Item1>First</Diff.Item1>
                <Diff.Item2>Second</Diff.Item2>
                <Diff.Resizer />
            </Diff>
        );
        const resizer = el.querySelector('.diff-resizer')!;
        expect(resizer).toBeTruthy();
    });

    it('applies custom class', () => {
        const el = renderToDiv(
            <Diff>
                <Diff.Item1>First</Diff.Item1>
                <Diff.Item2>Second</Diff.Item2>
                <Diff.Resizer class="resizer-custom" />
            </Diff>
        );
        const resizer = el.querySelector('.diff-resizer')!;
        expect(resizer.classList.contains('resizer-custom')).toBe(true);
    });
});

describe('Diff composition', () => {
    it('renders all three sub-components inside figure', () => {
        const el = renderToDiv(
            <Diff>
                <Diff.Item1>Before</Diff.Item1>
                <Diff.Item2>After</Diff.Item2>
                <Diff.Resizer />
            </Diff>
        );
        const diff = el.querySelector('.diff')!;
        expect(diff.querySelector('.diff-item-1')).toBeTruthy();
        expect(diff.querySelector('.diff-item-2')).toBeTruthy();
        expect(diff.querySelector('.diff-resizer')).toBeTruthy();
    });

    it('works with aspect ratio utility class', () => {
        const el = renderToDiv(
            <Diff class="aspect-[16/9]">
                <Diff.Item1>A</Diff.Item1>
                <Diff.Item2>B</Diff.Item2>
                <Diff.Resizer />
            </Diff>
        );
        const diff = el.querySelector('.diff')!;
        expect(diff.classList.contains('diff')).toBe(true);
        expect(diff.classList.contains('aspect-[16/9]')).toBe(true);
    });

    it('works with aspect-4/3 utility class', () => {
        const el = renderToDiv(
            <Diff class="aspect-[4/3]">
                <Diff.Item1>A</Diff.Item1>
                <Diff.Item2>B</Diff.Item2>
                <Diff.Resizer />
            </Diff>
        );
        const diff = el.querySelector('.diff')!;
        expect(diff.classList.contains('aspect-[4/3]')).toBe(true);
    });
});
