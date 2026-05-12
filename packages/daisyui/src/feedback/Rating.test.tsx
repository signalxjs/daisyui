import { describe, it, expect } from 'vitest';
import { render } from 'sigx';
import { Rating } from './Rating';

function renderToDiv(jsx: any): HTMLElement {
    const container = document.createElement('div');
    render(jsx, container);
    return container;
}

describe('Rating', () => {
    it('renders with base rating class', () => {
        const el = renderToDiv(<Rating />);
        const rating = el.querySelector('.rating')!;
        expect(rating).toBeTruthy();
    });

    it('renders correct number of inputs (5 stars + 1 hidden by default)', () => {
        const el = renderToDiv(<Rating />);
        const inputs = el.querySelectorAll('input[type="radio"]');
        expect(inputs.length).toBe(6);
    });

    it('renders custom max stars', () => {
        const el = renderToDiv(<Rating max={10} />);
        const inputs = el.querySelectorAll('input[type="radio"]');
        expect(inputs.length).toBe(11); // 10 + 1 hidden
    });

    // Size variants
    it('applies rating-xs class', () => {
        const el = renderToDiv(<Rating size="xs" />);
        expect(el.querySelector('.rating')!.classList.contains('rating-xs')).toBe(true);
    });

    it('applies rating-sm class', () => {
        const el = renderToDiv(<Rating size="sm" />);
        expect(el.querySelector('.rating')!.classList.contains('rating-sm')).toBe(true);
    });

    it('applies rating-md class', () => {
        const el = renderToDiv(<Rating size="md" />);
        expect(el.querySelector('.rating')!.classList.contains('rating-md')).toBe(true);
    });

    it('applies rating-lg class', () => {
        const el = renderToDiv(<Rating size="lg" />);
        expect(el.querySelector('.rating')!.classList.contains('rating-lg')).toBe(true);
    });

    it('applies rating-xl class', () => {
        const el = renderToDiv(<Rating size="xl" />);
        expect(el.querySelector('.rating')!.classList.contains('rating-xl')).toBe(true);
    });

    // Half rating
    it('applies rating-half class', () => {
        const el = renderToDiv(<Rating half />);
        expect(el.querySelector('.rating')!.classList.contains('rating-half')).toBe(true);
    });

    it('renders double inputs for half rating', () => {
        const el = renderToDiv(<Rating half max={5} />);
        const inputs = el.querySelectorAll('input[type="radio"]');
        expect(inputs.length).toBe(11); // 10 half-inputs + 1 hidden
    });

    // Hidden input
    it('renders hidden input with rating-hidden class', () => {
        const el = renderToDiv(<Rating />);
        const hidden = el.querySelector('.rating-hidden')!;
        expect(hidden).toBeTruthy();
        expect(hidden.getAttribute('aria-label')).toBe('No rating');
    });

    // Mask shapes
    it('applies mask-star-2 by default', () => {
        const el = renderToDiv(<Rating />);
        const star = el.querySelectorAll('input[type="radio"]')[1]!;
        expect(star.classList.contains('mask-star-2')).toBe(true);
    });

    it('applies mask-star class', () => {
        const el = renderToDiv(<Rating mask="star" />);
        const star = el.querySelectorAll('input[type="radio"]')[1]!;
        expect(star.classList.contains('mask-star')).toBe(true);
    });

    it('applies mask-heart class', () => {
        const el = renderToDiv(<Rating mask="heart" />);
        const star = el.querySelectorAll('input[type="radio"]')[1]!;
        expect(star.classList.contains('mask-heart')).toBe(true);
    });

    it('applies mask-hexagon class', () => {
        const el = renderToDiv(<Rating mask="hexagon" />);
        const star = el.querySelectorAll('input[type="radio"]')[1]!;
        expect(star.classList.contains('mask-hexagon')).toBe(true);
    });

    it('applies mask-diamond class', () => {
        const el = renderToDiv(<Rating mask="diamond" />);
        const star = el.querySelectorAll('input[type="radio"]')[1]!;
        expect(star.classList.contains('mask-diamond')).toBe(true);
    });

    it('applies mask-triangle class', () => {
        const el = renderToDiv(<Rating mask="triangle" />);
        const star = el.querySelectorAll('input[type="radio"]')[1]!;
        expect(star.classList.contains('mask-triangle')).toBe(true);
    });

    // Color variants
    it('applies bg-orange-400 by default (no color prop)', () => {
        const el = renderToDiv(<Rating />);
        const star = el.querySelectorAll('input[type="radio"]')[1]!;
        expect(star.classList.contains('bg-orange-400')).toBe(true);
    });

    it('applies bg-primary for color="primary"', () => {
        const el = renderToDiv(<Rating color="primary" />);
        const star = el.querySelectorAll('input[type="radio"]')[1]!;
        expect(star.classList.contains('bg-primary')).toBe(true);
    });

    it('applies bg-secondary for color="secondary"', () => {
        const el = renderToDiv(<Rating color="secondary" />);
        const star = el.querySelectorAll('input[type="radio"]')[1]!;
        expect(star.classList.contains('bg-secondary')).toBe(true);
    });

    it('applies bg-warning for color="warning"', () => {
        const el = renderToDiv(<Rating color="warning" />);
        const star = el.querySelectorAll('input[type="radio"]')[1]!;
        expect(star.classList.contains('bg-warning')).toBe(true);
    });

    it('applies bg-error for color="error"', () => {
        const el = renderToDiv(<Rating color="error" />);
        const star = el.querySelectorAll('input[type="radio"]')[1]!;
        expect(star.classList.contains('bg-error')).toBe(true);
    });

    // Read-only
    it('disables inputs when readOnly', () => {
        const el = renderToDiv(<Rating readOnly />);
        const inputs = el.querySelectorAll('input[type="radio"]');
        inputs.forEach((input) => {
            expect((input as HTMLInputElement).disabled).toBe(true);
        });
    });

    // aria-label
    it('adds aria-label to star inputs', () => {
        const el = renderToDiv(<Rating max={3} />);
        const inputs = el.querySelectorAll('input[type="radio"]');
        expect(inputs[1]!.getAttribute('aria-label')).toBe('1 star');
        expect(inputs[2]!.getAttribute('aria-label')).toBe('2 star');
        expect(inputs[3]!.getAttribute('aria-label')).toBe('3 star');
    });

    // Custom class
    it('applies custom class', () => {
        const el = renderToDiv(<Rating class="my-custom" />);
        expect(el.querySelector('.rating')!.classList.contains('my-custom')).toBe(true);
    });

    // Half rating mask classes
    it('applies mask-half-1 and mask-half-2 for half ratings', () => {
        const el = renderToDiv(<Rating half max={2} />);
        const inputs = el.querySelectorAll('input[type="radio"]:not(.rating-hidden)');
        // inputs: 0.5, 1, 1.5, 2 — half-1 on .5 values, half-2 on whole values
        expect(inputs[0]!.classList.contains('mask-half-1')).toBe(true);
        expect(inputs[1]!.classList.contains('mask-half-2')).toBe(true);
        expect(inputs[2]!.classList.contains('mask-half-1')).toBe(true);
        expect(inputs[3]!.classList.contains('mask-half-2')).toBe(true);
    });

    // Checked state on hidden for 0 rating
    it('checks the hidden input when no value is selected', () => {
        const el = renderToDiv(<Rating />);
        const hidden = el.querySelector('.rating-hidden') as HTMLInputElement;
        expect(hidden.checked).toBe(true);
    });
});
