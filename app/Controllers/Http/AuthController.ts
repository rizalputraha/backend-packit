import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  /**
   * Login Route Auth
   */
  public async login({auth, request, response} : HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('api').attempt(email,password)
      return token
    } catch (error) {
      return response.unauthorized('invalid credentials')
    }
  }

}
