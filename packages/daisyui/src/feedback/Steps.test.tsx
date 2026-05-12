import { describe, it, expect } from 'vitest';
import { render } from 'sigx';
import { Steps } from './Steps';

function renderToDiv(jsx: any): HTMLElement {
    const container = document.createElement('div');
    render(jsx, container);
    return container;
}

describe('Steps', () => {
    it('renders with base steps class', () => {
        const el = renderToDiv(
            <Steps>
                <Steps.Step>Step 1</Steps.Step>
            </Steps>
        );
        const steps = el.querySelector('.steps')!;
        expect(steps).toBeTruthy();
        expect(steps.tagName).toBe('UL');
    });

    it('renders Steps.Step with step class', () => {
        const el = renderToDiv(
            <Steps>
                <Steps.Step>Step 1</Steps.Step>
            </Steps>
        );
        const step = el.querySelector('.step')!;
        expect(step).toBeTruthy();
        expect(step.tagName).toBe('LI');
        expect(step.textContent).toBe('Step 1');
    });

    // Direction
    it('applies steps-vertical class', () => {
        const el = renderToDiv(
            <Steps vertical>
                <Steps.Step>Step 1</Steps.Step>
            </Steps>
        );
        expect(el.querySelector('.steps')!.classList.contains('steps-vertical')).toBe(true);
    });

    it('applies steps-horizontal class', () => {
        const el = renderToDiv(
            <Steps horizontal>
                <Steps.Step>Step 1</Steps.Step>
            </Steps>
        );
        expect(el.querySelector('.steps')!.classList.contains('steps-horizontal')).toBe(true);
    });

    // Colors
    it('applies step-neutral class', () => {
        const el = renderToDiv(
            <Steps>
                <Steps.Step color="neutral">Step</Steps.Step>
            </Steps>
        );
        expect(el.querySelector('.step')!.classList.contains('step-neutral')).toBe(true);
    });

    it('applies step-primary class', () => {
        const el = renderToDiv(
            <Steps>
                <Steps.Step color="primary">Step</Steps.Step>
            </Steps>
        );
        expect(el.querySelector('.step')!.classList.contains('step-primary')).toBe(true);
    });

    it('applies step-secondary class', () => {
        const el = renderToDiv(
            <Steps>
                <Steps.Step color="secondary">Step</Steps.Step>
            </Steps>
        );
        expect(el.querySelector('.step')!.classList.contains('step-secondary')).toBe(true);
    });

    it('applies step-accent class', () => {
        const el = renderToDiv(
            <Steps>
                <Steps.Step color="accent">Step</Steps.Step>
            </Steps>
        );
        expect(el.querySelector('.step')!.classList.contains('step-accent')).toBe(true);
    });

    it('applies step-info class', () => {
        const el = renderToDiv(
            <Steps>
                <Steps.Step color="info">Step</Steps.Step>
            </Steps>
        );
        expect(el.querySelector('.step')!.classList.contains('step-info')).toBe(true);
    });

    it('applies step-success class', () => {
        const el = renderToDiv(
            <Steps>
                <Steps.Step color="success">Step</Steps.Step>
            </Steps>
        );
        expect(el.querySelector('.step')!.classList.contains('step-success')).toBe(true);
    });

    it('applies step-warning class', () => {
        const el = renderToDiv(
            <Steps>
                <Steps.Step color="warning">Step</Steps.Step>
            </Steps>
        );
        expect(el.querySelector('.step')!.classList.contains('step-warning')).toBe(true);
    });

    it('applies step-error class', () => {
        const el = renderToDiv(
            <Steps>
                <Steps.Step color="error">Step</Steps.Step>
            </Steps>
        );
        expect(el.querySelector('.step')!.classList.contains('step-error')).toBe(true);
    });

    // data-content
    it('sets data-content attribute', () => {
        const el = renderToDiv(
            <Steps>
                <Steps.Step content="✓">Done</Steps.Step>
            </Steps>
        );
        expect(el.querySelector('.step')!.getAttribute('data-content')).toBe('✓');
    });

    it('sets data-content with custom symbol', () => {
        const el = renderToDiv(
            <Steps>
                <Steps.Step content="?">Pending</Steps.Step>
            </Steps>
        );
        expect(el.querySelector('.step')!.getAttribute('data-content')).toBe('?');
    });

    // Custom class
    it('passes custom class to Steps container', () => {
        const el = renderToDiv(
            <Steps class="my-custom">
                <Steps.Step>Step</Steps.Step>
            </Steps>
        );
        expect(el.querySelector('.steps')!.classList.contains('my-custom')).toBe(true);
    });

    it('passes custom class to Steps.Step', () => {
        const el = renderToDiv(
            <Steps>
                <Steps.Step class="my-step">Step</Steps.Step>
            </Steps>
        );
        expect(el.querySelector('.step')!.classList.contains('my-step')).toBe(true);
    });

    // Multiple steps
    it('renders multiple steps', () => {
        const el = renderToDiv(
            <Steps>
                <Steps.Step color="primary">Step 1</Steps.Step>
                <Steps.Step color="primary">Step 2</Steps.Step>
                <Steps.Step>Step 3</Steps.Step>
            </Steps>
        );
        const steps = el.querySelectorAll('.step');
        expect(steps.length).toBe(3);
        expect(steps[0].classList.contains('step-primary')).toBe(true);
        expect(steps[1].classList.contains('step-primary')).toBe(true);
        expect(steps[2].classList.contains('step-primary')).toBe(false);
    });

    // Items prop
    it('renders from items prop', () => {
        const items = [
            { id: 's1', label: 'Register' },
            { id: 's2', label: 'Plan' },
            { id: 's3', label: 'Purchase' }
        ];
        const el = renderToDiv(<Steps items={items} />);
        const steps = el.querySelectorAll('.step');
        expect(steps.length).toBe(3);
        expect(steps[0].textContent).toBe('Register');
        expect(steps[1].textContent).toBe('Plan');
        expect(steps[2].textContent).toBe('Purchase');
    });

    // No color without prop
    it('does not add color class when no color prop', () => {
        const el = renderToDiv(
            <Steps>
                <Steps.Step>Plain</Steps.Step>
            </Steps>
        );
        const step = el.querySelector('.step')!;
        expect(step.classList.contains('step-primary')).toBe(false);
        expect(step.classList.contains('step-neutral')).toBe(false);
    });

    // Combined vertical + custom class
    it('supports vertical with custom class', () => {
        const el = renderToDiv(
            <Steps vertical class="w-64">
                <Steps.Step>Step</Steps.Step>
            </Steps>
        );
        const steps = el.querySelector('.steps')!;
        expect(steps.classList.contains('steps-vertical')).toBe(true);
        expect(steps.classList.contains('w-64')).toBe(true);
    });
});
