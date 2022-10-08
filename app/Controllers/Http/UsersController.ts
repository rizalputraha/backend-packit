import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import BaseController from 'App/Controllers/Http/BaseController'
import Hash from '@ioc:Adonis/Core/Hash'

export default class UsersController extends BaseController {
  /**
   * index
   */
  public async index({request}: HttpContextContract) {
    const params = request.qs();
    const searchColumn = 'email'
    return this.getResponse('users',params,searchColumn);
  }

  /**
   * show
   */
  public async show({params}: HttpContextContract) {
    const user = await User.find(params.id);
    return user;
  }

  /**
   * store
   */
  public async store({request,response}: HttpContextContract) {
    const userSchema = schema.create({
      email: schema.string(),
      password: schema.string(),
    })
    const user = new User()
    try {
      const payload = await request.validate({schema: userSchema})
      user.email = payload.email;
      user.password = await Hash.make(payload.password)
      await user.save()
      return payload;
    } catch (error) {
      return response.badRequest(error.messages)
    }

  }

  /**
   * update
   */
  public async update({request, response}: HttpContextContract) {

  }

  /**
   * delete
   */
  public async delete() {

  }
}
