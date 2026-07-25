/**
 * Generic response shape returned by the shared pagination provider.
 *
 * @typeParam T Entity or projection included in the current page.
 */
export interface Paginated<T> {
  /** Records returned for the requested page. */
  data: T[];
  /** Count and page-position metadata. */
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
  };
  /** Absolute navigation URLs calculated from the current request. */
  links: {
    first?: string;
    previous?: string;
    current: string;
    next?: string;
    last?: string;
  };
}
