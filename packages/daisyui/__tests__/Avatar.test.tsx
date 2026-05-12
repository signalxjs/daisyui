import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@sigx/runtime-dom';
import { jsx } from '@sigx/runtime-core';
import { Avatar } from '../src/data/Avatar';

describe('Avatar', () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    const getOuter = () => container.querySelector('.avatar') as HTMLElement;
    const getInner = () => getOuter()?.querySelector('div') as HTMLElement;

    it('renders with base `avatar` class', () => {
        render(jsx(Avatar, { src: '/img.jpg' }), container);
        expect(getOuter()).not.toBeNull();
        expect(getOuter().classList.contains('avatar')).toBe(true);
    });

    it('renders an <img> when src is provided', () => {
        render(jsx(Avatar, { src: '/img.jpg', alt: 'Test' }), container);
        const img = container.querySelector('img')!;
        expect(img.getAttribute('src')).toBe('/img.jpg');
        expect(img.getAttribute('alt')).toBe('Test');
    });

    it('defaults alt to "Avatar" when not specified', () => {
        render(jsx(Avatar, { src: '/img.jpg' }), container);
        const img = container.querySelector('img')!;
        expect(img.getAttribute('alt')).toBe('Avatar');
    });

    // Sizes
    const sizes = [
        ['xs', 'w-8'],
        ['sm', 'w-12'],
        ['md', 'w-16'],
        ['lg', 'w-20'],
        ['xl', 'w-24'],
    ] as const;
    for (const [size, cls] of sizes) {
        it(`size="${size}" emits ${cls}`, () => {
            render(jsx(Avatar, { src: '/img.jpg', size }), container);
            expect(getInner().classList.contains(cls)).toBe(true);
        });
    }

    it('defaults to size md (w-16)', () => {
        render(jsx(Avatar, { src: '/img.jpg' }), container);
        expect(getInner().classList.contains('w-16')).toBe(true);
    });

    // Shapes
    const shapes = [
        ['circle', 'rounded-full'],
        ['rounded', 'rounded-xl'],
        ['squircle', 'mask-squircle'],
        ['hexagon', 'mask-hexagon-2'],
        ['heart', 'mask-heart'],
    ] as const;
    for (const [shape, cls] of shapes) {
        it(`shape="${shape}" emits ${cls}`, () => {
            render(jsx(Avatar, { src: '/img.jpg', shape }), container);
            expect(getInner().classList.contains(cls)).toBe(true);
        });
    }

    it('shape="square" emits no shape class', () => {
        render(jsx(Avatar, { src: '/img.jpg', shape: 'square' }), container);
        expect(getInner().classList.contains('rounded-full')).toBe(false);
        expect(getInner().classList.contains('rounded-xl')).toBe(false);
        expect(getInner().classList.contains('mask')).toBe(false);
    });

    it('defaults to shape circle (rounded-full)', () => {
        render(jsx(Avatar, { src: '/img.jpg' }), container);
        expect(getInner().classList.contains('rounded-full')).toBe(true);
    });

    // Online / Offline
    it('online prop emits avatar-online', () => {
        render(jsx(Avatar, { src: '/img.jpg', online: true }), container);
        expect(getOuter().classList.contains('avatar-online')).toBe(true);
    });

    it('offline prop emits avatar-offline', () => {
        render(jsx(Avatar, { src: '/img.jpg', offline: true }), container);
        expect(getOuter().classList.contains('avatar-offline')).toBe(true);
    });

    // Placeholder
    it('placeholder renders text instead of image', () => {
        render(jsx(Avatar, { placeholder: 'JD' }), container);
        expect(container.querySelector('img')).toBeNull();
        expect(getOuter().classList.contains('avatar-placeholder')).toBe(true);
        expect(getInner().textContent).toBe('JD');
    });

    // Ring
    it('ring prop emits ring classes with default primary color', () => {
        render(jsx(Avatar, { src: '/img.jpg', ring: true }), container);
        expect(getInner().classList.contains('ring')).toBe(true);
        expect(getInner().classList.contains('ring-primary')).toBe(true);
        expect(getInner().classList.contains('ring-offset-base-100')).toBe(true);
        expect(getInner().classList.contains('ring-offset-2')).toBe(true);
    });

    it('ringColor overrides the ring color', () => {
        render(jsx(Avatar, { src: '/img.jpg', ring: true, ringColor: 'secondary' }), container);
        expect(getInner().classList.contains('ring-secondary')).toBe(true);
        expect(getInner().classList.contains('ring-primary')).toBe(false);
    });

    // Custom class
    it('custom class is applied to outer container', () => {
        render(jsx(Avatar, { src: '/img.jpg', class: 'my-custom' }), container);
        expect(getOuter().classList.contains('my-custom')).toBe(true);
    });
});

describe('Avatar.Group', () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    const getGroup = () => container.querySelector('.avatar-group') as HTMLElement;

    it('renders with avatar-group class', () => {
        render(jsx(Avatar.Group, { children: jsx(Avatar, { src: '/a.jpg' }) }), container);
        expect(getGroup()).not.toBeNull();
        expect(getGroup().classList.contains('avatar-group')).toBe(true);
    });

    it('defaults to -space-x-6 spacing', () => {
        render(jsx(Avatar.Group, { children: jsx(Avatar, { src: '/a.jpg' }) }), container);
        expect(getGroup().classList.contains('-space-x-6')).toBe(true);
    });

    it('spacing prop overrides spacing class', () => {
        render(jsx(Avatar.Group, { spacing: 4, children: jsx(Avatar, { src: '/a.jpg' }) }), container);
        expect(getGroup().classList.contains('-space-x-4')).toBe(true);
        expect(getGroup().classList.contains('-space-x-6')).toBe(false);
    });

    it('renders children', () => {
        render(jsx(Avatar.Group, {
            children: [
                jsx(Avatar, { src: '/a.jpg' }),
                jsx(Avatar, { src: '/b.jpg' }),
            ]
        }), container);
        const avatars = getGroup().querySelectorAll('.avatar');
        expect(avatars.length).toBe(2);
    });
});
