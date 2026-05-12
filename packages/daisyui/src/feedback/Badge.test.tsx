import { describe, it, expect } from 'vitest';
import { render } from 'sigx';
import { Badge } from './Badge';

function renderToDiv(jsx: any): HTMLElement {
    const container = document.createElement('div');
    render(jsx, container);
    return container;
}

describe('Badge', () => {
    it('renders with base badge class', () => {
        const el = renderToDiv(<Badge>Test</Badge>);
        const badge = el.querySelector('.badge')!;
        expect(badge).toBeTruthy();
        expect(badge.tagName).toBe('SPAN');
    });

    it('renders children', () => {
        const el = renderToDiv(<Badge>Hello</Badge>);
        const badge = el.querySelector('.badge')!;
        expect(badge.textContent).toBe('Hello');
    });

    // Color variant tests
    it('applies badge-primary class', () => {
        const el = renderToDiv(<Badge variant="primary">P</Badge>);
        expect(el.querySelector('.badge')!.classList.contains('badge-primary')).toBe(true);
    });

    it('applies badge-secondary class', () => {
        const el = renderToDiv(<Badge variant="secondary">S</Badge>);
        expect(el.querySelector('.badge')!.classList.contains('badge-secondary')).toBe(true);
    });

    it('applies badge-accent class', () => {
        const el = renderToDiv(<Badge variant="accent">A</Badge>);
        expect(el.querySelector('.badge')!.classList.contains('badge-accent')).toBe(true);
    });

    it('applies badge-neutral class', () => {
        const el = renderToDiv(<Badge variant="neutral">N</Badge>);
        expect(el.querySelector('.badge')!.classList.contains('badge-neutral')).toBe(true);
    });

    it('applies badge-info class', () => {
        const el = renderToDiv(<Badge variant="info">I</Badge>);
        expect(el.querySelector('.badge')!.classList.contains('badge-info')).toBe(true);
    });

    it('applies badge-success class', () => {
        const el = renderToDiv(<Badge variant="success">S</Badge>);
        expect(el.querySelector('.badge')!.classList.contains('badge-success')).toBe(true);
    });

    it('applies badge-warning class', () => {
        const el = renderToDiv(<Badge variant="warning">W</Badge>);
        expect(el.querySelector('.badge')!.classList.contains('badge-warning')).toBe(true);
    });

    it('applies badge-error class', () => {
        const el = renderToDiv(<Badge variant="error">E</Badge>);
        expect(el.querySelector('.badge')!.classList.contains('badge-error')).toBe(true);
    });

    it('applies badge-ghost class for ghost variant', () => {
        const el = renderToDiv(<Badge variant="ghost">G</Badge>);
        expect(el.querySelector('.badge')!.classList.contains('badge-ghost')).toBe(true);
    });

    // Size tests
    it('applies badge-xs class', () => {
        const el = renderToDiv(<Badge size="xs">XS</Badge>);
        expect(el.querySelector('.badge')!.classList.contains('badge-xs')).toBe(true);
    });

    it('applies badge-sm class', () => {
        const el = renderToDiv(<Badge size="sm">SM</Badge>);
        expect(el.querySelector('.badge')!.classList.contains('badge-sm')).toBe(true);
    });

    it('applies badge-md class', () => {
        const el = renderToDiv(<Badge size="md">MD</Badge>);
        expect(el.querySelector('.badge')!.classList.contains('badge-md')).toBe(true);
    });

    it('applies badge-lg class', () => {
        const el = renderToDiv(<Badge size="lg">LG</Badge>);
        expect(el.querySelector('.badge')!.classList.contains('badge-lg')).toBe(true);
    });

    it('applies badge-xl class', () => {
        const el = renderToDiv(<Badge size="xl">XL</Badge>);
        expect(el.querySelector('.badge')!.classList.contains('badge-xl')).toBe(true);
    });

    // Style modifier tests
    it('applies badge-outline via badgeStyle prop', () => {
        const el = renderToDiv(<Badge badgeStyle="outline">O</Badge>);
        expect(el.querySelector('.badge')!.classList.contains('badge-outline')).toBe(true);
    });

    it('applies badge-soft class', () => {
        const el = renderToDiv(<Badge badgeStyle="soft">S</Badge>);
        expect(el.querySelector('.badge')!.classList.contains('badge-soft')).toBe(true);
    });

    it('applies badge-dash class', () => {
        const el = renderToDiv(<Badge badgeStyle="dash">D</Badge>);
        expect(el.querySelector('.badge')!.classList.contains('badge-dash')).toBe(true);
    });

    it('applies badge-ghost via badgeStyle prop', () => {
        const el = renderToDiv(<Badge badgeStyle="ghost">G</Badge>);
        expect(el.querySelector('.badge')!.classList.contains('badge-ghost')).toBe(true);
    });

    // Legacy outline boolean prop
    it('applies badge-outline via boolean outline prop', () => {
        const el = renderToDiv(<Badge outline>O</Badge>);
        expect(el.querySelector('.badge')!.classList.contains('badge-outline')).toBe(true);
    });

    it('badgeStyle takes precedence over outline boolean', () => {
        const el = renderToDiv(<Badge badgeStyle="soft" outline>S</Badge>);
        const badge = el.querySelector('.badge')!;
        expect(badge.classList.contains('badge-soft')).toBe(true);
        expect(badge.classList.contains('badge-outline')).toBe(false);
    });

    // Combined props
    it('combines variant, size, and style', () => {
        const el = renderToDiv(<Badge variant="primary" size="lg" badgeStyle="outline">Combined</Badge>);
        const badge = el.querySelector('.badge')!;
        expect(badge.classList.contains('badge-primary')).toBe(true);
        expect(badge.classList.contains('badge-lg')).toBe(true);
        expect(badge.classList.contains('badge-outline')).toBe(true);
    });

    // Custom class
    it('applies custom class', () => {
        const el = renderToDiv(<Badge class="custom-class">C</Badge>);
        expect(el.querySelector('.badge')!.classList.contains('custom-class')).toBe(true);
    });

    // Empty badge (dot indicator)
    it('renders empty badge without children', () => {
        const el = renderToDiv(<Badge size="xs" />);
        const badge = el.querySelector('.badge')!;
        expect(badge).toBeTruthy();
        expect(badge.classList.contains('badge-xs')).toBe(true);
    });
});
