import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';

export default class BaseController {

  async paging (table: string, params, searchColumn: Array<string>) {
    var {keyword, page, limit, order, by} = params

    let keywordSearch: string = keyword ? `%${keyword}%` : '';
    let paramsBy: string = !by ? 'created_at' : by ;
    let paramsOrder: any = !order ? 'asc' : order;
    let paramsPage = !page ? 1 : page;
    let paramsLimit = !limit ? 100 : limit;

    const query = await Database.query()
                              .from(table)
                              .if(keyword, (query) => {
                                let q = query;
                                searchColumn.forEach((element,index) => {
                                  if (index == 0) {
                                    q = q.whereILike(element, keywordSearch);
                                  }else{
                                    q = q.orWhereILike(element, keywordSearch);
                                  }
                                  return q
                                });
                              })
                              .orderBy(paramsBy,paramsOrder)
                              .paginate(paramsPage,paramsLimit)
    const resp = {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      data: query.rows,
      total: query.total,
      current_page: query.currentPage,
      last_page: query.lastPage,
      from: query.firstPage,
      to: query.perPage,
    }

    return resp;
  }


}
