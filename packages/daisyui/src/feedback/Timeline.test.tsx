import { describe, it, expect } from 'vitest';
import { render } from 'sigx';
import { Timeline } from './Timeline';

function renderToDiv(jsx: any): HTMLElement {
    const container = document.createElement('div');
    render(jsx, container);
    return container;
}

describe('Timeline', () => {
    it('renders with base timeline class', () => {
        const el = renderToDiv(
            <Timeline>
                <Timeline.Item>
                    <Timeline.End>Event</Timeline.End>
                </Timeline.Item>
            </Timeline>
        );
        const timeline = el.querySelector('.timeline')!;
        expect(timeline).toBeTruthy();
        expect(timeline.tagName).toBe('UL');
    });

    it('applies vertical modifier', () => {
        const el = renderToDiv(
            <Timeline vertical>
                <Timeline.Item>
                    <Timeline.End>Event</Timeline.End>
                </Timeline.Item>
            </Timeline>
        );
        const timeline = el.querySelector('.timeline')!;
        expect(timeline.classList.contains('timeline-vertical')).toBe(true);
    });

    it('applies horizontal modifier', () => {
        const el = renderToDiv(
            <Timeline horizontal>
                <Timeline.Item>
                    <Timeline.End>Event</Timeline.End>
                </Timeline.Item>
            </Timeline>
        );
        const timeline = el.querySelector('.timeline')!;
        expect(timeline.classList.contains('timeline-horizontal')).toBe(true);
    });

    it('applies snap modifier', () => {
        const el = renderToDiv(
            <Timeline snap>
                <Timeline.Item>
                    <Timeline.End>Event</Timeline.End>
                </Timeline.Item>
            </Timeline>
        );
        const timeline = el.querySelector('.timeline')!;
        expect(timeline.classList.contains('timeline-snap-icon')).toBe(true);
    });

    it('applies compact modifier', () => {
        const el = renderToDiv(
            <Timeline compact>
                <Timeline.Item>
                    <Timeline.End>Event</Timeline.End>
                </Timeline.Item>
            </Timeline>
        );
        const timeline = el.querySelector('.timeline')!;
        expect(timeline.classList.contains('timeline-compact')).toBe(true);
    });

    it('applies custom class', () => {
        const el = renderToDiv(
            <Timeline class="my-timeline">
                <Timeline.Item>
                    <Timeline.End>Event</Timeline.End>
                </Timeline.Item>
            </Timeline>
        );
        const timeline = el.querySelector('.timeline')!;
        expect(timeline.classList.contains('my-timeline')).toBe(true);
    });
});

describe('Timeline.Item', () => {
    it('renders as li element', () => {
        const el = renderToDiv(
            <Timeline>
                <Timeline.Item>
                    <Timeline.End>Event</Timeline.End>
                </Timeline.Item>
            </Timeline>
        );
        const item = el.querySelector('li')!;
        expect(item).toBeTruthy();
        expect(item.tagName).toBe('LI');
    });

    it('applies custom class', () => {
        const el = renderToDiv(
            <Timeline>
                <Timeline.Item class="my-item">
                    <Timeline.End>Event</Timeline.End>
                </Timeline.Item>
            </Timeline>
        );
        const item = el.querySelector('li')!;
        expect(item.classList.contains('my-item')).toBe(true);
    });
});

describe('Timeline.Start', () => {
    it('renders with timeline-start class', () => {
        const el = renderToDiv(
            <Timeline>
                <Timeline.Item>
                    <Timeline.Start>2024</Timeline.Start>
                </Timeline.Item>
            </Timeline>
        );
        const start = el.querySelector('.timeline-start')!;
        expect(start).toBeTruthy();
        expect(start.tagName).toBe('DIV');
    });

    it('applies boxed modifier', () => {
        const el = renderToDiv(
            <Timeline>
                <Timeline.Item>
                    <Timeline.Start boxed>2024</Timeline.Start>
                </Timeline.Item>
            </Timeline>
        );
        const start = el.querySelector('.timeline-start')!;
        expect(start.classList.contains('timeline-box')).toBe(true);
    });

    it('applies custom class', () => {
        const el = renderToDiv(
            <Timeline>
                <Timeline.Item>
                    <Timeline.Start class="font-bold">2024</Timeline.Start>
                </Timeline.Item>
            </Timeline>
        );
        const start = el.querySelector('.timeline-start')!;
        expect(start.classList.contains('font-bold')).toBe(true);
    });
});

describe('Timeline.Middle', () => {
    it('renders with timeline-middle class', () => {
        const el = renderToDiv(
            <Timeline>
                <Timeline.Item>
                    <Timeline.Middle>●</Timeline.Middle>
                </Timeline.Item>
            </Timeline>
        );
        const middle = el.querySelector('.timeline-middle')!;
        expect(middle).toBeTruthy();
        expect(middle.tagName).toBe('DIV');
    });

    it('applies custom class', () => {
        const el = renderToDiv(
            <Timeline>
                <Timeline.Item>
                    <Timeline.Middle class="text-primary">●</Timeline.Middle>
                </Timeline.Item>
            </Timeline>
        );
        const middle = el.querySelector('.timeline-middle')!;
        expect(middle.classList.contains('text-primary')).toBe(true);
    });
});

