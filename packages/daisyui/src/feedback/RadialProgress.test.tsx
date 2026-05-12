import { describe, it, expect } from 'vitest';
import { render } from 'sigx';
import { RadialProgress } from './RadialProgress';

function getContainer(html: string): HTMLElement {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div;
}

function renderToString(vnode: any): string {
    const container = document.createElement('div');
    render(vnode, container);
    return container.innerHTML;
}

describe('RadialProgress', () => {
    it('renders with base class', () => {
        const html = renderToString(<RadialProgress value={50} />);
        const el = getContainer(html).firstElementChild!;
        expect(el.classList.contains('radial-progress')).toBe(true);
    });

    it('sets --value CSS custom property', () => {
        const html = renderToString(<RadialProgress value={75} />);
        const el = getContainer(html).firstElementChild as HTMLElement;
        expect(el.style.getPropertyValue('--value')).toBe('75');
    });

    it('defaults --value to 0 when no value provided', () => {
        const html = renderToString(<RadialProgress value={0} />);
        const el = getContainer(html).firstElementChild as HTMLElement;
        expect(el.style.getPropertyValue('--value')).toBe('0');
    });

    it('sets --size CSS custom property', () => {
        const html = renderToString(<RadialProgress value={50} size="12rem" />);
        const el = getContainer(html).firstElementChild as HTMLElement;
        expect(el.style.getPropertyValue('--size')).toBe('12rem');
    });

    it('sets --thickness CSS custom property', () => {
        const html = renderToString(<RadialProgress value={50} thickness="4px" />);
        const el = getContainer(html).firstElementChild as HTMLElement;
        expect(el.style.getPropertyValue('--thickness')).toBe('4px');
    });

    it('does not set --size when not provided', () => {
        const html = renderToString(<RadialProgress value={50} />);
        const el = getContainer(html).firstElementChild as HTMLElement;
        expect(el.style.getPropertyValue('--size')).toBe('');
    });

    it('does not set --thickness when not provided', () => {
        const html = renderToString(<RadialProgress value={50} />);
        const el = getContainer(html).firstElementChild as HTMLElement;
        expect(el.style.getPropertyValue('--thickness')).toBe('');
    });

    it('applies color class for primary', () => {
        const html = renderToString(<RadialProgress value={50} color="primary" />);
        const el = getContainer(html).firstElementChild!;
        expect(el.classList.contains('text-primary')).toBe(true);
    });

    it('applies color class for secondary', () => {
        const html = renderToString(<RadialProgress value={50} color="secondary" />);
        const el = getContainer(html).firstElementChild!;
        expect(el.classList.contains('text-secondary')).toBe(true);
    });

    it('applies color class for accent', () => {
        const html = renderToString(<RadialProgress value={50} color="accent" />);
        const el = getContainer(html).firstElementChild!;
        expect(el.classList.contains('text-accent')).toBe(true);
    });

    it('applies color class for neutral', () => {
        const html = renderToString(<RadialProgress value={50} color="neutral" />);
        const el = getContainer(html).firstElementChild!;
        expect(el.classList.contains('text-neutral')).toBe(true);
    });

    it('applies color class for info', () => {
        const html = renderToString(<RadialProgress value={50} color="info" />);
        const el = getContainer(html).firstElementChild!;
        expect(el.classList.contains('text-info')).toBe(true);
    });

    it('applies color class for success', () => {
        const html = renderToString(<RadialProgress value={50} color="success" />);
        const el = getContainer(html).firstElementChild!;
        expect(el.classList.contains('text-success')).toBe(true);
    });

    it('applies color class for warning', () => {
        const html = renderToString(<RadialProgress value={50} color="warning" />);
        const el = getContainer(html).firstElementChild!;
        expect(el.classList.contains('text-warning')).toBe(true);
    });

    it('applies color class for error', () => {
        const html = renderToString(<RadialProgress value={50} color="error" />);
        const el = getContainer(html).firstElementChild!;
        expect(el.classList.contains('text-error')).toBe(true);
    });

    it('has role="progressbar"', () => {
        const html = renderToString(<RadialProgress value={50} />);
        const el = getContainer(html).firstElementChild!;
        expect(el.getAttribute('role')).toBe('progressbar');
    });

    it('sets aria-valuenow', () => {
        const html = renderToString(<RadialProgress value={75} />);
        const el = getContainer(html).firstElementChild!;
        expect(el.getAttribute('aria-valuenow')).toBe('75');
    });

    it('sets aria-valuemin and aria-valuemax', () => {
        const html = renderToString(<RadialProgress value={50} />);
        const el = getContainer(html).firstElementChild!;
        expect(el.getAttribute('aria-valuemin')).toBe('0');
        expect(el.getAttribute('aria-valuemax')).toBe('100');
    });

    it('renders children content', () => {
        const html = renderToString(<RadialProgress value={70}>70%</RadialProgress>);
        const el = getContainer(html).firstElementChild!;
        expect(el.textContent).toBe('70%');
    });

    it('renders custom children when provided', () => {
        const html = renderToString(<RadialProgress value={100}>Done</RadialProgress>);
        const el = getContainer(html).firstElementChild!;
        expect(el.textContent).toBe('Done');
    });

    it('applies custom class', () => {
        const html = renderToString(<RadialProgress value={50} class="my-custom" />);
        const el = getContainer(html).firstElementChild!;
        expect(el.classList.contains('radial-progress')).toBe(true);
        expect(el.classList.contains('my-custom')).toBe(true);
    });

    it('combines size, thickness, and color', () => {
        const html = renderToString(
            <RadialProgress value={60} size="8rem" thickness="2px" color="success" />
        );
        const el = getContainer(html).firstElementChild as HTMLElement;
        expect(el.classList.contains('radial-progress')).toBe(true);
        expect(el.classList.contains('text-success')).toBe(true);
        expect(el.style.getPropertyValue('--value')).toBe('60');
        expect(el.style.getPropertyValue('--size')).toBe('8rem');
        expect(el.style.getPropertyValue('--thickness')).toBe('2px');
    });
});
