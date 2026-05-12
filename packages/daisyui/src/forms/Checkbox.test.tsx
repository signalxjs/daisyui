import { describe, it, expect } from 'vitest';
import { render } from 'sigx';
import { Checkbox } from './Checkbox';

function renderToDiv(jsx: any): HTMLElement {
    const container = document.createElement('div');
    render(jsx, container);
    return container;
}

describe('Checkbox', () => {
    it('renders with base checkbox class', () => {
        const el = renderToDiv(<Checkbox />);
        const checkbox = el.querySelector('.checkbox')!;
        expect(checkbox).toBeTruthy();
        expect(checkbox.tagName).toBe('INPUT');
        expect((checkbox as HTMLInputElement).type).toBe('checkbox');
    });

    it('renders checkbox-md class by default', () => {
        const el = renderToDiv(<Checkbox />);
        const checkbox = el.querySelector('.checkbox')!;
        expect(checkbox.classList.contains('checkbox-md')).toBe(true);
    });

    it('renders without label wrapper when no label prop', () => {
        const el = renderToDiv(<Checkbox />);
        expect(el.querySelector('label')).toBeNull();
        expect(el.querySelector('.checkbox')).toBeTruthy();
    });

    it('renders with label wrapper when label prop is set', () => {
        const el = renderToDiv(<Checkbox label="Accept terms" />);
        const label = el.querySelector('label')!;
        expect(label).toBeTruthy();
        expect(label.querySelector('.checkbox')).toBeTruthy();
        expect(label.querySelector('.label-text')!.textContent).toBe('Accept terms');
    });

    // Size tests
    it('applies checkbox-xs class', () => {
        const el = renderToDiv(<Checkbox size="xs" />);
        expect(el.querySelector('.checkbox')!.classList.contains('checkbox-xs')).toBe(true);
    });

    it('applies checkbox-sm class', () => {
        const el = renderToDiv(<Checkbox size="sm" />);
        expect(el.querySelector('.checkbox')!.classList.contains('checkbox-sm')).toBe(true);
    });

    it('applies checkbox-md class', () => {
        const el = renderToDiv(<Checkbox size="md" />);
        expect(el.querySelector('.checkbox')!.classList.contains('checkbox-md')).toBe(true);
    });

    it('applies checkbox-lg class', () => {
        const el = renderToDiv(<Checkbox size="lg" />);
        expect(el.querySelector('.checkbox')!.classList.contains('checkbox-lg')).toBe(true);
    });

    it('applies checkbox-xl class', () => {
        const el = renderToDiv(<Checkbox size="xl" />);
        expect(el.querySelector('.checkbox')!.classList.contains('checkbox-xl')).toBe(true);
    });

    // Color tests
    it('applies checkbox-primary class', () => {
        const el = renderToDiv(<Checkbox color="primary" />);
        expect(el.querySelector('.checkbox')!.classList.contains('checkbox-primary')).toBe(true);
    });

    it('applies checkbox-secondary class', () => {
        const el = renderToDiv(<Checkbox color="secondary" />);
        expect(el.querySelector('.checkbox')!.classList.contains('checkbox-secondary')).toBe(true);
    });

    it('applies checkbox-accent class', () => {
        const el = renderToDiv(<Checkbox color="accent" />);
        expect(el.querySelector('.checkbox')!.classList.contains('checkbox-accent')).toBe(true);
    });

    it('applies checkbox-neutral class', () => {
        const el = renderToDiv(<Checkbox color="neutral" />);
        expect(el.querySelector('.checkbox')!.classList.contains('checkbox-neutral')).toBe(true);
    });

    it('applies checkbox-info class', () => {
        const el = renderToDiv(<Checkbox color="info" />);
        expect(el.querySelector('.checkbox')!.classList.contains('checkbox-info')).toBe(true);
    });

    it('applies checkbox-success class', () => {
        const el = renderToDiv(<Checkbox color="success" />);
        expect(el.querySelector('.checkbox')!.classList.contains('checkbox-success')).toBe(true);
    });

    it('applies checkbox-warning class', () => {
        const el = renderToDiv(<Checkbox color="warning" />);
        expect(el.querySelector('.checkbox')!.classList.contains('checkbox-warning')).toBe(true);
    });

    it('applies checkbox-error class', () => {
        const el = renderToDiv(<Checkbox color="error" />);
        expect(el.querySelector('.checkbox')!.classList.contains('checkbox-error')).toBe(true);
    });

    // Disabled state
    it('applies disabled attribute', () => {
        const el = renderToDiv(<Checkbox disabled />);
        expect((el.querySelector('.checkbox') as HTMLInputElement).disabled).toBe(true);
    });

    // Indeterminate state
    it('applies indeterminate property', () => {
        const el = renderToDiv(<Checkbox indeterminate />);
        expect((el.querySelector('.checkbox') as HTMLInputElement).indeterminate).toBe(true);
    });

    // Custom class
    it('applies custom class to checkbox input', () => {
        const el = renderToDiv(<Checkbox class="my-custom" />);
        expect(el.querySelector('.checkbox')!.classList.contains('my-custom')).toBe(true);
    });

    // Name attribute
    it('applies name attribute', () => {
        const el = renderToDiv(<Checkbox name="agree" />);
        expect((el.querySelector('.checkbox') as HTMLInputElement).name).toBe('agree');
    });

    // Combined props
    it('combines size and color classes', () => {
        const el = renderToDiv(<Checkbox size="lg" color="primary" />);
        const checkbox = el.querySelector('.checkbox')!;
        expect(checkbox.classList.contains('checkbox-lg')).toBe(true);
        expect(checkbox.classList.contains('checkbox-primary')).toBe(true);
    });
});
