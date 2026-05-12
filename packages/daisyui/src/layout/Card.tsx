import { component, compound, type Define } from 'sigx';

export type CardVariant = 'normal' | 'compact' | 'side' | 'bordered' | 'image-full';

export type CardProps = 
    & Define.Prop<'variant', CardVariant, false>
    & Define.Prop<'shadow', boolean | 'sm' | 'md' | 'lg' | 'xl', false>
    & Define.Prop<'bordered', boolean, false>
    & Define.Prop<'glass', boolean, false>
    & Define.Prop<'imageFull', boolean, false>
    & Define.Prop<'bgColor', string, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

/**
 * Card component with DaisyUI styling.
 * 
 * @example
 * ```tsx
 * <Card shadow="lg" bordered>
 *   <Card.Body>
 *     <Card.Title>Card Title</Card.Title>
 *     <p>Card content goes here</p>
 *     <Card.Actions>
 *       <Button variant="primary">Action</Button>
 *     </Card.Actions>
 *   </Card.Body>
 * </Card>
 * ```
 */
const _Card = component<CardProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['card'];
        
        // Background - default to base-100
        classes.push(props.bgColor ?? 'bg-base-100');
        
        // Shadow
        if (props.shadow === true || props.shadow === undefined) {
            classes.push('shadow-xl');
        } else if (props.shadow === 'sm') {
            classes.push('shadow-sm');
        } else if (props.shadow === 'md') {
            classes.push('shadow-md');
        } else if (props.shadow === 'lg') {
            classes.push('shadow-lg');
        }
        
        // Variants
        if (props.variant === 'compact') classes.push('card-compact');
        if (props.variant === 'side') classes.push('card-side');
        if (props.bordered) classes.push('card-bordered');
        if (props.glass) classes.push('glass');
        if (props.imageFull) classes.push('image-full');
        
        if (props.class) classes.push(props.class);
        
        return classes.join(' ');
    };

    return () => (
        <div class={getClasses()}>
            {slots.default?.()}
        </div>
    );
});

// Card Body
export type CardBodyProps = 
    & Define.Prop<'center', boolean, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

/**
 * Card.Body component for card content area.
 */
const CardBody = component<CardBodyProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['card-body'];
        
        if (props.center) {
            classes.push('items-center', 'text-center');
        }
        
        if (props.class) classes.push(props.class);
        
        return classes.join(' ');
    };

    return () => (
        <div class={getClasses()}>
            {slots.default?.()}
        </div>
    );
});

// Card Title
export type CardTitleProps = 
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

/**
 * Card.Title component for card headings.
 */
const CardTitle = component<CardTitleProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['card-title'];
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => (
        <h2 class={getClasses()}>
            {slots.default?.()}
        </h2>
    );
});

// Card Actions
export type CardActionsProps = 
    & Define.Prop<'justify', 'start' | 'center' | 'end', false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

/**
 * Card.Actions component for card action buttons.
 */
const CardActions = component<CardActionsProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['card-actions'];
        
        if (props.justify === 'start') classes.push('justify-start');
        else if (props.justify === 'center') classes.push('justify-center');
        else classes.push('justify-end'); // default
        
        if (props.class) classes.push(props.class);
        
        return classes.join(' ');
    };

    return () => (
        <div class={getClasses()}>
            {slots.default?.()}
        </div>
    );
});

// Card Image
export type CardImageProps = 
    & Define.Prop<'src', string>
    & Define.Prop<'alt', string, false>
    & Define.Prop<'class', string, false>;

/**
 * Card.Image component for card images.
 */
const CardImage = component<CardImageProps>(({ props }) => {
    return () => (
        <figure class={props.class}>
            <img src={props.src} alt={props.alt ?? ''} />
        </figure>
    );
});

/**
 * Card compound component with Body, Title, Actions, and Image sub-components.
 */
export const Card = compound(_Card, {
    Body: CardBody,
    Title: CardTitle,
    Actions: CardActions,
    Image: CardImage,
});
