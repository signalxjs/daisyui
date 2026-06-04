import { component, type Define } from 'sigx';
import {
    Spacing,
    RadiusValue,
    BackgroundColor,
    SizeValue,
    FlexAlign,
    FlexJustify,
    FlexDirection,
    resolveSpacing,
    resolveBoxStyle,
    alignClasses,
    justifyClasses,
    directionClasses
} from '../shared/styles';

// Re-export types for convenience
export type { Spacing as FlexSpacing, FlexAlign, FlexJustify };

export type FlexProps = 
    & Define.Prop<'direction', FlexDirection, false>
    & Define.Prop<'gap', Spacing, false>
    & Define.Prop<'align', FlexAlign, false>
    & Define.Prop<'justify', FlexJustify, false>
    & Define.Prop<'wrap', boolean, false>
    & Define.Prop<'inline', boolean, false>
    & Define.Prop<'padding', Spacing, false>
    & Define.Prop<'margin', Spacing, false>
    & Define.Prop<'width', SizeValue, false>
    & Define.Prop<'height', SizeValue, false>
    & Define.Prop<'minWidth', SizeValue, false>
    & Define.Prop<'minHeight', SizeValue, false>
    & Define.Prop<'maxWidth', SizeValue, false>
    & Define.Prop<'maxHeight', SizeValue, false>
    & Define.Prop<'rounded', RadiusValue | boolean, false>
    & Define.Prop<'background', BackgroundColor, false>
    & Define.Prop<'grow', boolean, false>
    & Define.Prop<'shrink', boolean, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

/**
 * Flexible layout component using Tailwind CSS flex utilities.
 * 
 * @example
 * ```tsx
 * // Simple usage
 * <Flex direction="row" gap="4" align="center">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Flex>
 * 
 * // With styling props
 * <Flex padding="4" background="base-200" rounded>
 *   <div>Styled flex</div>
 * </Flex>
 * 
 * // With width/height (Tailwind presets or CSS values)
 * <Flex width="full" height="screen" padding="4">...</Flex>
 * <Flex width="400px" height="200px">...</Flex>
 * ```
 */
export const Flex = component<FlexProps>(({ props, slots }) => {
    const getClassesAndStyles = () => {
        const classes = [props.inline ? 'inline-flex' : 'flex'];

        // Direction - default to row
        classes.push(directionClasses[props.direction ?? 'row']);

        // Gap
        classes.push(...resolveSpacing(props.gap, 'gap'));

        // Alignment
        if (props.align) {
            classes.push(alignClasses[props.align]);
        }

        // Justify
        if (props.justify) {
            classes.push(justifyClasses[props.justify]);
        }

        // Wrap
        if (props.wrap) {
            classes.push('flex-wrap');
        }

        // Flex grow/shrink
        if (props.grow) {
            classes.push('flex-grow');
        }
        if (props.shrink) {
            classes.push('flex-shrink');
        }

        // Shared box styling: padding/margin/rounded/background/size(+min/max)/class
        const box = resolveBoxStyle(props);
        if (box.className) classes.push(box.className);

        return {
            className: classes.join(' '),
            style: box.style
        };
    };

    return () => {
        const { className, style } = getClassesAndStyles();
        return (
            <div class={className} style={style}>
                {slots.default?.()}
            </div>
        );
    };
});

// Row - horizontal flex container
export type RowProps = Omit<FlexProps, 'direction'> & Define.Prop<'reverse', boolean, false>;

/**
 * Horizontal flex container (row direction).
 * 
 * @example
 * ```tsx
 * <Row gap="4" align="center" padding="4" background="base-200" rounded>
 *   <div>Left</div>
 *   <div>Right</div>
 * </Row>
 * ```
 */
export const Row = component<RowProps>(({ props, slots }) => {
    return () => (
        <Flex 
            direction={props.reverse ? 'row-reverse' : 'row'}
            gap={props.gap}
            align={props.align}
            justify={props.justify}
            wrap={props.wrap}
            inline={props.inline}
            padding={props.padding}
            margin={props.margin}
            width={props.width}
            height={props.height}
            minWidth={props.minWidth}
            minHeight={props.minHeight}
            maxWidth={props.maxWidth}
            maxHeight={props.maxHeight}
            rounded={props.rounded}
            background={props.background}
            grow={props.grow}
            shrink={props.shrink}
            class={props.class}
        >
            {slots.default?.()}
        </Flex>
    );
});

// Col - vertical flex container
export type ColProps = Omit<FlexProps, 'direction'> & Define.Prop<'reverse', boolean, false>;

/**
 * Vertical flex container (column direction).
 * 
 * @example
 * ```tsx
 * <Col gap="4" align="center" padding="4" background="base-200" rounded>
 *   <div>Top</div>
 *   <div>Bottom</div>
 * </Col>
 * ```
 */
export const Col = component<ColProps>(({ props, slots }) => {
    return () => (
        <Flex 
            direction={props.reverse ? 'col-reverse' : 'col'}
            gap={props.gap}
            align={props.align}
            justify={props.justify}
            wrap={props.wrap}
            inline={props.inline}
            padding={props.padding}
            margin={props.margin}
            width={props.width}
            height={props.height}
            minWidth={props.minWidth}
            minHeight={props.minHeight}
            maxWidth={props.maxWidth}
            maxHeight={props.maxHeight}
            rounded={props.rounded}
            background={props.background}
            grow={props.grow}
            shrink={props.shrink}
            class={props.class}
        >
            {slots.default?.()}
        </Flex>
    );
});
