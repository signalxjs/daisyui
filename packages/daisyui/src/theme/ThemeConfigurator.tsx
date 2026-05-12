import { component, compound, signal, type Define } from 'sigx';
import type {
    ThemeConfigData,
    ThemeColors,
} from './theme-config';
import {
    COLOR_GROUPS,
    DEFAULT_THEME_CONFIG,
    THEME_PRESETS,
    cloneThemeConfig,
    generateThemeCSS,
    generateThemeJSON,
    parseThemeJSON,
    saveThemeConfig,
    loadThemeConfig,
    oklchToHex,
    hexToOklch,
    generateRandomTheme,
} from './theme-config';

// ============================================
// ThemeConfigurator - Main Component
// ============================================

export type ThemeConfiguratorProps =
    & Define.Model<ThemeConfigData>
    & Define.Prop<'config', ThemeConfigData, false>
    & Define.Prop<'baseTheme', string, false>
    & Define.Prop<'showPreview', boolean, false>
    & Define.Prop<'showExport', boolean, false>
    & Define.Prop<'persistKey', string, false>
    & Define.Prop<'class', string, false>
    & Define.Slot<'default'>
    & Define.Slot<'preview'>
    & Define.Event<'change', ThemeConfigData>;

const _ThemeConfigurator = component<ThemeConfiguratorProps>(({ props, slots, emit }) => {
    const getInitial = (): ThemeConfigData => {
        if (props.persistKey) {
            const loaded = loadThemeConfig(props.persistKey);
            if (loaded) return loaded;
        }
        if (props.config) return cloneThemeConfig(props.config);
        if (props.baseTheme && THEME_PRESETS[props.baseTheme]) {
            return cloneThemeConfig(THEME_PRESETS[props.baseTheme]);
        }
        return cloneThemeConfig(DEFAULT_THEME_CONFIG);
    };

    const internal = signal<ThemeConfigData>(getInitial());
    const showCssModal = signal(false);

    const getSource = (): any => props.model ?? internal;

    const replaceConfig = (config: ThemeConfigData) => {
        const source = getSource();
        source.$set(config);
        emit('change', cloneThemeConfig(config));
        if (props.persistKey) {
            saveThemeConfig(props.persistKey, config);
        }
    };

    const notifyChange = () => {
        const source = getSource();
        const snapshot = cloneThemeConfig(source as unknown as ThemeConfigData);
        emit('change', snapshot);
        if (props.persistKey) {
            saveThemeConfig(props.persistKey, snapshot);
        }
    };

    const update = (key: string, value: any) => {
        const source = getSource();
        (source as any)[key] = value;
        notifyChange();
    };

    const updateColor = (colorKey: keyof ThemeColors, value: string) => {
        const source = getSource();
        source.colors[colorKey] = value;
        notifyChange();
    };

    const handleRandom = () => {
        replaceConfig(generateRandomTheme());
    };

    return () => {
        const source = getSource();
        const config: ThemeConfigData = {
            name: source.name,
            colorScheme: source.colorScheme,
            colors: {
                base100: source.colors.base100,
                base200: source.colors.base200,
                base300: source.colors.base300,
                baseContent: source.colors.baseContent,
                primary: source.colors.primary,
                primaryContent: source.colors.primaryContent,
                secondary: source.colors.secondary,
                secondaryContent: source.colors.secondaryContent,
                accent: source.colors.accent,
                accentContent: source.colors.accentContent,
                neutral: source.colors.neutral,
                neutralContent: source.colors.neutralContent,
                info: source.colors.info,
                infoContent: source.colors.infoContent,
                success: source.colors.success,
                successContent: source.colors.successContent,
                warning: source.colors.warning,
                warningContent: source.colors.warningContent,
                error: source.colors.error,
                errorContent: source.colors.errorContent,
            },
            radiusBox: source.radiusBox,
            radiusField: source.radiusField,
            radiusSelector: source.radiusSelector,
            depth: source.depth,
            noise: source.noise,
            sizeField: source.sizeField,
            sizeSelector: source.sizeSelector,
            border: source.border,
        };

        // If user provides slot content, render that (custom layout)
        const slotContent = slots.default?.();
        if (slotContent && slotContent.length > 0) {
            return (
                <div class={`theme-configurator ${props.class ?? ''}`}>
                    {slotContent}
                </div>
            );
        }

        const styleVars = buildStyleVars(config);
        const cssOutput = generateThemeCSS(config);

        return (
            <div class={`theme-configurator flex h-[calc(100vh-8rem)] ${props.class ?? ''}`}>
                {/* Left Sidebar - Controls */}
                <div class="w-60 shrink-0 overflow-y-auto border-r border-base-300 pr-3 flex flex-col gap-5 pb-8"
                     style="scrollbar-width: thin;">
                    {/* Name & Scheme */}
                    <SidebarHeader
                        config={config}
                        updateField={update}
                        onRandom={handleRandom}
                        onShowCss={() => { showCssModal.value = true; }}
                    />

                    {/* Colors */}
                    <SidebarColors config={config} updateColor={updateColor} />

                    {/* Radius */}
                    <SidebarRadius config={config} updateField={update} />

                    {/* Effects */}
                    <SidebarEffects config={config} updateField={update} />

                    {/* Sizes */}
                    <SidebarSizes config={config} updateField={update} />

                    {/* Border */}
                    <SidebarBorder config={config} updateField={update} />

                    {/* Preset selector */}
                    <div>
                        <select
                            class="select select-bordered select-xs w-full"
                            onChange={(e: Event) => {
                                const key = (e.target as HTMLSelectElement).value;
                                if (THEME_PRESETS[key]) {
                                    replaceConfig(cloneThemeConfig(THEME_PRESETS[key]));
                                }
                            }}
                        >
                            <option value="" disabled selected>Load preset...</option>
                            {Object.keys(THEME_PRESETS).map(key => (
                                <option value={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Main Preview Area */}
                <div class="flex-1 overflow-y-auto pl-6" style="scrollbar-width: thin;">
                    <div class="bg-base-100 text-base-content rounded-xl p-6 min-h-full" style={styleVars}>
                        {renderPreviewContent(slots.preview)}
                    </div>
                </div>

                {/* CSS Modal */}
                {showCssModal.value && (
                    <CssModal
                        config={config}
                        cssOutput={cssOutput}
                        onClose={() => { showCssModal.value = false; }}
                        importConfig={replaceConfig}
                    />
                )}
            </div>
        );
    };
});

// ============================================
// Sidebar Header: Name, Scheme, Random, CSS
// ============================================

type SidebarHeaderProps =
    & Define.Prop<'config', ThemeConfigData>
    & Define.Prop<'updateField', (key: string, value: any) => void>
    & Define.Event<'random'>
    & Define.Event<'showCss'>;

const SidebarHeader = component<SidebarHeaderProps>(({ props, emit }) => {
    const editing = signal(false);

    return () => {
        const config = props.config!;
        const onUpdate = props.updateField!;

        return (
            <div class="flex flex-col gap-3">
                {/* Name & scheme row */}
                <div class="flex items-center gap-2">
                    <span class="text-xs text-base-content/60">Name</span>
                    {editing.value ? (
                        <input
                            type="text"
                            class="input input-bordered input-xs flex-1 font-medium"
                            value={config.name}
                            onInput={(e: Event) => onUpdate('name', (e.target as HTMLInputElement).value)}
                            onBlur={() => { editing.value = false; }}
                        />
                    ) : (
                        <span
                            class="font-medium text-sm cursor-pointer hover:text-primary flex-1"
                            onClick={() => { editing.value = true; }}
                        >{config.name}</span>
                    )}
                    <button
                        class="btn btn-ghost btn-xs btn-square"
                        onClick={() => { editing.value = !editing.value; }}
                    >
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                </div>

                {/* Color scheme toggle */}
                <div class="flex items-center gap-2">
                    <span class="text-xs text-base-content/60">Scheme</span>
                    <select
                        class="select select-bordered select-xs flex-1"
                        value={config.colorScheme}
                        onChange={(e: Event) => onUpdate('colorScheme', (e.target as HTMLSelectElement).value)}
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>

                {/* Action buttons */}
                <div class="flex gap-2">
                    <button class="btn btn-sm btn-outline flex-1 gap-1" onClick={() => emit('random')}>
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Random
                    </button>
                    <button class="btn btn-sm btn-outline flex-1 gap-1" onClick={() => emit('showCss')}>
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        CSS
                    </button>
                </div>
            </div>
        );
    };
});

// ============================================
// Sidebar Colors: Compact swatch grid
// ============================================

type SidebarColorsProps =
    & Define.Prop<'config', ThemeConfigData>
    & Define.Prop<'updateColor', (key: keyof ThemeColors, value: string) => void>;

const SidebarColors = component<SidebarColorsProps>(({ props }) => {
    const activePickerKey = signal<string | null>(null);

    return () => {
        const config = props.config!;
        const onUpdateColor = props.updateColor!;

        const handleColorInput = (key: keyof ThemeColors, e: Event) => {
            const hex = (e.target as HTMLInputElement).value;
            onUpdateColor(key, hexToOklch(hex));
        };

        return (
            <div>
                <div class="flex items-center gap-1 mb-3">
                    <svg class="w-3.5 h-3.5 text-base-content/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                    <span class="text-xs font-medium text-base-content/70">Change Colors</span>
                </div>

                {/* Base colors: 4 swatches in a row */}
                <div class="flex gap-1.5 mb-1">
                    {[
                        { key: 'base100' as keyof ThemeColors, label: '100' },
                        { key: 'base200' as keyof ThemeColors, label: '200' },
                        { key: 'base300' as keyof ThemeColors, label: '300' },
                        { key: 'baseContent' as keyof ThemeColors, label: 'A' },
                    ].map(item => (
                        <ColorSwatch
                            color={config.colors[item.key]}
                            label={item.label}
                            isContent={item.key === 'baseContent'}
                            active={activePickerKey.value === item.key}
                            onSelect={() => { activePickerKey.value = activePickerKey.value === item.key ? null : item.key; }}
                            onColorChange={(e: Event) => handleColorInput(item.key, e)}
                        />
                    ))}
                </div>
                <div class="text-xs text-base-content/50 mb-3">base</div>

                {/* Semantic color pairs: 2 columns */}
                <div class="grid grid-cols-2 gap-x-3 gap-y-1">
                    {COLOR_GROUPS.filter(g => g.id !== 'base').map(group => (
                        <div class="mb-2">
                            <div class="flex gap-1.5 mb-0.5">
                                <ColorSwatch
                                    color={config.colors[group.mainKey]}
                                    active={activePickerKey.value === group.mainKey}
                                    onSelect={() => { activePickerKey.value = activePickerKey.value === group.mainKey ? null : group.mainKey; }}
                                    onColorChange={(e: Event) => handleColorInput(group.mainKey, e)}
                                />
                                <ColorSwatch
                                    color={config.colors[group.contentKey]}
                                    isContent={true}
                                    active={activePickerKey.value === group.contentKey}
                                    onSelect={() => { activePickerKey.value = activePickerKey.value === group.contentKey ? null : group.contentKey; }}
                                    onColorChange={(e: Event) => handleColorInput(group.contentKey, e)}
                                />
                            </div>
                            <div class="text-xs text-base-content/50">{group.label.toLowerCase()}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };
});

// ============================================
// ColorSwatch: Compact clickable color swatch
// ============================================

type ColorSwatchProps =
    & Define.Prop<'color', string>
    & Define.Prop<'label', string, false>
    & Define.Prop<'isContent', boolean, false>
    & Define.Prop<'active', boolean, false>
    & Define.Event<'select'>
    & Define.Event<'colorChange', Event>;

const ColorSwatch = component<ColorSwatchProps>(({ props, emit }) => {
    return () => {
        const hex = oklchToHex(props.color ?? 'oklch(0% 0 0)');
        const isContent = props.isContent;
        // Determine if color is light or dark for contrast text
        const parsed = hex.replace('#', '');
        const r = parseInt(parsed.substring(0, 2), 16);
        const g = parseInt(parsed.substring(2, 4), 16);
        const b = parseInt(parsed.substring(4, 6), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        const textColor = luminance > 0.5 ? '#000000' : '#ffffff';
        // Use a visible border: light border for dark colors, dark for light
        const borderColor = luminance > 0.5 ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.2)';

        return (
            <div class="relative">
                <label
                    class={`block w-10 h-10 rounded-lg cursor-pointer transition-all flex items-center justify-center font-bold text-sm
                        ${props.active ? 'ring-2 ring-primary ring-offset-1 ring-offset-base-100' : 'hover:brightness-110'}`}
                    style={`background-color: ${hex}; border: 2px solid ${borderColor};`}
                >
                    {isContent ? (
                        <span style={`color: ${textColor};`} class="font-bold text-base">A</span>
                    ) : (
                        props.label ? <span class="text-[10px] font-medium" style={`color: ${textColor};`}>{props.label}</span> : null
                    )}
                    <input
                        type="color"
                        value={hex}
                        class="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        onInput={(e: Event) => emit('colorChange', e)}
                    />
                </label>
            </div>
        );
    };
});

// ============================================
// Sidebar Radius: Visual shape previews + sliders
// ============================================

type SidebarRadiusProps =
    & Define.Prop<'config', ThemeConfigData>
    & Define.Prop<'updateField', (key: string, value: any) => void>;

const SidebarRadius = component<SidebarRadiusProps>(({ props }) => {
    return () => {
        const config = props.config!;
        const onUpdate = props.updateField!;

        return (
            <div>
                <div class="flex items-center gap-1 mb-3">
                    <svg class="w-3.5 h-3.5 text-base-content/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
                    </svg>
                    <span class="text-xs font-medium text-base-content/70">Radius</span>
                </div>

                {[
                    { key: 'radiusBox', label: 'Boxes', hint: 'card, modal, alert', value: config.radiusBox },
                    { key: 'radiusField', label: 'Fields', hint: 'button, input, select, tab', value: config.radiusField },
                    { key: 'radiusSelector', label: 'Selectors', hint: 'checkbox, toggle, badge', value: config.radiusSelector },
                ].map(item => (
                    <div class="mb-2">
                        <div class="text-xs font-medium mb-1">{item.label}</div>
                        <div class="text-[10px] text-base-content/50 mb-1">{item.hint}</div>
                        {/* Shape previews */}
                        <div class="flex gap-1 mb-1.5">
                            {[0, 0.25, 0.5, 1, 1.5, 2].map(r => (
                                <div
                                    class={`w-6 h-6 border cursor-pointer transition-all
                                        ${Math.abs(item.value - r) < 0.01
                                            ? 'border-primary bg-primary/20'
                                            : 'border-base-300 bg-base-200/50 hover:border-base-content/40'}`}
                                    style={`border-radius: ${r}rem;`}
                                    onClick={() => onUpdate(item.key, r)}
                                />
                            ))}
                        </div>
                        <input
                            type="range"
                            class="range range-primary range-xs w-full"
                            min={0} max={2} step={0.125}
                            value={item.value}
                            onInput={(e: Event) => onUpdate(item.key, parseFloat((e.target as HTMLInputElement).value))}
                        />
                    </div>
                ))}
            </div>
        );
    };
});

// ============================================
// Sidebar Effects
// ============================================

type SidebarEffectsProps =
    & Define.Prop<'config', ThemeConfigData>
    & Define.Prop<'updateField', (key: string, value: any) => void>;

const SidebarEffects = component<SidebarEffectsProps>(({ props }) => {
    return () => {
        const config = props.config!;
        const onUpdate = props.updateField!;

        return (
            <div>
                <div class="flex items-center gap-1 mb-3">
                    <svg class="w-3.5 h-3.5 text-base-content/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    <span class="text-xs font-medium text-base-content/70">Effects</span>
                </div>
                <div class="flex flex-col gap-2">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            class="toggle toggle-primary toggle-xs"
                            checked={config.depth === 1}
                            onChange={(e: Event) => onUpdate('depth', (e.target as HTMLInputElement).checked ? 1 : 0)}
                        />
                        <span class="text-xs">Depth</span>
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            class="toggle toggle-primary toggle-xs"
                            checked={config.noise === 1}
                            onChange={(e: Event) => onUpdate('noise', (e.target as HTMLInputElement).checked ? 1 : 0)}
                        />
                        <span class="text-xs">Noise</span>
                    </label>
                </div>
            </div>
        );
    };
});

// ============================================
// Sidebar Sizes
// ============================================

type SidebarSizesProps =
    & Define.Prop<'config', ThemeConfigData>
    & Define.Prop<'updateField', (key: string, value: any) => void>;

const SidebarSizes = component<SidebarSizesProps>(({ props }) => {
    return () => {
        const config = props.config!;
        const onUpdate = props.updateField!;

        return (
            <div>
                <span class="text-xs font-medium text-base-content/70">Sizes</span>
                <div class="mt-2 flex flex-col gap-2">
                    <SidebarRange label="Fields" value={config.sizeField} min={0.125} max={0.5} step={0.0625} unit="rem"
                        handler={(v: number) => onUpdate('sizeField', v)} />
                    <SidebarRange label="Selectors" value={config.sizeSelector} min={0.125} max={0.5} step={0.0625} unit="rem"
                        handler={(v: number) => onUpdate('sizeSelector', v)} />
                </div>
            </div>
        );
    };
});

// ============================================
// Sidebar Border
// ============================================

type SidebarBorderProps =
    & Define.Prop<'config', ThemeConfigData>
    & Define.Prop<'updateField', (key: string, value: any) => void>;

const SidebarBorder = component<SidebarBorderProps>(({ props }) => {
    return () => {
        const config = props.config!;
        const onUpdate = props.updateField!;

        return (
            <div>
                <span class="text-xs font-medium text-base-content/70">Border</span>
                <div class="mt-2">
                    <SidebarRange label="Width" value={config.border} min={0} max={4} step={0.5} unit="px"
                        handler={(v: number) => onUpdate('border', v)} />
                </div>
            </div>
        );
    };
});

// ============================================
// SidebarRange: Compact range input
// ============================================

type SidebarRangeProps =
    & Define.Prop<'label', string>
    & Define.Prop<'value', number>
    & Define.Prop<'min', number>
    & Define.Prop<'max', number>
    & Define.Prop<'step', number>
    & Define.Prop<'unit', string, false>
    & Define.Prop<'handler', (value: number) => void>;

const SidebarRange = component<SidebarRangeProps>(({ props }) => {
    return () => (
        <div>
            <div class="flex justify-between">
                <span class="text-xs text-base-content/60">{props.label}</span>
                <span class="text-xs font-mono text-base-content/60">{props.value}{props.unit ?? ''}</span>
            </div>
            <input
                type="range"
                class="range range-primary range-xs w-full"
                min={props.min} max={props.max} step={props.step}
                value={props.value}
                onInput={(e: Event) => props.handler?.(parseFloat((e.target as HTMLInputElement).value))}
            />
        </div>
    );
});

// ============================================
// CSS Modal
// ============================================

type CssModalProps =
    & Define.Prop<'config', ThemeConfigData>
    & Define.Prop<'cssOutput', string>
    & Define.Prop<'importConfig', (config: ThemeConfigData) => void, false>
    & Define.Event<'close'>;

const CssModal = component<CssModalProps>(({ props, emit }) => {
    const exportMode = signal<string>('css');
    const copied = signal(false);
    const importError = signal('');

    const getOutput = () => {
        return exportMode.value === 'css'
            ? props.cssOutput!
            : generateThemeJSON(props.config!);
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(getOutput());
            copied.value = true;
            setTimeout(() => { copied.value = false; }, 2000);
        } catch { /* silent */ }
    };

    const handleImport = () => {
        const textarea = document.querySelector('.theme-configurator-import') as HTMLTextAreaElement;
        if (!textarea) return;
        const parsed = parseThemeJSON(textarea.value);
        if (parsed && props.importConfig) {
            props.importConfig(parsed);
            importError.value = '';
            emit('close');
        } else {
            importError.value = 'Invalid JSON theme config';
        }
    };

    return () => (
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => emit('close')}>
            <div class="bg-base-100 rounded-xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden" onClick={(e: Event) => e.stopPropagation()}>
                <div class="flex items-center justify-between p-4 border-b border-base-300">
                    <h3 class="font-semibold">Theme Code</h3>
                    <div class="flex gap-2 items-center">
                        <div class="flex gap-1">
                            <button
                                class={`btn btn-xs ${exportMode.value === 'css' ? 'btn-primary' : 'btn-ghost'}`}
                                onClick={() => { exportMode.value = 'css'; }}
                            >CSS</button>
                            <button
                                class={`btn btn-xs ${exportMode.value === 'json' ? 'btn-primary' : 'btn-ghost'}`}
                                onClick={() => { exportMode.value = 'json'; }}
                            >JSON</button>
                        </div>
                        <button class="btn btn-ghost btn-sm btn-square" onClick={() => emit('close')}>✕</button>
                    </div>
                </div>
                <div class="p-4 overflow-y-auto max-h-[50vh]">
                    <div class="relative">
                        <pre class="bg-base-200 rounded-lg p-4 text-xs overflow-x-auto whitespace-pre-wrap font-mono">{getOutput()}</pre>
                        <button class="btn btn-xs btn-primary absolute top-2 right-2" onClick={handleCopy}>
                            {copied.value ? '✓ Copied' : 'Copy'}
                        </button>
                    </div>
                </div>
                <div class="p-4 border-t border-base-300">
                    <details class="collapse collapse-arrow bg-base-200/50">
                        <summary class="collapse-title text-xs font-medium py-2 min-h-0">Import JSON</summary>
                        <div class="collapse-content">
                            <textarea
                                class="textarea textarea-bordered w-full text-xs font-mono theme-configurator-import"
                                rows={3}
                                placeholder="Paste JSON theme config here..."
                            />
                            {importError.value && <p class="text-error text-xs mt-1">{importError.value}</p>}
                            <button class="btn btn-sm btn-primary mt-2" onClick={handleImport}>Import</button>
                        </div>
                    </details>
                </div>
            </div>
        </div>
    );
});

// ============================================
// Default Rich Component Showcase
// ============================================

const DefaultPreview = component(() => {
    return () => (
        <div>
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-bold">Components Demo</h2>
            </div>

            <div class="columns-1 md:columns-2 xl:columns-3 gap-4 space-y-4" style="--card-p: 0.5rem;">
                {/* Card: Checklist */}
                <div class="card bg-base-100 shadow-sm border border-base-300 break-inside-avoid">
                    <div class="card-body gap-1">
                        <div class="flex items-center justify-between mb-1">
                            <h3 class="font-semibold text-sm flex items-center gap-1.5">
                                <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                Preview
                            </h3>
                            <span class="text-xs text-primary cursor-pointer">more</span>
                        </div>
                        <div class="flex flex-wrap gap-1 mb-2">
                            <span class="badge badge-sm gap-1">Shoes <button class="btn btn-ghost btn-xs p-0 h-auto min-h-0">×</button></span>
                            <span class="badge badge-sm gap-1">Bags <button class="btn btn-ghost btn-xs p-0 h-auto min-h-0">×</button></span>
                        </div>
                        <div class="flex flex-col gap-2">
                            <label class="flex items-center justify-between cursor-pointer">
                                <div class="flex items-center gap-2">
                                    <input type="checkbox" checked class="checkbox checkbox-primary checkbox-sm" />
                                    <span class="text-sm">Hoodies</span>
                                </div>
                                <span class="badge badge-primary badge-sm">25</span>
                            </label>
                            <label class="flex items-center justify-between cursor-pointer">
                                <div class="flex items-center gap-2">
                                    <input type="checkbox" checked class="checkbox checkbox-primary checkbox-sm" />
                                    <span class="text-sm">Bags</span>
                                </div>
                                <span class="badge badge-primary badge-sm">3</span>
                            </label>
                            <label class="flex items-center justify-between cursor-pointer">
                                <div class="flex items-center gap-2">
                                    <input type="checkbox" class="checkbox checkbox-sm" />
                                    <span class="text-sm">Shoes</span>
                                </div>
                                <span class="badge badge-error badge-sm">8</span>
                            </label>
                            <label class="flex items-center justify-between cursor-pointer">
                                <div class="flex items-center gap-2">
                                    <input type="checkbox" class="checkbox checkbox-sm" />
                                    <span class="text-sm">Accessories</span>
                                </div>
                                <span class="badge badge-sm">4</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Card: Chart / Stats visualization */}
                <div class="card bg-base-100 shadow-sm border border-base-300 break-inside-avoid">
                    <div class="card-body gap-1">
                        {/* Faux bar chart */}
                        <div class="flex items-end gap-0.5 h-24 mb-2">
                            {[40, 25, 60, 30, 80, 45, 70, 35, 90, 50, 65, 85, 40, 55, 75].map(h => (
                                <div class="flex-1 bg-primary rounded-t-sm" style={`height: ${h}%; opacity: ${0.4 + h/150};`} />
                            ))}
                        </div>
                        <p class="text-sm">Sales volume reached $12,450 this week, showing a 15% increase from the previous period.</p>
                        <div class="flex gap-2 mt-1">
                            <button class="btn btn-outline btn-sm flex-1">Charts</button>
                            <button class="btn btn-outline btn-sm flex-1">Details</button>
                        </div>
                    </div>
                </div>

                {/* Card: Audio Player */}
                <div class="card bg-base-100 shadow-sm border border-base-300 break-inside-avoid">
                    <div class="card-body gap-1 flex flex-col items-center gap-2">
                        <div class="flex items-center gap-4">
                            <button class="btn btn-ghost btn-sm btn-circle">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg>
                            </button>
                            <button class="btn btn-primary btn-circle">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            </button>
                            <button class="btn btn-ghost btn-sm btn-circle">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>
                            </button>
                        </div>
                        <div class="text-center">
                            <div class="font-semibold text-sm">PM Zoomcall ASMR</div>
                            <div class="text-xs text-base-content/60">Project Manager talking for 2 hours</div>
                        </div>
                        <div class="w-full">
                            <input type="range" class="range range-primary range-xs w-full" value={35} min={0} max={100} />
                            <div class="flex justify-between text-[10px] text-base-content/50 mt-0.5">
                                <span>13:39</span>
                                <span>120:00</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card: Calendar */}
                <div class="card bg-base-100 shadow-sm border border-base-300 break-inside-avoid">
                    <div class="card-body gap-1">
                        <div class="flex justify-between text-xs mb-2">
                            {['12\nM', '13\nT', '14\nW', '15\nT', '16\nF', '17\nS', '18\nS'].map((d, i) => {
                                const [num, day] = d.split('\n');
                                return (
                                    <div class={`text-center px-1.5 py-1 rounded-lg ${i === 2 ? 'bg-primary text-primary-content' : ''}`}>
                                        <div class="font-medium">{num}</div>
                                        <div class="text-[10px] text-base-content/60">{day}</div>
                                    </div>
                                );
                            })}
                        </div>
                        <div class="border-t border-base-300 border-dashed my-2" />
                        <div class="relative mb-2">
                            <svg class="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            <input type="text" placeholder="Search for events" class="input input-bordered input-sm w-full pl-8 text-xs" />
                        </div>
                        <label class="flex items-center gap-2 cursor-pointer mb-2">
                            <input type="checkbox" class="toggle toggle-primary toggle-sm" checked />
                            <span class="text-xs">Show all day events</span>
                        </label>
                        <div class="bg-base-200/50 rounded-lg p-2">
                            <div class="flex justify-between items-start">
                                <div>
                                    <div class="font-semibold text-sm">Team Sync Meeting</div>
                                    <div class="text-xs text-base-content/60">Weekly product review with design and development teams</div>
                                </div>
                                <span class="text-xs text-base-content/50">1h</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card: Page Score */}
                <div class="card bg-base-100 shadow-sm border border-base-300 break-inside-avoid">
                    <div class="card-body gap-1">
                        <h3 class="font-semibold text-sm">Page Score</h3>
                        <div class="flex items-center justify-between">
                            <div>
                                <span class="text-4xl font-bold">91</span>
                                <span class="text-sm text-base-content/60">/100</span>
                                <div class="flex items-center gap-1 mt-1">
                                    <div class="w-2 h-2 rounded-full bg-success" />
                                    <span class="text-xs text-base-content/60">All good</span>
                                </div>
                            </div>
                            <div class="radial-progress text-primary" style="--value:91; --size:3.5rem; --thickness:4px;" role="progressbar">
                                <span class="text-xs font-bold">91</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card: Terminal Mockup */}
                <div class="card bg-base-100 shadow-sm border border-base-300 break-inside-avoid">
                    <div class="card-body gap-1">
                        <div class="bg-neutral text-neutral-content rounded-lg p-3">
                            <div class="flex gap-1 mb-2">
                                <div class="w-2 h-2 rounded-full bg-base-content/30" />
                                <div class="w-2 h-2 rounded-full bg-base-content/30" />
                                <div class="w-2 h-2 rounded-full bg-base-content/30" />
                            </div>
                            <div class="font-mono text-xs space-y-1">
                                <div><span class="text-success">$</span> npm i daisyui</div>
                                <div class="text-base-content/60">&gt; installing...</div>
                                <div class="text-base-content/60">&gt; Done!</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card: Tabs */}
                <div class="card bg-base-100 shadow-sm border border-base-300 break-inside-avoid">
                    <div class="card-body gap-1">
                        <div role="tablist" class="tabs tabs-bordered">
                            <a role="tab" class="tab">Tab 1</a>
                            <a role="tab" class="tab tab-active">Tab 2</a>
                            <a role="tab" class="tab">Tab 3</a>
                        </div>
                        <div class="p-3 bg-base-200/50 rounded-lg mt-2">
                            <p class="text-sm">Tab content 2</p>
                        </div>
                    </div>
                </div>

                {/* Card: Recent orders */}
                <div class="card bg-base-100 shadow-sm border border-base-300 break-inside-avoid">
                    <div class="card-body gap-1">
                        <h3 class="font-semibold text-sm flex items-center gap-1">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                            Recent orders
                        </h3>
                        <div class="flex flex-col gap-2 mt-1">
                            {[
                                { name: 'Charlie Chapman', status: 'Send', color: 'badge-primary' },
                                { name: 'Howard Hudson', status: 'Failed', color: 'badge-error' },
                                { name: 'Fiona Fisher', status: 'In progress', color: 'badge-info' },
                                { name: 'Nick Nelson', status: 'Completed', color: 'badge-success' },
                                { name: 'Amanda Anderson', status: 'Completed', color: 'badge-success' },
                            ].map(order => (
                                <div class="flex items-center justify-between">
                                    <span class="text-sm">{order.name}</span>
                                    <span class={`badge badge-sm ${order.color}`}>{order.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Card: Revenue Stat */}
                <div class="card bg-base-100 shadow-sm border border-base-300 break-inside-avoid">
                    <div class="card-body gap-1">
                        <h3 class="font-semibold text-sm">March Revenue</h3>
                        <div class="text-3xl font-bold">$32,400</div>
                        <div class="flex items-center gap-1 text-xs text-success">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                            21% more than last month
                        </div>
                    </div>
                </div>

                {/* Card: Price Range */}
                <div class="card bg-base-100 shadow-sm border border-base-300 break-inside-avoid">
                    <div class="card-body gap-1">
                        <h3 class="font-semibold text-sm flex items-center gap-1">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            Price range
                        </h3>
                        <div class="text-5xl font-bold text-center my-2">50</div>
                        <input type="range" class="range range-primary" value={50} min={0} max={100} />
                    </div>
                </div>

                {/* Card: Alerts */}
                <div class="card bg-base-100 shadow-sm border border-base-300 break-inside-avoid">
                    <div class="card-body gap-1">
                        <div class="alert alert-info py-2 px-3">
                            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            <span class="text-xs">There are 9 new messages</span>
                        </div>
                        <div class="alert alert-success py-2 px-3">
                            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span class="text-xs">Verification process completed</span>
                        </div>
                        <div class="alert alert-warning py-2 px-3">
                            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            <span class="text-xs">Click to verify your email</span>
                        </div>
                        <div class="alert alert-error py-2 px-3">
                            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            <div class="flex-1 flex justify-between items-center">
                                <span class="text-xs">Access denied</span>
                                <span class="text-xs font-medium cursor-pointer">Support</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card: Buttons showcase */}
                <div class="card bg-base-100 shadow-sm border border-base-300 break-inside-avoid">
                    <div class="card-body gap-1">
                        <h3 class="font-semibold text-sm">Buttons</h3>
                        <div class="flex flex-wrap gap-2">
                            <button class="btn btn-primary btn-sm">Primary</button>
                            <button class="btn btn-secondary btn-sm">Secondary</button>
                            <button class="btn btn-accent btn-sm">Accent</button>
                            <button class="btn btn-neutral btn-sm">Neutral</button>
                            <button class="btn btn-ghost btn-sm">Ghost</button>
                            <button class="btn btn-link btn-sm">Link</button>
                        </div>
                        <div class="flex flex-wrap gap-2 mt-1">
                            <button class="btn btn-outline btn-primary btn-sm">Outline</button>
                            <button class="btn btn-outline btn-secondary btn-sm">Outline</button>
                            <button class="btn btn-outline btn-accent btn-sm">Outline</button>
                        </div>
                    </div>
                </div>

                {/* Card: Form Elements */}
                <div class="card bg-base-100 shadow-sm border border-base-300 break-inside-avoid">
                    <div class="card-body gap-1">
                        <h3 class="font-semibold text-sm flex items-center gap-1">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            Write a new post
                        </h3>
                        <input type="text" placeholder="Post title..." class="input input-bordered input-sm w-full" />
                        <textarea class="textarea textarea-bordered text-xs" rows={2} placeholder="What's on your mind?" />
                        <div class="flex justify-end gap-2">
                            <button class="btn btn-ghost btn-sm">Cancel</button>
                            <button class="btn btn-primary btn-sm">Publish</button>
                        </div>
                    </div>
                </div>

                {/* Card: Badges & Progress */}
                <div class="card bg-base-100 shadow-sm border border-base-300 break-inside-avoid">
                    <div class="card-body gap-1">
                        <h3 class="font-semibold text-sm">Status Overview</h3>
                        <div class="flex flex-wrap gap-2 mb-2">
                            <span class="badge badge-primary">Primary</span>
                            <span class="badge badge-secondary">Secondary</span>
                            <span class="badge badge-accent">Accent</span>
                            <span class="badge badge-info">Info</span>
                            <span class="badge badge-success">Success</span>
                            <span class="badge badge-warning">Warning</span>
                            <span class="badge badge-error">Error</span>
                        </div>
                        <div class="space-y-2">
                            <progress class="progress progress-primary w-full" value={70} max={100} />
                            <progress class="progress progress-secondary w-full" value={45} max={100} />
                            <progress class="progress progress-accent w-full" value={90} max={100} />
                        </div>
                    </div>
                </div>

                {/* Card: Timeline */}
                <div class="card bg-base-100 shadow-sm border border-base-300 break-inside-avoid">
                    <div class="card-body gap-1">
                        <ul class="steps steps-vertical text-xs">
                            <li class="step step-primary">
                                <span>Harry Potter and Sorcerer's Stack</span>
                            </li>
                            <li class="step step-primary">
                                <span>Harry Potter and Chamber of Servers</span>
                            </li>
                            <li class="step step-primary">
                                <span>Harry Potter and Prisoner of Azure</span>
                            </li>
                            <li class="step">
                                <span>Harry Potter and the Goblet of Firebase</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Card: Toggle & Selectors */}
                <div class="card bg-base-100 shadow-sm border border-base-300 break-inside-avoid">
                    <div class="card-body gap-1">
                        <h3 class="font-semibold text-sm">Selectors</h3>
                        <div class="flex flex-col gap-3">
                            <label class="flex items-center justify-between cursor-pointer">
                                <span class="text-sm">Notifications</span>
                                <input type="checkbox" class="toggle toggle-primary" checked />
                            </label>
                            <label class="flex items-center justify-between cursor-pointer">
                                <span class="text-sm">Dark mode</span>
                                <input type="checkbox" class="toggle toggle-secondary" />
                            </label>
                            <label class="flex items-center justify-between cursor-pointer">
                                <span class="text-sm">Auto-save</span>
                                <input type="checkbox" class="toggle toggle-accent" checked />
                            </label>
                        </div>
                        <div class="divider my-1" />
                        <div class="flex gap-3">
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" checked />
                                <span class="text-xs">Option A</span>
                            </label>
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" class="checkbox checkbox-secondary checkbox-sm" />
                                <span class="text-xs">Option B</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

/** Render custom preview slot content if it has children, otherwise render default */
function renderPreviewContent(slotFn: (() => any) | undefined) {
    if (slotFn) {
        const content = slotFn();
        if (content && (!Array.isArray(content) || content.length > 0)) {
            return content;
        }
    }
    return <DefaultPreview />;
}

// ============================================
// Build inline style string for CSS variables
// ============================================

function buildStyleVars(config: ThemeConfigData): string {
    const vars: string[] = [];

    const colorMap: Record<keyof ThemeColors, string> = {
        base100: '--color-base-100',
        base200: '--color-base-200',
        base300: '--color-base-300',
        baseContent: '--color-base-content',
        primary: '--color-primary',
        primaryContent: '--color-primary-content',
        secondary: '--color-secondary',
        secondaryContent: '--color-secondary-content',
        accent: '--color-accent',
        accentContent: '--color-accent-content',
        neutral: '--color-neutral',
        neutralContent: '--color-neutral-content',
        info: '--color-info',
        infoContent: '--color-info-content',
        success: '--color-success',
        successContent: '--color-success-content',
        warning: '--color-warning',
        warningContent: '--color-warning-content',
        error: '--color-error',
        errorContent: '--color-error-content',
    };

    for (const [key, varName] of Object.entries(colorMap)) {
        vars.push(`${varName}: ${config.colors[key as keyof ThemeColors]}`);
    }

    vars.push(`--radius-box: ${config.radiusBox}rem`);
    vars.push(`--radius-field: ${config.radiusField}rem`);
    vars.push(`--radius-selector: ${config.radiusSelector}rem`);
    vars.push(`--depth: ${config.depth}`);
    vars.push(`--noise: ${config.noise}`);
    vars.push(`--size-field: ${config.sizeField}rem`);
    vars.push(`--size-selector: ${config.sizeSelector}rem`);
    vars.push(`--border: ${config.border}px`);
    vars.push(`color-scheme: ${config.colorScheme}`);

    return vars.join('; ');
}

// ============================================
// Compound export
// ============================================

/**
 * Theme Configurator - a generic component for visually configuring DaisyUI v5 themes.
 *
 * Features a sidebar + live preview layout with compact color swatches,
 * visual radius previews, and a rich component showcase.
 *
 * @example
 * ```tsx
 * // Drop-in full configurator
 * <ThemeConfigurator />
 *
 * // With two-way model binding
 * const config = signal(DEFAULT_THEME_CONFIG);
 * <ThemeConfigurator model={config} onChange={(c) => console.log(c)} />
 *
 * // With persistence
 * <ThemeConfigurator persistKey="my-theme-config" />
 * ```
 */
export const ThemeConfigurator = compound(_ThemeConfigurator, {
    Colors: SidebarColors,
    Radius: SidebarRadius,
    Effects: SidebarEffects,
    Sizes: SidebarSizes,
    Border: SidebarBorder,
    Preview: DefaultPreview,
});
