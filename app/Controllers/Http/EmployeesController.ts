// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseController from "./BaseController";
import Employee from 'App/Models/Employee'

// Validation Schema
import CreateEmployee from 'App/Validators/employee/CreateEmployee'
import UpdateEmployee from 'App/Validators/employee/UpdateEmployee'

export default class EmployeesController extends BaseController {
  /**
   * index
   */
   public async index({request}: HttpContextContract) {
    const params = request.qs();
    const searchColumn = ['name'];
    return this.paging('employees',params,searchColumn);
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
