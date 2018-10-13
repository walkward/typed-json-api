interface IPage {
  offset: number;
  limit: number;
}

export default class RequestQuery {
  public sort: string[];
  public include: string[];
  public page: IPage;
  public filter: any;
  public fields: any;

  constructor({
    sort = '',
    include = '',
    page = {},
    filter = {},
    fields = {},
  }: any) {
    this.sort = sort.split(',');
    this.include = include.split(',');

    this.page = page;
    this.page.limit = page.limit || 25;
    this.page.offset = page.offset || 0;

    this.filter = filter;

    this.fields = fields || ['type', 'id'];
  }
}
