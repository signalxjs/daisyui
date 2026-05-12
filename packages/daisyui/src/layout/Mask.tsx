import { component, type Define } from 'sigx';

// ============================================
// Mask Types
// ============================================

export type MaskShape = 
    | 'squircle' 
    | 'heart' 
    | 'hexagon' 
    | 'hexagon-2' 
    | 'decagon' 
    | 'pentagon' 
    | 'diamond' 
    | 'square' 
    | 'circle' 
    | 'parallelogram' 
    | 'parallelogram-2' 
    | 'parallelogram-3' 
    | 'parallelogram-4' 
    | 'star' 
    | 'star-2' 
    | 'triangle' 
    | 'triangle-2' 
    | 'triangle-3' 
    | 'triangle-4';

export type MaskProps = 
    & Define.Prop<'shape', MaskShape>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

// ============================================
// Mask Component
// ============================================

/**
 * Mask component for cropping content to various shapes.
 * Uses CSS clip-path for smooth, scalable shape masking.
 * 
 * @example
 * ```tsx
 * <Mask shape="hexagon">
 *   <img src="/profile.jpg" alt="Profile" />
 * </Mask>
 * 
 * <Mask shape="heart">
 *   <div class="bg-primary w-20 h-20" />
 * </Mask>
 * 
 * <Mask shape="star">
 *   <img src="/award.png" />
 * </Mask>
 * ```
 */
export const Mask = component<MaskProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['mask'];
        if (props.shape) classes.push(`mask-${props.shape}`);
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => (
        <div class={getClasses()}>
            {slots.default?.()}
        </div>
    );
});
