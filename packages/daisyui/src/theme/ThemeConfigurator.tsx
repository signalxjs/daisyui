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
import { Button } from '../buttons';
import { Input, Select, Textarea, Checkbox, Radio, Toggle, Range } from '../forms';
import { Badge, Alert, Progress, RadialProgress, Loading, Steps, Kbd } from '../feedback';
import { Card, Chat } from '../layout';
import { Tabs } from '../navigation';
import { Avatar, Stats, Table } from '../data';

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
            <div class={`theme-configurator flex h-full min-h-0 ${props.class ?? ''}`}>
                {/* Left Sidebar - Controls */}
                <div class="w-72 shrink-0 overflow-y-auto border-r border-base-300 px-4 py-5 flex flex-col gap-5"
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
                <div class="flex-1 overflow-y-auto p-4 lg:p-6" style="scrollbar-width: thin;">
                    <div class="bg-base-200 text-base-content rounded-xl p-4 lg:p-6 min-h-full" style={styleVars}>
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
                    <div class="mb-3">
                        <div class="flex items-baseline justify-between mb-1.5">
                            <span class="text-xs font-medium">{item.label}</span>
                            <span class="text-[10px] text-base-content/40">{item.hint}</span>
                        </div>
                        {/* Preset buttons — each previews its radius */}
                        <div class="flex gap-1.5 mb-1.5">
                            {[0, 0.25, 0.5, 1, 1.5, 2].map(r => (
                                <button
                                    type="button"
                                    title={`${r}rem`}
                                    class={`flex-1 aspect-square border-2 cursor-pointer transition-colors
                                        ${Math.abs(item.value - r) < 0.01
                                            ? 'border-primary bg-primary/10'
                                            : 'border-base-300 bg-base-200/60 hover:border-base-content/40'}`}
                                    style={`border-radius: ${r}rem;`}
                                    onClick={() => onUpdate(item.key, r)}
                                />
                            ))}
                        </div>
                        <input
                            type="range"
                            class="range range-primary range-xs w-full"
                            min={0} max={2} step={0.0625}
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
    const tab = signal('overview');
    const radioChoice = signal('a');
    const rangeVal = signal(60);
    const wifi = signal(true);
    const autoSave = signal(false);
    const checkA = signal(true);
    const checkB = signal(true);
    const checkC = signal(false);
    const stepModel = signal('purchase');

    const colors = ['primary', 'secondary', 'accent', 'neutral', 'info', 'success', 'warning', 'error'] as const;
    const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    const demoTabs = [
        { id: 'overview', label: 'Overview', content: 'Tab buttons use --radius-field; this content panel uses --radius-box.' },
        { id: 'activity', label: 'Activity', content: 'Switch tabs to see the active state recolor with the theme.' },
        { id: 'settings', label: 'Settings', content: 'Everything in this preview reacts live to the controls on the left.' },
    ];

    const sizeOptions = [
        { value: 'sm', label: 'Small' },
        { value: 'md', label: 'Medium' },
        { value: 'lg', label: 'Large' },
    ];

    const steps = [
        { id: 'register', label: 'Register', color: 'primary' as const },
        { id: 'choose', label: 'Choose plan', color: 'primary' as const },
        { id: 'purchase', label: 'Purchase', color: 'primary' as const },
        { id: 'receive', label: 'Receive product' },
    ];

    return () => (
        <div>
            <div class="mb-5">
                <h2 class="text-xl font-bold">Components Demo</h2>
                <p class="text-sm text-base-content/60">Live preview — every control on the left updates these instantly.</p>
            </div>

            <div class="columns-1 sm:columns-2 xl:columns-3 2xl:columns-4 gap-4">
                {/* Buttons — fields radius */}
                <Card shadow="sm" class="mb-4 break-inside-avoid bg-base-100 border border-base-300">
                    <Card.Body>
                        <Card.Title>Buttons</Card.Title>
                        <div class="flex flex-wrap gap-2">
                            {colors.map(c => <Button variant={c} size="sm">{cap(c)}</Button>)}
                        </div>
                        <div class="flex flex-wrap gap-2 mt-1">
                            <Button variant="primary" size="sm" outline>Outline</Button>
                            <Button variant="primary" size="sm" soft>Soft</Button>
                            <Button size="sm">Default</Button>
                            <Button variant="primary" size="sm" disabled>Disabled</Button>
                        </div>
                        <div class="flex flex-wrap items-center gap-2 mt-1">
                            <Button variant="primary" size="xs">xs</Button>
                            <Button variant="primary" size="sm">sm</Button>
                            <Button variant="primary" size="md">md</Button>
                            <Button variant="primary" size="lg">lg</Button>
                        </div>
                    </Card.Body>
                </Card>

                {/* Form fields — fields radius */}
                <Card shadow="sm" class="mb-4 break-inside-avoid bg-base-100 border border-base-300">
                    <Card.Body>
                        <Card.Title>Form fields</Card.Title>
                        <div class="flex flex-col gap-2">
                            <Input variant="bordered" placeholder="Email address" />
                            <Input variant="bordered" color="primary" placeholder="Primary input" />
                            <Select variant="bordered" options={sizeOptions} placeholder="Pick a size" />
                            <Textarea variant="bordered" rows={2} placeholder="Your message..." />
                            <span class="text-xs text-base-content/50">Inputs, selects &amp; textareas use --radius-field</span>
                        </div>
                    </Card.Body>
                </Card>

                {/* Selectors — selector radius */}
                <Card shadow="sm" class="mb-4 break-inside-avoid bg-base-100 border border-base-300">
                    <Card.Body>
                        <Card.Title>Selectors</Card.Title>
                        <div class="flex flex-col gap-2">
                            <Checkbox color="primary" label="Notifications" model={() => checkA.value} />
                            <Checkbox color="secondary" label="Newsletter" model={() => checkB.value} />
                            <Checkbox color="accent" label="Beta features" model={() => checkC.value} />
                        </div>
                        <Radio name="demo-radio" model={() => radioChoice.value} direction="horizontal" color="primary">
                            <Radio.Item value="a" label="One" />
                            <Radio.Item value="b" label="Two" />
                            <Radio.Item value="c" label="Three" />
                        </Radio>
                        <div class="flex flex-col gap-2">
                            <Toggle color="primary" label="Wi-Fi" model={() => wifi.value} />
                            <Toggle color="accent" label="Auto-save" model={() => autoSave.value} />
                        </div>
                        <Range color="primary" model={() => rangeVal.value} min={0} max={100} />
                        <span class="text-xs text-base-content/50">Checkboxes, toggles &amp; badges use --radius-selector</span>
                    </Card.Body>
                </Card>

                {/* Badges — selector radius */}
                <Card shadow="sm" class="mb-4 break-inside-avoid bg-base-100 border border-base-300">
                    <Card.Body>
                        <Card.Title>Badges</Card.Title>
                        <div class="flex flex-wrap gap-1.5">
                            {colors.map(c => <Badge variant={c}>{cap(c)}</Badge>)}
                        </div>
                        <div class="flex flex-wrap gap-1.5 mt-1">
                            {colors.slice(0, 4).map(c => <Badge variant={c} badgeStyle="soft">{cap(c)}</Badge>)}
                        </div>
                        <div class="flex flex-wrap gap-1.5 mt-1">
                            {colors.slice(0, 4).map(c => <Badge variant={c} badgeStyle="outline">{cap(c)}</Badge>)}
                        </div>
                    </Card.Body>
                </Card>

                {/* Alerts — box radius */}
                <Card shadow="sm" class="mb-4 break-inside-avoid bg-base-100 border border-base-300">
                    <Card.Body>
                        <Card.Title>Alerts</Card.Title>
                        <div class="flex flex-col gap-2">
                            <Alert variant="info">A new software update is available.</Alert>
                            <Alert variant="success">Your purchase has been confirmed.</Alert>
                            <Alert variant="warning">Your subscription expires soon.</Alert>
                            <Alert variant="error">Something went wrong, please retry.</Alert>
                        </div>
                        <span class="text-xs text-base-content/50">Alerts &amp; cards use --radius-box</span>
                    </Card.Body>
                </Card>

                {/* Tabs — box radius on the panel; label corners cap at --radius-field (daisyUI) */}
                <Card shadow="sm" class="mb-4 break-inside-avoid bg-base-100 border border-base-300">
                    <Card.Body>
                        <Card.Title>Tabs</Card.Title>
                        {/* daisyUI's lift only paints the active tab + content (base-100), so they need a
                            darker surface to "lift" off — sit them on base-200 like daisyUI's own preview. */}
                        <div class="rounded-box bg-base-200 p-3">
                            <Tabs tabs={demoTabs} activeTab={tab.value} onChange={(id) => { tab.value = id; }} variant="lift" />
                        </div>
                        <span class="text-xs text-base-content/50">Lift tabs sit on base-200; the panel uses --radius-box, labels cap at --radius-field</span>
                    </Card.Body>
                </Card>

                {/* Progress & loading */}
                <Card shadow="sm" class="mb-4 break-inside-avoid bg-base-100 border border-base-300">
                    <Card.Body>
                        <Card.Title>Progress</Card.Title>
                        <div class="flex flex-col gap-2">
                            <Progress value={70} max={100} color="primary" />
                            <Progress value={45} max={100} color="secondary" />
                            <Progress value={80} max={100} color="accent" />
                            <Progress value={60} max={100} color="success" />
                        </div>
                        <div class="flex items-center gap-4 mt-2">
                            <RadialProgress value={70} color="primary">70%</RadialProgress>
                            <Loading type="spinner" color="primary" />
                            <Loading type="dots" color="secondary" />
                            <Loading type="bars" color="accent" />
                        </div>
                    </Card.Body>
                </Card>

                {/* Chat */}
                <Card shadow="sm" class="mb-4 break-inside-avoid bg-base-100 border border-base-300">
                    <Card.Body>
                        <Card.Title>Chat</Card.Title>
                        <Chat start>
                            <Chat.Bubble>Is the theme fully reactive?</Chat.Bubble>
                        </Chat>
                        <Chat end>
                            <Chat.Bubble color="primary">Yes — try the radius sliders!</Chat.Bubble>
                        </Chat>
                    </Card.Body>
                </Card>

                {/* Stats */}
                <Card shadow="sm" class="mb-4 break-inside-avoid bg-base-100 border border-base-300">
                    <Card.Body>
                        <Card.Title>Stats</Card.Title>
                        <Stats>
                            <Stats.Item>
                                <Stats.Title>Downloads</Stats.Title>
                                <Stats.Value>31K</Stats.Value>
                                <Stats.Desc>↗︎ 12% this month</Stats.Desc>
                            </Stats.Item>
                        </Stats>
                    </Card.Body>
                </Card>

                {/* Steps — fields radius */}
                <Card shadow="sm" class="mb-4 break-inside-avoid bg-base-100 border border-base-300">
                    <Card.Body>
                        <Card.Title>Steps</Card.Title>
                        <Steps items={steps} model={() => stepModel.value} vertical />
                    </Card.Body>
                </Card>

                {/* Data display */}
                <Card shadow="sm" class="mb-4 break-inside-avoid bg-base-100 border border-base-300">
                    <Card.Body>
                        <Card.Title>Data display</Card.Title>
                        <div class="flex items-center gap-3">
                            <Avatar placeholder="JD" size="sm" />
                            <Avatar placeholder="AS" size="sm" ring ringColor="primary" />
                            <Avatar placeholder="MK" size="sm" />
                        </div>
                        <div class="flex items-center gap-1 mt-1">
                            <Kbd size="sm">⌘</Kbd>
                            <span class="text-xs">+</span>
                            <Kbd size="sm">K</Kbd>
                        </div>
                        <Table zebra size="sm">
                            <Table.Head>
                                <Table.Row>
                                    <Table.Th>Name</Table.Th>
                                    <Table.Th>Role</Table.Th>
                                </Table.Row>
                            </Table.Head>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Td>Alice</Table.Td>
                                    <Table.Td>Admin</Table.Td>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Td>Bob</Table.Td>
                                    <Table.Td>Editor</Table.Td>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Card.Body>
                </Card>
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
