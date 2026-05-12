import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@sigx/runtime-dom';
import { jsx } from '@sigx/runtime-core';
import { Table } from '../src/data/Table';

describe('Table', () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    const getTable = () => container.querySelector('table')!;
    const getWrapper = () => container.querySelector('.overflow-x-auto')!;

    it('renders with base `table` class', () => {
        render(jsx(Table, { children: 'content' }), container);
        expect(getTable().classList.contains('table')).toBe(true);
    });

    it('wraps table in overflow-x-auto div', () => {
        render(jsx(Table, { children: 'content' }), container);
        expect(getWrapper()).not.toBeNull();
    });

    // Modifier props
    it('zebra prop emits table-zebra', () => {
        render(jsx(Table, { zebra: true, children: 'content' }), container);
        expect(getTable().classList.contains('table-zebra')).toBe(true);
    });

    it('pinRows prop emits table-pin-rows', () => {
        render(jsx(Table, { pinRows: true, children: 'content' }), container);
        expect(getTable().classList.contains('table-pin-rows')).toBe(true);
    });

    it('pinCols prop emits table-pin-cols', () => {
        render(jsx(Table, { pinCols: true, children: 'content' }), container);
        expect(getTable().classList.contains('table-pin-cols')).toBe(true);
    });

    // Size variants
    it('size="xs" emits table-xs', () => {
        render(jsx(Table, { size: 'xs', children: 'content' }), container);
        expect(getTable().classList.contains('table-xs')).toBe(true);
    });

    it('size="sm" emits table-sm', () => {
        render(jsx(Table, { size: 'sm', children: 'content' }), container);
        expect(getTable().classList.contains('table-sm')).toBe(true);
    });

    it('size="md" does not emit a size class', () => {
        render(jsx(Table, { size: 'md', children: 'content' }), container);
        expect(getTable().className).toBe('table');
    });

    it('size="lg" emits table-lg', () => {
        render(jsx(Table, { size: 'lg', children: 'content' }), container);
        expect(getTable().classList.contains('table-lg')).toBe(true);
    });

    it('size="xl" emits table-xl', () => {
        render(jsx(Table, { size: 'xl', children: 'content' }), container);
        expect(getTable().classList.contains('table-xl')).toBe(true);
    });

    // Custom class
    it('passes custom class', () => {
        render(jsx(Table, { class: 'my-table', children: 'content' }), container);
        expect(getTable().classList.contains('my-table')).toBe(true);
    });

    // Multiple modifiers
    it('combines multiple modifiers', () => {
        render(jsx(Table, { zebra: true, pinRows: true, size: 'sm', children: 'content' }), container);
        const table = getTable();
        expect(table.classList.contains('table')).toBe(true);
        expect(table.classList.contains('table-zebra')).toBe(true);
        expect(table.classList.contains('table-pin-rows')).toBe(true);
        expect(table.classList.contains('table-sm')).toBe(true);
    });

    // Sub-components
    it('Table.Head renders a <thead>', () => {
        render(
            jsx(Table, {
                children: jsx(Table.Head, { children: 'header' }),
            }),
            container,
        );
        expect(container.querySelector('thead')).not.toBeNull();
    });

    it('Table.Body renders a <tbody>', () => {
        render(
            jsx(Table, {
                children: jsx(Table.Body, { children: 'body' }),
            }),
            container,
        );
        expect(container.querySelector('tbody')).not.toBeNull();
    });

    it('Table.Foot renders a <tfoot>', () => {
        render(
            jsx(Table, {
                children: jsx(Table.Foot, { children: 'footer' }),
            }),
            container,
        );
        expect(container.querySelector('tfoot')).not.toBeNull();
    });

    it('Table.Row renders a <tr>', () => {
        render(
            jsx(Table, {
                children: jsx(Table.Body, {
                    children: jsx(Table.Row, { children: 'row' }),
                }),
            }),
            container,
        );
        expect(container.querySelector('tr')).not.toBeNull();
    });

    it('Table.Row hover prop emits hover class', () => {
        render(
            jsx(Table, {
                children: jsx(Table.Body, {
                    children: jsx(Table.Row, { hover: true, children: 'row' }),
                }),
            }),
            container,
        );
        expect(container.querySelector('tr')!.classList.contains('hover')).toBe(true);
    });

    it('Table.Row active prop emits active class', () => {
        render(
            jsx(Table, {
                children: jsx(Table.Body, {
                    children: jsx(Table.Row, { active: true, children: 'row' }),
                }),
            }),
            container,
        );
        expect(container.querySelector('tr')!.classList.contains('active')).toBe(true);
    });

    it('Table.Th renders a <th>', () => {
        render(
            jsx(Table, {
                children: jsx(Table.Head, {
                    children: jsx(Table.Row, {
                        children: jsx(Table.Th, { children: 'Header' }),
                    }),
                }),
            }),
            container,
        );
        const th = container.querySelector('th');
        expect(th).not.toBeNull();
        expect(th!.textContent).toBe('Header');
    });

    it('Table.Td renders a <td>', () => {
        render(
            jsx(Table, {
                children: jsx(Table.Body, {
                    children: jsx(Table.Row, {
                        children: jsx(Table.Td, { children: 'Cell' }),
                    }),
                }),
            }),
            container,
        );
        const td = container.querySelector('td');
        expect(td).not.toBeNull();
        expect(td!.textContent).toBe('Cell');
    });

    // Composition test
    it('renders full table composition', () => {
        render(
            jsx(Table, {
                zebra: true,
                children: [
                    jsx(Table.Head, {
                        children: jsx(Table.Row, {
                            children: [
                                jsx(Table.Th, { children: 'Name' }),
                                jsx(Table.Th, { children: 'Age' }),
                            ],
                        }),
                    }),
                    jsx(Table.Body, {
                        children: [
                            jsx(Table.Row, {
                                children: [
                                    jsx(Table.Td, { children: 'Alice' }),
                                    jsx(Table.Td, { children: '30' }),
                                ],
                            }),
                            jsx(Table.Row, {
                                children: [
                                    jsx(Table.Td, { children: 'Bob' }),
                                    jsx(Table.Td, { children: '25' }),
                                ],
                            }),
                        ],
                    }),
                    jsx(Table.Foot, {
                        children: jsx(Table.Row, {
                            children: [
                                jsx(Table.Th, { children: 'Name' }),
                                jsx(Table.Th, { children: 'Age' }),
                            ],
                        }),
                    }),
                ],
            }),
            container,
        );
        const table = getTable();
        expect(table.classList.contains('table-zebra')).toBe(true);
        expect(container.querySelector('thead')).not.toBeNull();
        expect(container.querySelector('tbody')).not.toBeNull();
        expect(container.querySelector('tfoot')).not.toBeNull();
        expect(container.querySelectorAll('th').length).toBe(4); // 2 in head + 2 in foot
        expect(container.querySelectorAll('td').length).toBe(4);
        expect(container.querySelectorAll('tr').length).toBe(4);
    });
});
