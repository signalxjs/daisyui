import { defineLibConfig } from '@sigx/vite/lib';

// DaisyUI component library with subpath exports for better tree-shaking
export default defineLibConfig({
    entry: {
        'index': 'src/index.ts',
        'theme/index': 'src/theme/index.ts',
        'buttons/index': 'src/buttons/index.ts',
        'forms/index': 'src/forms/index.ts',
        'layout/index': 'src/layout/index.ts',
        'feedback/index': 'src/feedback/index.ts',
        'navigation/index': 'src/navigation/index.ts',
        'data/index': 'src/data/index.ts',
        'typography/index': 'src/typography/index.ts'
    },
    external: ['sigx', 'sigx/jsx-runtime', 'sigx/jsx-dev-runtime'],
    jsx: true
});
