import { component, type Define } from 'sigx';
import { resolveBoxStyle, type BoxStyleProps } from '../shared/styles';

// ============================================
// Footer Types
// ============================================

export type FooterProps =
    & Define.Prop<'center', boolean, false>
    & BoxStyleProps
    & Define.Slot<'default'>;

// ============================================
// Footer Component
// ============================================

/**
 * Footer component with DaisyUI styling.
 * Provides a styled footer area for website navigation and content.
 * 
 * @example
 * ```tsx
 * <Footer center>
 *   <p>Copyright © 2025 - All rights reserved</p>
 * </Footer>
 * 
 * <Footer>
 *   <nav>
 *     <h6 class="footer-title">Services</h6>
 *     <a class="link link-hover">Branding</a>
 *     <a class="link link-hover">Design</a>
 *   </nav>
 * </Footer>
 * ```
 */
export const Footer = component<FooterProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['footer', 'footer-center', 'text-base-content'];
        // daisyUI defaults, overridable via the `padding` / `background` props.
        if (!props.padding) classes.push('p-10');
        if (!props.background) classes.push('bg-base-200');
        if (props.center) classes.push('items-center');
        const box = resolveBoxStyle(props);
        if (box.className) classes.push(box.className);
        return { className: classes.join(' '), style: box.style };
    };

    return () => {
        const { className, style } = getClasses();
        return (
            <footer class={className} style={style}>
                {slots.default?.()}
            </footer>
        );
    };
});
