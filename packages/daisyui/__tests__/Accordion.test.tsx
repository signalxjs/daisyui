import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@sigx/runtime-dom';
import { jsx } from '@sigx/runtime-core';
import { Accordion } from '../src/feedback/Accordion';

describe('Accordion', () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    // ── Accordion (items array, radio mode) ──

    describe('Accordion (items array)', () => {
        const items = [
            { id: '1', title: 'Title 1', content: 'Content 1' },
            { id: '2', title: 'Title 2', content: 'Content 2' },
        ];

        it('renders collapse items with base classes', () => {
            render(jsx(Accordion, { items }), container);
            const collapses = container.querySelectorAll('.collapse');
            expect(collapses.length).toBe(2);
            collapses.forEach(el => {
                expect(el.querySelector('.collapse-title')).not.toBeNull();
                expect(el.querySelector('.collapse-content')).not.toBeNull();
            });
        });

        it('renders radio inputs by default', () => {
            render(jsx(Accordion, { items }), container);
            const radios = container.querySelectorAll('input[type="radio"]');
            expect(radios.length).toBe(2);
        });

        it('variant="arrow" adds collapse-arrow', () => {
            render(jsx(Accordion, { items, variant: 'arrow' }), container);
            container.querySelectorAll('.collapse').forEach(el => {
                expect(el.classList.contains('collapse-arrow')).toBe(true);
            });
        });

        it('variant="plus" adds collapse-plus', () => {
            render(jsx(Accordion, { items, variant: 'plus' }), container);
            container.querySelectorAll('.collapse').forEach(el => {
                expect(el.classList.contains('collapse-plus')).toBe(true);
            });
        });

        it('join prop wraps items in join container', () => {
            render(jsx(Accordion, { items, join: true }), container);
            const wrapper = container.querySelector('.join');
            expect(wrapper).not.toBeNull();
            expect(wrapper!.classList.contains('join-vertical')).toBe(true);
            container.querySelectorAll('.collapse').forEach(el => {
                expect(el.classList.contains('join-item')).toBe(true);
            });
        });

        it('type="details" renders <details> elements', () => {
            render(jsx(Accordion, { items, type: 'details' }), container);
            const details = container.querySelectorAll('details');
            expect(details.length).toBe(2);
            details.forEach(el => {
                expect(el.classList.contains('collapse')).toBe(true);
                expect(el.querySelector('summary.collapse-title')).not.toBeNull();
            });
        });

        it('renders item titles', () => {
            render(jsx(Accordion, { items }), container);
            const titles = container.querySelectorAll('.collapse-title');
            expect(titles[0].textContent).toContain('Title 1');
            expect(titles[1].textContent).toContain('Title 2');
        });

        it('renders item content', () => {
            render(jsx(Accordion, { items }), container);
            const contents = container.querySelectorAll('.collapse-content');
            expect(contents[0].textContent).toContain('Content 1');
            expect(contents[1].textContent).toContain('Content 2');
        });
    });

    // ── Accordion.Item ──

    describe('Accordion.Item', () => {
        it('renders with base collapse class', () => {
            render(jsx(Accordion.Item, { title: 'Test', children: 'Content' }), container);
            const el = container.querySelector('.collapse');
            expect(el).not.toBeNull();
        });

        it('renders title in collapse-title', () => {
            render(jsx(Accordion.Item, { title: 'My Title', children: 'c' }), container);
            const title = container.querySelector('.collapse-title');
            expect(title!.textContent).toContain('My Title');
        });

        it('renders children in collapse-content', () => {
            render(jsx(Accordion.Item, { title: 't', children: 'My Content' }), container);
            const content = container.querySelector('.collapse-content');
            expect(content!.textContent).toContain('My Content');
        });

        it('variant="arrow" adds collapse-arrow', () => {
            render(jsx(Accordion.Item, { title: 't', variant: 'arrow', children: 'c' }), container);
            expect(container.querySelector('.collapse')!.classList.contains('collapse-arrow')).toBe(true);
        });

        it('variant="plus" adds collapse-plus', () => {
            render(jsx(Accordion.Item, { title: 't', variant: 'plus', children: 'c' }), container);
            expect(container.querySelector('.collapse')!.classList.contains('collapse-plus')).toBe(true);
        });

        it('forceOpen adds collapse-open', () => {
            render(jsx(Accordion.Item, { title: 't', forceOpen: true, children: 'c' }), container);
            expect(container.querySelector('.collapse')!.classList.contains('collapse-open')).toBe(true);
        });

        it('forceClose adds collapse-close', () => {
            render(jsx(Accordion.Item, { title: 't', forceClose: true, children: 'c' }), container);
            expect(container.querySelector('.collapse')!.classList.contains('collapse-close')).toBe(true);
        });

        it('uses radio input by default', () => {
            render(jsx(Accordion.Item, { title: 't', children: 'c' }), container);
            expect(container.querySelector('input[type="radio"]')).not.toBeNull();
        });

        it('type="details" renders <details> element', () => {
            render(jsx(Accordion.Item, { title: 't', type: 'details', children: 'c' }), container);
            const details = container.querySelector('details');
            expect(details).not.toBeNull();
            expect(details!.classList.contains('collapse')).toBe(true);
        });

        it('custom class is applied', () => {
            render(jsx(Accordion.Item, { title: 't', class: 'my-custom', children: 'c' }), container);
            expect(container.querySelector('.collapse')!.classList.contains('my-custom')).toBe(true);
        });
    });

    // ── Accordion.Collapse (checkbox-based single collapse) ──

    describe('Accordion.Collapse', () => {
        it('renders with base collapse class', () => {
            render(jsx(Accordion.Collapse, { title: 'Test', children: 'Content' }), container);
            const el = container.querySelector('.collapse');
            expect(el).not.toBeNull();
        });

        it('uses checkbox input', () => {
            render(jsx(Accordion.Collapse, { title: 'Test', children: 'c' }), container);
            expect(container.querySelector('input[type="checkbox"]')).not.toBeNull();
        });

        it('renders title in collapse-title', () => {
            render(jsx(Accordion.Collapse, { title: 'My Title', children: 'c' }), container);
            const title = container.querySelector('.collapse-title');
            expect(title!.textContent).toContain('My Title');
        });

        it('renders children in collapse-content', () => {
            render(jsx(Accordion.Collapse, { title: 't', children: 'Body' }), container);
            const content = container.querySelector('.collapse-content');
            expect(content!.textContent).toContain('Body');
        });

        it('variant="arrow" adds collapse-arrow', () => {
            render(jsx(Accordion.Collapse, { title: 't', variant: 'arrow', children: 'c' }), container);
            expect(container.querySelector('.collapse')!.classList.contains('collapse-arrow')).toBe(true);
        });

        it('variant="plus" adds collapse-plus', () => {
            render(jsx(Accordion.Collapse, { title: 't', variant: 'plus', children: 'c' }), container);
            expect(container.querySelector('.collapse')!.classList.contains('collapse-plus')).toBe(true);
        });

        it('forceOpen adds collapse-open', () => {
            render(jsx(Accordion.Collapse, { title: 't', forceOpen: true, children: 'c' }), container);
            expect(container.querySelector('.collapse')!.classList.contains('collapse-open')).toBe(true);
        });

        it('forceClose adds collapse-close', () => {
            render(jsx(Accordion.Collapse, { title: 't', forceClose: true, children: 'c' }), container);
            expect(container.querySelector('.collapse')!.classList.contains('collapse-close')).toBe(true);
        });

        it('custom class is applied', () => {
            render(jsx(Accordion.Collapse, { title: 't', class: 'extra', children: 'c' }), container);
            expect(container.querySelector('.collapse')!.classList.contains('extra')).toBe(true);
        });
    });
});
