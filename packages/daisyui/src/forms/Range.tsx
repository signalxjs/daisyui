import { component, type Define } from 'sigx';

// ============================================
// Range Component
// ============================================

export type RangeSize = "xs" | "sm" | "md" | "lg";
export type RangeColor = "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";

export type RangeProps =
    & Define.Model<number>
    & Define.Prop<"name", string, false>
    & Define.Prop<"min", number, false>
    & Define.Prop<"max", number, false>
    & Define.Prop<"step", number, false>
    & Define.Prop<"size", RangeSize, false>
    & Define.Prop<"color", RangeColor, false>
    & Define.Prop<"disabled", boolean, false>
    & Define.Prop<"class", string, false>
    & Define.Event<"change", number>;

const rangeSizeClasses: Record<RangeSize, string> = {
    xs: "range-xs",
    sm: "range-sm",
    md: "",
    lg: "range-lg"
};

const rangeColorClasses: Record<RangeColor, string> = {
    primary: "range-primary",
    secondary: "range-secondary",
    accent: "range-accent",
    info: "range-info",
    success: "range-success",
    warning: "range-warning",
    error: "range-error"
};

/**
 * Range slider component with DaisyUI styling.
 * 
 * @example
 * ```tsx
 * const volume = signal(50);
 * <Range model={volume} min={0} max={100} step={1} color="primary" />
 * ```
 */
export const Range = component<RangeProps>(({ props, emit }) => {
    return () => {
        const sizeClass = rangeSizeClasses[props.size ?? "md"];
        const colorClass = props.color ? rangeColorClasses[props.color] : "";

        return (
            <input
                type="range"
                name={props.name}
                class={`range ${sizeClass} ${colorClass} ${props.class ?? ""}`}
                min={props.min ?? 0}
                max={props.max ?? 100}
                step={props.step ?? 1}
                disabled={props.disabled}
                model={props.model}
                onInput={(e: Event) => emit("change", parseFloat((e.target as HTMLInputElement).value))}
            />
        );
    };
});
