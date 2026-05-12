import { component, compound, type Define } from 'sigx';

// ============================================
// Hero Types
// ============================================

export type HeroProps = 
    & Define.Prop<'overlay', boolean, false>
    & Define.Prop<'bgImage', string, false>
    & Define.Prop<'minHeight', string, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>
    & Define.Slot<'overlay'>;

export type HeroContentProps = 
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

// ============================================
// Hero Component
// ============================================

/**
 * Hero component for large banner sections with DaisyUI styling.
 * Supports background images, overlays, and flexible content layouts.
 * 
 * @example
 * ```tsx
 * <Hero bgImage="/hero-bg.jpg" overlay>
 *   <Hero.Content>
 *     <h1 class="text-5xl font-bold">Welcome!</h1>
 *     <p>Build amazing apps with SignalX</p>
 *     <Button variant="primary">Get Started</Button>
 *   </Hero.Content>
 * </Hero>
 * ```
 */
const _Hero = component<HeroProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['hero'];
        if (props.minHeight) classes.push(`min-h-[${props.minHeight}]`);
        else classes.push('min-h-96');
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    const getStyle = () => {
        if (props.bgImage) {
            return { backgroundImage: `url(${props.bgImage})` };
        }
        return {};
    };

    return () => (
        <div class={getClasses()} style={getStyle()}>
            {props.overlay && (
                <div class="hero-overlay bg-opacity-60">
                    {slots.overlay?.()}
                </div>
            )}
            {slots.default?.()}
        </div>
    );
});

// ============================================
// HeroContent Component
// ============================================

/**
 * Hero.Content component - Container for hero content with centered layout.
 */
const HeroContent = component<HeroContentProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['hero-content', 'text-center'];
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => (
        <div class={getClasses()}>
            <div class="max-w-md">
                {slots.default?.()}
            </div>
        </div>
    );
});

/**
 * Hero compound component with Content sub-component.
 */
export const Hero = compound(_Hero, {
    Content: HeroContent,
});

export type { HeroContentProps as HeroContentCompProps };
