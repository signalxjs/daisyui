import { component, type Define } from 'sigx';

// ============================================
// Toggle Component
// ============================================

export type ToggleSize = "xs" | "sm" | "md" | "lg";
export type ToggleColor = "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";

export type ToggleProps =
    & Define.Model<boolean>
    & Define.Prop<"name", string, false>
    & Define.Prop<"size", ToggleSize, false>
    & Define.Prop<"color", ToggleColor, false>
    & Define.Prop<"disabled", boolean, false>
    & Define.Prop<"class", string, false>
    & Define.Prop<"label", string, false>
    & Define.Event<"change", boolean>;

const toggleSizeClasses: Record<ToggleSize, string> = {
    xs: "toggle-xs",
    sm: "toggle-sm",
    md: "",
    lg: "toggle-lg"
};

const toggleColorClasses: Record<ToggleColor, string> = {
    primary: "toggle-primary",
    secondary: "toggle-secondary",
    accent: "toggle-accent",
    info: "toggle-info",
    success: "toggle-success",
    warning: "toggle-warning",
    error: "toggle-error"
};

/**
 * Toggle/switch component with DaisyUI styling.
 * 
 * @example
 * ```tsx
 * const enabled = signal(false);
 * <Toggle model={enabled} label="Enable notifications" color="primary" />
 * ```
 */
export const Toggle = component<ToggleProps>(({ props, emit }) => {
    return () => {
        const sizeClass = toggleSizeClasses[props.size ?? "md"];
        const colorClass = props.color ? toggleColorClasses[props.color] : "";

        return (
            <label class={`flex items-center gap-2 cursor-pointer ${props.class ?? ""}`}>
                <input
                    type="checkbox"
                    name={props.name}
                    class={`toggle ${sizeClass} ${colorClass}`}
                    disabled={props.disabled}
                    model={props.model}
                    onChange={(e: Event) => emit("change", (e.target as HTMLInputElement).checked)}
                />
                {props.label && <span class="label-text">{props.label}</span>}
            </label>
        );
    };
});
