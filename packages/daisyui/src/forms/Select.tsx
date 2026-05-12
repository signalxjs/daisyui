import { component, type Define } from 'sigx';
import type { InputSize, InputVariant, InputColor } from "./Input";

// ============================================
// Select Component
// ============================================

export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export type SelectProps = 
    & Define.Model<string>
    & Define.Prop<"name", string, false>
    & Define.Prop<"options", SelectOption[], false>
    & Define.Prop<"placeholder", string, false>
    & Define.Prop<"size", InputSize, false>
    & Define.Prop<"variant", InputVariant, false>
    & Define.Prop<"color", InputColor, false>
    & Define.Prop<"disabled", boolean, false>
    & Define.Prop<"class", string, false>
    & Define.Slot<"default">
    & Define.Event<"change", string>;

const selectSizeClasses: Record<InputSize, string> = {
    xs: "select-xs",
    sm: "select-sm",
    md: "",
    lg: "select-lg"
};

const selectColorClasses: Record<InputColor, string> = {
    primary: "select-primary",
    secondary: "select-secondary",
    accent: "select-accent",
    info: "select-info",
    success: "select-success",
    warning: "select-warning",
    error: "select-error"
};

/**
 * Select component with DaisyUI styling and model binding support.
 * 
 * Uses the new model binding architecture for efficient two-way binding.
 * The model tuple is forwarded directly to the native select element.
 * 
 * @example
 * ```tsx
 * const form = signal({ choice: "" });
 * const options = [
 *   { value: "a", label: "Option A" },
 *   { value: "b", label: "Option B" }
 * ];
 * <Select model={() => form.choice} options={options} placeholder="Select an option" />
 * ```
 */
export const Select = component<SelectProps>(({ props, slots, emit }) => {
    function getClasses() {
        const classes = ["select"];

        if (!props.class) classes.push("w-full");
        
        if (props.size) {
            const sizeClass = selectSizeClasses[props.size];
            if (sizeClass) classes.push(sizeClass);
        }
        
        if (props.variant === "bordered") classes.push("select-bordered");
        if (props.variant === "ghost") classes.push("select-ghost");
        
        if (props.color) classes.push(selectColorClasses[props.color]);
        if (props.class) classes.push(props.class);
        
        return classes.join(" ");
    }

    return () => (
        <select
            name={props.name}
            class={getClasses()}
            disabled={props.disabled}
            model={props.model}
                onChange={(e) => emit("change", (e.target as HTMLSelectElement).value)}
            >
                {props.placeholder && (
                    <option value="" disabled>
                        {props.placeholder}
                    </option>
                )}
                {props.options?.map(opt => (
                    <option 
                        value={opt.value} 
                        disabled={opt.disabled}
                    >
                        {opt.label}
                    </option>
                ))}
                {slots.default?.()}
        </select>
    );
});
