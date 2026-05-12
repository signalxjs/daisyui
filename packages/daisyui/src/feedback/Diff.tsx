import { component, compound, type Define } from 'sigx';

// ============================================
// Diff Sub-Components
// ============================================

export type DiffItem1Props =
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

const DiffItem1 = component<DiffItem1Props>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['diff-item-1'];
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => (
        <div class={getClasses()} role="img">
            {slots.default?.()}
        </div>
    );
});

export type DiffItem2Props =
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

const DiffItem2 = component<DiffItem2Props>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['diff-item-2'];
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => (
        <div class={getClasses()} role="img">
            {slots.default?.()}
        </div>
    );
});

export type DiffResizerProps =
    & Define.Prop<'class', string, false>;

const DiffResizer = component<DiffResizerProps>(({ props }) => {
    const getClasses = () => {
        const classes = ['diff-resizer'];
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => (
        <div class={getClasses()}></div>
    );
});

// ============================================
// Diff Container Component
// ============================================

export type DiffProps =
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

const _Diff = component<DiffProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['diff'];
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => (
        <figure class={getClasses()} tabIndex={0}>
            {slots.default?.()}
        </figure>
    );
});

export const Diff = compound(_Diff, {
    Item1: DiffItem1,
    Item2: DiffItem2,
    Resizer: DiffResizer,
});
