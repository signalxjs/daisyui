import { component, type Define } from 'sigx';

// ============================================
// Footer Types
// ============================================

export type FooterProps = 
    & Define.Prop<'center', boolean, false>
    & Define.Prop<'class', string, false>
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
        const classes = ['footer', 'footer-center', 'p-10', 'bg-base-200', 'text-base-content'];
        if (props.center) classes.push('items-center');
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => (
        <footer class={getClasses()}>
            {slots.default?.()}
        </footer>
    );
});
