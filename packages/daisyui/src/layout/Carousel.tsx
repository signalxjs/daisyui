import { component, compound, type Define } from 'sigx';

// ============================================
// Carousel Types
// ============================================

export interface CarouselItemData {
    id: string;
    content: () => any;
}

export type CarouselProps = 
    & Define.Prop<'items', CarouselItemData[], false>
    & Define.Prop<'center', boolean, false>
    & Define.Prop<'vertical', boolean, false>
    & Define.Prop<'fullWidth', boolean, false>
    & Define.Prop<'snap', 'start' | 'center' | 'end', false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

export type CarouselItemProps = 
    & Define.Prop<'id', string, false>
    & Define.Prop<'fullWidth', boolean, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>
    & Define.Event<'click', MouseEvent>;

// ============================================
// Carousel Component
// ============================================

/**
 * Carousel component for scrollable content galleries.
 * Supports horizontal and vertical scrolling with snap points.
 * 
 * @example
 * ```tsx
 * // Using compound pattern
 * <Carousel center>
 *   <Carousel.Item id="slide1">
 *     <img src="image1.jpg" />
 *   </Carousel.Item>
 *   <Carousel.Item id="slide2">
 *     <img src="image2.jpg" />
 *   </Carousel.Item>
 * </Carousel>
 * 
 * // Using items prop
 * <Carousel 
 *   items={[
 *     { id: '1', content: () => <img src="1.jpg" /> },
 *     { id: '2', content: () => <img src="2.jpg" /> }
 *   ]}
 *   center
 * />
 * 
 * // Vertical carousel
 * <Carousel vertical>
 *   <Carousel.Item><Card>Card 1</Card></Carousel.Item>
 *   <Carousel.Item><Card>Card 2</Card></Carousel.Item>
 * </Carousel>
 * ```
 */
const _Carousel = component<CarouselProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['carousel', 'rounded-box'];
        if (props.center) classes.push('carousel-center');
        if (props.vertical) classes.push('carousel-vertical');
        if (props.fullWidth) classes.push('w-full');
        if (props.snap === 'start') classes.push('carousel-start');
        if (props.snap === 'end') classes.push('carousel-end');
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => (
        <div class={getClasses()}>
            {slots.default?.() ?? props.items?.map(item => (
                <div id={item.id} class="carousel-item">
                    {item.content()}
                </div>
            ))}
        </div>
    );
});

// ============================================
// CarouselItem Component
// ============================================

/**
 * Carousel.Item component - Individual slide/item in carousel.
 */
const CarouselItem = component<CarouselItemProps>(({ props, slots, emit }) => {
    const getClasses = () => {
        const classes = ['carousel-item'];
        if (props.fullWidth) classes.push('w-full');
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => (
        <div 
            id={props.id} 
            class={getClasses()}
            onClick={(e) => emit('click', e)}
        >
            {slots.default?.()}
        </div>
    );
});

/**
 * Carousel compound component with Item sub-component.
 */
export const Carousel = compound(_Carousel, {
    Item: CarouselItem,
});

export type { CarouselItemProps as CarouselItemCompProps };
