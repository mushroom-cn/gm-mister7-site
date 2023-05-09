import { BehaviorSubject } from "rxjs";

export type PageQuery = {
  page: number;
  size: number;
};
const defaultPageQuery: PageQuery = {
  page: -1,
  size: -1,
};
export class LoadMore<T> {
  private loading$ = new BehaviorSubject(false);
  private error$ = new BehaviorSubject(null);
  private data$ = new BehaviorSubject<T[]>([]);
  private totalCount$ = new BehaviorSubject(0);
  private pagQuery = new BehaviorSubject<PageQuery>(defaultPageQuery);

  //   onLoad: ({}: {
  //     pageQuery: PageQuery;
  //   }) => Promise<{ totalCount: number; data: T[] }>;
}
