import { describe, it, expect } from 'vitest';
import { render } from 'sigx';
import { Fieldset } from './Fieldset';

function renderToDiv(jsx: any): HTMLElement {
    const container = document.createElement('div');
    render(jsx, container);
    return container;
}

describe('Fieldset', () => {
    it('renders a fieldset element with fieldset class', () => {
        const el = renderToDiv(<Fieldset>content</Fieldset>);
        const fieldset = el.querySelector('fieldset')!;
        expect(fieldset).toBeTruthy();
        expect(fieldset.classList.contains('fieldset')).toBe(true);
    });

    it('renders children', () => {
        const el = renderToDiv(<Fieldset>Hello world</Fieldset>);
        expect(el.querySelector('fieldset')!.textContent).toContain('Hello world');
    });

    it('applies custom class', () => {
        const el = renderToDiv(<Fieldset class="bg-base-200 border p-4">content</Fieldset>);
        const fieldset = el.querySelector('fieldset')!;
        expect(fieldset.classList.contains('fieldset')).toBe(true);
        expect(fieldset.classList.contains('bg-base-200')).toBe(true);
        expect(fieldset.classList.contains('border')).toBe(true);
        expect(fieldset.classList.contains('p-4')).toBe(true);
    });
});

describe('Fieldset.Legend', () => {
    it('renders a legend element with fieldset-legend class', () => {
        const el = renderToDiv(
            <Fieldset>
                <Fieldset.Legend>Title</Fieldset.Legend>
            </Fieldset>
        );
        const legend = el.querySelector('legend')!;
        expect(legend).toBeTruthy();
        expect(legend.classList.contains('fieldset-legend')).toBe(true);
        expect(legend.textContent).toBe('Title');
    });

    it('applies custom class to legend', () => {
        const el = renderToDiv(
            <Fieldset>
                <Fieldset.Legend class="text-lg">Title</Fieldset.Legend>
            </Fieldset>
        );
        const legend = el.querySelector('legend')!;
        expect(legend.classList.contains('fieldset-legend')).toBe(true);
        expect(legend.classList.contains('text-lg')).toBe(true);
    });

    it('renders children inside legend', () => {
        const el = renderToDiv(
            <Fieldset>
                <Fieldset.Legend>Page details</Fieldset.Legend>
            </Fieldset>
        );
        expect(el.querySelector('legend')!.textContent).toBe('Page details');
    });
});

describe('Fieldset composition', () => {
    it('renders fieldset with legend and content', () => {
        const el = renderToDiv(
            <Fieldset class="bg-base-200 border-base-300 rounded-box border p-4">
                <Fieldset.Legend>Settings</Fieldset.Legend>
            </Fieldset>
        );
        const fieldset = el.querySelector('fieldset')!;
        expect(fieldset.classList.contains('fieldset')).toBe(true);
        expect(fieldset.classList.contains('bg-base-200')).toBe(true);
        expect(fieldset.querySelector('legend')!.textContent).toBe('Settings');
    });
});
