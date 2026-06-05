import { component, JSXElement, type Define } from 'sigx';
import {
    resolveBoxStyle,
    type Spacing,
    type RadiusValue,
    type BackgroundColor,
    type SizeValue,
} from '../shared/styles';

export interface Tab {
    id: string;
    label: string | JSXElement;
    content?: string | JSXElement;
    disabled?: boolean;
}

export type TabsVariant = 'border' | 'lift' | 'box';
export type TabsSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TabsPosition = 'top' | 'bottom';

export type TabsProps = 
    & Define.Prop<'tabs', Tab[]>
    & Define.Prop<'activeTab', string>
    & Define.Prop<'variant', TabsVariant, false>
    & Define.Prop<'size', TabsSize, false>
    & Define.Prop<'position', TabsPosition, false>
    & Define.Prop<'name', string, false>
    // Styling props apply to the tab content panel (`.tab-content`),
    // overriding the daisyUI defaults bg-base-100 / p-6.
    & Define.Prop<'background', BackgroundColor, false>
    & Define.Prop<'rounded', RadiusValue | boolean, false>
    & Define.Prop<'width', SizeValue, false>
    & Define.Prop<'padding', Spacing, false>
    & Define.Prop<'contentClass', string, false>  // extra classes on the content panel
    & Define.Prop<'class', string, false>          // applied to the tablist root
    & Define.Event<'change', string>;

const tabsSizeClasses: Record<TabsSize, string> = {
    xs: 'tabs-xs',
    sm: 'tabs-sm',
    md: '',
    lg: 'tabs-lg',
    xl: 'tabs-xl'
};

let tabsCounter = 0;

/**
 * Tabs component with DaisyUI styling.
 * Uses radio inputs for native tab switching with content panels.
 * 
 * @example Basic tabs without content
 * ```tsx
 * const tabs = [
 *   { id: 'tab1', label: 'Tab 1' },
 *   { id: 'tab2', label: 'Tab 2' }
 * ];
 * <Tabs tabs={tabs} activeTab={activeTab.value} onChange={(id) => activeTab.value = id} />
 * ```
 * 
 * @example Tabs with content
 * ```tsx
 * const tabs = [
 *   { id: 'tab1', label: 'Tab 1', content: 'Content for tab 1' },
 *   { id: 'tab2', label: 'Tab 2', content: <div>Rich content for tab 2</div> }
 * ];
 * <Tabs tabs={tabs} activeTab={activeTab.value} onChange={(id) => activeTab.value = id} variant="lift" />
 * ```
 */
export const Tabs = component<TabsProps>(({ props, emit }) => {
    // Generate stable name once per component instance
    const instanceId = ++tabsCounter;
    const getTabGroupName = () => props.name || `sigx_tabs_${instanceId}`;
    
    const hasContent = () => props.tabs?.some(tab => tab.content != null);
    
    const getContainerClasses = () => {
        const classes = ['tabs'];
        
        // DaisyUI v5 uses tabs-border, tabs-lift, tabs-box
        if (props.variant === 'border') classes.push('tabs-border');
        if (props.variant === 'lift') classes.push('tabs-lift');
        if (props.variant === 'box') classes.push('tabs-box');
        
        // Position
        if (props.position === 'bottom') classes.push('tabs-bottom');
        
        if (props.size) {
            const sizeClass = tabsSizeClasses[props.size];
            if (sizeClass) classes.push(sizeClass);
        }
        
        if (props.class) classes.push(props.class);
        
        return classes.join(' ');
    };
    
    const getContentClassesAndStyle = () => {
        const classes = ['tab-content', 'border-base-300'];
        // daisyUI content defaults, overridable via the matching props.
        if (!props.background) classes.push('bg-base-100');
        if (!props.padding) classes.push('p-6');
        const box = resolveBoxStyle({
            background: props.background,
            rounded: props.rounded,
            width: props.width,
            padding: props.padding,
            class: props.contentClass,
        });
        if (box.className) classes.push(box.className);
        return { className: classes.join(' '), style: box.style };
    };

    return () => {
        const showContent = hasContent();

        // If tabs have content, use radio input pattern (DaisyUI's native tab content switching)
        if (showContent) {
            const content = getContentClassesAndStyle();
            return (
                <div role="tablist" class={getContainerClasses()}>
                    {props.tabs?.map(tab => [
                        <input
                            type="radio"
                            name={getTabGroupName()}
                            class={`tab ${tab.disabled ? 'tab-disabled' : ''}`}
                            aria-label={typeof tab.label === 'string' ? tab.label : tab.id}
                            checked={props.activeTab === tab.id}
                            disabled={tab.disabled}
                            onChange={() => !tab.disabled && emit('change', tab.id)}
                        />,
                        <div class={content.className} style={content.style}>
                            {tab.content}
                        </div>
                    ])}
                </div>
            );
        }
        
        // Without content, use simple button/link tabs
        return (
            <div role="tablist" class={getContainerClasses()}>
                {props.tabs?.map(tab => (
                    <button
                        type="button"
                        role="tab"
                        class={`tab ${props.activeTab === tab.id ? 'tab-active' : ''} ${tab.disabled ? 'tab-disabled' : ''}`}
                        disabled={tab.disabled}
                        onClick={() => !tab.disabled && emit('change', tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        );
    };
});
