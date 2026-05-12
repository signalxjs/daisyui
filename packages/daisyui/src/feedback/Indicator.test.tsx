import { describe, it, expect } from 'vitest';
import { render } from 'sigx';
import { Indicator } from './Indicator';

function renderToDiv(jsx: any): HTMLElement {
    const container = document.createElement('div');
    render(jsx, container);
    return container;
}

describe('Indicator', () => {
    it('renders with base indicator class', () => {
        const el = renderToDiv(
            <Indicator>
                <Indicator.Item>Badge</Indicator.Item>
                <span>Content</span>
            </Indicator>
        );
        const indicator = el.querySelector('.indicator')!;
        expect(indicator).toBeTruthy();
        expect(indicator.tagName).toBe('DIV');
    });

    it('renders Indicator.Item with indicator-item class', () => {
        const el = renderToDiv(
            <Indicator>
                <Indicator.Item>Badge</Indicator.Item>
                <span>Content</span>
            </Indicator>
        );
        const item = el.querySelector('.indicator-item')!;
        expect(item).toBeTruthy();
        expect(item.tagName).toBe('SPAN');
    });

    it('applies custom class to container', () => {
        const el = renderToDiv(
            <Indicator class="my-custom">
                <Indicator.Item>Badge</Indicator.Item>
                <span>Content</span>
            </Indicator>
        );
        const indicator = el.querySelector('.indicator')!;
        expect(indicator.classList.contains('my-custom')).toBe(true);
    });

    it('applies custom class to Indicator.Item', () => {
        const el = renderToDiv(
            <Indicator>
                <Indicator.Item class="badge badge-primary">1</Indicator.Item>
                <span>Content</span>
            </Indicator>
        );
        const item = el.querySelector('.indicator-item')!;
        expect(item.classList.contains('badge')).toBe(true);
        expect(item.classList.contains('badge-primary')).toBe(true);
    });

    // Vertical alignment tests
    it('applies indicator-top class for vertical="top"', () => {
        const el = renderToDiv(
            <Indicator>
                <Indicator.Item vertical="top">Badge</Indicator.Item>
                <span>Content</span>
            </Indicator>
        );
        const item = el.querySelector('.indicator-item')!;
        expect(item.classList.contains('indicator-top')).toBe(true);
    });

    it('applies indicator-middle class for vertical="middle"', () => {
        const el = renderToDiv(
            <Indicator>
                <Indicator.Item vertical="middle">Badge</Indicator.Item>
                <span>Content</span>
            </Indicator>
        );
        const item = el.querySelector('.indicator-item')!;
        expect(item.classList.contains('indicator-middle')).toBe(true);
    });

    it('applies indicator-bottom class for vertical="bottom"', () => {
        const el = renderToDiv(
            <Indicator>
                <Indicator.Item vertical="bottom">Badge</Indicator.Item>
                <span>Content</span>
            </Indicator>
        );
        const item = el.querySelector('.indicator-item')!;
        expect(item.classList.contains('indicator-bottom')).toBe(true);
    });

    // Horizontal alignment tests
    it('applies indicator-start class for horizontal="start"', () => {
        const el = renderToDiv(
            <Indicator>
                <Indicator.Item horizontal="start">Badge</Indicator.Item>
                <span>Content</span>
            </Indicator>
        );
        const item = el.querySelector('.indicator-item')!;
        expect(item.classList.contains('indicator-start')).toBe(true);
    });

    it('applies indicator-center class for horizontal="center"', () => {
        const el = renderToDiv(
            <Indicator>
                <Indicator.Item horizontal="center">Badge</Indicator.Item>
                <span>Content</span>
            </Indicator>
        );
        const item = el.querySelector('.indicator-item')!;
        expect(item.classList.contains('indicator-center')).toBe(true);
    });

    it('applies indicator-end class for horizontal="end"', () => {
        const el = renderToDiv(
            <Indicator>
                <Indicator.Item horizontal="end">Badge</Indicator.Item>
                <span>Content</span>
            </Indicator>
        );
        const item = el.querySelector('.indicator-item')!;
        expect(item.classList.contains('indicator-end')).toBe(true);
    });

    // Combined position tests
    it('applies both vertical and horizontal classes', () => {
        const el = renderToDiv(
            <Indicator>
                <Indicator.Item vertical="bottom" horizontal="start">Badge</Indicator.Item>
                <span>Content</span>
            </Indicator>
        );
        const item = el.querySelector('.indicator-item')!;
        expect(item.classList.contains('indicator-bottom')).toBe(true);
        expect(item.classList.contains('indicator-start')).toBe(true);
    });

    it('applies middle-center position', () => {
        const el = renderToDiv(
            <Indicator>
                <Indicator.Item vertical="middle" horizontal="center">Badge</Indicator.Item>
                <span>Content</span>
            </Indicator>
        );
        const item = el.querySelector('.indicator-item')!;
        expect(item.classList.contains('indicator-middle')).toBe(true);
        expect(item.classList.contains('indicator-center')).toBe(true);
    });

    // No position props = no position classes (default behavior)
    it('renders without position classes when no position props given', () => {
        const el = renderToDiv(
            <Indicator>
                <Indicator.Item>Badge</Indicator.Item>
                <span>Content</span>
            </Indicator>
        );
        const item = el.querySelector('.indicator-item')!;
        expect(item.classList.contains('indicator-top')).toBe(false);
        expect(item.classList.contains('indicator-bottom')).toBe(false);
        expect(item.classList.contains('indicator-middle')).toBe(false);
        expect(item.classList.contains('indicator-start')).toBe(false);
        expect(item.classList.contains('indicator-center')).toBe(false);
        expect(item.classList.contains('indicator-end')).toBe(false);
    });

    // Multiple indicators
    it('supports multiple Indicator.Item children', () => {
        const el = renderToDiv(
            <Indicator>
                <Indicator.Item vertical="top" horizontal="start">A</Indicator.Item>
                <Indicator.Item vertical="top" horizontal="end">B</Indicator.Item>
                <span>Content</span>
            </Indicator>
        );
        const items = el.querySelectorAll('.indicator-item');
        expect(items.length).toBe(2);
        expect(items[0].classList.contains('indicator-start')).toBe(true);
        expect(items[1].classList.contains('indicator-end')).toBe(true);
    });

    it('renders children content inside Indicator.Item', () => {
        const el = renderToDiv(
            <Indicator>
                <Indicator.Item>99+</Indicator.Item>
                <span>Inbox</span>
            </Indicator>
        );
        const item = el.querySelector('.indicator-item')!;
        expect(item.textContent).toBe('99+');
    });
});
