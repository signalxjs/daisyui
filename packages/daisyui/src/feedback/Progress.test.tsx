import { describe, it, expect } from 'vitest';
import { render } from 'sigx';
import { Progress } from './Badge';

function renderToDiv(jsx: any): HTMLElement {
    const container = document.createElement('div');
    render(jsx, container);
    return container;
}

describe('Progress', () => {
    it('renders with base progress class', () => {
        const el = renderToDiv(<Progress value={50} />);
        const progress = el.querySelector('.progress')!;
        expect(progress).toBeTruthy();
        expect(progress.tagName).toBe('PROGRESS');
    });

    it('sets value attribute', () => {
        const el = renderToDiv(<Progress value={75} />);
        const progress = el.querySelector('.progress') as HTMLProgressElement;
        expect(progress.value).toBe(75);
    });

    it('defaults max to 100', () => {
        const el = renderToDiv(<Progress value={50} />);
        const progress = el.querySelector('.progress') as HTMLProgressElement;
        expect(progress.max).toBe(100);
    });

    it('sets custom max', () => {
        const el = renderToDiv(<Progress value={5} max={10} />);
        const progress = el.querySelector('.progress') as HTMLProgressElement;
        expect(progress.max).toBe(10);
    });

    it('renders indeterminate when no value', () => {
        const el = renderToDiv(<Progress />);
        const progress = el.querySelector('.progress') as HTMLProgressElement;
        expect(progress.hasAttribute('value')).toBe(false);
    });

    // Color variants
    it('applies progress-primary class', () => {
        const el = renderToDiv(<Progress value={50} color="primary" />);
        const progress = el.querySelector('.progress')!;
        expect(progress.classList.contains('progress-primary')).toBe(true);
    });

    it('applies progress-secondary class', () => {
        const el = renderToDiv(<Progress value={50} color="secondary" />);
        const progress = el.querySelector('.progress')!;
        expect(progress.classList.contains('progress-secondary')).toBe(true);
    });

    it('applies progress-accent class', () => {
        const el = renderToDiv(<Progress value={50} color="accent" />);
        const progress = el.querySelector('.progress')!;
        expect(progress.classList.contains('progress-accent')).toBe(true);
    });

    it('applies progress-neutral class', () => {
        const el = renderToDiv(<Progress value={50} color="neutral" />);
        const progress = el.querySelector('.progress')!;
        expect(progress.classList.contains('progress-neutral')).toBe(true);
    });

    it('applies progress-info class', () => {
        const el = renderToDiv(<Progress value={50} color="info" />);
        const progress = el.querySelector('.progress')!;
        expect(progress.classList.contains('progress-info')).toBe(true);
    });

    it('applies progress-success class', () => {
        const el = renderToDiv(<Progress value={50} color="success" />);
        const progress = el.querySelector('.progress')!;
        expect(progress.classList.contains('progress-success')).toBe(true);
    });

    it('applies progress-warning class', () => {
        const el = renderToDiv(<Progress value={50} color="warning" />);
        const progress = el.querySelector('.progress')!;
        expect(progress.classList.contains('progress-warning')).toBe(true);
    });

    it('applies progress-error class', () => {
        const el = renderToDiv(<Progress value={50} color="error" />);
        const progress = el.querySelector('.progress')!;
        expect(progress.classList.contains('progress-error')).toBe(true);
    });

    it('does not apply color class when no color specified', () => {
        const el = renderToDiv(<Progress value={50} />);
        const progress = el.querySelector('.progress')!;
        expect(progress.className).not.toMatch(/progress-/);
    });

    it('appends custom class', () => {
        const el = renderToDiv(<Progress value={50} class="w-56" />);
        const progress = el.querySelector('.progress')!;
        expect(progress.classList.contains('w-56')).toBe(true);
    });

    it('combines color and custom class', () => {
        const el = renderToDiv(<Progress value={50} color="primary" class="w-full" />);
        const progress = el.querySelector('.progress')!;
        expect(progress.classList.contains('progress')).toBe(true);
        expect(progress.classList.contains('progress-primary')).toBe(true);
        expect(progress.classList.contains('w-full')).toBe(true);
    });

    it('does not add w-full by default', () => {
        const el = renderToDiv(<Progress value={50} />);
        const progress = el.querySelector('.progress')!;
        expect(progress.classList.contains('w-full')).toBe(false);
    });
});
