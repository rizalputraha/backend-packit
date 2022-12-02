import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Employee extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public no_ktp: string

  @column()
  public name: string

  @column()
  public gender: string

  @column()
  public address: string

  @column.date()
  public birth_date: DateTime

  @column()
  public city: string

  @column()
  public photo: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ columnName: 'customDeletedAtColumn' })
  public deletedAt?: DateTime | null
}
