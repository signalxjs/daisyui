import { component, type Define } from 'sigx';

// ============================================
// Label Component
// ============================================

export type LabelProps =
    & Define.Prop<"class", string, false>
    & Define.Slot<'default'>;

export const Label = component<LabelProps>(({ props, slots }) => {
    return () => (
        <p class={`label ${props.class ?? ""}`.trim()}>
            {slots.default?.()}
        </p>
    );
});
