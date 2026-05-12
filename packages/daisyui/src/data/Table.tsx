import { component, compound, type Define } from 'sigx';

// ============================================
// Table Component
// ============================================

export type TableSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TableProps = 
    & Define.Prop<'zebra', boolean, false>
    & Define.Prop<'pinRows', boolean, false>
    & Define.Prop<'pinCols', boolean, false>
    & Define.Prop<'size', TableSize, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

const tableSizeClasses: Record<TableSize, string> = {
    xs: 'table-xs',
    sm: 'table-sm',
    md: '',
    lg: 'table-lg',
    xl: 'table-xl'
};

/**
 * Table component with DaisyUI styling.
 * 
 * @example
 * ```tsx
 * <Table zebra>
 *   <Table.Head>
 *     <Table.Row><Table.Th>Name</Table.Th><Table.Th>Age</Table.Th></Table.Row>
 *   </Table.Head>
 *   <Table.Body>
 *     <Table.Row><Table.Td>John</Table.Td><Table.Td>25</Table.Td></Table.Row>
 *   </Table.Body>
 * </Table>
 * ```
 */
const _Table = component<TableProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['table'];
        
        if (props.zebra) classes.push('table-zebra');
        if (props.pinRows) classes.push('table-pin-rows');
        if (props.pinCols) classes.push('table-pin-cols');
        if (props.size) {
            const sizeClass = tableSizeClasses[props.size];
            if (sizeClass) classes.push(sizeClass);
        }
        if (props.class) classes.push(props.class);
        
        return classes.join(' ');
    };

    return () => (
        <div class="overflow-x-auto">
            <table class={getClasses()}>
                {slots.default?.()}
            </table>
        </div>
    );
});

// ============================================
// Table Sub-Components
// ============================================

export type TheadProps = 
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

const Thead = component<TheadProps>(({ props, slots }) => {
    return () => (
        <thead class={props.class}>
            {slots.default?.()}
        </thead>
    );
});

export type TbodyProps = 
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

const Tbody = component<TbodyProps>(({ props, slots }) => {
    return () => (
        <tbody class={props.class}>
            {slots.default?.()}
        </tbody>
    );
});

export type TrProps = 
    & Define.Prop<'hover', boolean, false>
    & Define.Prop<'active', boolean, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

const Tr = component<TrProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes: string[] = [];
        
        if (props.hover) classes.push('hover');
        if (props.active) classes.push('active');
        if (props.class) classes.push(props.class);
        
        return classes.join(' ');
    };

    return () => (
        <tr class={getClasses()}>
            {slots.default?.()}
        </tr>
    );
});

export type ThProps = 
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

const Th = component<ThProps>(({ props, slots }) => {
    return () => (
        <th class={props.class}>
            {slots.default?.()}
        </th>
    );
});

export type TdProps =
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

const Td = component<TdProps>(({ props, slots }) => {
    return () => (
        <td class={props.class}>
            {slots.default?.()}
        </td>
    );
});

export type TfootProps =
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

const Tfoot = component<TfootProps>(({ props, slots }) => {
    return () => (
        <tfoot class={props.class}>
            {slots.default?.()}
        </tfoot>
    );
});

// ============================================
// Table Compound Export
// ============================================

/**
 * Table compound component with Head, Body, Foot, Row, Th, and Td sub-components.
 *
 * @example
 * ```tsx
 * <Table zebra>
 *   <Table.Head>
 *     <Table.Row><Table.Th>Name</Table.Th><Table.Th>Email</Table.Th></Table.Row>
 *   </Table.Head>
 *   <Table.Body>
 *     <Table.Row><Table.Td>Alice</Table.Td><Table.Td>alice@example.com</Table.Td></Table.Row>
 *   </Table.Body>
 *   <Table.Foot>
 *     <Table.Row><Table.Th>Name</Table.Th><Table.Th>Email</Table.Th></Table.Row>
 *   </Table.Foot>
 * </Table>
 * ```
 */
export const Table = compound(_Table, {
    Head: Thead,
    Body: Tbody,
    Foot: Tfoot,
    Row: Tr,
    Th,
    Td,
});
