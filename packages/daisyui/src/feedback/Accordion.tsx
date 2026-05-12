import { component, compound, type Define } from 'sigx';

// ============================================
// Accordion Component
// ============================================

export interface AccordionItem {
    id: string;
    title: string;
    content: string;
}

export type AccordionVariant = 'arrow' | 'plus' | 'none';
export type AccordionType = 'radio' | 'details';

export type AccordionProps = 
    & Define.Prop<'items', AccordionItem[], false>
    & Define.Model<'activeId', string>
    & Define.Prop<'variant', AccordionVariant, false>
    & Define.Prop<'join', boolean, false>
    & Define.Prop<'type', AccordionType, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>
    & Define.Event<'change', string>;

/**
 * Accordion component with DaisyUI styling.
 * Only one item can be open at a time.
 * 
 * Supports two types:
 * - 'radio' (default): Uses hidden radio inputs for mutual exclusivity
 * - 'details': Uses native HTML details/summary elements (searchable content)
 * 
 * @example
 * ```tsx
 * const activeId = signal('');
 * const items = [
 *   { id: '1', title: 'Question 1', content: 'Answer 1' },
 *   { id: '2', title: 'Question 2', content: 'Answer 2' }
 * ];
 * <Accordion items={items} model:activeId={activeId} variant="arrow" />
 * ```
 */
