import { describe, it, expect } from 'vitest';
import { render } from 'sigx';
import { Status } from './Status';

function renderToDiv(jsx: any): HTMLElement {
    const container = document.createElement('div');
    render(jsx, container);
    return container;
}

describe('Status', () => {
    it('renders with base status class', () => {
        const el = renderToDiv(<Status />);
        const status = el.querySelector('.status')!;
        expect(status).toBeTruthy();
        expect(status.tagName).toBe('DIV');
    });

    it('has aria-label attribute', () => {
        const el = renderToDiv(<Status />);
        const status = el.querySelector('.status')!;
        expect(status.getAttribute('aria-label')).toBe('status');
    });

    // Color tests
    it('applies status-primary class', () => {
        const el = renderToDiv(<Status color="primary" />);
        expect(el.querySelector('.status')!.classList.contains('status-primary')).toBe(true);
    });

    it('applies status-secondary class', () => {
        const el = renderToDiv(<Status color="secondary" />);
        expect(el.querySelector('.status')!.classList.contains('status-secondary')).toBe(true);
    });

    it('applies status-accent class', () => {
        const el = renderToDiv(<Status color="accent" />);
        expect(el.querySelector('.status')!.classList.contains('status-accent')).toBe(true);
    });

    it('applies status-neutral class', () => {
        const el = renderToDiv(<Status color="neutral" />);
        expect(el.querySelector('.status')!.classList.contains('status-neutral')).toBe(true);
    });

    it('applies status-info class', () => {
        const el = renderToDiv(<Status color="info" />);
        expect(el.querySelector('.status')!.classList.contains('status-info')).toBe(true);
    });

    it('applies status-success class', () => {
        const el = renderToDiv(<Status color="success" />);
        expect(el.querySelector('.status')!.classList.contains('status-success')).toBe(true);
    });

    it('applies status-warning class', () => {
        const el = renderToDiv(<Status color="warning" />);
        expect(el.querySelector('.status')!.classList.contains('status-warning')).toBe(true);
    });

    it('applies status-error class', () => {
        const el = renderToDiv(<Status color="error" />);
        expect(el.querySelector('.status')!.classList.contains('status-error')).toBe(true);
    });

    // Size tests
    it('applies status-xs class', () => {
        const el = renderToDiv(<Status size="xs" />);
        expect(el.querySelector('.status')!.classList.contains('status-xs')).toBe(true);
    });

    it('applies status-sm class', () => {
        const el = renderToDiv(<Status size="sm" />);
        expect(el.querySelector('.status')!.classList.contains('status-sm')).toBe(true);
    });

    it('applies status-md class', () => {
        const el = renderToDiv(<Status size="md" />);
        expect(el.querySelector('.status')!.classList.contains('status-md')).toBe(true);
    });

    it('applies status-lg class', () => {
        const el = renderToDiv(<Status size="lg" />);
        expect(el.querySelector('.status')!.classList.contains('status-lg')).toBe(true);
    });

    it('applies status-xl class', () => {
        const el = renderToDiv(<Status size="xl" />);
        expect(el.querySelector('.status')!.classList.contains('status-xl')).toBe(true);
    });

    // Combined props
    it('combines color and size', () => {
        const el = renderToDiv(<Status color="success" size="lg" />);
        const status = el.querySelector('.status')!;
        expect(status.classList.contains('status-success')).toBe(true);
        expect(status.classList.contains('status-lg')).toBe(true);
    });

    // Custom class
    it('applies custom class', () => {
        const el = renderToDiv(<Status class="animate-ping" />);
        expect(el.querySelector('.status')!.classList.contains('animate-ping')).toBe(true);
    });

    // No color or size (bare status)
    it('renders bare status without color or size', () => {
        const el = renderToDiv(<Status />);
        const status = el.querySelector('.status')!;
        expect(status.classList.length).toBe(1);
        expect(status.classList.contains('status')).toBe(true);
    });
});
