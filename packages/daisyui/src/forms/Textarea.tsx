import { component, type Define } from 'sigx';
import type { InputSize, InputVariant, InputColor } from "./Input";

// ============================================
// Textarea Component
// ============================================

export type TextareaProps = 
    & Define.Model<string>
    & Define.Prop<"name", string, false>
    & Define.Prop<"placeholder", string, false>
    & Define.Prop<"rows", number, false>
    & Define.Prop<"size", InputSize, false>
    & Define.Prop<"variant", InputVariant, false>
    & Define.Prop<"color", InputColor, false>
    & Define.Prop<"disabled", boolean, false>
    & Define.Prop<"autoComplete", string, false>
    & Define.Prop<"class", string, false>
    & Define.Event<"input", InputEvent>
    & Define.Event<"change", Event>;

/**
 * Textarea component with DaisyUI styling.
 * 
 * Uses the new model binding architecture for efficient two-way binding.
 * The model tuple is forwarded directly to the native textarea element.
 * 
 * @example
 * ```tsx
 * const form = signal({ bio: "" });
 * <Textarea model={() => form.bio} placeholder="Tell us about yourself" rows={5} />
 * ```
 */
export const Textarea = component<TextareaProps>(({ props, emit }) => {
    function getClasses() {
        const classes = ["textarea"];

        if (!props.class) classes.push("w-full");
        
        if (props.size === "xs") classes.push("textarea-xs");
        if (props.size === "sm") classes.push("textarea-sm");
        if (props.size === "lg") classes.push("textarea-lg");
        
        if (props.variant === "bordered") classes.push("textarea-bordered");
        if (props.variant === "ghost") classes.push("textarea-ghost");
        
        if (props.color) classes.push(`textarea-${props.color}`);
        if (props.class) classes.push(props.class);
        
        return classes.join(" ");
    }

    return () => (
        <textarea
            name={props.name}
            class={getClasses()}
            rows={props.rows ?? 3}
            placeholder={props.placeholder}
            disabled={props.disabled}
            autoComplete={props.autoComplete}
            model={props.model}
            onInput={(e) => emit("input", e)}
            onChange={(e) => emit("change", e)}
        />
    );
});
