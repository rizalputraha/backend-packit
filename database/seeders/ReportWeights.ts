import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ReportWeight from 'App/Models/ReportWeight'

export default class extends BaseSeeder {
  public async run () {
    await ReportWeight.createMany([
      {
        actual: 1.1,
        weight_id: 1,
        employee_id: 1,
        temp: 20,
      },
      {
        actual: 1.1,
        weight_id: 1,
        employee_id: 1,
        temp: 22,
      },
      {
        actual: 1.02,
        weight_id: 1,
        employee_id: 1,
        temp: 21,
      },
      {
        actual: 1.05,
        weight_id: 1,
        employee_id: 1,
        temp: 23,
      },
      {
        actual: 1.07,
        weight_id: 1,
        employee_id: 1,
        temp: 23,
      },
      {
        actual: 1.02,
        weight_id: 1,
        employee_id: 1,
        temp: 22,
      },
    ])
  }
}