const _Accordion = component<AccordionProps>(({ props, slots, emit }) => {
    const name = `accordion-${Math.random().toString(36).slice(2)}`;

    const getVariantClass = () => {
        if (props.variant === 'arrow') return 'collapse-arrow';
        if (props.variant === 'plus') return 'collapse-plus';
        return '';
    };

    const handleChange = (id: string, checked: boolean) => {
        if (checked) {
            if (props.activeId) props.activeId.value = id;
            emit('change', id);
        } else if (props.activeId?.value === id) {
            // When unchecked (details toggle), clear the active ID
            if (props.activeId) props.activeId.value = '';
            emit('change', '');
        }
    };

    const handleDetailsToggle = (id: string, e: Event) => {
        const details = e.target as HTMLDetailsElement;
        handleChange(id, details.open);
    };

    return () => {
        const variantClass = getVariantClass();
        const containerClass = props.join 
            ? 'join join-vertical bg-base-100 w-full' 
            : 'w-full space-y-2';
        const itemBorderClass = props.join 
            ? 'join-item border-base-300 border' 
            : 'border border-base-300';
        const useDetails = props.type === 'details';

        // Check if default slot has actual content
        const defaultContent = slots.default?.();
        const hasDefaultContent = Array.isArray(defaultContent) && defaultContent.length > 0;

        if (hasDefaultContent) {
            return (
                <div class={`${containerClass} ${props.class ?? ''}`}>
                    {defaultContent}
                </div>
            );
        }

        // Use details/summary elements for searchable content
        if (useDetails) {
            return (
                <div class={`${containerClass} ${props.class ?? ''}`}>
                    {props.items?.map(item => (
                        <details 
                            class={`collapse ${variantClass} bg-base-100 ${itemBorderClass}`}
                            name={name}
                            open={props.activeId?.value === item.id}
                            onToggle={(e) => handleDetailsToggle(item.id, e)}
                        >
                            <summary class="collapse-title font-semibold">
                                {item.title}
                            </summary>
                            <div class="collapse-content text-sm">
                                <p>{item.content}</p>
                            </div>
                        </details>
                    ))}
                </div>
            );
        }

        // Use radio inputs (default) for mutual exclusivity
        return (
            <div class={`${containerClass} ${props.class ?? ''}`}>
                {props.items?.map(item => (
                    <div class={`collapse ${variantClass} bg-base-100 ${itemBorderClass}`}>
                        <input 
                            type="radio" 
                            name={name}
                            checked={props.activeId?.value === item.id}
                            onChange={(e) => handleChange(item.id, (e.target as HTMLInputElement).checked)}
                        />
                        <div class="collapse-title font-semibold">
                            {item.title}
                        </div>
                        <div class="collapse-content text-sm">
                            <p>{item.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    };
});

// ============================================
// AccordionItem Component
// ============================================

export type AccordionItemType = 'radio' | 'details';

export type AccordionItemProps = 
    & Define.Prop<'title', string>
    & Define.Prop<'name', string, false>
    & Define.Prop<'open', boolean, false>
    & Define.Prop<'forceOpen', boolean, false>
    & Define.Prop<'forceClose', boolean, false>
    & Define.Prop<'variant', AccordionVariant, false>
    & Define.Prop<'type', AccordionItemType, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>
    & Define.Slot<'title'>
    & Define.Event<'toggle', boolean>;

/**
 * Individual accordion item with customizable content.
 * 
 * Supports two types:
 * - 'radio' (default): Uses hidden radio input for mutual exclusivity
 * - 'details': Uses native HTML details/summary element (searchable content)
 * 
 * @example
 * ```tsx
 * <AccordionItem title="Click to expand" variant="arrow">
 *   <p>Hidden content goes here</p>
 * </AccordionItem>
 * ```
 */
const _AccordionItem = component<AccordionItemProps>(({ props, slots, emit }) => {
    const getVariantClass = () => {
        if (props.variant === 'arrow') return 'collapse-arrow';
        if (props.variant === 'plus') return 'collapse-plus';
        return '';
    };

    const getForceClass = () => {
        if (props.forceOpen) return 'collapse-open';
        if (props.forceClose) return 'collapse-close';
        return '';
    };

    return () => {
        const variantClass = getVariantClass();
        const forceClass = getForceClass();
        const baseClass = `collapse ${variantClass} ${forceClass} bg-base-100 border border-base-300 ${props.class ?? ''}`;
        const useDetails = props.type === 'details';

        // Get title content - prefer slot if it has content, otherwise use prop
        const titleContent = slots.title?.();
        const hasSlotTitle = Array.isArray(titleContent) && titleContent.length > 0;
        const title = hasSlotTitle ? titleContent : props.title;

        if (useDetails) {
            return (
                <details 
                    class={baseClass}
                    name={props.name ?? 'accordion'}
                    open={props.open}
                    onToggle={(e) => emit('toggle', (e.target as HTMLDetailsElement).open)}
                >
                    <summary class="collapse-title font-semibold">
                        {title}
                    </summary>
                    <div class="collapse-content text-sm">
                        {slots.default?.()}
                    </div>
                </details>
            );
        }

        return (
            <div class={baseClass}>
                <input 
                    type="radio" 
                    name={props.name ?? 'accordion'}
                    checked={props.open}
                    onChange={(e) => emit('toggle', (e.target as HTMLInputElement).checked)}
                />
                <div class="collapse-title font-semibold">
                    {title}
                </div>
                <div class="collapse-content text-sm">
                    {slots.default?.()}
                </div>
            </div>
        );
    };
});

// ============================================
// Collapse Component (single collapsible)
// ============================================

export type CollapseProps = 
    & Define.Model<boolean>
    & Define.Prop<'title', string>
    & Define.Prop<'variant', AccordionVariant, false>
    & Define.Prop<'forceOpen', boolean, false>
    & Define.Prop<'forceClose', boolean, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>
    & Define.Slot<'title'>
    & Define.Event<'toggle', boolean>;

/**
 * Collapsible component for showing/hiding content.
 * Uses a checkbox input for independent toggling.
 * 
 * @example
 * ```tsx
 * const isOpen = signal(false);
 * <Collapse model={isOpen} title="Click to expand" variant="arrow">
 *   <p>Content that can be collapsed</p>
 * </Collapse>
 * ```
 */
const _Collapse = component<CollapseProps>(({ props, slots, emit }) => {
    const getVariantClass = () => {
        if (props.variant === 'arrow') return 'collapse-arrow';
        if (props.variant === 'plus') return 'collapse-plus';
        return '';
    };

    const getForceClass = () => {
        if (props.forceOpen) return 'collapse-open';
        if (props.forceClose) return 'collapse-close';
        return '';
    };

    const handleChange = (e: Event) => {
        const checked = (e.target as HTMLInputElement).checked;
        if (props.model) props.model.value = checked;
        emit('toggle', checked);
    };

    return () => {
        const variantClass = getVariantClass();
        const forceClass = getForceClass();
        
        // Get title content - prefer slot if it has content, otherwise use prop
        const titleContent = slots.title?.();
        const hasSlotTitle = Array.isArray(titleContent) && titleContent.length > 0;
        const title = hasSlotTitle ? titleContent : props.title;

        return (
            <div class={`collapse ${variantClass} ${forceClass} bg-base-100 border border-base-300 ${props.class ?? ''}`}>
                <input 
                    type="checkbox"
                    checked={props.model?.value ?? false}
                    onChange={handleChange}
                />
                <div class="collapse-title font-semibold">
                    {title}
                </div>
                <div class="collapse-content text-sm">
                    {slots.default?.()}
                </div>
            </div>
        );
    };
});

// ============================================
// Compound Exports
// ============================================

/**
 * Accordion with compound components for flexible usage.
 * 
 * @example Using items array:
 * ```tsx
 * <Accordion items={items} model:activeId={activeId} variant="arrow" />
 * ```
 * 
 * @example Using compound pattern:
 * ```tsx
 * <Accordion variant="arrow">
 *   <Accordion.Item title="Question 1">Answer 1</Accordion.Item>
 *   <Accordion.Item title="Question 2">Answer 2</Accordion.Item>
 * </Accordion>
 * ```
 */
export const Accordion = compound(_Accordion, {
    Item: _AccordionItem,
    Collapse: _Collapse,
});
