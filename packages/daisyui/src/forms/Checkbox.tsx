import { component, type Define } from 'sigx';

// ============================================
// Checkbox Component
// ============================================

export type CheckboxSize = "xs" | "sm" | "md" | "lg" | "xl";
export type CheckboxColor = "primary" | "secondary" | "accent" | "neutral" | "info" | "success" | "warning" | "error";

export type CheckboxProps =
    & Define.Model<boolean>
    & Define.Prop<"name", string, false>
    & Define.Prop<"size", CheckboxSize, false>
    & Define.Prop<"color", CheckboxColor, false>
    & Define.Prop<"disabled", boolean, false>
    & Define.Prop<"indeterminate", boolean, false>
    & Define.Prop<"class", string, false>
    & Define.Prop<"label", string, false>
    & Define.Event<"change", boolean>;

const checkboxSizeClasses: Record<CheckboxSize, string> = {
    xs: "checkbox-xs",
    sm: "checkbox-sm",
    md: "checkbox-md",
    lg: "checkbox-lg",
    xl: "checkbox-xl"
};

const checkboxColorClasses: Record<CheckboxColor, string> = {
    primary: "checkbox-primary",
    secondary: "checkbox-secondary",
    accent: "checkbox-accent",
    neutral: "checkbox-neutral",
    info: "checkbox-info",
    success: "checkbox-success",
    warning: "checkbox-warning",
    error: "checkbox-error"
};

/**
 * Checkbox component with DaisyUI styling.
 *
 * @example
 * ```tsx
 * const agreed = signal(false);
 * <Checkbox model={agreed} label="I agree to the terms" color="primary" />
 * ```
 */
export const Checkbox = component<CheckboxProps>(({ props, emit }) => {
    return () => {
        const sizeClass = checkboxSizeClasses[props.size ?? "md"];
        const colorClass = props.color ? checkboxColorClasses[props.color] : "";

        const inputEl = (
            <input
                type="checkbox"
                name={props.name}
                class={`checkbox ${sizeClass} ${colorClass} ${props.class ?? ""}`.trim()}
                disabled={props.disabled}
                ref={(el: HTMLInputElement | null) => { if (el) el.indeterminate = !!props.indeterminate; }}
                model={props.model}
                onChange={(e: Event) => emit("change", (e.target as HTMLInputElement).checked)}
            />
        );

        if (props.label) {
            return (
                <label class="flex items-center gap-2 cursor-pointer">
                    {inputEl}
                    <span class="label-text">{props.label}</span>
                </label>
            );
        }

        return inputEl;
    };
});
