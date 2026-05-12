import { component, compound, type Define } from 'sigx';

// ============================================
// Timeline Types
// ============================================

export type TimelineColor = 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error';

export type TimelineProps =
    & Define.Prop<'vertical', boolean, false>
    & Define.Prop<'horizontal', boolean, false>
    & Define.Prop<'snap', boolean, false>
    & Define.Prop<'compact', boolean, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

export type TimelineItemProps =
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

export type TimelineStartProps =
    & Define.Prop<'boxed', boolean, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

export type TimelineMiddleProps =
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

export type TimelineEndProps =
    & Define.Prop<'boxed', boolean, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

export type TimelineHrProps =
    & Define.Prop<'color', TimelineColor, false>
    & Define.Prop<'class', string, false>;

// ============================================
// Timeline Component
// ============================================

const _Timeline = component<TimelineProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['timeline'];
        if (props.vertical) classes.push('timeline-vertical');
        if (props.horizontal) classes.push('timeline-horizontal');
        if (props.snap) classes.push('timeline-snap-icon');
        if (props.compact) classes.push('timeline-compact');
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => (
        <ul class={getClasses()}>
            {slots.default?.()}
        </ul>
    );
});

// ============================================
// Timeline.Item Component
// ============================================

const TimelineItem = component<TimelineItemProps>(({ props, slots }) => {
    return () => (
        <li class={props.class}>
            {slots.default?.()}
        </li>
    );
});

// ============================================
// Timeline.Start Component
// ============================================

const TimelineStart = component<TimelineStartProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['timeline-start'];
        if (props.boxed) classes.push('timeline-box');
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
// Timeline.Middle Component
// ============================================

const TimelineMiddle = component<TimelineMiddleProps>(({ props, slots }) => {
    return () => (
        <div class={`timeline-middle${props.class ? ` ${props.class}` : ''}`}>
            {slots.default?.()}
        </div>
    );
});

// ============================================
// Timeline.End Component
// ============================================

const TimelineEnd = component<TimelineEndProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['timeline-end'];
        if (props.boxed) classes.push('timeline-box');
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
// Timeline.Hr Component
// ============================================

const colorClasses: Record<TimelineColor, string> = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
    neutral: 'bg-neutral',
    info: 'bg-info',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
};

const TimelineHr = component<TimelineHrProps>(({ props }) => {
    const getClasses = () => {
        const classes: string[] = [];
        if (props.color) classes.push(colorClasses[props.color]);
        if (props.class) classes.push(props.class);
        return classes.length > 0 ? classes.join(' ') : undefined;
    };

    return () => (
        <hr class={getClasses()} />
    );
});

// ============================================
// Timeline Compound Export
// ============================================

export const Timeline = compound(_Timeline, {
    Item: TimelineItem,
    Start: TimelineStart,
    Middle: TimelineMiddle,
    End: TimelineEnd,
    Hr: TimelineHr,
});
