import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@sigx/runtime-dom';
import { jsx } from '@sigx/runtime-core';
import { Join } from '../src/layout/Join';

describe('Join', () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    const getJoin = () => container.querySelector('.join')!;
    const getItems = () => container.querySelectorAll('.join-item');

    it('renders with base `join` class', () => {
        render(jsx(Join, { children: 'content' }), container);
        expect(getJoin()).not.toBeNull();
    });

    it('vertical prop emits join-vertical', () => {
        render(jsx(Join, { vertical: true, children: 'content' }), container);
        expect(getJoin().classList.contains('join-vertical')).toBe(true);
    });

    it('horizontal prop emits join-horizontal', () => {
        render(jsx(Join, { horizontal: true, children: 'content' }), container);
        expect(getJoin().classList.contains('join-horizontal')).toBe(true);
    });

    it('passes custom class', () => {
        render(jsx(Join, { class: 'my-join', children: 'content' }), container);
        expect(getJoin().classList.contains('my-join')).toBe(true);
    });

    it('Join.Item renders with join-item class', () => {
        render(
            jsx(Join, {
                children: jsx(Join.Item, { children: 'Item 1' }),
            }),
            container,
        );
        expect(getItems().length).toBe(1);
        expect(getItems()[0].textContent).toBe('Item 1');
    });

    it('Join.Item passes custom class', () => {
        render(
            jsx(Join, {
                children: jsx(Join.Item, { class: 'custom', children: 'Item' }),
            }),
            container,
        );
        expect(getItems()[0].classList.contains('custom')).toBe(true);
    });

    it('renders multiple Join.Items', () => {
        render(
            jsx(Join, {
                children: [
                    jsx(Join.Item, { children: 'A' }),
                    jsx(Join.Item, { children: 'B' }),
                    jsx(Join.Item, { children: 'C' }),
                ],
            }),
            container,
        );
        expect(getItems().length).toBe(3);
    });
});
