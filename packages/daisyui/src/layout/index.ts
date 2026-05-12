// Layout components index
import { Hero as HeroCompound } from './Hero';
import { Join as JoinCompound } from './Join';
import { Chat as ChatCompound } from './Chat';
import { Carousel as CarouselCompound } from './Carousel';

export { Container } from './Container';
export { Card } from './Card';
export { Stack } from './Stack';
export { Flex, Row, Col } from './Flex';
export { Divider } from './Divider';
export { Hero } from './Hero';
export { Footer } from './Footer';
export { Join } from './Join';
export { Link } from './Link';
export { Chat } from './Chat';
export { Mockup, MockupBrowser, MockupCode, MockupPhone, MockupWindow, Artboard } from './Mockup';
export { Carousel } from './Carousel';
export { Mask } from './Mask';

// Re-export types
export type { ContainerProps, ContainerSize } from './Container';
export type { CardProps, CardVariant, CardBodyProps, CardTitleProps, CardActionsProps, CardImageProps } from './Card';
export type { StackProps, StackDirection } from './Stack';
export type { FlexProps, RowProps, ColProps, FlexSpacing, FlexAlign, FlexJustify } from './Flex';
export type { DividerProps } from './Divider';
export type { HeroProps, HeroContentCompProps as HeroContentProps } from './Hero';
export type { FooterProps } from './Footer';
export type { JoinProps, JoinItemCompProps as JoinItemProps } from './Join';
export type { LinkProps, LinkColor } from './Link';
export type { 
    ChatProps, 
    ChatImageCompProps as ChatImageProps, 
    ChatHeaderCompProps as ChatHeaderProps, 
    ChatBubbleCompProps as ChatBubbleProps, 
    ChatBubbleColor, 
    ChatFooterCompProps as ChatFooterProps 
} from './Chat';
export type { 
    ArtboardProps, ArtboardSize,
    MockupBrowserCompProps as MockupBrowserProps, 
    MockupCodeCompProps as MockupCodeProps, 
    CodeLine, 
    MockupPhoneCompProps as MockupPhoneProps, 
    MockupWindowCompProps as MockupWindowProps 
} from './Mockup';
export type { CarouselProps, CarouselItemData, CarouselItemCompProps as CarouselItemProps } from './Carousel';
export type { MaskProps, MaskShape } from './Mask';

// Backwards compatibility - also export individual compound sub-components as standalone
// These allow users to import HeroContent directly if needed
export const HeroContent = HeroCompound.Content;
export const JoinItem = JoinCompound.Item;
export const ChatImage = ChatCompound.Image;
export const ChatHeader = ChatCompound.Header;
export const ChatBubble = ChatCompound.Bubble;
export const ChatFooter = ChatCompound.Footer;
export const CarouselItem = CarouselCompound.Item;
