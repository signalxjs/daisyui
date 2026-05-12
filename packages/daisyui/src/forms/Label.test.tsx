import { describe, it, expect } from 'vitest';
import { render } from 'sigx';
import { Label } from './Label';

function renderToDiv(jsx: any): HTMLElement {
    const container = document.createElement('div');
    render(jsx, container);
    return container;
}

describe('Label', () => {
    it('renders a p element with label class', () => {
        const el = renderToDiv(<Label>Description</Label>);
        const p = el.querySelector('p')!;
        expect(p).toBeTruthy();
        expect(p.classList.contains('label')).toBe(true);
    });

    it('renders children text', () => {
        const el = renderToDiv(<Label>You can edit this later</Label>);
        expect(el.querySelector('.label')!.textContent).toBe('You can edit this later');
    });

    it('applies custom class', () => {
        const el = renderToDiv(<Label class="text-error">Error hint</Label>);
        const p = el.querySelector('p')!;
        expect(p.classList.contains('label')).toBe(true);
        expect(p.classList.contains('text-error')).toBe(true);
    });

    it('renders without custom class cleanly', () => {
        const el = renderToDiv(<Label>Clean</Label>);
        expect(el.querySelector('p')!.className).toBe('label');
    });
});
