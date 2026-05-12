import { describe, it, expect } from 'vitest';
import { render } from 'sigx';
import { Alert } from './Badge';

function renderToDiv(jsx: any): HTMLElement {
    const container = document.createElement('div');
    render(jsx, container);
    return container;
}

describe('Alert', () => {
    it('renders with base alert class', () => {
        const el = renderToDiv(<Alert>Hello</Alert>);
        const alert = el.querySelector('[role="alert"]')!;
        expect(alert).toBeTruthy();
        expect(alert.classList.contains('alert')).toBe(true);
    });

    it('renders children in a span', () => {
        const el = renderToDiv(<Alert>Test message</Alert>);
        const span = el.querySelector('[role="alert"] > span');
        expect(span?.textContent).toBe('Test message');
    });

    // Variant tests
    it('applies alert-info class', () => {
        const el = renderToDiv(<Alert variant="info">Info</Alert>);
        const alert = el.querySelector('[role="alert"]')!;
        expect(alert.classList.contains('alert-info')).toBe(true);
    });

    it('applies alert-success class', () => {
        const el = renderToDiv(<Alert variant="success">OK</Alert>);
        const alert = el.querySelector('[role="alert"]')!;
        expect(alert.classList.contains('alert-success')).toBe(true);
    });

    it('applies alert-warning class', () => {
        const el = renderToDiv(<Alert variant="warning">Warn</Alert>);
        const alert = el.querySelector('[role="alert"]')!;
        expect(alert.classList.contains('alert-warning')).toBe(true);
    });

    it('applies alert-error class', () => {
        const el = renderToDiv(<Alert variant="error">Err</Alert>);
        const alert = el.querySelector('[role="alert"]')!;
        expect(alert.classList.contains('alert-error')).toBe(true);
    });

    // Style modifier tests
    it('applies alert-outline class', () => {
        const el = renderToDiv(<Alert alertStyle="outline">Outline</Alert>);
        const alert = el.querySelector('[role="alert"]')!;
        expect(alert.classList.contains('alert-outline')).toBe(true);
    });

    it('applies alert-dash class', () => {
        const el = renderToDiv(<Alert alertStyle="dash">Dash</Alert>);
        const alert = el.querySelector('[role="alert"]')!;
        expect(alert.classList.contains('alert-dash')).toBe(true);
    });

    it('applies alert-soft class', () => {
        const el = renderToDiv(<Alert alertStyle="soft">Soft</Alert>);
        const alert = el.querySelector('[role="alert"]')!;
        expect(alert.classList.contains('alert-soft')).toBe(true);
    });

    // Layout modifier tests
    it('applies alert-vertical class', () => {
        const el = renderToDiv(<Alert layout="vertical">Vertical</Alert>);
        const alert = el.querySelector('[role="alert"]')!;
        expect(alert.classList.contains('alert-vertical')).toBe(true);
    });

    it('applies alert-horizontal class', () => {
        const el = renderToDiv(<Alert layout="horizontal">Horizontal</Alert>);
        const alert = el.querySelector('[role="alert"]')!;
        expect(alert.classList.contains('alert-horizontal')).toBe(true);
    });

    // Combined modifiers
    it('applies variant + style together', () => {
        const el = renderToDiv(<Alert variant="success" alertStyle="soft">Soft success</Alert>);
        const alert = el.querySelector('[role="alert"]')!;
        expect(alert.classList.contains('alert')).toBe(true);
        expect(alert.classList.contains('alert-success')).toBe(true);
        expect(alert.classList.contains('alert-soft')).toBe(true);
    });

    it('applies variant + style + layout together', () => {
        const el = renderToDiv(
            <Alert variant="error" alertStyle="outline" layout="horizontal">
                Full combo
            </Alert>
        );
        const alert = el.querySelector('[role="alert"]')!;
        expect(alert.classList.contains('alert')).toBe(true);
        expect(alert.classList.contains('alert-error')).toBe(true);
        expect(alert.classList.contains('alert-outline')).toBe(true);
        expect(alert.classList.contains('alert-horizontal')).toBe(true);
    });

    // Custom class
    it('applies custom class', () => {
        const el = renderToDiv(<Alert class="my-custom">Custom</Alert>);
        const alert = el.querySelector('[role="alert"]')!;
        expect(alert.classList.contains('alert')).toBe(true);
        expect(alert.classList.contains('my-custom')).toBe(true);
    });

    // Content rendering
    it('renders content when variant is set', () => {
        const el = renderToDiv(<Alert variant="info">Info message</Alert>);
        const alert = el.querySelector('[role="alert"]')!;
        expect(alert.textContent).toContain('Info message');
    });

    it('renders content without variant', () => {
        const el = renderToDiv(<Alert>No variant</Alert>);
        const alert = el.querySelector('[role="alert"]')!;
        expect(alert.textContent).toContain('No variant');
    });
});
