import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@sigx/runtime-dom';
import { jsx } from '@sigx/runtime-core';
import { Stats } from '../src/data/Stats';

describe('Stats', () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    const getStats = () => container.querySelector('.stats') as HTMLElement;
    const getStat = () => container.querySelector('.stat') as HTMLElement;

    const minItem = () => jsx(Stats.Item, {
        children: jsx(Stats.Value, { children: '100' }),
    });

    // Container
    describe('Stats container', () => {
        it('renders with base `stats` class', () => {
            render(jsx(Stats, { children: minItem() }), container);
            expect(getStats()).not.toBeNull();
            expect(getStats().classList.contains('stats')).toBe(true);
        });

        it('does not apply shadow by default', () => {
            render(jsx(Stats, { children: minItem() }), container);
            expect(getStats().classList.contains('shadow')).toBe(false);
        });

        it('applies shadow when shadow=true', () => {
            render(jsx(Stats, { shadow: true, children: minItem() }), container);
            expect(getStats().classList.contains('shadow')).toBe(true);
        });

        it('applies stats-vertical when vertical=true', () => {
            render(jsx(Stats, { vertical: true, children: minItem() }), container);
            expect(getStats().classList.contains('stats-vertical')).toBe(true);
        });

        it('applies stats-horizontal when horizontal=true', () => {
            render(jsx(Stats, { horizontal: true, children: minItem() }), container);
            expect(getStats().classList.contains('stats-horizontal')).toBe(true);
        });

        it('applies custom class', () => {
            render(jsx(Stats, { class: 'my-custom', children: minItem() }), container);
            expect(getStats().classList.contains('my-custom')).toBe(true);
        });
    });

    // Stat Item
    describe('Stats.Item', () => {
        it('renders with base `stat` class', () => {
            render(jsx(Stats, { children: minItem() }), container);
            expect(getStat()).not.toBeNull();
            expect(getStat().classList.contains('stat')).toBe(true);
        });

        it('applies custom class', () => {
            render(jsx(Stats, {
                children: jsx(Stats.Item, {
                    class: 'place-items-center',
                    children: jsx(Stats.Value, { children: '100' }),
                }),
            }), container);
            expect(getStat().classList.contains('place-items-center')).toBe(true);
        });
    });

    // Sub-components
    describe('Stats.Title', () => {
        it('renders with stat-title class', () => {
            render(jsx(Stats, {
                children: jsx(Stats.Item, {
                    children: jsx(Stats.Title, { children: 'Downloads' }),
                }),
            }), container);
            const el = container.querySelector('.stat-title') as HTMLElement;
            expect(el).not.toBeNull();
            expect(el.textContent).toBe('Downloads');
        });

        it('applies custom class', () => {
            render(jsx(Stats, {
                children: jsx(Stats.Item, {
                    children: jsx(Stats.Title, { class: 'text-primary', children: 'T' }),
                }),
            }), container);
            const el = container.querySelector('.stat-title') as HTMLElement;
            expect(el.classList.contains('text-primary')).toBe(true);
        });
    });

    describe('Stats.Value', () => {
        it('renders with stat-value class', () => {
            render(jsx(Stats, {
                children: jsx(Stats.Item, {
                    children: jsx(Stats.Value, { children: '31K' }),
                }),
            }), container);
            const el = container.querySelector('.stat-value') as HTMLElement;
            expect(el).not.toBeNull();
            expect(el.textContent).toBe('31K');
        });

        it('applies custom class', () => {
            render(jsx(Stats, {
                children: jsx(Stats.Item, {
                    children: jsx(Stats.Value, { class: 'text-secondary', children: '31K' }),
                }),
            }), container);
            const el = container.querySelector('.stat-value') as HTMLElement;
            expect(el.classList.contains('text-secondary')).toBe(true);
        });
    });

    describe('Stats.Desc', () => {
        it('renders with stat-desc class', () => {
            render(jsx(Stats, {
                children: jsx(Stats.Item, {
                    children: jsx(Stats.Desc, { children: 'Jan 1st - Feb 1st' }),
                }),
            }), container);
            const el = container.querySelector('.stat-desc') as HTMLElement;
            expect(el).not.toBeNull();
            expect(el.textContent).toBe('Jan 1st - Feb 1st');
        });

        it('applies custom class', () => {
            render(jsx(Stats, {
                children: jsx(Stats.Item, {
                    children: jsx(Stats.Desc, { class: 'text-error', children: 'Down' }),
                }),
            }), container);
            const el = container.querySelector('.stat-desc') as HTMLElement;
            expect(el.classList.contains('text-error')).toBe(true);
        });
    });

    describe('Stats.Figure', () => {
        it('renders with stat-figure class', () => {
            render(jsx(Stats, {
                children: jsx(Stats.Item, {
                    children: jsx(Stats.Figure, { children: 'icon' }),
                }),
            }), container);
            const el = container.querySelector('.stat-figure') as HTMLElement;
            expect(el).not.toBeNull();
        });

        it('applies custom class', () => {
            render(jsx(Stats, {
                children: jsx(Stats.Item, {
                    children: jsx(Stats.Figure, { class: 'text-primary', children: 'icon' }),
                }),
            }), container);
            const el = container.querySelector('.stat-figure') as HTMLElement;
            expect(el.classList.contains('text-primary')).toBe(true);
        });
    });

    describe('Stats.Actions', () => {
        it('renders with stat-actions class', () => {
            render(jsx(Stats, {
                children: jsx(Stats.Item, {
                    children: jsx(Stats.Actions, { children: 'action' }),
                }),
            }), container);
            const el = container.querySelector('.stat-actions') as HTMLElement;
            expect(el).not.toBeNull();
        });

        it('applies custom class', () => {
            render(jsx(Stats, {
                children: jsx(Stats.Item, {
                    children: jsx(Stats.Actions, { class: 'mt-2', children: 'action' }),
                }),
            }), container);
            const el = container.querySelector('.stat-actions') as HTMLElement;
            expect(el.classList.contains('mt-2')).toBe(true);
        });
    });

    // Composition
    describe('full composition', () => {
        it('renders all sub-components together', () => {
            render(jsx(Stats, {
                shadow: true,
                children: jsx(Stats.Item, {
                    children: [
                        jsx(Stats.Figure, { class: 'text-primary', children: '📊' }),
                        jsx(Stats.Title, { children: 'Total Page Views' }),
                        jsx(Stats.Value, { children: '89,400' }),
                        jsx(Stats.Desc, { children: '21% more than last month' }),
                        jsx(Stats.Actions, { children: 'View Details' }),
                    ],
                }),
            }), container);

            expect(getStats().classList.contains('shadow')).toBe(true);
            expect(container.querySelector('.stat')).not.toBeNull();
            expect(container.querySelector('.stat-figure')).not.toBeNull();
            expect(container.querySelector('.stat-title')!.textContent).toBe('Total Page Views');
            expect(container.querySelector('.stat-value')!.textContent).toBe('89,400');
            expect(container.querySelector('.stat-desc')!.textContent).toBe('21% more than last month');
            expect(container.querySelector('.stat-actions')).not.toBeNull();
        });

        it('renders multiple stat items', () => {
            render(jsx(Stats, {
                children: [
                    jsx(Stats.Item, {
                        children: [
                            jsx(Stats.Title, { children: 'Downloads' }),
                            jsx(Stats.Value, { children: '31K' }),
                        ],
                    }),
                    jsx(Stats.Item, {
                        children: [
                            jsx(Stats.Title, { children: 'Users' }),
                            jsx(Stats.Value, { children: '4,200' }),
                        ],
                    }),
                ],
            }), container);

            const items = container.querySelectorAll('.stat');
            expect(items.length).toBe(2);
        });
    });
});
