import { component, type Define } from 'sigx';

// ============================================
// Input Component
// ============================================

export type InputSize = "xs" | "sm" | "md" | "lg";
export type InputVariant = "bordered" | "ghost";
export type InputColor = "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";

// Support both model binding and manual value+onInput
// Using string | number to support both text inputs and number inputs
export type InputProps =
    & Define.Model<string | number>
    & Define.Prop<"name", string, false>
    & Define.Prop<"placeholder", string, false>
    & Define.Prop<"type", "text" | "password" | "email" | "number" | "search" | "url", false>
    & Define.Prop<"size", InputSize, false>
    & Define.Prop<"variant", InputVariant, false>
    & Define.Prop<"color", InputColor, false>
    & Define.Prop<"disabled", boolean, false>
    & Define.Prop<"readOnly", boolean, false>
    & Define.Prop<"maxLength", number, false>
    & Define.Prop<"autoComplete", string, false>
    & Define.Prop<"class", string, false>
    & Define.Event<"input", InputEvent>
    & Define.Event<"change", Event>
    & Define.Event<"focus", FocusEvent>
    & Define.Event<"blur", FocusEvent>;

const inputSizeClasses: Record<InputSize, string> = {
    xs: "input-xs",
    sm: "input-sm",
    md: "",
    lg: "input-lg"
};

const inputColorClasses: Record<InputColor, string> = {
    primary: "input-primary",
    secondary: "input-secondary",
    accent: "input-accent",
    info: "input-info",
    success: "input-success",
    warning: "input-warning",
    error: "input-error"
};

/**
 * Input component with DaisyUI styling.
 * 
 * Uses the new model binding architecture for efficient two-way binding.
 * The model tuple is forwarded directly to the native input element.
 * 
 * @example
 * ```tsx
 * const form = signal({ name: "" });
 * <Input model={() => form.name} placeholder="Enter your name" variant="bordered" />
 * ```
 */
export const Input = component<InputProps>(({ props, emit }) => {
    function getClasses() {
        const classes = ["input"];

        // Only add w-full if no custom class overrides width
        if (!props.class) classes.push("w-full");

        if (props.size) {
            const sizeClass = inputSizeClasses[props.size];
            if (sizeClass) classes.push(sizeClass);
        }

        if (props.variant === "bordered") classes.push("input-bordered");
        if (props.variant === "ghost") classes.push("input-ghost");

        if (props.color) classes.push(inputColorClasses[props.color]);
        if (props.class) classes.push(props.class);

        return classes.join(" ");
    }

    return () => (
        <input
            type={props.type ?? "text"}
            name={props.name}
            class={getClasses()}
            placeholder={props.placeholder}
            disabled={props.disabled}
            readOnly={props.readOnly}
            maxLength={props.maxLength}
            autoComplete={props.autoComplete}
            model={props.model}
            onInput={(e) => emit("input", e)}
            onChange={(e) => emit("change", e)}
            onFocus={(e) => emit("focus", e)}
            onBlur={(e) => emit("blur", e)}
        />
    );
});
