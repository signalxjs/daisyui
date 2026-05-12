import { describe, it, expect } from 'vitest';
import { render } from 'sigx';
import { Tooltip } from './Badge';

function renderToDiv(jsx: any): HTMLElement {
    const container = document.createElement('div');
    render(jsx, container);
    return container;
}

describe('Tooltip', () => {
    it('renders with base tooltip class', () => {
        const el = renderToDiv(<Tooltip tip="hello">trigger</Tooltip>);
        const tooltip = el.querySelector('.tooltip')!;
        expect(tooltip).toBeTruthy();
        expect(tooltip.tagName).toBe('DIV');
    });

    it('sets data-tip attribute', () => {
        const el = renderToDiv(<Tooltip tip="hello">trigger</Tooltip>);
        expect(el.querySelector('.tooltip')!.getAttribute('data-tip')).toBe('hello');
    });

    it('renders children in default slot', () => {
        const el = renderToDiv(<Tooltip tip="hello">trigger text</Tooltip>);
        expect(el.querySelector('.tooltip')!.textContent).toContain('trigger text');
    });

    // Position tests
    it('applies tooltip-top class', () => {
        const el = renderToDiv(<Tooltip tip="t" position="top">x</Tooltip>);
        expect(el.querySelector('.tooltip')!.classList.contains('tooltip-top')).toBe(true);
    });

    it('applies tooltip-bottom class', () => {
        const el = renderToDiv(<Tooltip tip="t" position="bottom">x</Tooltip>);
        expect(el.querySelector('.tooltip')!.classList.contains('tooltip-bottom')).toBe(true);
    });

    it('applies tooltip-left class', () => {
        const el = renderToDiv(<Tooltip tip="t" position="left">x</Tooltip>);
        expect(el.querySelector('.tooltip')!.classList.contains('tooltip-left')).toBe(true);
    });

    it('applies tooltip-right class', () => {
        const el = renderToDiv(<Tooltip tip="t" position="right">x</Tooltip>);
        expect(el.querySelector('.tooltip')!.classList.contains('tooltip-right')).toBe(true);
    });

    // Color tests
    it('applies tooltip-neutral class', () => {
        const el = renderToDiv(<Tooltip tip="t" color="neutral">x</Tooltip>);
        expect(el.querySelector('.tooltip')!.classList.contains('tooltip-neutral')).toBe(true);
    });

    it('applies tooltip-primary class', () => {
        const el = renderToDiv(<Tooltip tip="t" color="primary">x</Tooltip>);
        expect(el.querySelector('.tooltip')!.classList.contains('tooltip-primary')).toBe(true);
    });

    it('applies tooltip-secondary class', () => {
        const el = renderToDiv(<Tooltip tip="t" color="secondary">x</Tooltip>);
        expect(el.querySelector('.tooltip')!.classList.contains('tooltip-secondary')).toBe(true);
    });

    it('applies tooltip-accent class', () => {
        const el = renderToDiv(<Tooltip tip="t" color="accent">x</Tooltip>);
        expect(el.querySelector('.tooltip')!.classList.contains('tooltip-accent')).toBe(true);
    });

    it('applies tooltip-info class', () => {
        const el = renderToDiv(<Tooltip tip="t" color="info">x</Tooltip>);
        expect(el.querySelector('.tooltip')!.classList.contains('tooltip-info')).toBe(true);
    });

    it('applies tooltip-success class', () => {
        const el = renderToDiv(<Tooltip tip="t" color="success">x</Tooltip>);
        expect(el.querySelector('.tooltip')!.classList.contains('tooltip-success')).toBe(true);
    });

    it('applies tooltip-warning class', () => {
        const el = renderToDiv(<Tooltip tip="t" color="warning">x</Tooltip>);
        expect(el.querySelector('.tooltip')!.classList.contains('tooltip-warning')).toBe(true);
    });

    it('applies tooltip-error class', () => {
        const el = renderToDiv(<Tooltip tip="t" color="error">x</Tooltip>);
        expect(el.querySelector('.tooltip')!.classList.contains('tooltip-error')).toBe(true);
    });

    // Open state
    it('applies tooltip-open class when open', () => {
        const el = renderToDiv(<Tooltip tip="t" open>x</Tooltip>);
        expect(el.querySelector('.tooltip')!.classList.contains('tooltip-open')).toBe(true);
    });

    it('does not apply tooltip-open when not set', () => {
        const el = renderToDiv(<Tooltip tip="t">x</Tooltip>);
        expect(el.querySelector('.tooltip')!.classList.contains('tooltip-open')).toBe(false);
    });

    // Custom class
    it('applies custom class', () => {
        const el = renderToDiv(<Tooltip tip="t" class="my-custom">x</Tooltip>);
        expect(el.querySelector('.tooltip')!.classList.contains('my-custom')).toBe(true);
    });

    // Combined props
    it('combines position, color, and open', () => {
        const el = renderToDiv(<Tooltip tip="t" position="bottom" color="primary" open>x</Tooltip>);
        const tooltip = el.querySelector('.tooltip')!;
        expect(tooltip.classList.contains('tooltip-bottom')).toBe(true);
        expect(tooltip.classList.contains('tooltip-primary')).toBe(true);
        expect(tooltip.classList.contains('tooltip-open')).toBe(true);
    });

    // Tooltip.Content sub-component
    it('renders Tooltip.Content with tooltip-content class', () => {
        const el = renderToDiv(
            <Tooltip tip="t">
                <span>trigger</span>
                <Tooltip.Content>Custom content</Tooltip.Content>
            </Tooltip>
        );
        const content = el.querySelector('.tooltip-content')!;
        expect(content).toBeTruthy();
        expect(content.tagName).toBe('DIV');
        expect(content.textContent).toContain('Custom content');
    });

    it('Tooltip.Content applies custom class', () => {
        const el = renderToDiv(
            <Tooltip tip="t">
                <span>trigger</span>
                <Tooltip.Content class="extra">stuff</Tooltip.Content>
            </Tooltip>
        );
        const content = el.querySelector('.tooltip-content')!;
        expect(content.classList.contains('tooltip-content')).toBe(true);
        expect(content.classList.contains('extra')).toBe(true);
    });
});
