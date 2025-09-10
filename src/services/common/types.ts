export interface BaseFiltersList {
  baseSortEntityType?: number;
  sortType?: number;
  fromDate?: string;
  toDate?: string;
  page: number | undefined;
  pageCount?: number;
  userId?: string;
  size: number;
}
