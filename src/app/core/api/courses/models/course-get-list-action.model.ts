export class CourseGetListActionModel {
  constructor(
    public startIndex?: number,
    public count?: number,
    public searchText?: string,
    public sortKey?: string
  ) { }

  toParams() {
    return {
      start: (this.startIndex || 0).toString(),
      ...(this.count && { count: this.count.toString() }),
      ...(this.searchText && { textFragment: this.searchText }),
      ...(this.sortKey && { sort: this.sortKey }),
    };
  }
}
