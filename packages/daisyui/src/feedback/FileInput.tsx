import { component, type Define } from 'sigx';

// ============================================
// FileInput Types
// ============================================

export type FileInputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type FileInputColor = 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error';

export type FileInputProps =
    & Define.Prop<'accept', string, false>
    & Define.Prop<'multiple', boolean, false>
    & Define.Prop<'size', FileInputSize, false>
    & Define.Prop<'color', FileInputColor, false>
    & Define.Prop<'ghost', boolean, false>
    & Define.Prop<'disabled', boolean, false>
    & Define.Prop<'class', string, false>
    & Define.Event<'change', FileList | null>;

const fileInputSizeClasses: Record<FileInputSize, string> = {
    xs: 'file-input-xs',
    sm: 'file-input-sm',
    md: 'file-input-md',
    lg: 'file-input-lg',
    xl: 'file-input-xl'
};

const fileInputColorClasses: Record<FileInputColor, string> = {
    primary: 'file-input-primary',
    secondary: 'file-input-secondary',
    accent: 'file-input-accent',
    neutral: 'file-input-neutral',
    info: 'file-input-info',
    success: 'file-input-success',
    warning: 'file-input-warning',
    error: 'file-input-error'
};

// ============================================
// FileInput Component
// ============================================

/**
 * File input component with DaisyUI styling.
 * Provides styled file upload controls with events for handling selected files.
 *
 * @example
 * ```tsx
 * <FileInput
 *   accept="image/*"
 *   onChange={(files) => handleFiles(files)}
 *   color="primary"
 * />
 * ```
 */
export const FileInput = component<FileInputProps>(({ props, emit }) => {
    const getClasses = () => {
        const classes = ['file-input'];

        const sizeClass = fileInputSizeClasses[props.size ?? 'md'];
        if (sizeClass) classes.push(sizeClass);

        if (props.color) classes.push(fileInputColorClasses[props.color]);
        if (props.ghost) classes.push('file-input-ghost');
        if (props.class) classes.push(props.class);

        return classes.join(' ');
    };

    const handleChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        emit('change', target.files);
    };

    return () => (
        <input
            type="file"
            class={getClasses()}
            accept={props.accept}
            multiple={props.multiple}
            disabled={props.disabled}
            onChange={handleChange}
        />
    );
});
