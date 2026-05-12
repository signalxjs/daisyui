import { component, type Define } from 'sigx';

// ============================================
// Rating Types
// ============================================

export type RatingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type RatingMask = 'star' | 'star-2' | 'heart' | 'circle' | 'diamond' | 'hexagon' | 'decagon' | 'triangle';
export type RatingColor = 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';

export type RatingProps = 
    & Define.Model<number>
    & Define.Prop<'max', number, false>
    & Define.Prop<'size', RatingSize, false>
    & Define.Prop<'mask', RatingMask, false>
    & Define.Prop<'half', boolean, false>
    & Define.Prop<'readOnly', boolean, false>
    & Define.Prop<'color', RatingColor, false>
    & Define.Prop<'class', string, false>
    & Define.Event<'change', number>;

const ratingSizeClasses: Record<RatingSize, string> = {
    xs: 'rating-xs',
    sm: 'rating-sm',
    md: 'rating-md',
    lg: 'rating-lg',
    xl: 'rating-xl'
};

const ratingMaskClasses: Record<RatingMask, string> = {
    'star': 'mask-star',
    'star-2': 'mask-star-2',
    'heart': 'mask-heart',
    'circle': 'mask-circle',
    'diamond': 'mask-diamond',
    'hexagon': 'mask-hexagon',
    'decagon': 'mask-decagon',
    'triangle': 'mask-triangle'
};

const ratingColorClasses: Record<RatingColor, string> = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
    info: 'bg-info',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error'
};

// ============================================
// Rating Component
// ============================================

/**
 * Rating component with DaisyUI styling and two-way model binding.
 * Supports different sizes, mask shapes, colors, and half-star ratings.
 * 
 * @example
 * ```tsx
 * const rating = signal(3);
 * 
 * // Basic rating with model binding
 * <Rating model={rating} max={5} mask="star" color="warning" />
 * 
 * // Read-only rating
 * <Rating model={rating} readOnly />
 * 
 * // Half-star rating
 * <Rating model={rating} half max={5} color="primary" />
 * 
 * // Heart-shaped rating
 * <Rating model={rating} mask="heart" color="error" />
 * 
 * // With change event
 * <Rating 
 *   model={rating} 
 *   onChange={(value) => console.log('New rating:', value)} 
 * />
 * ```
 */
export const Rating = component<RatingProps>(({ props, emit }) => {
    const max = () => props.max ?? 5;
    const name = `rating-${Math.random().toString(36).slice(2)}`;

    const getContainerClasses = () => {
        const classes = ['rating'];
        
        if (props.size) {
            const sizeClass = ratingSizeClasses[props.size];
            if (sizeClass) classes.push(sizeClass);
        }
        if (props.half) classes.push('rating-half');
        if (props.class) classes.push(props.class);
        
        return classes.join(' ');
    };

    const getInputClasses = (value: number) => {
        const classes = ['mask'];
        
        classes.push(ratingMaskClasses[props.mask ?? 'star-2']);
        if (props.color) classes.push(ratingColorClasses[props.color]);
        else classes.push('bg-orange-400');
        
        if (props.half && value % 1 === 0.5) {
            classes.push('rating-half', 'mask-half-1');
        } else if (props.half && value % 1 === 0) {
            classes.push('mask-half-2');
        }
        
        return classes.join(' ');
    };

    const handleChange = (value: number) => {
        if (!props.readOnly) {
            if (props.model) props.model.value = value;
            emit('change', value);
        }
    };

    return () => {
        const values = props.half 
            ? Array.from({ length: max() * 2 }, (_, i) => (i + 1) * 0.5)
            : Array.from({ length: max() }, (_, i) => i + 1);

        return (
            <div class={getContainerClasses()}>
                {/* Hidden radio for 0 rating */}
                <input
                    type="radio"
                    name={name}
                    class="rating-hidden"
                    checked={(props.model?.value ?? 0) === 0}
                    onChange={() => handleChange(0)}
                    disabled={props.readOnly}
                    aria-label="No rating"
                />
                {values.map(value => (
                    <input
                        type="radio"
                        name={name}
                        class={getInputClasses(value)}
                        checked={(props.model?.value ?? 0) === value}
                        onChange={() => handleChange(value)}
                        disabled={props.readOnly}
                        aria-label={props.half ? `${value} star` : `${value} star`}
                    />
                ))}
            </div>
        );
    };
});
