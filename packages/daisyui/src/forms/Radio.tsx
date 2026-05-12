import { component, compound, defineProvide, defineInjectable, type Define } from 'sigx';

// ============================================
// Radio Component Types
// ============================================

export type RadioSize = "xs" | "sm" | "md" | "lg";
export type RadioColor = "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";

const radioSizeClasses: Record<RadioSize, string> = {
    xs: "radio-xs",
    sm: "radio-sm",
    md: "",
    lg: "radio-lg"
};

const radioColorClasses: Record<RadioColor, string> = {
    primary: "radio-primary",
    secondary: "radio-secondary",
    accent: "radio-accent",
    info: "radio-info",
    success: "radio-success",
    warning: "radio-warning",
    error: "radio-error"
};

// ============================================
// RadioGroup Context
// ============================================

interface RadioGroupContext {
    name: string;
    value: () => string | undefined;
    size?: RadioSize;
    color?: RadioColor;
    disabled?: boolean;
    onChange: (value: string) => void;
}

const useRadioGroup = defineInjectable<RadioGroupContext | null>(() => null);

// ============================================
// RadioGroup Component
// ============================================

export type RadioGroupProps =
    & Define.Model<string>
    & Define.Prop<"name", string>  // Required
    & Define.Prop<"size", RadioSize, false>
    & Define.Prop<"color", RadioColor, false>
    & Define.Prop<"disabled", boolean, false>
    & Define.Prop<"class", string, false>
    & Define.Prop<"direction", "horizontal" | "vertical", false>
    & Define.Slot<"default">
    & Define.Event<"change", string>;

/**
 * RadioGroup component that manages a group of Radio buttons.
 * Provides context to child Radio.Item components.
 * 
 * @example
 * ```tsx
 * const color = signal("red");
 * <Radio model={color} name="color">
 *   <Radio.Item value="red" label="Red" />
 *   <Radio.Item value="blue" label="Blue" />
 *   <Radio.Item value="green" label="Green" />
 * </Radio>
 * ```
 */
const _RadioGroup = component<RadioGroupProps>(({ props, slots, emit }) => {
    // Provide context to child Radio.Item components
    defineProvide(useRadioGroup, () => ({
        name: props.name!,  // name is required
        value: () => props.model?.value,
        size: props.size,
        color: props.color,
        disabled: props.disabled,
        onChange: (value: string) => {
            if (props.model) props.model.value = value;
            emit("change", value);
        }
    }));

    return () => {
        const directionClass = props.direction === "horizontal" 
            ? "flex flex-row gap-4" 
            : "flex flex-col gap-2";

        return (
            <div class={`${directionClass} ${props.class ?? ""}`}>
                {slots.default?.()}
            </div>
        );
    };
});

// ============================================
// RadioItem Component
// ============================================

export type RadioItemProps =
    & Define.Prop<"value", string>  // Required
    & Define.Prop<"label", string, false>
    & Define.Prop<"disabled", boolean, false>
    & Define.Prop<"class", string, false>;

/**
 * Individual radio button item. Must be used within a Radio (RadioGroup) component.
 */
const RadioItem = component<RadioItemProps>(({ props }) => {
    const context = useRadioGroup();

    function handleChange() {
        if (context && !props.disabled && !context.disabled) {
            context.onChange(props.value!);  // value is required
        }
    }

    return () => {
        if (!context) {
            console.warn("Radio.Item must be used within a Radio component");
            return null;
        }

        const sizeClass = radioSizeClasses[context.size ?? "md"];
        const colorClass = context.color ? radioColorClasses[context.color] : "";
        const isDisabled = props.disabled || context.disabled;
        const isChecked = context.value() === props.value;

        return (
            <label class={`flex items-center gap-2 cursor-pointer ${props.class ?? ""}`}>
                <input
                    type="radio"
                    name={context.name}
                    value={props.value}
                    class={`radio ${sizeClass} ${colorClass}`}
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={handleChange}
                />
                {props.label && <span class="label-text">{props.label}</span>}
            </label>
        );
    };
});

// ============================================
// Standalone Radio Component (without group)
// ============================================

export type StandaloneRadioProps =
    & Define.Prop<"checked", boolean, false>
    & Define.Prop<"name", string>
    & Define.Prop<"value", string>
    & Define.Prop<"size", RadioSize, false>
    & Define.Prop<"color", RadioColor, false>
    & Define.Prop<"disabled", boolean, false>
    & Define.Prop<"class", string, false>
    & Define.Prop<"label", string, false>
    & Define.Event<"change", string>;

/**
 * Standalone Radio button component (for use without RadioGroup).
 */
const StandaloneRadio = component<StandaloneRadioProps>(({ props, emit }) => {
    function handleChange(e: Event) {
        const value = (e.target as HTMLInputElement).value;
        emit("change", value);
    }

    return () => {
        const sizeClass = radioSizeClasses[props.size ?? "md"];
        const colorClass = props.color ? radioColorClasses[props.color] : "";

        return (
            <label class={`flex items-center gap-2 cursor-pointer ${props.class ?? ""}`}>
                <input
                    type="radio"
                    name={props.name}
                    value={props.value}
                    class={`radio ${sizeClass} ${colorClass}`}
                    checked={props.checked ?? false}
                    disabled={props.disabled}
                    onChange={handleChange}
                />
                {props.label && <span class="label-text">{props.label}</span>}
            </label>
        );
    };
});

// ============================================
// Compound Export
// ============================================

/**
 * Radio compound component with Item sub-component for grouped radio buttons.
 * 
 * @example Using compound pattern (recommended):
 * ```tsx
 * const color = signal("red");
 * <Radio model={color} name="color">
 *   <Radio.Item value="red" label="Red" />
 *   <Radio.Item value="blue" label="Blue" />
 * </Radio>
 * ```
 * 
 * @example Using standalone Radio buttons:
 * ```tsx
 * <Radio.Standalone name="color" value="red" label="Red" checked={color === "red"} onChange={setColor} />
 * <Radio.Standalone name="color" value="blue" label="Blue" checked={color === "blue"} onChange={setColor} />
 * ```
 */
export const Radio = compound(_RadioGroup, {
    Item: RadioItem,
    Standalone: StandaloneRadio,
});
