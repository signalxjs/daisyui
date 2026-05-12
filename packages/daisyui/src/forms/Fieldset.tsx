import { component, compound, type Define } from 'sigx';

// ============================================
// Fieldset Component (compound)
// ============================================

export type FieldsetProps =
    & Define.Prop<"class", string, false>
    & Define.Slot<'default'>;

export type FieldsetLegendProps =
    & Define.Prop<"class", string, false>
    & Define.Slot<'default'>;

const FieldsetLegend = component<FieldsetLegendProps>(({ props, slots }) => {
    return () => (
        <legend class={`fieldset-legend ${props.class ?? ""}`.trim()}>
            {slots.default?.()}
        </legend>
    );
});

const _Fieldset = component<FieldsetProps>(({ props, slots }) => {
    return () => (
        <fieldset class={`fieldset ${props.class ?? ""}`.trim()}>
            {slots.default?.()}
        </fieldset>
    );
});

export const Fieldset = compound(_Fieldset, {
    Legend: FieldsetLegend,
});
