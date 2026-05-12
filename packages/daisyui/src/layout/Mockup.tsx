import { component, type Define } from 'sigx';

// ============================================
// Mockup Types
// ============================================

export type ArtboardSize = '1' | '2' | '3' | '4' | '5' | '6';

export type ArtboardProps = 
    & Define.Prop<'size', ArtboardSize, false>
    & Define.Prop<'horizontal', boolean, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

export interface CodeLine {
    prefix?: string;
    text: string;
    color?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
}

export type MockupBrowserProps = 
    & Define.Prop<'url', string, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

export type MockupCodeProps = 
    & Define.Prop<'lines', CodeLine[], false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

export type MockupPhoneProps = 
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

export type MockupWindowProps = 
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

// ============================================
// Artboard Component (Phone Mockup Sizes)
// ============================================

/**
 * Artboard component for phone mockup sizing.
 * Provides standardized phone screen sizes for demos.
 * 
 * @example
 * ```tsx
 * <Artboard size="1">
 *   320×568 content
 * </Artboard>
 * 
 * <Artboard size="4" horizontal>
 *   Landscape mode
 * </Artboard>
 * ```
 */
export const Artboard = component<ArtboardProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['artboard', 'artboard-demo'];
        if (props.size) classes.push(`phone-${props.size}`);
        else classes.push('phone-1');
        if (props.horizontal) classes.push('horizontal');
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => (
        <div class={getClasses()}>
            {slots.default?.()}
        </div>
    );
});

// ============================================
// MockupBrowser Component
// ============================================

/**
 * Mockup.Browser component - Browser window mockup with URL bar.
 */
const MockupBrowser = component<MockupBrowserProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['mockup-browser', 'border', 'border-base-300'];
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => (
        <div class={getClasses()}>
            <div class="mockup-browser-toolbar">
                <div class="input border border-base-300">{props.url ?? 'https://example.com'}</div>
            </div>
            {slots.default?.()}
        </div>
    );
});

// ============================================
// MockupCode Component
// ============================================

/**
 * Mockup.Code component - Terminal/code mockup with line prefixes.
 */
const MockupCode = component<MockupCodeProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['mockup-code'];
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => (
        <div class={getClasses()}>
            {slots.default?.() ?? props.lines?.map(line => (
                <pre data-prefix={line.prefix ?? ''}>
                    <code class={line.color ? `text-${line.color}` : ''}>
                        {line.text}
                    </code>
                </pre>
            ))}
        </div>
    );
});

// ============================================
// MockupPhone Component
// ============================================

/**
 * Mockup.Phone component - Realistic phone frame mockup.
 */
const MockupPhone = component<MockupPhoneProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['mockup-phone'];
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => (
        <div class={getClasses()}>
            <div class="camera"></div>
            <div class="display">
                <div class="artboard artboard-demo phone-1">
                    {slots.default?.()}
                </div>
            </div>
        </div>
    );
});

// ============================================
// MockupWindow Component
// ============================================

/**
 * Mockup.Window component - Desktop window mockup with title bar.
 */
const MockupWindow = component<MockupWindowProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['mockup-window', 'border', 'border-base-300'];
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => (
        <div class={getClasses()}>
            <div class="flex justify-center px-4 py-16 bg-base-200">
                {slots.default?.()}
            </div>
        </div>
    );
});

// ============================================
// Mockup Compound Export
// ============================================

/**
 * Mockup namespace with Browser, Code, Phone, and Window components.
 * 
 * @example
 * ```tsx
 * <Mockup.Browser url="https://sigx.dev">
 *   <div class="bg-base-200 p-8">Website content</div>
 * </Mockup.Browser>
 * 
 * <Mockup.Code lines={[
 *   { prefix: '$', text: 'npm install sigx' },
 *   { text: 'Installing...', color: 'warning' },
 *   { text: 'Done!', color: 'success' }
 * ]} />
 * 
 * <Mockup.Phone>
 *   <img src="/app-screenshot.png" />
 * </Mockup.Phone>
 * 
 * <Mockup.Window>
 *   <div class="p-8">Desktop app content</div>
 * </Mockup.Window>
 * ```
 */
export const Mockup = {
    Browser: MockupBrowser,
    Code: MockupCode,
    Phone: MockupPhone,
    Window: MockupWindow,
};

// Also export individual components for backwards compatibility
export { MockupBrowser, MockupCode, MockupPhone, MockupWindow };

export type {
    MockupBrowserProps as MockupBrowserCompProps,
    MockupCodeProps as MockupCodeCompProps,
    MockupPhoneProps as MockupPhoneCompProps,
    MockupWindowProps as MockupWindowCompProps
};
