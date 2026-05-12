import { component, type Define } from 'sigx';

export type PaginationProps = 
    & Define.Prop<'currentPage', number>
    & Define.Prop<'totalPages', number>
    & Define.Prop<'class', string, false>
    & Define.Event<'change', number>;

/**
 * Pagination component with DaisyUI styling.
 * 
 * @example
 * ```tsx
 * <Pagination currentPage={1} totalPages={10} onChange={(page) => setPage(page)} />
 * ```
 */
export const Pagination = component<PaginationProps>(({ props, emit }) => {
    const getClasses = () => {
        const classes = ['join'];
        if (props.class) classes.push(props.class);
        return classes.join(' ');
    };

    const getPages = () => {
        const pages: (number | '...')[] = [];
        const current = props.currentPage ?? 1;
        const total = props.totalPages ?? 1;
        
        if (total <= 7) {
            for (let i = 1; i <= total; i++) {
                pages.push(i);
            }
        } else {
            if (current <= 4) {
                for (let i = 1; i <= 5; i++) pages.push(i);
                pages.push('...');
                pages.push(total);
            } else if (current >= total - 3) {
                pages.push(1);
                pages.push('...');
                for (let i = total - 4; i <= total; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = current - 1; i <= current + 1; i++) pages.push(i);
                pages.push('...');
                pages.push(total);
            }
        }
        
        return pages;
    };

    return () => (
        <div class={getClasses()}>
            {getPages().map(page => 
                page === '...' ? (
                    <button class="join-item btn btn-disabled">...</button>
                ) : (
                    <button 
                        class={`join-item btn ${page === props.currentPage ? 'btn-active' : ''}`}
                        onClick={() => emit('change', page)}
                    >
                        {page}
                    </button>
                )
            )}
        </div>
    );
});
