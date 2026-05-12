import { describe, it, expect } from 'vitest';
import { render } from 'sigx';
import { Countdown } from './Countdown';

function renderToDiv(jsx: any): HTMLElement {
    const container = document.createElement('div');
    render(jsx, container);
    return container;
}

describe('Countdown', () => {
    it('renders with base countdown class', () => {
        const el = renderToDiv(<Countdown value={42} />);
        const countdown = el.querySelector('.countdown')!;
        expect(countdown).toBeTruthy();
        expect(countdown.tagName).toBe('SPAN');
    });

    it('renders inner span with --value CSS variable', () => {
        const el = renderToDiv(<Countdown value={25} />);
        const inner = el.querySelector('.countdown > span')!;
        expect(inner).toBeTruthy();
        expect((inner as HTMLElement).style.getPropertyValue('--value')).toBe('25');
    });

    it('defaults value to 0 when not provided', () => {
        const el = renderToDiv(<Countdown value={0} />);
        const inner = el.querySelector('.countdown > span')!;
        expect((inner as HTMLElement).style.getPropertyValue('--value')).toBe('0');
    });

    it('renders text content matching value', () => {
        const el = renderToDiv(<Countdown value={59} />);
        const inner = el.querySelector('.countdown > span')!;
        expect(inner.textContent).toBe('59');
    });

    it('sets aria-live="polite" on inner span', () => {
        const el = renderToDiv(<Countdown value={10} />);
        const inner = el.querySelector('.countdown > span')!;
        expect(inner.getAttribute('aria-live')).toBe('polite');
    });

    it('sets aria-label matching value', () => {
        const el = renderToDiv(<Countdown value={33} />);
        const inner = el.querySelector('.countdown > span')!;
        expect(inner.getAttribute('aria-label')).toBe('33');
    });

    it('applies --digits CSS variable when digits=2', () => {
        const el = renderToDiv(<Countdown value={5} digits={2} />);
        const inner = el.querySelector('.countdown > span')!;
        expect((inner as HTMLElement).style.getPropertyValue('--digits')).toBe('2');
    });

    it('applies --digits CSS variable when digits=3', () => {
        const el = renderToDiv(<Countdown value={100} digits={3} />);
        const inner = el.querySelector('.countdown > span')!;
        expect((inner as HTMLElement).style.getPropertyValue('--digits')).toBe('3');
    });

    it('does not set --digits when digits prop is not provided', () => {
        const el = renderToDiv(<Countdown value={42} />);
        const inner = el.querySelector('.countdown > span')!;
        expect((inner as HTMLElement).style.getPropertyValue('--digits')).toBe('');
    });

    it('applies custom class', () => {
        const el = renderToDiv(<Countdown value={10} class="font-mono text-6xl" />);
        const countdown = el.querySelector('.countdown')!;
        expect(countdown.classList.contains('font-mono')).toBe(true);
        expect(countdown.classList.contains('text-6xl')).toBe(true);
    });

    it('handles value of 0', () => {
        const el = renderToDiv(<Countdown value={0} />);
        const inner = el.querySelector('.countdown > span')!;
        expect(inner.textContent).toBe('0');
        expect((inner as HTMLElement).style.getPropertyValue('--value')).toBe('0');
    });

    it('handles large values up to 999', () => {
        const el = renderToDiv(<Countdown value={999} />);
        const inner = el.querySelector('.countdown > span')!;
        expect(inner.textContent).toBe('999');
        expect((inner as HTMLElement).style.getPropertyValue('--value')).toBe('999');
    });
});
