import { SortOrder } from '../shared/enums';

export interface FilterOptions {
  name: string;
  sortOrder: SortOrder;
  pageIndex: number;
  pageSize: number;
}
