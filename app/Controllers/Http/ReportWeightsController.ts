import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import BaseController from "./BaseController";
import Employee from 'App/Models/Employee'

// Validation Schema
import CreateEmployee from 'App/Validators/employee/CreateEmployee'
import UpdateEmployee from 'App/Validators/employee/UpdateEmployee'

export default class ReportWeightsController extends BaseController{
  /**
   * index
   */
   public async index({request}: HttpContextContract) {
    var {keyword, page, limit, order, by} = request.qs();

    let searchColumn = ['employee']

    let keywordSearch: string = keyword ? `%${keyword}%` : '';
    let paramsBy: string = !by ? 'created_at' : by ;
    let paramsOrder: any = !order ? 'asc' : order;
    let paramsPage = !page ? 1 : page;
    let paramsLimit = !limit ? 100 : limit;

    const query = await Database.query()
                              .from('report_weights')
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
                              .join('weights','weights.id','=','report_weights.weight_id')
                              .join('employees','employees.id','=','report_weights.employee_id')
                              .select('report_weights.*')
                              .select(['weights.name as weightName','weights.weight'])
                              .select(['employees.name as employeeName'])
                              .orderBy(paramsBy,paramsOrder)
                              .paginate(paramsPage,paramsLimit)

    return {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      data: query.rows,
      total: query.total,
      current_page: query.currentPage,
      last_page: query.lastPage,
      from: query.firstPage,
      to: query.perPage,
    };
  }

  /**
   * show
   */
  public async show({params}: HttpContextContract) {
    const emp = await Employee.find(params.id);
    return emp;
  }

  /**
   * store
   */
  public async store({request,response}: HttpContextContract) {
    const payload = await request.validate(CreateEmployee);
    const emp = new Employee()
    try {
      await emp.save()
      return payload;
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }

  /**
   * update
   */
  public async update({request, response}: HttpContextContract) {
    const payload = await request.validate(UpdateEmployee);
    const emp = new Employee()
    try {
      await emp.fill(payload).save();
      return payload;
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }

  /**
   * delete
   */
  public async delete({params}: HttpContextContract) {
    const emp = await Employee.findOrFail(params.id)
    await emp.delete()

    return emp;
  }
}
