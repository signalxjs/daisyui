import { component, compound, type Define } from 'sigx';
import { resolveBoxStyle, type BoxStyleProps } from '../shared/styles';

// ============================================
// Join Types
// ============================================

export type JoinProps =
    & Define.Prop<'vertical', boolean, false>
    & Define.Prop<'horizontal', boolean, false>
    & BoxStyleProps
    & Define.Slot<'default'>;

export type JoinItemProps = 
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

// ============================================
// Join Component
// ============================================

/**
 * Join component for grouping multiple items together.
 * Groups child elements by adding connecting styles between them.
 * 
 * @example
 * ```tsx
 * <Join>
 *   <Join.Item><Button>Left</Button></Join.Item>
 *   <Join.Item><Button>Center</Button></Join.Item>
 *   <Join.Item><Button>Right</Button></Join.Item>
 * </Join>
 * 
 * <Join vertical>
 *   <Join.Item><Input placeholder="Email" /></Join.Item>
 *   <Join.Item><Input placeholder="Password" /></Join.Item>
 *   <Join.Item><Button variant="primary">Login</Button></Join.Item>
 * </Join>
 * ```
 */
const _Join = component<JoinProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['join'];
        if (props.vertical) classes.push('join-vertical');
        if (props.horizontal) classes.push('join-horizontal');
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

// ============================================
// JoinItem Component
// ============================================

/**
 * Join.Item component - wrapper for items within Join component.
 * Automatically applies join-item class to children.
 */
const JoinItem = component<JoinItemProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['join-item'];
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => (
        <div class={getClasses()}>
            {slots.default?.()}
        </div>
    );
});

/**
 * Join compound component with Item sub-component.
 */
export const Join = compound(_Join, {
    Item: JoinItem,
});

export type { JoinItemProps as JoinItemCompProps };
