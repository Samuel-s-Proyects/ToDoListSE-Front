export interface PageInfo {
  hasNextPage: boolean;
  nextCursor: string | null;
}

export interface PaginatedResponse<T> {
  items: T[];
  pageInfo: PageInfo;
}
