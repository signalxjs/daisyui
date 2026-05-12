/**
 * @sigx/daisyui - DaisyUI component library for SignalX
 * 
 * Beautiful, accessible UI components with full theme support.
 * Built with SignalX reactivity and DaisyUI styling.
 * 
 * @example
 * ```tsx
 * import { Button, Card, ThemeProvider } from '@sigx/daisyui';
 * 
 * const App = () => (
 *   <ThemeProvider defaultTheme="cupcake" darkMode>
 *     <Card>
 *       <Card.Body>
 *         <Button variant="primary">Click me</Button>
 *       </Card.Body>
 *     </Card>
 *   </ThemeProvider>
 * );
 * ```
 */

// Theme
export {
    ThemeProvider,
    ThemeSelector,
    ThemeToggle,
    ThemeConfigurator,
    ColorPicker,
    getCurrentTheme,
    setTheme,
    getPreferredTheme,
    initializeTheme,
    toggleDarkMode,
    hexToOklch,
    oklchToHex,
    generateThemeCSS,
    generateThemeJSON,
    parseThemeJSON,
    applyThemeToElement,
    applyThemeToDocument,
    saveThemeConfig,
    loadThemeConfig,
    cloneThemeConfig,
    generateRandomTheme,
    DEFAULT_THEME_CONFIG,
    THEME_PRESETS,
    COLOR_GROUPS,
} from './theme';
export type {
    DaisyTheme,
    ThemeConfig,
    ThemeProviderProps,
    ThemeSelectorProps,
    ThemeToggleProps,
    ThemeConfiguratorProps,
    ThemeConfigData,
    ThemeColors,
    ColorGroup,
    ColorPickerProps,
} from './theme';

// Button Components
export { Button, ButtonGroup } from './buttons';
export type { ButtonProps, ButtonVariant, ButtonSize, ButtonGroupProps } from './buttons';

// Form Components
export { Input, Textarea, Select, FormField, Toggle, Checkbox, Radio, Range, Fieldset, Label } from './forms';
export type {
    InputProps, InputSize, InputVariant, InputColor,
    TextareaProps, SelectProps, SelectOption, FormFieldProps,
    ToggleProps, ToggleSize, ToggleColor,
    CheckboxProps, CheckboxSize, CheckboxColor,
    RadioGroupProps, RadioItemProps, RadioSize, RadioColor, StandaloneRadioProps,
    RangeProps, RangeSize, RangeColor,
    FieldsetProps, FieldsetLegendProps, LabelProps
} from './forms';

// Layout Components
export { 
    Container, Card, Stack, Flex, Row, Col, Divider,
    Hero, HeroContent, Footer, Join, JoinItem, Link,
    Chat, ChatImage, ChatHeader, ChatBubble, ChatFooter,
    Artboard, Mockup, MockupBrowser, MockupCode, MockupPhone, MockupWindow,
    Carousel, CarouselItem, Mask
} from './layout';
export type { 
    ContainerProps, ContainerSize,
    CardProps, CardVariant, CardBodyProps, CardTitleProps, CardActionsProps, CardImageProps,
    StackProps, StackDirection,
    FlexProps, RowProps, ColProps, FlexSpacing, FlexAlign, FlexJustify,
    DividerProps,
    HeroProps, HeroContentProps, FooterProps, JoinProps, JoinItemProps,
    LinkProps, LinkColor,
    ChatProps, ChatImageProps, ChatHeaderProps, ChatBubbleProps, ChatBubbleColor, ChatFooterProps,
    ArtboardProps, ArtboardSize,
    MockupBrowserProps, MockupCodeProps, CodeLine, MockupPhoneProps, MockupWindowProps,
    CarouselProps, CarouselItemProps, CarouselItemData, MaskProps, MaskShape
} from './layout';

// Feedback Components
export { 
    Modal, Badge, Loading, Alert, Progress, Tooltip,
    Accordion,
    FileInput, Rating, Skeleton, Steps, Timeline, Toast, Kbd, RadialProgress, Countdown, Diff, Swap, Indicator,
    Status
} from './feedback';
export type { 
    ModalProps, ModalHeaderProps, ModalBodyProps, ModalActionsProps, ModalPosition, ModalAlign,
    BadgeProps, BadgeVariant, BadgeSize, BadgeStyle,
    LoadingProps, LoadingSize, LoadingType, LoadingColor,
    AlertProps, AlertVariant, AlertStyle, AlertLayout,
    ProgressProps, ProgressColor,
    TooltipProps, TooltipContentProps, TooltipPosition, TooltipColor,
    AccordionProps, AccordionVariant, AccordionType, AccordionItemProps, CollapseProps,
    FileInputProps, FileInputSize, FileInputColor,
    RatingProps, RatingSize, RatingMask, RatingColor,
    SkeletonProps,
    StepsProps, StepItem, StepProps, StepColor,
    TimelineProps, TimelineColor, TimelineItemProps, TimelineStartProps, TimelineMiddleProps, TimelineEndProps, TimelineHrProps,
    ToastProps, ToastPosition,
    KbdProps, KbdSize,
    RadialProgressProps, RadialProgressColor, 
    CountdownProps, CountdownDigits, DiffProps, DiffItem1Props, DiffItem2Props, DiffResizerProps, SwapProps, SwapOnProps, SwapOffProps, SwapIndeterminateProps,
    IndicatorProps, IndicatorItemProps, IndicatorPosition, IndicatorHorizontal, IndicatorVertical,
    StatusProps, StatusColor, StatusSize
} from './feedback';

// Navigation Components
export { Tabs, Menu, Dropdown, Drawer, Breadcrumbs, Navbar, Pagination } from './navigation';
export type { 
    TabsProps, Tab, TabsVariant, TabsSize, TabsPosition,
    MenuProps, MenuItemProps, MenuTitleProps, MenuSize,
    DropdownProps, DropdownPosition,
    DrawerProps,
    BreadcrumbsProps, BreadcrumbItem,
    NavbarProps,
    PaginationProps
} from './navigation';

// Data Components
export { Table, Avatar, Stats } from './data';
export type {
    TableProps, TableSize,
    TheadProps, TbodyProps, TfootProps, TrProps, ThProps, TdProps,
    AvatarProps, AvatarSize, AvatarShape, AvatarGroupProps,
    StatProps, StatsProps, StatTitleProps, StatValueProps, StatDescProps, StatFigureProps, StatActionsProps
} from './data';

// Typography Components
export { Text, Heading } from './typography';
export type { 
    TextProps, TextSize, TextWeight, TextColor, TextAlign, TextElement,
    HeadingProps, HeadingLevel,
} from './typography';

// Icon Component
export { Icon } from './shared/Icon';
export type { IconProps, IconSize } from './shared/Icon';
