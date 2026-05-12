import { component, type Define } from 'sigx';

// ============================================
// FormField Component (Fieldset + Legend + Label wrapper)
// ============================================

export type FormFieldProps =
    & Define.Prop<"label", string, false>
    & Define.Prop<"error", string, false>
    & Define.Prop<"hint", string, false>
    & Define.Prop<"required", boolean, false>
    & Define.Prop<"class", string, false>
    & Define.Slot<"default">;

/**
 * FormField wrapper component that provides label, hint, and validation support
 * using daisyUI v5 fieldset/legend/label/validator-hint classes.
 *
 * @example
 * ```tsx
 * <FormField label="Email" error={emailError} required>
 *   <Input model={() => form.email} type="email" />
 * </FormField>
 * ```
 */
export const FormField = component<FormFieldProps>(({ props, slots }) => {
    return () => (
        <fieldset class={`fieldset ${props.class ?? ""}`.trim()}>
            {props.label && (
                <legend class="fieldset-legend">
                    {props.label}
                    {props.required && <span class="text-error ml-1">*</span>}
                </legend>
            )}
            {slots.default?.()}
            {props.error ? (
                <p class="validator-hint text-error">{props.error}</p>
            ) : props.hint ? (
                <p class="label">{props.hint}</p>
            ) : null}
        </fieldset>
    );
});