describe('Timeline.End', () => {
    it('renders with timeline-end class', () => {
        const el = renderToDiv(
            <Timeline>
                <Timeline.Item>
                    <Timeline.End>Event</Timeline.End>
                </Timeline.Item>
            </Timeline>
        );
        const end = el.querySelector('.timeline-end')!;
        expect(end).toBeTruthy();
        expect(end.tagName).toBe('DIV');
    });

    it('applies boxed modifier', () => {
        const el = renderToDiv(
            <Timeline>
                <Timeline.Item>
                    <Timeline.End boxed>Event</Timeline.End>
                </Timeline.Item>
            </Timeline>
        );
        const end = el.querySelector('.timeline-end')!;
        expect(end.classList.contains('timeline-box')).toBe(true);
    });

    it('does not apply timeline-box without boxed prop', () => {
        const el = renderToDiv(
            <Timeline>
                <Timeline.Item>
                    <Timeline.End>Event</Timeline.End>
                </Timeline.Item>
            </Timeline>
        );
        const end = el.querySelector('.timeline-end')!;
        expect(end.classList.contains('timeline-box')).toBe(false);
    });

    it('applies custom class', () => {
        const el = renderToDiv(
            <Timeline>
                <Timeline.Item>
                    <Timeline.End class="text-lg">Event</Timeline.End>
                </Timeline.Item>
            </Timeline>
        );
        const end = el.querySelector('.timeline-end')!;
        expect(end.classList.contains('text-lg')).toBe(true);
    });
});

describe('Timeline.Hr', () => {
    it('renders an hr element', () => {
        const el = renderToDiv(
            <Timeline>
                <Timeline.Item>
                    <Timeline.Hr />
                    <Timeline.End>Event</Timeline.End>
                </Timeline.Item>
            </Timeline>
        );
        const hr = el.querySelector('hr')!;
        expect(hr).toBeTruthy();
    });

    it('applies color class for primary', () => {
        const el = renderToDiv(
            <Timeline>
                <Timeline.Item>
                    <Timeline.Hr color="primary" />
                </Timeline.Item>
            </Timeline>
        );
        const hr = el.querySelector('hr')!;
        expect(hr.classList.contains('bg-primary')).toBe(true);
    });

    it('applies color class for success', () => {
        const el = renderToDiv(
            <Timeline>
                <Timeline.Item>
                    <Timeline.Hr color="success" />
                </Timeline.Item>
            </Timeline>
        );
        const hr = el.querySelector('hr')!;
        expect(hr.classList.contains('bg-success')).toBe(true);
    });

    it('applies all color variants', () => {
        const colors = ['primary', 'secondary', 'accent', 'neutral', 'info', 'success', 'warning', 'error'] as const;
        for (const color of colors) {
            const el = renderToDiv(
                <Timeline>
                    <Timeline.Item>
                        <Timeline.Hr color={color} />
                    </Timeline.Item>
                </Timeline>
            );
            const hr = el.querySelector('hr')!;
            expect(hr.classList.contains(`bg-${color}`)).toBe(true);
        }
    });

    it('applies custom class', () => {
        const el = renderToDiv(
            <Timeline>
                <Timeline.Item>
                    <Timeline.Hr class="my-hr" />
                </Timeline.Item>
            </Timeline>
        );
        const hr = el.querySelector('hr')!;
        expect(hr.classList.contains('my-hr')).toBe(true);
    });

    it('renders without class when no color or custom class', () => {
        const el = renderToDiv(
            <Timeline>
                <Timeline.Item>
                    <Timeline.Hr />
                </Timeline.Item>
            </Timeline>
        );
        const hr = el.querySelector('hr')!;
        expect(hr.className === '' || hr.getAttribute('class') === null || hr.getAttribute('class') === '').toBe(true);
    });
});

describe('Timeline compound composition', () => {
    it('renders full timeline with all sub-components', () => {
        const el = renderToDiv(
            <Timeline vertical>
                <Timeline.Item>
                    <Timeline.Start>2024</Timeline.Start>
                    <Timeline.Middle>●</Timeline.Middle>
                    <Timeline.End boxed>Started</Timeline.End>
                    <Timeline.Hr color="primary" />
                </Timeline.Item>
                <Timeline.Item>
                    <Timeline.Hr color="primary" />
                    <Timeline.Start>2025</Timeline.Start>
                    <Timeline.Middle>●</Timeline.Middle>
                    <Timeline.End boxed>Completed</Timeline.End>
                </Timeline.Item>
            </Timeline>
        );
        const timeline = el.querySelector('.timeline')!;
        expect(timeline.classList.contains('timeline-vertical')).toBe(true);
        expect(el.querySelectorAll('li').length).toBe(2);
        expect(el.querySelectorAll('.timeline-start').length).toBe(2);
        expect(el.querySelectorAll('.timeline-middle').length).toBe(2);
        expect(el.querySelectorAll('.timeline-end').length).toBe(2);
        expect(el.querySelectorAll('hr').length).toBe(2);
    });

    it('renders compact timeline', () => {
        const el = renderToDiv(
            <Timeline compact>
                <Timeline.Item>
                    <Timeline.Middle>●</Timeline.Middle>
                    <Timeline.End boxed>Event 1</Timeline.End>
                    <Timeline.Hr />
                </Timeline.Item>
                <Timeline.Item>
                    <Timeline.Hr />
                    <Timeline.Middle>●</Timeline.Middle>
                    <Timeline.End boxed>Event 2</Timeline.End>
                </Timeline.Item>
            </Timeline>
        );
        const timeline = el.querySelector('.timeline')!;
        expect(timeline.classList.contains('timeline-compact')).toBe(true);
    });

    it('supports multiple modifiers together', () => {
        const el = renderToDiv(
            <Timeline vertical snap compact>
                <Timeline.Item>
                    <Timeline.End>Event</Timeline.End>
                </Timeline.Item>
            </Timeline>
        );
        const timeline = el.querySelector('.timeline')!;
        expect(timeline.classList.contains('timeline-vertical')).toBe(true);
        expect(timeline.classList.contains('timeline-snap-icon')).toBe(true);
        expect(timeline.classList.contains('timeline-compact')).toBe(true);
    });
});
