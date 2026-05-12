import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@sigx/runtime-dom';
import { jsx } from '@sigx/runtime-core';
import { ButtonGroup } from '../src/buttons/ButtonGroup';
import { Button } from '../src/buttons/Button';

describe('ButtonGroup', () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    const get = () => container.querySelector('div')!;

    it('renders with base `join` class', () => {
        render(jsx(ButtonGroup, { children: jsx(Button, { children: 'A' }) }), container);
        expect(get().classList.contains('join')).toBe(true);
    });

    it('vertical prop emits join-vertical', () => {
        render(jsx(ButtonGroup, { vertical: true, children: jsx(Button, { children: 'A' }) }), container);
        expect(get().classList.contains('join-vertical')).toBe(true);
    });

    it('horizontal prop emits join-horizontal', () => {
        render(jsx(ButtonGroup, { horizontal: true, children: jsx(Button, { children: 'A' }) }), container);
        expect(get().classList.contains('join-horizontal')).toBe(true);
    });

    it('passes custom class', () => {
        render(jsx(ButtonGroup, { class: 'my-group', children: jsx(Button, { children: 'A' }) }), container);
        expect(get().classList.contains('my-group')).toBe(true);
    });

    it('renders children', () => {
        render(
            jsx(ButtonGroup, {
                children: [
                    jsx(Button, { children: 'Left' }),
                    jsx(Button, { children: 'Right' }),
                ],
            }),
            container,
        );
        const buttons = container.querySelectorAll('button');
        expect(buttons.length).toBe(2);
    });
});
