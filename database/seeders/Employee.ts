import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Employee from 'App/Models/Employee'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  public async run () {
    await Employee.createMany([
      {
        no_ktp: '12309182301',
        name: 'Rizal Putra',
        gender: 'L',
        address: 'Jl Sawunggalih no 27',
        birth_date: DateTime.fromJSDate(new Date('1999-05-25')),
        city: 'Surabaya',
        photo: ''
      },
      {
        no_ktp: '456423134524',
        name: 'Andi Pratama',
        gender: 'L',
        address: 'Jl Soekarno no 27',
        birth_date: DateTime.fromJSDate(new Date('1997-05-21')),
        city: 'Bandung',
        photo: ''
      },
      {
        no_ktp: '12309182301',
        name: 'Jessica Putri',
        gender: 'P',
        address: 'Jl Melati no 27',
        birth_date: DateTime.fromJSDate(new Date('1995-05-23')),
        city: 'Surabaya',
        photo: ''
      },
      {
        no_ktp: '245762389923',
        name: 'Aksara Putra',
        gender: 'L',
        address: 'Jl Ahmad Yani no 27',
        birth_date: DateTime.fromJSDate(new Date('1979-05-22')),
        city: 'Surabaya',
        photo: ''
      },

    ])
  }
}
