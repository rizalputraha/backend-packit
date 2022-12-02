import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Weight from 'App/Models/Weight'
export default class extends BaseSeeder {
  public async run () {
    await Weight.createMany([
      {
        name: 'Kemasan Plastik / KG',
        weight: 1,
      },
      {
        name: 'Kemasan Plastik / KG',
        weight: 2,
      },
    ])
  }
}
