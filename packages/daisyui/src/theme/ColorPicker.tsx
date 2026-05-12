import { component, type Define } from 'sigx';
import { oklchToHex, hexToOklch } from './theme-config';

// ============================================
// ColorPicker Component
// ============================================

export type ColorPickerProps =
    & Define.Prop<'value', string>
    & Define.Prop<'label', string, false>
    & Define.Prop<'class', string, false>
    & Define.Event<'change', string>;

/**
 * Color picker that works with oklch values.
 * Displays a native color input (hex) and converts to/from oklch.
 *
 * @example
 * ```tsx
 * <ColorPicker
 *     value={config.colors.primary}
 *     label="Primary"
 *     onChange={(oklch) => config.colors.primary = oklch}
 * />
 * ```
 */
export const ColorPicker = component<ColorPickerProps>(({ props, emit }) => {
    const handleInput = (e: Event) => {
        const hex = (e.target as HTMLInputElement).value;
        emit('change', hexToOklch(hex));
    };

    return () => {
        const hex = oklchToHex(props.value ?? 'oklch(0% 0 0)');

        return (
            <div class={`flex items-center gap-2 ${props.class ?? ''}`}>
                {props.label && (
                    <span class="text-xs text-base-content/70 w-20 shrink-0">{props.label}</span>
                )}
                <div class="flex items-center gap-1.5 flex-1">
                    <input
                        type="color"
                        value={hex}
                        onInput={handleInput}
                        class="w-8 h-8 rounded cursor-pointer border border-base-300 p-0.5"
                    />
                    <input
                        type="text"
                        value={hex}
                        onInput={(e: Event) => {
                            const val = (e.target as HTMLInputElement).value;
                            if (/^#[0-9a-fA-F]{6}$/.test(val)) {
                                emit('change', hexToOklch(val));
                            }
                        }}
                        class="input input-bordered input-xs font-mono w-24"
                        maxLength={7}
                    />
                </div>
            </div>
        );
    };
});
