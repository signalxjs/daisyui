import { describe, it, expect } from 'vitest';
import { render } from 'sigx';
import { FormField } from './FormField';

function renderToDiv(jsx: any): HTMLElement {
    const container = document.createElement('div');
    render(jsx, container);
    return container;
}

describe('FormField', () => {
    it('renders a fieldset element with fieldset class', () => {
        const el = renderToDiv(<FormField>content</FormField>);
        const fieldset = el.querySelector('fieldset')!;
        expect(fieldset).toBeTruthy();
        expect(fieldset.classList.contains('fieldset')).toBe(true);
    });

    it('renders children', () => {
        const el = renderToDiv(<FormField>Hello world</FormField>);
        expect(el.querySelector('fieldset')!.textContent).toContain('Hello world');
    });

    it('applies custom class', () => {
        const el = renderToDiv(<FormField class="w-full p-4">content</FormField>);
        const fieldset = el.querySelector('fieldset')!;
        expect(fieldset.classList.contains('fieldset')).toBe(true);
        expect(fieldset.classList.contains('w-full')).toBe(true);
        expect(fieldset.classList.contains('p-4')).toBe(true);
    });

    it('renders label as fieldset-legend', () => {
        const el = renderToDiv(<FormField label="Email">content</FormField>);
        const legend = el.querySelector('legend')!;
        expect(legend).toBeTruthy();
        expect(legend.classList.contains('fieldset-legend')).toBe(true);
        expect(legend.textContent).toContain('Email');
    });

    it('does not render legend when label is absent', () => {
        const el = renderToDiv(<FormField>content</FormField>);
        expect(el.querySelector('legend')).toBeFalsy();
    });

    it('shows required indicator when required is true', () => {
        const el = renderToDiv(<FormField label="Name" required>content</FormField>);
        const legend = el.querySelector('legend')!;
        expect(legend.textContent).toContain('Name');
        const indicator = legend.querySelector('span.text-error')!;
        expect(indicator).toBeTruthy();
        expect(indicator.textContent).toBe('*');
    });

    it('does not show required indicator when required is false', () => {
        const el = renderToDiv(<FormField label="Name">content</FormField>);
        const legend = el.querySelector('legend')!;
        expect(legend.querySelector('span.text-error')).toBeFalsy();
    });

    it('renders hint text as label paragraph', () => {
        const el = renderToDiv(<FormField hint="Helper text">content</FormField>);
        const hint = el.querySelector('p.label')!;
        expect(hint).toBeTruthy();
        expect(hint.textContent).toBe('Helper text');
    });

    it('does not render hint or error when neither is set', () => {
        const el = renderToDiv(<FormField>content</FormField>);
        expect(el.querySelector('p.label')).toBeFalsy();
        expect(el.querySelector('p.validator-hint')).toBeFalsy();
    });

    it('renders error as validator-hint with text-error', () => {
        const el = renderToDiv(<FormField error="Required field">content</FormField>);
        const error = el.querySelector('p.validator-hint')!;
        expect(error).toBeTruthy();
        expect(error.classList.contains('text-error')).toBe(true);
        expect(error.textContent).toBe('Required field');
    });

    it('error takes priority over hint', () => {
        const el = renderToDiv(
            <FormField hint="Help text" error="Error text">content</FormField>
        );
        const error = el.querySelector('p.validator-hint')!;
        expect(error).toBeTruthy();
        expect(error.textContent).toBe('Error text');
        // hint should not be rendered
        expect(el.querySelector('p.label')).toBeFalsy();
    });

    it('renders full composition: label + content + hint', () => {
        const el = renderToDiv(
            <FormField label="Username" hint="Only letters and numbers" required>
                <input type="text" />
            </FormField>
        );
        const fieldset = el.querySelector('fieldset')!;
        expect(fieldset.classList.contains('fieldset')).toBe(true);
        const legend = fieldset.querySelector('legend.fieldset-legend')!;
        expect(legend).toBeTruthy();
        expect(legend.textContent).toContain('Username');
        expect(legend.querySelector('span.text-error')).toBeTruthy();
        const input = fieldset.querySelector('input')!;
        expect(input).toBeTruthy();
        const hint = fieldset.querySelector('p.label')!;
        expect(hint).toBeTruthy();
        expect(hint.textContent).toBe('Only letters and numbers');
    });

    it('renders full composition: label + content + error', () => {
        const el = renderToDiv(
            <FormField label="Email" error="Invalid email" required>
                <input type="email" />
            </FormField>
        );
        const fieldset = el.querySelector('fieldset')!;
        const legend = fieldset.querySelector('legend.fieldset-legend')!;
        expect(legend.textContent).toContain('Email');
        const error = fieldset.querySelector('p.validator-hint.text-error')!;
        expect(error).toBeTruthy();
        expect(error.textContent).toBe('Invalid email');
    });
});
