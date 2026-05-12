import { component, compound, type Define } from 'sigx';

// ============================================
// Steps Types
// ============================================

export interface StepItem {
    id: string;
    label: string;
    color?: StepColor;
    content?: string;
}

export type StepColor = 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';

export type StepsProps =
    & Define.Prop<'items', StepItem[], false>
    & Define.Model<string>  // Current step ID
    & Define.Prop<'vertical', boolean, false>
    & Define.Prop<'horizontal', boolean, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>
    & Define.Event<'change', string>;

export type StepProps =
    & Define.Prop<'color', StepColor, false>
    & Define.Prop<'content', string, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>;

// ============================================
// Steps Component
// ============================================

const stepColorClasses: Record<StepColor, string> = {
    neutral: 'step-neutral',
    primary: 'step-primary',
    secondary: 'step-secondary',
    accent: 'step-accent',
    info: 'step-info',
    success: 'step-success',
    warning: 'step-warning',
    error: 'step-error'
};

/**
 * Steps component for multi-step processes.
 * Supports horizontal and vertical layouts with color customization.
 *
 * @example
 * ```tsx
 * // Using compound pattern
 * <Steps>
 *   <Steps.Step color="primary">Register</Steps.Step>
 *   <Steps.Step color="primary">Choose plan</Steps.Step>
 *   <Steps.Step>Purchase</Steps.Step>
 * </Steps>
 *
 * // Vertical layout
 * <Steps vertical>
 *   <Steps.Step color="success">Step 1</Steps.Step>
 *   <Steps.Step>Step 2</Steps.Step>
 * </Steps>
 * ```
 */
const _Steps = component<StepsProps>(({ props, slots, emit }) => {
    const getClasses = () => {
        const classes = ['steps'];
        if (props.vertical) classes.push('steps-vertical');
        if (props.horizontal) classes.push('steps-horizontal');
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    const isStepCompleted = (stepId: string) => {
        const stepIndex = props.items?.findIndex(s => s.id === stepId) ?? -1;
        const currentIndex = props.items?.findIndex(s => s.id === props.model?.value) ?? -1;
        return stepIndex <= currentIndex;
    };

    const handleStepClick = (stepId: string) => {
        if (props.model) props.model.value = stepId;
        emit('change', stepId);
    };

    return () => {
        // Using items prop takes priority
        if (props.items && props.items.length > 0) {
            return (
                <ul class={getClasses()}>
                    {props.items.map(step => {
                    const completed = isStepCompleted(step.id);
                    const colorClass = step.color && completed ? stepColorClasses[step.color] : (completed ? 'step-primary' : '');

                    return (
                        <li
                            class={`step ${colorClass}`}
                            data-content={step.content}
                            onClick={() => handleStepClick(step.id)}
                        >
                            {step.label}
                        </li>
                    );
                })}
                </ul>
            );
        }

        // Compound pattern (slots)
        return (
            <ul class={getClasses()}>
                {slots.default?.()}
            </ul>
        );
    };
});

// ============================================
// Step Component (Individual Step)
// ============================================

/**
 * Steps.Step component - Individual step item with customizable color.
 */
const Step = component<StepProps>(({ props, slots }) => {
    const getClasses = () => {
        const classes = ['step'];
        if (props.color) classes.push(stepColorClasses[props.color]);
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    return () => (
        <li
            class={getClasses()}
            data-content={props.content}
        >
            {slots.default?.()}
        </li>
    );
});

/**
 * Steps compound component with Step sub-component.
 */
export const Steps = compound(_Steps, {
    Step: Step,
});
