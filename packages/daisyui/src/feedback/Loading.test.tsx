import { describe, it, expect } from 'vitest';
import { render } from 'sigx';
import { Loading } from './Badge';

function renderToDiv(jsx: any): HTMLElement {
    const container = document.createElement('div');
    render(jsx, container);
    return container;
}

describe('Loading', () => {
    it('renders with base loading class', () => {
        const el = renderToDiv(<Loading />);
        const span = el.querySelector('.loading')!;
        expect(span).toBeTruthy();
        expect(span.tagName).toBe('SPAN');
    });

    it('defaults to spinner type and md size', () => {
        const el = renderToDiv(<Loading />);
        const span = el.querySelector('.loading')!;
        expect(span.classList.contains('loading-spinner')).toBe(true);
        expect(span.classList.contains('loading-md')).toBe(true);
    });

    // Type variants
    it('applies loading-spinner class for type="spinner"', () => {
        const el = renderToDiv(<Loading type="spinner" />);
        const span = el.querySelector('.loading')!;
        expect(span.classList.contains('loading-spinner')).toBe(true);
    });

    it('applies loading-dots class for type="dots"', () => {
        const el = renderToDiv(<Loading type="dots" />);
        const span = el.querySelector('.loading')!;
        expect(span.classList.contains('loading-dots')).toBe(true);
    });

    it('applies loading-ring class for type="ring"', () => {
        const el = renderToDiv(<Loading type="ring" />);
        const span = el.querySelector('.loading')!;
        expect(span.classList.contains('loading-ring')).toBe(true);
    });

    it('applies loading-ball class for type="ball"', () => {
        const el = renderToDiv(<Loading type="ball" />);
        const span = el.querySelector('.loading')!;
        expect(span.classList.contains('loading-ball')).toBe(true);
    });

    it('applies loading-bars class for type="bars"', () => {
        const el = renderToDiv(<Loading type="bars" />);
        const span = el.querySelector('.loading')!;
        expect(span.classList.contains('loading-bars')).toBe(true);
    });

    it('applies loading-infinity class for type="infinity"', () => {
        const el = renderToDiv(<Loading type="infinity" />);
        const span = el.querySelector('.loading')!;
        expect(span.classList.contains('loading-infinity')).toBe(true);
    });

    // Size variants
    it('applies loading-xs class for size="xs"', () => {
        const el = renderToDiv(<Loading size="xs" />);
        const span = el.querySelector('.loading')!;
        expect(span.classList.contains('loading-xs')).toBe(true);
    });

    it('applies loading-sm class for size="sm"', () => {
        const el = renderToDiv(<Loading size="sm" />);
        const span = el.querySelector('.loading')!;
        expect(span.classList.contains('loading-sm')).toBe(true);
    });

    it('applies loading-md class for size="md"', () => {
        const el = renderToDiv(<Loading size="md" />);
        const span = el.querySelector('.loading')!;
        expect(span.classList.contains('loading-md')).toBe(true);
    });

    it('applies loading-lg class for size="lg"', () => {
        const el = renderToDiv(<Loading size="lg" />);
        const span = el.querySelector('.loading')!;
        expect(span.classList.contains('loading-lg')).toBe(true);
    });

    it('applies loading-xl class for size="xl"', () => {
        const el = renderToDiv(<Loading size="xl" />);
        const span = el.querySelector('.loading')!;
        expect(span.classList.contains('loading-xl')).toBe(true);
    });

    // Color variants
    it('applies text-primary class for color="primary"', () => {
        const el = renderToDiv(<Loading color="primary" />);
        const span = el.querySelector('.loading')!;
        expect(span.classList.contains('text-primary')).toBe(true);
    });

    it('applies text-secondary class for color="secondary"', () => {
        const el = renderToDiv(<Loading color="secondary" />);
        const span = el.querySelector('.loading')!;
        expect(span.classList.contains('text-secondary')).toBe(true);
    });

    it('applies text-accent class for color="accent"', () => {
        const el = renderToDiv(<Loading color="accent" />);
        const span = el.querySelector('.loading')!;
        expect(span.classList.contains('text-accent')).toBe(true);
    });

    it('applies text-neutral class for color="neutral"', () => {
        const el = renderToDiv(<Loading color="neutral" />);
        const span = el.querySelector('.loading')!;
        expect(span.classList.contains('text-neutral')).toBe(true);
    });

    it('applies text-info class for color="info"', () => {
        const el = renderToDiv(<Loading color="info" />);
        const span = el.querySelector('.loading')!;
        expect(span.classList.contains('text-info')).toBe(true);
    });

    it('applies text-success class for color="success"', () => {
        const el = renderToDiv(<Loading color="success" />);
        const span = el.querySelector('.loading')!;
        expect(span.classList.contains('text-success')).toBe(true);
    });

    it('applies text-warning class for color="warning"', () => {
        const el = renderToDiv(<Loading color="warning" />);
        const span = el.querySelector('.loading')!;
        expect(span.classList.contains('text-warning')).toBe(true);
    });

    it('applies text-error class for color="error"', () => {
        const el = renderToDiv(<Loading color="error" />);
        const span = el.querySelector('.loading')!;
        expect(span.classList.contains('text-error')).toBe(true);
    });

    // No color by default
    it('does not apply a text color class when no color is specified', () => {
        const el = renderToDiv(<Loading />);
        const span = el.querySelector('.loading')!;
        expect(span.className).not.toMatch(/text-/);
    });

    // Custom class
    it('appends custom class', () => {
        const el = renderToDiv(<Loading class="my-custom" />);
        const span = el.querySelector('.loading')!;
        expect(span.classList.contains('my-custom')).toBe(true);
    });

    // Combined props
    it('combines type, size, color, and custom class', () => {
        const el = renderToDiv(<Loading type="dots" size="lg" color="error" class="extra" />);
        const span = el.querySelector('.loading')!;
        expect(span.classList.contains('loading')).toBe(true);
        expect(span.classList.contains('loading-dots')).toBe(true);
        expect(span.classList.contains('loading-lg')).toBe(true);
        expect(span.classList.contains('text-error')).toBe(true);
        expect(span.classList.contains('extra')).toBe(true);
    });
});
