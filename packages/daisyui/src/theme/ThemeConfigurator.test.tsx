import { describe, it, expect } from 'vitest';
import { render } from 'sigx';
import { ThemeConfigurator } from './ThemeConfigurator';

function renderToDiv(jsx: any): HTMLElement {
    const container = document.createElement('div');
    render(jsx, container);
    return container;
}

// The built-in configurator UI renders a controls sidebar (w-72); the custom
// slot layout renders only the slot fill inside .theme-configurator. Core 0.15
// widened declared slot returns to JSXElement | JSXElement[] | null, so the
// custom-layout gate must recognize a single node — not just a non-empty
// array — while still falling through on genuinely empty fills.
describe('ThemeConfigurator default slot', () => {
    it('renders the built-in UI when no slot content is given', () => {
        const el = renderToDiv(<ThemeConfigurator />);
        expect(el.querySelector('.theme-configurator')).toBeTruthy();
        expect(el.querySelector('.w-72')).toBeTruthy();
    });

    it('renders the custom layout for a single-node default slot (core 0.15 non-array return)', () => {
        const el = renderToDiv(
            <ThemeConfigurator>
                <div class="custom-slot-content">hello</div>
            </ThemeConfigurator>
        );
        expect(el.querySelector('.custom-slot-content')).toBeTruthy();
        expect(el.querySelector('.w-72')).toBeNull();
    });

    it('renders the custom layout for an array default slot', () => {
        const el = renderToDiv(
            <ThemeConfigurator>
                <span class="first">a</span>
                <span class="second">b</span>
            </ThemeConfigurator>
        );
        expect(el.querySelector('.first')).toBeTruthy();
        expect(el.querySelector('.second')).toBeTruthy();
        expect(el.querySelector('.w-72')).toBeNull();
    });

    it('falls through to the built-in UI for an empty-array default slot', () => {
        const el = renderToDiv(<ThemeConfigurator>{[]}</ThemeConfigurator>);
        expect(el.querySelector('.w-72')).toBeTruthy();
    });

    it('treats numeric 0 as slot content, not as empty', () => {
        const el = renderToDiv(<ThemeConfigurator>{0}</ThemeConfigurator>);
        const root = el.querySelector('.theme-configurator')!;
        expect(root).toBeTruthy();
        expect(el.querySelector('.w-72')).toBeNull();
        expect(root.textContent).toContain('0');
    });
});
