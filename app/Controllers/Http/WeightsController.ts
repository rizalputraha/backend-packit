// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseController from "./BaseController";
import { schema } from '@ioc:Adonis/Core/Validator'
import Weight from 'App/Models/Weight';

export default class WeightsController extends BaseController {
  /**
   * index
   */
   public async index({request}: HttpContextContract) {
    const params = request.qs();
    const searchColumn = ['email','full_name'];
    return this.paging('weights',params,searchColumn);
  }

  /**
   * show
   */
  public async show({params}: HttpContextContract) {
    const weight = await Weight.find(params.id);
    return weight;
  }

  /**
   * store
   */
  public async store({request,response}: HttpContextContract) {
    const schemaWeight = schema.create({
      name: schema.string(),
      weight: schema.number(),
    })
    const payload = await request.validate({schema: schemaWeight});
    const weight = new Weight()
    try {
      await weight.fill(payload).save();
      return payload;
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }

  /**
   * update
   */
  public async update({request, response}: HttpContextContract) {
    const schemaWeight = schema.create({
      name: schema.string(),
      weight: schema.number(),
    })
    const payload = await request.validate({schema: schemaWeight});
    const weight = new Weight()
    try {
      await weight.fill(payload).save();
      return payload;
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }

  /**
   * delete
   */
  public async delete({params}: HttpContextContract) {
    const user = await Weight.findOrFail(params.id)
    await user.delete()

    return user;
  }
}
