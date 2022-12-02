import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import BaseController from 'App/Controllers/Http/BaseController'
import Hash from '@ioc:Adonis/Core/Hash'

// Validation Schema
import CreateUser from 'App/Validators/users/CreateUser'
import UpdateUser from 'App/Validators/users/UpdateUser'

export default class UsersController extends BaseController {
  /**
   * index
   */
  public async index({request}: HttpContextContract) {
    const params = request.qs();
    const searchColumn = ['email','full_name'];
    return this.paging('users',params,searchColumn);
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
    const payload = await request.validate(CreateUser);
    const user = new User()
    try {
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
    const payload = await request.validate(UpdateUser);
    const user = new User()
    try {
      await user.fill(payload).save();
      return payload;
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }

  /**
   * delete
   */
  public async delete({params, response}: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await user.delete()

    return user;
  }
}
