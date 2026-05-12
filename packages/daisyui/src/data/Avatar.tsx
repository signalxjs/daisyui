import { component, compound, type Define } from 'sigx';

// ============================================
// Avatar Component
// ============================================

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'rounded' | 'square' | 'squircle' | 'hexagon' | 'heart';

export type AvatarProps =
    & Define.Prop<'src', string, false>
    & Define.Prop<'alt', string, false>
    & Define.Prop<'size', AvatarSize, false>
    & Define.Prop<'shape', AvatarShape, false>
    & Define.Prop<'online', boolean, false>
    & Define.Prop<'offline', boolean, false>
    & Define.Prop<'placeholder', string, false>
    & Define.Prop<'ring', boolean, false>
    & Define.Prop<'ringColor', 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'neutral', false>
    & Define.Prop<'class', string, false>;

const avatarSizeClasses: Record<AvatarSize, string> = {
    xs: 'w-8',
    sm: 'w-12',
    md: 'w-16',
    lg: 'w-20',
    xl: 'w-24'
};

const avatarShapeClasses: Record<AvatarShape, string> = {
    circle: 'rounded-full',
    rounded: 'rounded-xl',
    square: '',
    squircle: 'mask mask-squircle',
    hexagon: 'mask mask-hexagon-2',
    heart: 'mask mask-heart',
};

/**
 * Avatar component with DaisyUI styling.
 *
 * @example
 * ```tsx
 * <Avatar src="/user.jpg" size="md" shape="circle" online />
 * <Avatar placeholder="JD" size="lg" />
 * ```
 */
const _Avatar = component<AvatarProps>(({ props }) => {
    const getContainerClasses = () => {
        const classes = ['avatar'];

        if (props.online) classes.push('avatar-online');
        if (props.offline) classes.push('avatar-offline');
        if (!props.src && props.placeholder) classes.push('avatar-placeholder');
        if (props.class) classes.push(props.class);

        return classes.join(' ');
    };

    const getInnerClasses = () => {
        const classes: string[] = [];

        classes.push(avatarSizeClasses[props.size ?? 'md']);
        classes.push(avatarShapeClasses[props.shape ?? 'circle']);

        if (props.ring) {
            const color = props.ringColor ?? 'primary';
            classes.push(`ring-${color}`, 'ring-offset-base-100', 'ring', 'ring-offset-2');
        }

        return classes.join(' ');
    };

    return () => (
        <div class={getContainerClasses()}>
            {props.src ? (
                <div class={getInnerClasses()}>
                    <img src={props.src} alt={props.alt ?? 'Avatar'} />
                </div>
            ) : props.placeholder ? (
                <div class={`bg-neutral text-neutral-content ${getInnerClasses()}`}>
                    <span class="text-xl">{props.placeholder}</span>
                </div>
            ) : null}
        </div>
    );
});

// ============================================
// Avatar Group Component
// ============================================

export type AvatarGroupProps =
    & Define.Prop<'spacing', 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

const avatarGroupSpacingClasses: Record<NonNullable<AvatarGroupProps['spacing']>, string> = {
    0: '-space-x-0',
    1: '-space-x-1',
    2: '-space-x-2',
    3: '-space-x-3',
    4: '-space-x-4',
    5: '-space-x-5',
    6: '-space-x-6',
    8: '-space-x-8',
    10: '-space-x-10',
};

/**
 * Avatar.Group component for displaying overlapping avatars.
 *
 * @example
 * ```tsx
 * <Avatar.Group>
 *   <Avatar src="/user1.jpg" size="sm" />
 *   <Avatar src="/user2.jpg" size="sm" />
 *   <Avatar placeholder="+3" size="sm" />
 * </Avatar.Group>
 * ```
 */
const AvatarGroup = component<AvatarGroupProps>(({ props, slots }) => {
    const getClasses = () => {
        const spacingClass = avatarGroupSpacingClasses[props.spacing ?? 6];
        const classes = ['avatar-group', spacingClass];
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
 * Avatar compound component with Group sub-component.
 */
export const Avatar = compound(_Avatar, {
    Group: AvatarGroup,
});
