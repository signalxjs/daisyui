import { component, compound, type Define } from 'sigx';
import { resolveBoxStyle, type BoxStyleProps } from '../shared/styles';

// ============================================
// Stat Sub-Components
// ============================================

export type StatTitleProps =
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

const StatTitle = component<StatTitleProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['stat-title'];
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => (
        <div class={getClasses()}>{slots.default?.()}</div>
    );
});

export type StatValueProps =
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

const StatValue = component<StatValueProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['stat-value'];
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => (
        <div class={getClasses()}>{slots.default?.()}</div>
    );
});

export type StatDescProps =
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

const StatDesc = component<StatDescProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['stat-desc'];
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => (
        <div class={getClasses()}>{slots.default?.()}</div>
    );
});

export type StatFigureProps =
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

const StatFigure = component<StatFigureProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['stat-figure'];
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => (
        <div class={getClasses()}>{slots.default?.()}</div>
    );
});

export type StatActionsProps =
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

const StatActions = component<StatActionsProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['stat-actions'];
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => (
        <div class={getClasses()}>{slots.default?.()}</div>
    );
});

// ============================================
// Stat Item Component
// ============================================

export type StatProps =
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

const _Stat = component<StatProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['stat'];
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => (
        <div class={getClasses()}>
            {slots.default?.()}
        </div>
    );
});

// ============================================
// Stats Container Component
// ============================================

export type StatsProps =
    & Define.Prop<'vertical', boolean, false>
    & Define.Prop<'horizontal', boolean, false>
    & Define.Prop<'shadow', boolean, false>
    & BoxStyleProps
    & Define.Slot<'default'>;

const _Stats = component<StatsProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['stats'];
        if (props.vertical) classes.push('stats-vertical');
        if (props.horizontal) classes.push('stats-horizontal');
        if (props.shadow) classes.push('shadow');
        const box = resolveBoxStyle(props);
        if (box.className) classes.push(box.className);
        return { className: classes.join(' '), style: box.style };
    };

    return () => {
        const { className, style } = getClasses();
        return (
            <div class={className} style={style}>
                {slots.default?.()}
            </div>
        );
    };
});

export const Stats = compound(_Stats, {
    Item: compound(_Stat, {
        Title: StatTitle,
        Value: StatValue,
        Desc: StatDesc,
        Figure: StatFigure,
        Actions: StatActions,
    }),
    Title: StatTitle,
    Value: StatValue,
    Desc: StatDesc,
    Figure: StatFigure,
    Actions: StatActions,
});
