import { component, compound, type Define } from 'sigx';

// ============================================
// Chat Types
// ============================================

export type ChatProps = 
    & Define.Prop<'start', boolean, false>
    & Define.Prop<'end', boolean, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

export type ChatImageProps = 
    & Define.Prop<'src', string, false>
    & Define.Prop<'alt', string, false>
    & Define.Prop<'placeholder', string, false>
    & Define.Prop<'bgColor', string, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

export type ChatHeaderProps = 
    & Define.Prop<'name', string, false>
    & Define.Prop<'time', string, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

export type ChatBubbleColor = 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';

export type ChatBubbleProps = 
    & Define.Prop<'color', ChatBubbleColor, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

export type ChatFooterProps = 
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

const chatBubbleColorClasses: Record<ChatBubbleColor, string> = {
    primary: 'chat-bubble-primary',
    secondary: 'chat-bubble-secondary',
    accent: 'chat-bubble-accent',
    info: 'chat-bubble-info',
    success: 'chat-bubble-success',
    warning: 'chat-bubble-warning',
    error: 'chat-bubble-error'
};

// ============================================
// Chat Component
// ============================================

/**
 * Chat component for creating chat/messaging UI.
 * Supports compound pattern with Image, Header, Bubble, and Footer sub-components.
 * 
 * @example
 * ```tsx
 * <Chat start>
 *   <Chat.Image src="/avatar.jpg" alt="User" />
 *   <Chat.Header name="John" time="12:45" />
 *   <Chat.Bubble>Hello! How are you?</Chat.Bubble>
 *   <Chat.Footer>Delivered</Chat.Footer>
 * </Chat>
 * 
 * <Chat end>
 *   <Chat.Image src="/my-avatar.jpg" />
 *   <Chat.Bubble color="primary">I'm good, thanks!</Chat.Bubble>
 * </Chat>
 * ```
 */
const _Chat = component<ChatProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['chat'];
        if (props.start) classes.push('chat-start');
        else if (props.end) classes.push('chat-end');
        else classes.push('chat-start');
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
// ChatImage Component
// ============================================

/**
 * Chat.Image component - Avatar image for chat messages.
 * Supports `src` for image avatars, `placeholder` for initials-based avatars,
 * or a default slot for fully custom content.
 */
const ChatImage = component<ChatImageProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['chat-image', 'avatar'];
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => {
        if (props.placeholder) {
            const color = props.bgColor ?? 'primary';
            return (
                <div class={getClasses()}>
                    <div class={`w-10 rounded-full bg-${color} flex items-center justify-center text-${color}-content font-bold`}>
                        {props.placeholder}
                    </div>
                </div>
            );
        }

        if (props.src) {
            return (
                <div class={getClasses()}>
                    <div class="w-10 rounded-full">
                        <img src={props.src} alt={props.alt ?? 'Avatar'} />
                    </div>
                </div>
            );
        }

        return (
            <div class={getClasses()}>
                {slots.default?.()}
            </div>
        );
    };
});

// ============================================
// ChatHeader Component
// ============================================

/**
 * Chat.Header component - Displays sender name and optional timestamp.
 */
const ChatHeader = component<ChatHeaderProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['chat-header'];
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => (
        <div class={getClasses()}>
            {slots.default?.() ?? props.name}
            {props.time && <time class="text-xs opacity-50 ml-1">{props.time}</time>}
        </div>
    );
});

// ============================================
// ChatBubble Component
// ============================================

/**
 * Chat.Bubble component - Message content container with color variants.
 */
const ChatBubble = component<ChatBubbleProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['chat-bubble'];
        if (props.color) classes.push(chatBubbleColorClasses[props.color]);
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
// ChatFooter Component
// ============================================

/**
 * Chat.Footer component - Message status or additional info.
 */
const ChatFooter = component<ChatFooterProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['chat-footer', 'opacity-50'];
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
 * Chat compound component with Image, Header, Bubble, and Footer sub-components.
 */
export const Chat = compound(_Chat, {
    Image: ChatImage,
    Header: ChatHeader,
    Bubble: ChatBubble,
    Footer: ChatFooter,
});

export type { 
    ChatImageProps as ChatImageCompProps,
    ChatHeaderProps as ChatHeaderCompProps, 
    ChatBubbleProps as ChatBubbleCompProps,
    ChatFooterProps as ChatFooterCompProps 
};
